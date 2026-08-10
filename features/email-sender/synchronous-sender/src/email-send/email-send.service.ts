import { MailerService } from '@nestjs-modules/mailer'
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common'
import to from 'await-to-js'
import { eq } from 'drizzle-orm'
import { InjectDrizzle } from '../db/drizzle.decorator'
import { emails, templates, users } from '../db/schema'
import { EmailStatus } from '../db/schema/emails'
import type { DrizzleSchema } from '../db/types/drizzle.type'
import { StorageService } from '../storage/storage.service'
import type { RecipientDTO } from './dto/recipient'
import type { SendOutcome } from './dto/send-outcome'
import type { SendResult } from './dto/send-result'
import type { TemplateBody } from './dto/template'

@Injectable()
export class EmailSendService {
  constructor(
    private mailer: MailerService,
    private storageService: StorageService,
    @InjectDrizzle() private db: DrizzleSchema,
  ) {}

  private async getRecipients() {
    const recipients = await this.db
      .select({ id: users.id, email: users.email })
      .from(users)

    return recipients
  }

  private async queryTemplate(templateId: number) {
    const [templateQueryError, templateData] = await to(
      this.db.select().from(templates).where(eq(templates.id, templateId)),
    )

    if (templateQueryError) {
      throw new InternalServerErrorException(`Template query error.`)
    }

    if (!templateData.length) {
      throw new NotFoundException(
        `Template with given id: ${templateId} not found`,
      )
    }

    const templateStorageKey = templateData[0]?.storageKey

    if (!templateStorageKey) {
      throw new InternalServerErrorException(
        `Template storageKey for template with given id: ${templateId} not found`,
      )
    }

    return templateStorageKey
  }

  private async sendAndRecord(config: {
    email: string
    userId: string
    templateId: number
    templateToSend: string
    subject: string
  }): Promise<SendOutcome> {
    let status: EmailStatus = EmailStatus.Sent

    const [sendEmailError] = await to(
      this.mailer.sendMail({
        to: config.email,
        subject: config.subject,
        template: config.templateToSend,
      }),
    )

    if (sendEmailError) {
      status = EmailStatus.Failed

      // this will be replaced with logger soon
      console.error('Sending email failed')
    }

    const [dbSaveError] = await to(
      this.db.insert(emails).values({
        status,
        to: config.email,
        userId: config.userId,
        templateId: config.templateId,
      }),
    )

    if (dbSaveError) {
      // this ill be replaced with logger soon
      console.error('Storing send status in database failed ')
    }

    return {
      status,
      email: config.email,
      userId: config.userId,
      reason: sendEmailError?.message,
    }
  }

  private buildResult(outcomes: SendOutcome[]): SendResult {
    const failures = outcomes
      .filter((outcome) => outcome.status === EmailStatus.Failed)
      .map((outcome) => ({
        email: outcome.email,
        userId: outcome.userId,
        reason: outcome.reason ?? 'Unknown send error',
      }))

    return {
      sent: outcomes.length - failures.length,
      failed: failures.length,
      failures,
    }
  }

  async sendEmail({
    id: userId,
    templateId,
    subject,
  }: RecipientDTO): Promise<SendResult> {
    const [recipientError, recipients] = await to(
      this.db
        .select({ email: users.email, userId: users.id })
        .from(users)
        .where(eq(users.id, userId)),
    )

    if (recipientError) {
      throw new InternalServerErrorException('Failed to fetch recipient')
    }

    const recipient = recipients[0]

    if (!recipient) {
      throw new NotFoundException(`User ${userId} not found`)
    }

    const templateStorageKey = await this.queryTemplate(templateId)

    const templateToSend =
      await this.storageService.getEmailTemplate(templateStorageKey)

    const outcome = await this.sendAndRecord({
      email: recipient.email,
      userId: recipient.userId,
      templateId,
      templateToSend,
      subject,
    })

    return this.buildResult([outcome])
  }

  async sendBulkEmail({
    templateId,
    subject,
  }: TemplateBody): Promise<SendResult> {
    const recipients = await this.getRecipients()
    const templateStorageKey = await this.queryTemplate(templateId)

    const templateToSend =
      await this.storageService.getEmailTemplate(templateStorageKey)

    const outcomes: SendOutcome[] = []

    for (const { email, id } of recipients) {
      const outcome = await this.sendAndRecord({
        email,
        userId: id,
        templateId,
        templateToSend,
        subject,
      })

      outcomes.push(outcome)
    }

    return this.buildResult(outcomes)
  }
}

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
import { DrizzleSchema } from '../db/types/drizzle.type'
import { StorageService } from '../storage/storage.service'
import { ReceipentDTO } from './dto/receipent'
import { TemplateBody } from './dto/template'

@Injectable()
export class EmailService {
  constructor(
    private emailService: MailerService,
    private storageService: StorageService,
    @InjectDrizzle() private db: DrizzleSchema,
  ) {}

  private async getReceipents() {
    const receipents = await this.db
      .select({ id: users.id, email: users.email })
      .from(users)

    return receipents
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
  }) {
    let status: EmailStatus = EmailStatus.Sent

    const [sendEmailError] = await to(
      this.emailService.sendMail({
        to: config.email,
        subject: 'Welcome!',
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
  }

  async sendEmail({ id: userId, templateId }: ReceipentDTO) {
    const [receipentError, receipents] = await to(
      this.db
        .select({ email: users.email, userId: users.id })
        .from(users)
        .where(eq(users.id, userId)),
    )

    if (receipentError) {
      throw new InternalServerErrorException('Failed to fetch receipent')
    }

    const receipent = receipents[0]

    if (!receipent) {
      throw new NotFoundException(`User ${userId} not found`)
    }

    const templateStorageKey = await this.queryTemplate(templateId)

    const templateToSend =
      await this.storageService.getEmailTemplate(templateStorageKey)

    await this.sendAndRecord({
      email: receipent.email,
      userId: receipent.userId,
      templateId,
      templateToSend,
    })
  }

  async sendBulkEmail({ templateId }: TemplateBody) {
    const receipents = await this.getReceipents()
    const templateStorageKey = await this.queryTemplate(templateId)

    const templateToSend =
      await this.storageService.getEmailTemplate(templateStorageKey)

    for (const { email, id } of receipents) {
      await this.sendAndRecord({
        email,
        userId: id,
        templateId,
        templateToSend,
      })
    }
  }
}

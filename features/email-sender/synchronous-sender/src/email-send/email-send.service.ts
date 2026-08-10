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

  async sendEmail({ id: userId, templateId }: ReceipentDTO) {
    const [receipentError, receipents] = await to(
      this.db
        .select({ email: users.email })
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

    let status: EmailStatus = EmailStatus.Sent

    const [sendEmailError] = await to(
      this.emailService.sendMail({
        to: receipent.email,
        subject: 'Welcome!',
        template: templateToSend,
      }),
    )

    if (sendEmailError) {
      status = EmailStatus.Failed
    }

    await this.db
      .insert(emails)
      .values({ status, to: receipent.email, userId, templateId })
  }

  async sendBulkEmail({ templateId }: TemplateBody) {
    const receipents = await this.getReceipents()
    const templateStorageKey = await this.queryTemplate(templateId)

    const templateToSend =
      await this.storageService.getEmailTemplate(templateStorageKey)

    for (const { email, id } of receipents) {
      let status: EmailStatus = EmailStatus.Sent

      const [sendError] = await to(
        this.emailService.sendMail({
          to: email,
          subject: 'Welcome!',
          template: templateToSend,
        }),
      )

      if (sendError) {
        status = EmailStatus.Failed
      }

      await this.db.insert(emails).values({
        status,
        to: email,
        userId: id,
        templateId,
      })
    }
  }
}

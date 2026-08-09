import { MailerService } from '@nestjs-modules/mailer'
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common'
import to from 'await-to-js'
import { eq } from 'drizzle-orm'
import { InjectDrizzle } from '../db/drizzle.decorator'
import { emails, users } from '../db/schema'
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

  async getReceipents() {
    const receipents = await this.db
      .select({ id: users.id, email: users.email })
      .from(users)

    return receipents
  }

  async sendEmail({ id: userId, templateId }: ReceipentDTO) {
    const [err, receipents] = await to(
      this.db
        .select({ email: users.email })
        .from(users)
        .where(eq(users.id, userId)),
    )

    if (err) {
      throw new InternalServerErrorException(err)
    }

    const receipent = receipents[0]

    if (!receipent) {
      throw new BadRequestException(`User ${userId} not found`)
    }

    const template = await this.storageService.getEmailTemplate(templateId)

    let status: EmailStatus = EmailStatus.Sent

    const [sendEmailError] = await to(
      this.emailService.sendMail({
        to: receipent.email,
        subject: 'Welcome!',
        template,
      }),
    )

    if (sendEmailError) {
      status = EmailStatus.Failed
    }

    await this.db
      .insert(emails)
      .values({ status, to: receipent.email, userId, templateId: 1 })
  }

  async sendBulkEmail({ templateId }: TemplateBody) {
    const receipents = await this.getReceipents()
    const template = await this.storageService.getEmailTemplate(templateId)

    for (const { email, id } of receipents) {
      let status: EmailStatus = EmailStatus.Sent

      const [sendError] = await to(
        this.emailService.sendMail({
          to: email,
          subject: 'Welcome!',
          html: template,
        }),
      )

      if (sendError) {
        status = EmailStatus.Failed
      }

      await this.db.insert(emails).values({
        status,
        to: email,
        userId: id,
        templateId: 1,
      })
    }
  }
}

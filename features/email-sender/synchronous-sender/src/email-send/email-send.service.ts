import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { MailerService } from '@nestjs-modules/mailer'
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import to from 'await-to-js'
import { eq } from 'drizzle-orm'
import { InjectS3 } from '../aws-s3'
import { InjectDrizzle } from '../db/drizzle.decorator'
import { emails, users } from '../db/schema'
import { EmailStatus } from '../db/schema/emails'
import { DrizzleSchema } from '../db/types/drizzle.type'
import { ReceipentDTO } from './dto/receipent'
import { TemplateBody } from './dto/template'

@Injectable()
export class EmailService {
  BUCKET_NAME = ''

  constructor(
    private emailService: MailerService,
    private config: ConfigService,
    @InjectDrizzle() private db: DrizzleSchema,
    @InjectS3() private s3: S3Client,
  ) {
    this.BUCKET_NAME = this.config.getOrThrow('S3_BUCKET_NAME')
  }

  async getReceipents() {
    const receipents = await this.db
      .select({ id: users.id, email: users.email })
      .from(users)

    return receipents
  }

  async getEmailTemplate(templateKey: number) {
    const [getTemplateError, template] = await to(
      this.s3.send(
        new GetObjectCommand({
          Bucket: this.BUCKET_NAME,
          Key: `templates/${templateKey}`,
        }),
      ),
    )

    if (getTemplateError || !template?.Body) {
      throw new InternalServerErrorException(getTemplateError)
    }

    return template.Body.transformToString()
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

    const template = await this.getEmailTemplate(templateId)

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
      .values({ status, to: receipent.email, userId, templateId })
  }

  async sendBulkEmail({ templateId }: TemplateBody) {
    const receipents = await this.getReceipents()
    const template = await this.getEmailTemplate(templateId)

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
        templateId,
      })
    }
  }
}

import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { MailerService } from '@nestjs-modules/mailer'
import { BadRequestException, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { eq } from 'drizzle-orm'
import { InjectS3 } from '../aws-s3'
import { InjectDrizzle } from '../db/drizzle.decorator'
import { emails, users } from '../db/schema'
import { EmailStatus } from '../db/schema/emails'
import { DrizzleSchema } from '../db/types/drizzle.type'
import { ReceipentDTO } from './dto/receipent'

@Injectable()
export class EmailService {
  BUCKET_NAME = ''
  TEMPLATE_KEY = 'welcome.html'
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

  async getEmailTemplate() {
    const template = await this.s3.send(
      new GetObjectCommand({
        Bucket: this.BUCKET_NAME,
        Key: this.TEMPLATE_KEY,
      }),
    )

    return template.Body!.transformToString()
  }

  async sendEmail({ id: userId }: ReceipentDTO) {
    const [recipient] = await this.db
      .select({ email: users.email })
      .from(users)
      .where(eq(users.id, userId))

    if (!recipient) throw new BadRequestException(`User ${userId} not found`)

    const template = await this.getEmailTemplate()

    let status: EmailStatus = EmailStatus.Sent

    try {
      await this.emailService.sendMail({
        to: recipient.email,
        subject: 'Welcome!',
        html: template,
      })
    } catch {
      status = EmailStatus.Failed
    }

    await this.db.insert(emails).values({ status, to: recipient.email, userId })
  }

  async sendBulkEmail() {
    const receipents = await this.getReceipents()

    let status: EmailStatus = EmailStatus.Sent

    for (const { email, id } of receipents) {
      try {
        await this.emailService.sendMail({
          to: email,
          subject: 'Welcome!',
          html: '<h1>Welcome!</h1>',
        })
      } catch {
        status = EmailStatus.Failed
      }

      await this.db.insert(emails).values({
        status,
        to: email,
        userId: id,
      })
    }
  }
}

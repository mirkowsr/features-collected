import { MailerService } from '@nestjs-modules/mailer'
import { Injectable } from '@nestjs/common'
import { InjectDrizzle } from '../db/drizzle.decorator'
import { DrizzleSchema } from '../db/types/drizzle.type'
import { emails, users } from '../db/schema'
import { EmailStatus } from '../db/schema/emails'

@Injectable()
export class EmailService {
  constructor(
    private emailService: MailerService,
    @InjectDrizzle() private db: DrizzleSchema,
  ) {}

  async getReceipents() {
    const receipents = await this.db
      .select({ id: users.id, email: users.email })
      .from(users)

    return receipents
  }
  async sendEmail() {
    const receipents = await this.getReceipents()

    for (const { email, id } of receipents) {
      try {
        await this.emailService.sendMail({
          to: email,
          subject: 'Welcome!',
          html: '<h1>Welcome!</h1>',
        })

        await this.db.insert(emails).values({
          status: EmailStatus.Sent,
          to: email,
          userId: id,
        })
      } catch {
        await this.db.insert(emails).values({
          status: EmailStatus.Failed,
          to: email,
          userId: id,
        })
      }
    }
  }
}

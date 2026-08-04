import { MailerService } from '@nestjs-modules/mailer'
import { Injectable } from '@nestjs/common'

@Injectable()
export class EmailService {
  constructor(private emailService: MailerService) {}

  async sendEmail() {
    await this.emailService.sendMail({
      to: 'user@example.com',
      subject: 'Welcome!',
      html: '<h1>Welcome!</h1>',
    })
  }
}

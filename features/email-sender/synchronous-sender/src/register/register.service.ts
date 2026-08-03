import { MailerService } from '@nestjs-modules/mailer'
import { Injectable } from '@nestjs/common'
import { UserDTO } from './dto/user.dto'

@Injectable()
export class RegisterService {
  constructor(private emailService: MailerService) {}

  async registerUser(user: UserDTO) {
    console.log('@@@', user)

    await this.emailService.sendMail({
      to: 'user@example.com',
      subject: 'Welcome!',
      html: '<h1>Welcome!</h1>',
    })
  }
}

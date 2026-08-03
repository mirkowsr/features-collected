import { Body, Controller, Post } from '@nestjs/common'
import { RegisterService } from './register.service'
import { UserDTO } from './dto/user.dto'

@Controller('register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post()
  register(@Body() userBody: UserDTO) {
    this.registerService.registerUser(userBody)
  }
}

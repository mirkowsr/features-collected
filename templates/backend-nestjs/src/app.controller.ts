import { Controller, Get } from '@nestjs/common'

@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return '__FEATURE_NAME__ backend is running'
  }
}

import { Controller, Get } from '@nestjs/common'

@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return 'feature-b backend is running'
  }
}

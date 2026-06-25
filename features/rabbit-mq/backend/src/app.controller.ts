import { Controller, Get, Inject } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'

@Controller()
export class AppController {
  constructor(@Inject('RABBIT_CLIENT') private RabbitMQ: ClientProxy) {}

  @Get('send')
  async sendMesage() {
    const result = await this.RabbitMQ.send('receiveMessage', {
      message: 'hello',
    }).toPromise()

    return result
  }
}

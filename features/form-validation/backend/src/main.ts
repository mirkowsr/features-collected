import { NestFactory } from '@nestjs/core'

import { AppModule } from './app.module'

async function bootstrap() {
  if (module.hot?.data?.closePromise) {
    await module.hot.data.closePromise
  }

  const app = await NestFactory.create(AppModule, {
    forceCloseConnections: true,
  })
  const port = process.env['PORT'] ?? 8080
  await app.listen(port)
  console.log(`Application running on port ${port}`)

  if (module.hot) {
    module.hot.accept()
    module.hot.dispose((data) => {
      data.closePromise = app.close()
    })
  }
}

bootstrap()

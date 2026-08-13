import { Module } from '@nestjs/common'
import { StorageModule } from '../storage/storage.module'
import { TemplatesController } from './templates.controller'
import { TemplatesService } from './templates.service'

@Module({
  controllers: [TemplatesController],
  providers: [TemplatesService],
  imports: [StorageModule],
})
export class TemplatesModule {}

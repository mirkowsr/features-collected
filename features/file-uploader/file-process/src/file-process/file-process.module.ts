import { Module } from '@nestjs/common'
import { FileProcessService } from './file-process.service'
import { FileProcessController } from './file-process.controller'

@Module({
  controllers: [FileProcessController],
  providers: [FileProcessService],
})
export class FileProcessModule {}

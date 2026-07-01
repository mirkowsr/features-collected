import { Module } from '@nestjs/common';
import { SimpleQueueService } from './simple-queue.service';
import { SimpleQueueController } from './simple-queue.controller';

@Module({
  controllers: [SimpleQueueController],
  providers: [SimpleQueueService],
})
export class SimpleQueueModule {}

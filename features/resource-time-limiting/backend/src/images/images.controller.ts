import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common'
import { ImagesService } from './images.service'
import { ImageDto, ImagesSchema } from './validation/images.schema'
import { ZodValidationPipe } from '../common/pipes/ZodValidationPipe'
import { TimeLimitsGuard } from '../common/guards/time-limit.guard'
import { TimeLimitedResource } from '../time-limits/decorators/time-limit.decorator'

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Get()
  findAll() {
    return this.imagesService.findAll()
  }

  @Get(':id')
  @TimeLimitedResource('image')
  @UseGuards(TimeLimitsGuard)
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.imagesService.findOne(id)
  }

  @Post()
  @UsePipes(new ZodValidationPipe(ImagesSchema))
  create(@Body() image: ImageDto) {
    return this.imagesService.create(image)
  }
}

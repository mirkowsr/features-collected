import { Body, Controller, Post, UsePipes } from '@nestjs/common'
import { DynamicValidation } from '../common/pipes/dynamic-validation'
import { SchemaMap } from '../users/validation/dynamic'

@Controller('validation')
export class ValidationController {
  @Post()
  @UsePipes(new DynamicValidation(SchemaMap))
  validate(@Body() body: Record<string, unknown>) {
    return body
  }
}

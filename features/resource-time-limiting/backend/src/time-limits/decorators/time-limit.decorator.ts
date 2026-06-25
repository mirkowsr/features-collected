import { Reflector } from '@nestjs/core'
import { ResourceType } from '../../db/schema/time-limits'

export const TimeLimitedResource = Reflector.createDecorator<ResourceType>()

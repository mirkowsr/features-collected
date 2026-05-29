import {
  Controller,
  Get,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'

import { ValidateQueryParams } from './decorators/validateQuery.decorator'
import { QueryPipe } from './pipes/query.pipe'
import { UserFilterKeys, UserRepositoryQueryParams } from './types'
import { UserService } from './user.service'
import { UserFilterParamsDto } from './dto/user-filter-params.dto'
import { QueryFilter } from './pipes/query-params.pipe'
import {
  UserFilterQuery,
  UserFilterQuerySchema,
} from './validation/filter-params.schema'

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/')
  findUsers() {
    return this.userService.findAll()
  }

  @Get('/simple-param')
  findBySingleParam(@Query('lastName') lastName: string) {
    return this.userService.findBySingleParam(lastName)
  }

  @Get('/multiple-params')
  findbyMultipleParams(
    @Query('firstName') firstName: string,
    @Query('lastName') lastName: string,
  ) {
    return this.userService.findByMultipleParams({ lastName, firstName })
  }

  @ValidateQueryParams<UserFilterKeys>('firstName', 'lastName')
  @Get('/param-validator')
  findByUniversalParam(@Query() params: UserRepositoryQueryParams) {
    return this.userService.findByUniversalParam(params)
  }

  @Get('/param-pipe')
  @UsePipes(new QueryPipe<UserFilterKeys>(['lastName']))
  findByPipe(@Query() params: UserRepositoryQueryParams) {
    return this.userService.findByUniversalParam(params)
  }

  @Get('/class-validator')
  findByClassValidator(
    @Query(new ValidationPipe({ whitelist: true, transform: true }))
    params: UserFilterParamsDto,
  ) {
    return this.userService.findByDtoParam(params)
  }

  @Get('/zod-validator')
  findByZodValidator(
    @Query(new QueryFilter(UserFilterQuerySchema))
    params: UserFilterQuery,
  ) {
    return this.userService.findByZodFilteredParams(params)
  }

  @Get('/paginated')
  paginated(
    @Query(new QueryFilter(UserFilterQuerySchema))
    params: UserFilterQuery,
  ) {
    return this.userService.findPaginated(params)
  }
}

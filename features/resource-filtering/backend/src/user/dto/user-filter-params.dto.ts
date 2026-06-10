import { IsOptional, IsString } from 'class-validator'

export class UserFilterParamsDto {
  @IsOptional()
  @IsString()
  firstName?: string

  @IsOptional()
  @IsString()
  lastName?: string
}

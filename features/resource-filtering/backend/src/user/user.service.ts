import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindOptionsOrder, Repository, type FindOptionsWhere } from 'typeorm'

import { UserFilterParamsDto } from './dto/user-filter-params.dto'
import { UserRepositoryQueryParams } from './types'
import { User } from './user.entity'
import { UserFilterQuery } from './validation/filter-params.schema'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  private buildWhereClause(params: UserFilterQuery) {
    const filters = Object.fromEntries(
      Object.entries(params).filter(([_, val]) => val !== undefined),
    )

    return { ...filters } as FindOptionsWhere<User>
  }

  findAll() {
    return this.userRepository.find({ order: { id: 'ASC' } })
  }

  findBySingleParam(lastName: string) {
    return this.userRepository.find({ where: { lastName: lastName } })
  }

  findByMultipleParams({
    firstName,
    lastName,
  }: {
    firstName: string
    lastName: string
  }) {
    return this.userRepository.find({
      where: [{ lastName: lastName }, { firstName: firstName }],
    })
  }
  findByUniversalParam(params: UserRepositoryQueryParams) {
    return this.userRepository.find({
      where: [{ ...params }],
    })
  }
  findByDtoParam(params: UserFilterParamsDto) {
    return this.userRepository.find({
      where: [{ ...params }],
    })
  }

  findByZodFilteredParams(params: UserFilterQuery) {
    return this.userRepository.find({
      where: [{ ...params }],
    })
  }

  async findPaginated(params: UserFilterQuery) {
    const {
      page = 1,
      limit = 10,
      order = 'asc',
      orderBy = 'id',
      ...filterParams
    } = params

    const whereClause = this.buildWhereClause(filterParams)

    const orderClause: FindOptionsOrder<Partial<User>> = {
      [orderBy]: order,
    }

    const [data, count] = await this.userRepository.findAndCount({
      where: whereClause,
      skip: (page - 1) * limit,
      take: limit,
      order: orderClause,
    })

    return {
      data: data,
      meta: {
        page,
        limit,
        count,
      },
    }
  }
}

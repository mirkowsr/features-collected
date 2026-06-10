import { User } from './user.entity'

export type UserRepositoryQueryParams = Partial<User>
export type UserFilterKeys = keyof User
export type AllowedQueries<T> = Set<T>

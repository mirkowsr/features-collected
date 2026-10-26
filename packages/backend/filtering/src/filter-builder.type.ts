export type PaginationParams = {
  page?: string
  pageSize?: string
}

export type FuzzySearchParams = {
  q?: string
}

export type FilterParams<TFilters extends object = Record<string, unknown>> =
  Partial<TFilters> & PaginationParams & FuzzySearchParams

export type PaginationMeta = {
  page: number
  pageSize: number
  total: number
  totalPages: number
}

export type PaginatedResponse<T> = {
  data: T[]
  meta: PaginationMeta
}

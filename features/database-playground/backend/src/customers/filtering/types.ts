import { Customers } from '../../db/types/customers.type'

export type CustomersFilterParams = Pick<
  Customers,
  'customerId' | 'country' | 'lastName' | 'firstName'
> &
  Partial<CustomerFuzzySearchParam> &
  Partial<PaginationParams>

// pagination
export type PaginationParams = {
  page: string
  pageSize: string
}

// fuzzy search
export type CustomerFuzzySearchParam = {
  q: string
}

// filters by query - matching db columns
export type CustomerQuerySearchParams = Omit<
  CustomersFilterParams,
  'q' | 'page' | 'pageSize'
>

// key utility
export type CustomerFilterKeys = keyof CustomerQuerySearchParams

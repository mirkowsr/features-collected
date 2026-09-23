import { Customers } from '../../db/types/customers.type'

export type CustomersFilterParams = Pick<
  Customers,
  'customerId' | 'country' | 'lastName' | 'firstName'
> &
  Partial<CustomerFuzzySearchParam>

// fuzzy search
export type CustomerFuzzySearchParam = {
  q: string
}

// filters by query - matching db columns
export type CustomerQuerySearchParams = Omit<CustomersFilterParams, 'q'>

// key utility
export type CustomerFilterKeys = keyof CustomerQuerySearchParams

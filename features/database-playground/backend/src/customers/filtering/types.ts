import type { FilterParams } from '@repo/backend-filtering'
import type { Customers } from '../../db/types/customers.type'

type CustomerFilterFields = Pick<
  Customers,
  'customerId' | 'country' | 'lastName' | 'firstName'
>

export type CustomersFilterParams = FilterParams<CustomerFilterFields>

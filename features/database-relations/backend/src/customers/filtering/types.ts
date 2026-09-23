import { Customers } from '../../db/types/customers.type'

export type CustomersFilterParams = Pick<
  Customers,
  'customerId' | 'country' | 'lastName' | 'firstName'
>

export type CustomerFilterKeys = keyof CustomersFilterParams

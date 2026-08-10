import { EmailStatus } from '../../db/schema/emails'

export type SendOutcome = {
  status: EmailStatus
  email: string
  userId: string
  reason?: string
}

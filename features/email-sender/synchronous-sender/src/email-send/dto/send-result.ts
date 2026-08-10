export type SendResult = {
  sent: number
  failed: number
  failures: { email: string; userId: string; reason: string }[]
}

function hasExpired(limitDate: Date) {
  return new Date() > new Date(limitDate)
}

export const TimeLimitsUtils = {
  hasExpired,
}

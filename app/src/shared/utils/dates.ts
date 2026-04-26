export function nowUtc() {
  return new Date();
}

export function addDays(date: Date, days: number) {
  const nextDate = new Date(date);
  nextDate.setUTCDate(nextDate.getUTCDate() + days);
  return nextDate;
}

export function isExpired(expiresAt: Date, at = nowUtc()) {
  return expiresAt.getTime() <= at.getTime();
}

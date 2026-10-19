export const DAYS_PER_MONTH = 30;
export const BOOKING_RATE = 0.25; // share of recovered calls that become booked appointments

/** Extra fee income per month: missed calls -> booked appointments -> instructions won -> fees. */
export function roi(missedPerDay: number, feePerSale: number, winRatePct: number) {
  const recovered = missedPerDay * DAYS_PER_MONTH;
  const appointments = recovered * BOOKING_RATE;
  const instructions = appointments * (winRatePct / 100);
  return { recovered, appointments, instructions, revenue: instructions * feePerSale };
}

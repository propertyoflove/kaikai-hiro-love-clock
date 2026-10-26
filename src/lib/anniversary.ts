export const ANNIVERSARY = new Date(2026, 7, 26, 0, 0, 0); // Aug 26 2026, local time

export function elapsed(from: Date, now: Date) {
  const future = now < from;
  const [a, b] = future ? [now, from] : [from, now];
  let months = (b.getFullYear() - a.getFullYear()) * 12 + (b.getMonth() - a.getMonth());
  const anchor = new Date(a); anchor.setMonth(a.getMonth() + months);
  if (anchor > b) { months--; anchor.setTime(a.getTime()); anchor.setMonth(a.getMonth() + months); }
  const years = Math.floor(months / 12);
  let rest = b.getTime() - anchor.getTime();
  const days = Math.floor(rest / 864e5); rest -= days * 864e5;
  const hours = Math.floor(rest / 36e5); rest -= hours * 36e5;
  const minutes = Math.floor(rest / 6e4); rest -= minutes * 6e4;
  const seconds = Math.floor(rest / 1000);
  const totalDays = Math.floor((b.getTime() - a.getTime()) / 864e5);
  return { future, years, months: months % 12, days, hours, minutes, seconds, totalDays };
}

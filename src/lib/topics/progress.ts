function toDayKey(d: Date): string {
  return d.toISOString().slice(0, 10);
}

export function computeStreak(completedDates: Date[]): number {
  if (completedDates.length === 0) return 0;

  const daySet = new Set(completedDates.map(toDayKey));
  const cursor = new Date();
  cursor.setHours(0, 0, 0, 0);

  if (!daySet.has(toDayKey(cursor))) {
    cursor.setDate(cursor.getDate() - 1);
  }

  let streak = 0;
  while (daySet.has(toDayKey(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

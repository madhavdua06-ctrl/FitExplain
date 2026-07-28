function niceStep(rough: number): number {
  const pow = Math.pow(10, Math.floor(Math.log10(rough)));
  const norm = rough / pow;
  let niceNorm: number;
  if (norm < 1.5) niceNorm = 1;
  else if (norm < 3) niceNorm = 2;
  else if (norm < 7) niceNorm = 5;
  else niceNorm = 10;
  return niceNorm * pow;
}

export function niceTicks(min: number, max: number, count = 4): number[] {
  if (min === max) return [min];
  const step = niceStep((max - min) / count) || 1;
  const niceMin = Math.floor(min / step) * step;
  const niceMax = Math.ceil(max / step) * step;
  const ticks: number[] = [];
  for (let v = niceMin; v <= niceMax + step * 0.001; v += step) {
    ticks.push(Math.round(v * 100) / 100);
  }
  return ticks;
}

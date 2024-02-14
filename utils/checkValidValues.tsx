export function checkValidYear(year: number) {
  if (year < 1960 || year > new Date().getFullYear()) return false;
  return true;
}

export function checkValidShowCount(showCount: number) {
  console.log(showCount);
  if (showCount <= 0 || showCount > 100) return false;
  return true;
}

export function checkValidYear(year: number) {
  if (year < 1960 || year > new Date().getFullYear()) return false;
  return true;
}

export function checkValidShowCount(showCount: number) {
  if (showCount <= 0 || showCount > 100) return false;
  return true;
}

export function checkValidMALScore(score: number) {
  if (score < 6.8 || score > 10) return false;
  return true;
}

export function isValidNumber(str: string) {
  if (typeof str !== "string" || str.trim() === "") {
    return false;
  }

  return !isNaN(parseFloat(str));
}

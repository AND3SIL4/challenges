//Calculate average
export function calculateAverage(numbers: number[]): number {
  const sum = numbers.reduce((acc, curr) => acc + curr);
  return sum / numbers.length;
}

//Calculate standard deviation
export function calculateStandardDeviation(numbers: number[]): number {
  const avg = calculateAverage(numbers);
  const squareDiffs = numbers.map((n) => {
    const diff = n - avg;
    return diff * diff;
  });
  const avgSquareDiff = calculateAverage(squareDiffs);
  return Math.sqrt(avgSquareDiff);
}

//Calculate relative standard deviation
export function calculateRSD(numbers: number[], decimalPlaces: number): number {
  const avg = calculateAverage(numbers);
  const stdDev = calculateStandardDeviation(numbers);
  const rsd = (stdDev / avg) * 100;
  return parseFloat(rsd.toFixed(decimalPlaces));
}

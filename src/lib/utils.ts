
import type {
  EnvironmentalMetric,
  Station,
  StationStatus,
  TrendPoint,
} from '@/types/environment';

/**
 * Calculate the arithmetic mean of numeric values.
 */
export function calculateAverage(values: number[]): number {
  if (values.length === 0) return 0;

  const total = values.reduce((sum, value) => sum + value, 0);

  return Number((total / values.length).toFixed(1));
}

/**
 * Calculate the minimum value in a numeric dataset.
 */
export function calculateMinimum(values: number[]): number {
  return values.length > 0 ? Math.min(...values) : 0;
}

/**
 * Calculate the maximum value in a numeric dataset.
 */
export function calculateMaximum(values: number[]): number {
  return values.length > 0 ? Math.max(...values) : 0;
}

/**
 * Extract a selected environmental indicator from trend records.
 */
export function getMetricValues(
  records: TrendPoint[],
  metric: EnvironmentalMetric,
): number[] {
  return records.map((record) =>
    metric === 'temperature' ? record.temp : record[metric]
  );
}

/**
 * Calculate the average of a selected station indicator.
 */
export function calculateStationAverage(
  stations: Station[],
  metric: EnvironmentalMetric,
): number {
  return calculateAverage(
    stations.map((station) => station[metric])
  );
}

/**
 * Format temperature for dashboard presentation.
 */
export function formatTemperature(
  value: number,
  unit: 'C' | 'F' = 'C',
): string {
  const temperature =
    unit === 'F' ? (value * 9) / 5 + 32 : value;

  return `${temperature.toFixed(1)}°${unit}`;
}

/**
 * Return the status already assigned to a demonstration station.
 *
 * This function does not independently determine environmental
 * safety or calculate regulatory AQI classifications.
 */
export function getStationStatus(
  station: Station,
): StationStatus {
  return station.status;
}

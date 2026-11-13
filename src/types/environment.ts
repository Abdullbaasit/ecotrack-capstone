
/**
 * EcoTrack Environmental Data Model
 *
 * This file defines the shared TypeScript structures
 * used throughout the EcoTrack application.
 */

// ==========================================
// 1. STATION STATUS
// ==========================================

export type StationStatus =
  | 'Good'
  | 'Moderate'
  | 'Needs attention';


// ==========================================
// 2. ALERT SEVERITY
// ==========================================

export type AlertSeverity =
  | 'High'
  | 'Medium'
  | 'Low';


// ==========================================
// 3. ENVIRONMENTAL METRICS
// ==========================================

export type EnvironmentalMetric =
  | 'air'
  | 'water'
  | 'temperature';


// ==========================================
// 4. MONITORING STATION
// ==========================================

export interface Station {
  id: string;
  name: string;
  area: string;

  air: number;
  water: number;
  temperature: number;
  humidity: number;

  status: StationStatus;
}


// ==========================================
// 5. ENVIRONMENTAL ALERT
// ==========================================

export interface Alert {
  id: string;
  stationId: string;

  severity: AlertSeverity;

  title: string;
  detail: string;
  time: string;
}


// ==========================================
// 6. ENVIRONMENTAL TREND
// ==========================================

export interface TrendPoint {
  day: string;

  air: number;
  water: number;
  temp: number;
}

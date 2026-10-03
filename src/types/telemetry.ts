export type HealthStatus = 'NORMAL' | 'WARNING' | 'CRITICAL';

export interface TelemetryData {
  healthScore: number;       // e.g. 94%
  temperature: number;       // e.g. 36.5 °C
  vibration: number;         // e.g. 1.02 g
  current: number;           // e.g. 0.82 A
  rpm: number;               // e.g. 1460 RPM
  failureRisk: number;       // e.g. 6%
  status: HealthStatus;
  timestamp: number;
}

export interface TelemetryHistoryPoint {
  time: string;
  temperature: number;
  vibration: number;
  current: number;
  rpm: number;
  health: number;
}

export type AnomalyPreset = 'NORMAL' | 'VIBRATION_SPIKE' | 'THERMAL_OVERHEAT' | 'BEARING_FAULT' | 'CURRENT_UNBALANCE';

export interface SensorInfo {
  id: string;
  name: string;
  model: string;
  parameter: string;
  type: string;
  unit: string;
  range: string;
  description: string;
  role: string;
  normalRange: string;
}

export interface ExplodedComponent {
  id: string;
  name: string;
  partNumber: string;
  description: string;
  spec: string;
  category: 'CHASSIS' | 'COMPUTE' | 'ANALOG' | 'DISPLAY';
}

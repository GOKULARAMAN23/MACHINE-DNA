import { useState, useEffect, useRef, useCallback } from 'react';
import { TelemetryData, TelemetryHistoryPoint, AnomalyPreset, HealthStatus } from '../types/telemetry';

export function useTelemetry() {
  const [activePreset, setActivePreset] = useState<AnomalyPreset>('NORMAL');
  const [telemetry, setTelemetry] = useState<TelemetryData>({
    healthScore: 94,
    temperature: 36.5,
    vibration: 1.02,
    current: 0.82,
    rpm: 1460,
    failureRisk: 6,
    status: 'NORMAL',
    timestamp: Date.now(),
  });

  const [history, setHistory] = useState<TelemetryHistoryPoint[]>([]);
  const baseValuesRef = useRef({
    healthScore: 94,
    temperature: 36.5,
    vibration: 1.02,
    current: 0.82,
    rpm: 1460,
    failureRisk: 6,
    status: 'NORMAL' as HealthStatus,
  });

  // Switch presets
  const setPreset = useCallback((preset: AnomalyPreset) => {
    setActivePreset(preset);
    switch (preset) {
      case 'NORMAL':
        baseValuesRef.current = {
          healthScore: 94,
          temperature: 36.5,
          vibration: 1.02,
          current: 0.82,
          rpm: 1460,
          failureRisk: 6,
          status: 'NORMAL',
        };
        break;
      case 'VIBRATION_SPIKE':
        baseValuesRef.current = {
          healthScore: 72,
          temperature: 41.2,
          vibration: 2.78,
          current: 1.15,
          rpm: 1445,
          failureRisk: 28,
          status: 'WARNING',
        };
        break;
      case 'THERMAL_OVERHEAT':
        baseValuesRef.current = {
          healthScore: 58,
          temperature: 68.4,
          vibration: 1.95,
          current: 1.48,
          rpm: 1420,
          failureRisk: 58,
          status: 'WARNING',
        };
        break;
      case 'BEARING_FAULT':
        baseValuesRef.current = {
          healthScore: 38,
          temperature: 76.5,
          vibration: 4.42,
          current: 1.92,
          rpm: 1385,
          failureRisk: 84,
          status: 'CRITICAL',
        };
        break;
      case 'CURRENT_UNBALANCE':
        baseValuesRef.current = {
          healthScore: 65,
          temperature: 49.8,
          vibration: 1.82,
          current: 2.18,
          rpm: 1430,
          failureRisk: 42,
          status: 'WARNING',
        };
        break;
    }
  }, []);

  // Real-time telemetry tick loop (800ms updates)
  useEffect(() => {
    // Generate initial history buffer
    const initialHistory: TelemetryHistoryPoint[] = [];
    const now = Date.now();
    for (let i = 20; i >= 0; i--) {
      const timeStr = new Date(now - i * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      initialHistory.push({
        time: timeStr,
        temperature: +(36.5 + (Math.random() * 0.4 - 0.2)).toFixed(1),
        vibration: +(1.02 + (Math.random() * 0.06 - 0.03)).toFixed(2),
        current: +(0.82 + (Math.random() * 0.04 - 0.02)).toFixed(2),
        rpm: Math.round(1460 + (Math.random() * 8 - 4)),
        health: 94,
      });
    }
    setHistory(initialHistory);

    const interval = setInterval(() => {
      const base = baseValuesRef.current;
      const noise = (scale: number) => (Math.random() * 2 - 1) * scale;

      const currentTemp = +(base.temperature + noise(0.25)).toFixed(1);
      const currentVib = +(Math.max(0.2, base.vibration + noise(0.06))).toFixed(2);
      const currentAmp = +(Math.max(0.1, base.current + noise(0.03))).toFixed(2);
      const currentRpm = Math.round(base.rpm + noise(6));
      const currentHealth = Math.round(Math.max(10, Math.min(100, base.healthScore + noise(1))));
      const currentRisk = Math.round(Math.max(1, Math.min(99, base.failureRisk + noise(1.5))));

      const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

      setTelemetry({
        healthScore: currentHealth,
        temperature: currentTemp,
        vibration: currentVib,
        current: currentAmp,
        rpm: currentRpm,
        failureRisk: currentRisk,
        status: base.status,
        timestamp: Date.now(),
      });

      setHistory((prev) => {
        const next = [...prev.slice(1), {
          time: timeStr,
          temperature: currentTemp,
          vibration: currentVib,
          current: currentAmp,
          rpm: currentRpm,
          health: currentHealth,
        }];
        return next;
      });
    }, 750);

    return () => clearInterval(interval);
  }, []);

  return {
    telemetry,
    history,
    activePreset,
    setPreset,
  };
}

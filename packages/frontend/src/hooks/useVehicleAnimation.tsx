import { useEffect, useRef, useState } from 'react';
import { GpsPoint } from '../types';

function interpolate(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function interpolatePosition(a: GpsPoint, b: GpsPoint, t: number): [number, number] {
  const lat = interpolate(a.latitude, b.latitude, t);
  const lng = interpolate(a.longitude, b.longitude, t);
  return [lat, lng];
}

export function useVehicleAnimator(gpsPoints: GpsPoint[], isPlaying: boolean) {
  const [position, setPosition] = useState<[number, number]>([
    gpsPoints?.[0]?.latitude ?? -23.963223,
    gpsPoints?.[0]?.longitude ?? -46.28054,
  ]);
  const [angle, setAngle] = useState(gpsPoints?.[0]?.direction ?? 0);
  const [isAnimating, setIsAnimating] = useState(false);

  const indexRef = useRef(0);
  const startTimeRef = useRef<number | null>(null);
  const requestRef = useRef<number | null>(null);

  // Zera quando o gpsPoints muda
  useEffect(() => {
    indexRef.current = 0;
    startTimeRef.current = null;
    setPosition([
      gpsPoints?.[0]?.latitude ?? 0,
      gpsPoints?.[0]?.longitude ?? 0,
    ]);
    setAngle(gpsPoints?.[0]?.direction ?? 0);
    setIsAnimating(false);
  }, [gpsPoints]);

  useEffect(() => {
    if (!isPlaying || !gpsPoints || gpsPoints.length < 2) return;

    setIsAnimating(true);
    startTimeRef.current = null;

    const animate = (timestamp: number) => {
      const i = indexRef.current;
      const current = gpsPoints[i];
      const next = gpsPoints[i + 1];

      if (!next) {
        setIsAnimating(false);
        return;
      }

      if (startTimeRef.current === null) startTimeRef.current = timestamp;

      const t1 = new Date(current.acquisition_time).getTime();
      const t2 = new Date(next.acquisition_time).getTime();
      const duration = Math.max(t2 - t1, 500);

      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);

      setPosition(interpolatePosition(current, next, progress));
      setAngle(-current.direction);

      if (progress < 1) {
        requestRef.current = requestAnimationFrame(animate);
      } else {
        indexRef.current += 1;
        startTimeRef.current = null;

        if (indexRef.current < gpsPoints.length - 1) {
          requestRef.current = requestAnimationFrame(animate);
        } else {
          setIsAnimating(false);
        }
      }
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [gpsPoints, isPlaying]);

  return { position, angle, isAnimating };
}

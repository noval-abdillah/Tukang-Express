'use client';

/**
 * @file CountUpStat.tsx — Animasi angka naik saat masuk viewport.
 * Digunakan di hero stats, mitra section, dll.
 */

import { useEffect, useRef, useState } from 'react';

interface CountUpStatProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number; // ms
  className?: string;
}

export function CountUpStat({
  end, suffix = '', prefix = '',
  duration = 2000, className = '',
}: CountUpStatProps) {
  const [value,    setValue]    = useState(0);
  const [started,  setStarted]  = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;

    const startTime = performance.now();
    const step = (now: number) => {
      const elapsed  = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, end, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}{value.toLocaleString('id-ID')}{suffix}
    </span>
  );
}

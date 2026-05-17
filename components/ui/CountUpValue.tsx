"use client";

import { useLayoutEffect, useMemo, useRef, useState } from "react";

type CountUpValueProps = {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  formatter?: (value: number) => string;
};

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function easeOutCubic(progress: number): number {
  return 1 - Math.pow(1 - progress, 3);
}

function normalizeTarget(value: number): number {
  return Number.isFinite(value) ? value : 0;
}

function normalizeFrameValue(value: number, target: number): number {
  if (Number.isInteger(target)) {
    return Math.round(value);
  }

  return Number(value.toFixed(2));
}

export function CountUpValue({
  value,
  duration = 700,
  prefix = "",
  suffix = "",
  formatter,
}: CountUpValueProps) {
  const target = normalizeTarget(value);
  const safeDuration = Number.isFinite(duration) && duration > 0 ? duration : 0;
  const frameRef = useRef<number | null>(null);
  const [displayValue, setDisplayValue] = useState(0);

  const formatValue = useMemo(
    () => (nextValue: number) => {
      const formatted = formatter
        ? formatter(nextValue)
        : new Intl.NumberFormat("tr-TR", {
            maximumFractionDigits: Number.isInteger(target) ? 0 : 2,
          }).format(nextValue);

      return `${prefix}${formatted}${suffix}`;
    },
    [formatter, prefix, suffix, target],
  );

  const finalText = formatValue(target);

  useLayoutEffect(() => {
    const mediaQuery = window.matchMedia(REDUCED_MOTION_QUERY);

    const finish = () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }

      setDisplayValue(target);
    };

    if (
      mediaQuery.matches ||
      document.visibilityState !== "visible" ||
      safeDuration === 0
    ) {
      finish();
      return undefined;
    }

    let startedAt: number | null = null;

    const handleVisibilityChange = () => {
      if (document.visibilityState !== "visible") {
        finish();
      }
    };

    const handleMotionChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        finish();
      }
    };

    const tick = (timestamp: number) => {
      if (startedAt === null) {
        startedAt = timestamp;
      }

      const elapsed = timestamp - startedAt;
      const progress = Math.min(elapsed / safeDuration, 1);
      const nextValue = target * easeOutCubic(progress);

      setDisplayValue(normalizeFrameValue(nextValue, target));

      if (progress < 1) {
        frameRef.current = window.requestAnimationFrame(tick);
      } else {
        frameRef.current = null;
        setDisplayValue(target);
      }
    };

    setDisplayValue(0);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    mediaQuery.addEventListener("change", handleMotionChange);
    frameRef.current = window.requestAnimationFrame(tick);

    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }

      document.removeEventListener("visibilitychange", handleVisibilityChange);
      mediaQuery.removeEventListener("change", handleMotionChange);
    };
  }, [safeDuration, target]);

  return (
    <span
      className="inline-block tabular-nums"
      style={{ minWidth: `${Math.max(finalText.length, 1)}ch` }}
    >
      {formatValue(displayValue)}
    </span>
  );
}

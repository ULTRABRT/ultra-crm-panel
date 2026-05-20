import type {
  ChannelSignal,
  SignalEngineParams,
} from "../../types/dna/ChannelSignal";

const MAX_THROUGHPUT = 100;

function clamp(value: number, min: number, max: number): number {
  if (!Number.isFinite(value)) return min;
  return Math.min(max, Math.max(min, value));
}

export function normalizeThroughput(throughput: number): number {
  return clamp(throughput / MAX_THROUGHPUT, 0, 1);
}

export function getSignalWeight(signal: ChannelSignal): number {
  const throughputWeight = normalizeThroughput(signal.throughput);
  const healthWeight = clamp(signal.healthScore / 100, 0, 1);
  const pendingWeight = clamp(signal.pendingCount / 20, 0, 1);
  const statusWeight =
    signal.status === "connected"
      ? 1
      : signal.status === "idle"
        ? 0.58
        : signal.status === "error"
          ? 0.36
          : 0.18;

  return clamp(
    throughputWeight * 0.42 +
      healthWeight * 0.28 +
      pendingWeight * 0.18 +
      statusWeight * 0.12,
    0,
    1,
  );
}

export function calculateSignalParams(
  signal: ChannelSignal,
): SignalEngineParams {
  const weight = getSignalWeight(signal);
  const trendLift =
    signal.trend === "up" ? 0.08 : signal.trend === "down" ? -0.06 : 0;
  const intensity = clamp(weight + trendLift, 0.12, 1);
  const urgency = clamp(signal.pendingCount / 16, 0, 1);

  return {
    intensity,
    pulseDurationMs: Math.round(1800 - intensity * 650),
    flowDelayMs: Math.round(760 - urgency * 360),
    opacity: clamp(0.24 + intensity * 0.58, 0.24, 0.82),
    scale: clamp(0.92 + intensity * 0.18, 0.92, 1.1),
  };
}

import type { CSSProperties } from "react";
import type {
  ChannelId,
  ChannelSignal,
  SignalEngineParams,
} from "../../types/dna/ChannelSignal";

type SignalFlowProps = {
  id: ChannelId;
  path: string;
  signal: ChannelSignal;
  params: SignalEngineParams;
  motionEnabled: boolean;
};

type SignalFlowStyle = CSSProperties & {
  "--arqon-flow-duration"?: string;
  "--arqon-flow-delay"?: string;
  "--arqon-flow-opacity"?: number;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function getLineOpacity(
  status: ChannelSignal["status"],
  params: SignalEngineParams,
) {
  if (status === "connected") {
    return clamp(0.18 + params.intensity * 0.22, 0.2, 0.4);
  }

  if (status === "error") {
    return 0.16;
  }

  if (status === "disconnected") {
    return 0.055;
  }

  return 0.11;
}

export function SignalFlow({
  id,
  path,
  signal,
  params,
  motionEnabled,
}: SignalFlowProps) {
  const flowActive = motionEnabled && signal.status === "connected";
  const duration = Math.round(
    clamp(params.pulseDurationMs + 2300 - signal.throughput * 6, 2600, 4200),
  );
  const delay = -Math.round(params.flowDelayMs + canonicalDelayOffset(id));
  const flowStyle: SignalFlowStyle = {
    "--arqon-flow-duration": `${duration}ms`,
    "--arqon-flow-delay": `${delay}ms`,
    "--arqon-flow-opacity": clamp(params.opacity, 0.28, 0.72),
  };

  return (
    <g className="arqon-signal-flow">
      <path
        id={`arqon-signal-path-${id}`}
        className="arqon-signal-path"
        d={path}
        fill="none"
        stroke="rgba(255,255,255,0.72)"
        strokeLinecap="round"
        strokeWidth="1.1"
        opacity={getLineOpacity(signal.status, params)}
        pathLength={100}
      />

      {flowActive ? (
        <path
          className="arqon-signal-glint"
          d={path}
          fill="none"
          stroke="white"
          strokeLinecap="round"
          strokeWidth="2.15"
          pathLength={100}
          style={flowStyle}
        />
      ) : null}
    </g>
  );
}

function canonicalDelayOffset(id: ChannelId) {
  const offsets: Record<ChannelId, number> = {
    whatsapp: 120,
    instagram: 460,
    messenger: 810,
    telegram: 1180,
    tiktok: 1540,
    sms: 1880,
    webchat: 2240,
    form: 2600,
  };

  return offsets[id];
}

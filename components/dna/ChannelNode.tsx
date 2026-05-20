import type { ChannelSignal, SignalEngineParams } from "../../types/dna/ChannelSignal";

type TextAnchor = "start" | "middle" | "end";
type VisualStatus = "connected" | "idle" | "error" | "disconnected";

type ChannelNodeProps = {
  signal: ChannelSignal;
  params: SignalEngineParams;
  x: number;
  y: number;
  labelX: number;
  labelY: number;
  textAnchor?: TextAnchor;
};

const statusTone: Record<
  VisualStatus,
  { outer: string; inner: string; stroke: string; text: string }
> = {
  connected: {
    outer: "rgba(255,255,255,0.16)",
    inner: "rgba(255,255,255,0.9)",
    stroke: "rgba(255,255,255,0.4)",
    text: "rgba(255,255,255,0.68)",
  },
  idle: {
    outer: "rgba(255,255,255,0.055)",
    inner: "rgba(255,255,255,0.42)",
    stroke: "rgba(255,255,255,0.16)",
    text: "rgba(255,255,255,0.44)",
  },
  error: {
    outer: "rgba(255,255,255,0.075)",
    inner: "rgba(226,220,210,0.62)",
    stroke: "rgba(226,220,210,0.26)",
    text: "rgba(255,255,255,0.5)",
  },
  disconnected: {
    outer: "rgba(255,255,255,0.025)",
    inner: "rgba(255,255,255,0.22)",
    stroke: "rgba(255,255,255,0.08)",
    text: "rgba(255,255,255,0.28)",
  },
};

export function ChannelNode({
  signal,
  params,
  x,
  y,
  labelX,
  labelY,
  textAnchor = "start",
}: ChannelNodeProps) {
  const tone = statusTone[signal.status];
  const nodeScale = signal.status === "connected" ? params.scale : 0.96;

  return (
    <g className="arqon-channel-node" aria-label={`${signal.label} kanal sinyali`}>
      <circle
        cx={x}
        cy={y}
        r={7 * nodeScale}
        fill={tone.outer}
        stroke={tone.stroke}
        strokeWidth="1"
      />
      <circle cx={x} cy={y} r={2.1 * nodeScale} fill={tone.inner} />
      <text
        x={labelX}
        y={labelY}
        textAnchor={textAnchor}
        fill={tone.text}
        className="arqon-signal-label text-[12.5px] font-semibold tracking-[0.07em]"
      >
        {signal.label}
      </text>
      <text
        x={labelX}
        y={labelY + 17}
        textAnchor={textAnchor}
        fill="rgba(255,255,255,0.34)"
        className="arqon-signal-label text-[9px] font-semibold uppercase tracking-[0.12em]"
      >
        {signal.status.toUpperCase()} / {signal.throughput}
      </text>
    </g>
  );
}

"use client";

import { useEffect, useMemo, useState } from "react";
import { ArqonEmblem } from "../brand/ArqonEmblem";
import { useChannelSignals } from "../../hooks/useChannelSignals";
import type {
  ChannelId,
  ChannelSignal,
  SignalEngineParams,
} from "../../types/dna/ChannelSignal";
import { ChannelNode } from "./ChannelNode";
import { SignalFlow } from "./SignalFlow";

type TextAnchor = "start" | "middle" | "end";

type ChannelGeometry = {
  path: string;
  nodeX: number;
  nodeY: number;
  labelX: number;
  labelY: number;
  textAnchor?: TextAnchor;
};

const coreX = 360;
const coreY = 230;

const canonicalChannelOrder: ChannelId[] = [
  "whatsapp",
  "instagram",
  "messenger",
  "telegram",
  "tiktok",
  "sms",
  "webchat",
  "form",
];

const channelGeometry: Record<ChannelId, ChannelGeometry> = {
  whatsapp: {
    path: "M88 108 C150 102 198 136 248 174 C288 204 322 224 360 230",
    nodeX: 88,
    nodeY: 108,
    labelX: 72,
    labelY: 82,
  },
  instagram: {
    path: "M172 42 C214 86 244 128 280 164 C308 190 334 212 360 230",
    nodeX: 172,
    nodeY: 42,
    labelX: 142,
    labelY: 30,
  },
  messenger: {
    path: "M548 48 C510 88 480 126 444 160 C414 190 386 214 360 230",
    nodeX: 548,
    nodeY: 48,
    labelX: 580,
    labelY: 34,
    textAnchor: "end",
  },
  telegram: {
    path: "M672 178 C606 178 540 190 486 204 C434 218 396 226 360 230",
    nodeX: 672,
    nodeY: 178,
    labelX: 652,
    labelY: 158,
    textAnchor: "end",
  },
  tiktok: {
    path: "M618 358 C556 336 506 306 462 280 C420 256 390 238 360 230",
    nodeX: 618,
    nodeY: 358,
    labelX: 646,
    labelY: 382,
    textAnchor: "end",
  },
  sms: {
    path: "M418 420 C404 362 390 318 378 284 C368 258 363 240 360 230",
    nodeX: 418,
    nodeY: 420,
    labelX: 418,
    labelY: 442,
    textAnchor: "middle",
  },
  webchat: {
    path: "M260 418 C278 362 298 318 318 284 C336 256 350 238 360 230",
    nodeX: 260,
    nodeY: 418,
    labelX: 260,
    labelY: 442,
    textAnchor: "middle",
  },
  form: {
    path: "M82 330 C148 324 204 304 252 282 C298 260 330 244 360 230",
    nodeX: 82,
    nodeY: 330,
    labelX: 72,
    labelY: 356,
  },
};

const fallbackParams: SignalEngineParams = {
  intensity: 0.2,
  pulseDurationMs: 1700,
  flowDelayMs: 640,
  opacity: 0.32,
  scale: 0.96,
};

function createFallbackSignal(id: ChannelId): ChannelSignal {
  return {
    id,
    label: id === "sms" ? "SMS" : id.charAt(0).toUpperCase() + id.slice(1),
    status: "idle",
    throughput: 0,
    pendingCount: 0,
    responseTimeMinutes: 0,
    healthScore: 0,
    trend: "flat",
    lastSignalAt: "",
    description: "Kanal sinyali bekleniyor.",
  };
}

function useSignalMotionEnabled() {
  const [motionEnabled, setMotionEnabled] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const syncMotionState = () => {
      setMotionEnabled(
        !mediaQuery.matches && document.visibilityState === "visible",
      );
    };

    syncMotionState();
    document.addEventListener("visibilitychange", syncMotionState);
    mediaQuery.addEventListener("change", syncMotionState);

    return () => {
      document.removeEventListener("visibilitychange", syncMotionState);
      mediaQuery.removeEventListener("change", syncMotionState);
    };
  }, []);

  return motionEnabled;
}

export function SignalCore() {
  const { signals, getSignalParams } = useChannelSignals();
  const motionEnabled = useSignalMotionEnabled();

  const signalMap = useMemo(
    () => new Map(signals.map((signal) => [signal.id, signal])),
    [signals],
  );

  const orderedSignals = canonicalChannelOrder.map((id) => ({
    signal: signalMap.get(id) ?? createFallbackSignal(id),
    geometry: channelGeometry[id],
    params: getSignalParams(id) ?? fallbackParams,
  }));

  const activeCount = orderedSignals.filter(
    ({ signal }) => signal.status === "connected",
  ).length;

  return (
    <figure
      aria-label="Arqon Sector DNA signal core visualization"
      className="arqon-signal-shell relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0B0D10] p-5 shadow-2xl shadow-black/35"
    >
      <div className="pointer-events-none absolute inset-0 arqon-signal-grid" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_34%),radial-gradient(circle_at_20%_15%,rgba(255,255,255,0.04),transparent_26%),radial-gradient(circle_at_80%_85%,rgba(255,255,255,0.035),transparent_30%)]" />

      <div className="relative">
        <div className="mb-4 flex items-center justify-between gap-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/36">
          <span>Signal Core</span>
          <span>{activeCount}/8 aktif</span>
        </div>

        <svg
          className="block h-auto w-full"
          viewBox="0 0 720 460"
          role="img"
          aria-labelledby="signal-core-title signal-core-desc"
        >
          <title id="signal-core-title">
            Arqon Sektorel DNA sinyal cekirdegi
          </title>
          <desc id="signal-core-desc">
            Sekiz canonical kanal sinyali sabit hatlar uzerinden merkezdeki
            Arqon cekirdegine akar.
          </desc>

          <defs>
            <filter id="arqon-soft-glow" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <g opacity="0.18">
            <circle cx={coreX} cy={coreY} r="178" fill="none" stroke="white" strokeWidth="1" />
            <circle cx={coreX} cy={coreY} r="112" fill="none" stroke="white" strokeWidth="1" />
            <circle cx={coreX} cy={coreY} r="54" fill="none" stroke="white" strokeWidth="1" />
          </g>

          <g>
            {orderedSignals.map(({ signal, geometry, params }) => (
              <SignalFlow
                key={signal.id}
                id={signal.id}
                path={geometry.path}
                signal={signal}
                params={params}
                motionEnabled={motionEnabled}
              />
            ))}
          </g>

          <g>
            {orderedSignals.map(({ signal, geometry, params }) => (
              <ChannelNode
                key={signal.id}
                signal={signal}
                params={params}
                x={geometry.nodeX}
                y={geometry.nodeY}
                labelX={geometry.labelX}
                labelY={geometry.labelY}
                textAnchor={geometry.textAnchor}
              />
            ))}
          </g>

          <g transform="translate(312 182)">
            <g className="arqon-signal-core">
              <ArqonEmblem
                className="h-24 w-24 opacity-95 drop-shadow-[0_0_22px_rgba(255,255,255,0.13)]"
                decorative
                size={96}
              />
            </g>
          </g>

          <g className="text-center">
            <text
              fill="rgba(255,255,255,0.28)"
              x={coreX}
              y="350"
              textAnchor="middle"
              className="arqon-signal-label text-[10px] font-semibold tracking-[0.18em]"
            >
              SIGNAL CORE
            </text>
            <text
              fill="rgba(255,255,255,0.24)"
              x={coreX}
              y="376"
              textAnchor="middle"
              className="arqon-signal-label text-[10px] font-medium uppercase tracking-[0.16em]"
            >
              Sector DNA
            </text>
          </g>
        </svg>
      </div>
    </figure>
  );
}

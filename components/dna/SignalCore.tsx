import type { CSSProperties } from "react";

type SignalChannel = {
  id: string;
  label: string;
  path: string;
  startX: number;
  startY: number;
  labelX: number;
  labelY: number;
  textAnchor?: "start" | "middle" | "end";
  delay: string;
};

type SignalStyle = CSSProperties & {
  "--signal-delay": string;
  "--signal-x": string;
  "--signal-y": string;
};

type FlowStyle = CSSProperties & {
  "--signal-delay": string;
};

const coreX = 360;
const coreY = 230;

const channels: SignalChannel[] = [
  {
    id: "whatsapp",
    label: "WhatsApp",
    path: "M86 92 C150 92 198 142 248 178 C288 207 318 222 360 230",
    startX: 86,
    startY: 92,
    labelX: 70,
    labelY: 68,
    delay: "0s",
  },
  {
    id: "instagram",
    label: "Instagram",
    path: "M170 34 C214 82 238 130 276 162 C304 186 326 204 360 230",
    startX: 170,
    startY: 34,
    labelX: 144,
    labelY: 28,
    delay: "-0.55s",
  },
  {
    id: "mail",
    label: "Mail",
    path: "M640 86 C574 96 524 132 476 166 C428 200 396 216 360 230",
    startX: 640,
    startY: 86,
    labelX: 650,
    labelY: 65,
    textAnchor: "end",
    delay: "-1.1s",
  },
  {
    id: "phone",
    label: "Telefon",
    path: "M680 226 C598 226 540 222 488 224 C438 226 402 228 360 230",
    startX: 680,
    startY: 226,
    labelX: 650,
    labelY: 216,
    textAnchor: "end",
    delay: "-1.65s",
  },
  {
    id: "form",
    label: "Form",
    path: "M602 378 C548 350 506 318 464 288 C420 258 390 240 360 230",
    startX: 602,
    startY: 378,
    labelX: 634,
    labelY: 398,
    textAnchor: "end",
    delay: "-2.2s",
  },
  {
    id: "web-chat",
    label: "Web Chat",
    path: "M316 420 C320 360 328 318 338 286 C346 260 352 244 360 230",
    startX: 316,
    startY: 420,
    labelX: 316,
    labelY: 438,
    textAnchor: "middle",
    delay: "-2.75s",
  },
  {
    id: "referral",
    label: "Referans",
    path: "M74 334 C146 326 202 306 250 284 C296 263 328 244 360 230",
    startX: 74,
    startY: 334,
    labelX: 70,
    labelY: 356,
    delay: "-3.3s",
  },
];

function getSignalStyle(channel: SignalChannel): SignalStyle {
  return {
    "--signal-delay": channel.delay,
    "--signal-x": `${coreX - channel.startX}px`,
    "--signal-y": `${coreY - channel.startY}px`,
  };
}

function getFlowStyle(channel: SignalChannel): FlowStyle {
  return {
    "--signal-delay": channel.delay,
  };
}

export function SignalCore() {
  return (
    <figure
      aria-label="Arqon Sector DNA signal core visualization"
      className="arqon-signal-shell relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0B0D10] p-5 shadow-2xl shadow-black/35"
    >
      <div className="pointer-events-none absolute inset-0 arqon-signal-grid" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.09),transparent_34%),radial-gradient(circle_at_20%_15%,rgba(255,255,255,0.045),transparent_26%),radial-gradient(circle_at_80%_85%,rgba(255,255,255,0.04),transparent_30%)]" />

      <div className="relative">
        <div className="mb-4 flex items-center justify-between gap-4 text-[11px] font-semibold uppercase tracking-[0.32em] text-white/36">
          <span>Signal Core</span>
          <span>7 kanal</span>
        </div>

        <svg
          className="block h-auto w-full"
          viewBox="0 0 720 460"
          role="img"
          aria-labelledby="signal-core-title signal-core-desc"
        >
          <title id="signal-core-title">Arqon Sektörel DNA sinyal çekirdeği</title>
          <desc id="signal-core-desc">
            Çevresel kanal sinyalleri merkezdeki altıgen DNA çekirdeğine akar.
          </desc>

          <defs>
            <filter id="arqon-soft-glow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="7" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <g opacity="0.34">
            <circle cx={coreX} cy={coreY} r="178" fill="none" stroke="white" strokeWidth="1" strokeDasharray="2 18" />
            <circle cx={coreX} cy={coreY} r="112" fill="none" stroke="white" strokeWidth="1" strokeDasharray="1 14" />
          </g>

          {channels.map((channel) => (
            <g key={channel.id}>
              <path
                className="arqon-signal-path"
                d={channel.path}
                fill="none"
                stroke="rgba(255,255,255,0.38)"
                strokeLinecap="round"
                strokeWidth="1.3"
                style={getFlowStyle(channel)}
              />
              <circle
                className="arqon-signal-dot"
                cx={channel.startX}
                cy={channel.startY}
                r="3.5"
                fill="white"
                filter="url(#arqon-soft-glow)"
                style={getSignalStyle(channel)}
              />
              <circle
                cx={channel.startX}
                cy={channel.startY}
                r="5"
                fill="none"
                stroke="rgba(255,255,255,0.22)"
                strokeWidth="1"
              />
              <text
                x={channel.labelX}
                y={channel.labelY}
                textAnchor={channel.textAnchor ?? "start"}
                className="fill-white/45 text-[13px] font-medium tracking-[0.14em]"
              >
                {channel.label}
              </text>
            </g>
          ))}

          <g className="arqon-signal-core">
            <polygon
              points="360,142 438,186 438,274 360,318 282,274 282,186"
              fill="rgba(255,255,255,0.055)"
              stroke="rgba(255,255,255,0.62)"
              strokeWidth="1.4"
            />
            <polygon
              points="360,174 410,202 410,258 360,286 310,258 310,202"
              fill="rgba(0,0,0,0.58)"
              stroke="rgba(255,255,255,0.28)"
              strokeWidth="1"
            />
            <path
              d="M330 230 H350 L360 208 L370 252 L382 230 H394"
              fill="none"
              stroke="rgba(255,255,255,0.76)"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
            <circle cx={coreX} cy={coreY} r="4" fill="white" />
          </g>

          <g className="fill-white text-center">
            <text
              x={coreX}
              y="350"
              textAnchor="middle"
              className="text-[18px] font-semibold tracking-[0.36em]"
            >
              ARQON
            </text>
            <text
              x={coreX}
              y="376"
              textAnchor="middle"
              className="fill-white/40 text-[11px] font-medium uppercase tracking-[0.28em]"
            >
              Sector DNA
            </text>
          </g>
        </svg>
      </div>
    </figure>
  );
}

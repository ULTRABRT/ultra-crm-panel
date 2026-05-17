import { ArqonEmblem } from "../brand/ArqonEmblem";

type SignalChannel = {
  id: string;
  label: string;
  path: string;
  nodeX: number;
  nodeY: number;
  labelX: number;
  labelY: number;
  textAnchor?: "start" | "middle" | "end";
  duration: string;
  begin: string;
  secondaryBegin: string;
};

const coreX = 360;
const coreY = 230;

const channels: SignalChannel[] = [
  {
    id: "whatsapp",
    label: "WhatsApp",
    path: "M88 104 C156 104 198 140 246 174 C286 202 320 222 360 230",
    nodeX: 88,
    nodeY: 104,
    labelX: 72,
    labelY: 78,
    duration: "6.8s",
    begin: "-0.9s",
    secondaryBegin: "-4.2s",
  },
  {
    id: "instagram",
    label: "Instagram",
    path: "M174 42 C214 86 242 128 278 162 C306 188 332 210 360 230",
    nodeX: 174,
    nodeY: 42,
    labelX: 144,
    labelY: 30,
    duration: "7.7s",
    begin: "-2.4s",
    secondaryBegin: "-5.9s",
  },
  {
    id: "mail",
    label: "Mail",
    path: "M636 94 C570 102 520 134 474 166 C426 200 394 218 360 230",
    nodeX: 636,
    nodeY: 94,
    labelX: 652,
    labelY: 76,
    textAnchor: "end",
    duration: "7.2s",
    begin: "-1.8s",
    secondaryBegin: "-5.1s",
  },
  {
    id: "phone",
    label: "Telefon",
    path: "M674 226 C598 226 538 226 486 225 C438 224 398 227 360 230",
    nodeX: 674,
    nodeY: 226,
    labelX: 652,
    labelY: 214,
    textAnchor: "end",
    duration: "6.4s",
    begin: "-3.1s",
    secondaryBegin: "-5.8s",
  },
  {
    id: "form",
    label: "Form",
    path: "M604 372 C548 346 504 316 462 288 C420 260 390 240 360 230",
    nodeX: 604,
    nodeY: 372,
    labelX: 636,
    labelY: 392,
    textAnchor: "end",
    duration: "8.1s",
    begin: "-2.8s",
    secondaryBegin: "-6.6s",
  },
  {
    id: "web-chat",
    label: "Web Chat",
    path: "M318 418 C322 360 330 318 340 286 C348 260 354 244 360 230",
    nodeX: 318,
    nodeY: 418,
    labelX: 318,
    labelY: 438,
    textAnchor: "middle",
    duration: "7.4s",
    begin: "-1.2s",
    secondaryBegin: "-4.7s",
  },
  {
    id: "referral",
    label: "Referans",
    path: "M82 334 C150 326 204 306 252 284 C298 262 330 244 360 230",
    nodeX: 82,
    nodeY: 334,
    labelX: 72,
    labelY: 358,
    duration: "6.9s",
    begin: "-3.7s",
    secondaryBegin: "-6.3s",
  },
];

function SignalPulse({
  channel,
  begin,
  radius,
  glowRadius,
  opacity,
}: {
  channel: SignalChannel;
  begin: string;
  radius: number;
  glowRadius: number;
  opacity: string;
}) {
  return (
    <g className="arqon-signal-flow" opacity="0">
      <circle r={glowRadius} fill="white" opacity="0.12" filter="url(#arqon-soft-glow)" />
      <circle r={radius} fill="white" opacity={opacity} />
      <animateMotion
        dur={channel.duration}
        begin={begin}
        repeatCount="indefinite"
        rotate="auto"
      >
        <mpath href={`#arqon-signal-path-${channel.id}`} />
      </animateMotion>
      <animate
        attributeName="opacity"
        values="0;0.88;0.72;0"
        keyTimes="0;0.18;0.82;1"
        dur={channel.duration}
        begin={begin}
        repeatCount="indefinite"
      />
    </g>
  );
}

export function SignalCore() {
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
            Kanal sinyalleri sabit hatlar üzerinden merkezdeki Arqon çekirdeğine akar.
          </desc>

          <defs>
            <filter id="arqon-soft-glow" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <g opacity="0.2">
            <circle cx={coreX} cy={coreY} r="178" fill="none" stroke="white" strokeWidth="1" />
            <circle cx={coreX} cy={coreY} r="112" fill="none" stroke="white" strokeWidth="1" />
          </g>

          <g>
            {channels.map((channel) => (
              <path
                key={channel.id}
                id={`arqon-signal-path-${channel.id}`}
                className="arqon-signal-path"
                d={channel.path}
                fill="none"
                stroke="rgba(255,255,255,0.28)"
                strokeLinecap="round"
                strokeWidth="1.15"
              />
            ))}
          </g>

          <g>
            {channels.map((channel) => (
              <g key={channel.id}>
                <circle
                  cx={channel.nodeX}
                  cy={channel.nodeY}
                  r="5"
                  fill="rgba(255,255,255,0.08)"
                  stroke="rgba(255,255,255,0.22)"
                  strokeWidth="1"
                />
                <circle cx={channel.nodeX} cy={channel.nodeY} r="1.7" fill="rgba(255,255,255,0.74)" />
                <text
                  x={channel.labelX}
                  y={channel.labelY}
                  textAnchor={channel.textAnchor ?? "start"}
                  className="arqon-signal-label fill-white/43 text-[13px] font-medium tracking-[0.08em]"
                >
                  {channel.label}
                </text>
              </g>
            ))}
          </g>

          <g>
            {channels.map((channel) => (
              <SignalPulse
                key={`${channel.id}-primary`}
                channel={channel}
                begin={channel.begin}
                radius={2.4}
                glowRadius={8}
                opacity="0.88"
              />
            ))}
            {channels.map((channel) => (
              <SignalPulse
                key={`${channel.id}-secondary`}
                channel={channel}
                begin={channel.secondaryBegin}
                radius={1.6}
                glowRadius={5.5}
                opacity="0.58"
              />
            ))}
          </g>

          <g transform="translate(312 182)">
            <g className="arqon-signal-core">
              <ArqonEmblem
                className="h-24 w-24 opacity-95 drop-shadow-[0_0_24px_rgba(255,255,255,0.14)]"
                decorative
                size={96}
              />
            </g>
          </g>

          <g className="fill-white text-center">
            <text
              x={coreX}
              y="350"
              textAnchor="middle"
              className="arqon-signal-brand text-[13px] font-bold tracking-[0.24em]"
            >
              SIGNAL CORE
            </text>
            <text
              x={coreX}
              y="376"
              textAnchor="middle"
              className="arqon-signal-label fill-white/40 text-[11px] font-medium uppercase tracking-[0.2em]"
            >
              Sector DNA
            </text>
          </g>
        </svg>
      </div>
    </figure>
  );
}

import type { CSSProperties } from "react";

/**
 * Arqon — Boot Screen (Master)
 *
 * BootGate uyumlu: reducedMotion / isExiting / onSkip prop'lari korunur.
 * Mekanizmaya (sessionStorage, layout entegrasyonu) DOKUNULMAZ.
 *
 * Kompozisyon — 3 perde:
 *   Perde 1 (0.0-1.0s)  : Derin siyah, grid + vignette + atmosferik glow belirir.
 *   Perde 2 (1.0-2.6s)  : Arqon cekirdegi cizilir, sinyal hatlari cekirdege akar.
 *   Perde 3 (2.6-4.0s)  : Wordmark + tagline + yukleme cizgisi.
 *
 * Tum animasyon: yalniz transform / opacity / stroke-dashoffset (GPU-ucuz).
 * reducedMotion=true ise tum animasyonlar kapanir, son kare statik gosterilir.
 */

type BootScreenProps = {
  reducedMotion: boolean;
  isExiting: boolean;
  onSkip: () => void;
};

const WORDMARK = "ARQON".split("");
const SIGNAL_TEXT = "Operasyon merkezi hazirlaniyor";

/** SVG path "kalemle ciziliyor" efekti — gecikmeli stroke reveal */
const drawStyle = (
  delay: number,
  duration: number,
  reducedMotion: boolean,
): CSSProperties => ({
  strokeDasharray: 100,
  strokeDashoffset: reducedMotion ? 0 : 100,
  animation: reducedMotion
    ? "none"
    : `arqon-draw ${duration}s cubic-bezier(0.22,1,0.36,1) ${delay}s forwards`,
});

/** Sinyal hatti boyunca akan isik noktasi */
const signalFlowStyle = (
  delay: number,
  reducedMotion: boolean,
): CSSProperties => ({
  animation: reducedMotion
    ? "none"
    : `arqon-signal-flow 2.8s linear ${delay}s infinite`,
  opacity: reducedMotion ? 0 : undefined,
});

export function BootScreen({
  reducedMotion,
  isExiting,
  onSkip,
}: BootScreenProps) {
  return (
    <div
      className={`fixed inset-0 z-[100] overflow-hidden bg-[#0B0D10] transition-[transform,opacity] duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isExiting ? "translate-y-6 opacity-0" : "translate-y-0 opacity-100"
      }`}
    >
      {/* ---- KATMAN 1: Atmosfer ---- */}
      <div className="arqon-boot-grid absolute inset-0" />
      <div className="arqon-boot-glow absolute inset-0" />
      <div className="arqon-boot-vignette absolute inset-0" />
      <div className="arqon-boot-scanline absolute inset-0" />

      {/* ---- KATMAN 2: Icerik ---- */}
      <div className="relative z-10 flex min-h-full items-center justify-center px-6 py-10">
        <div className="mx-auto flex w-full max-w-2xl flex-col items-center text-center">
          {/* ---- Arqon Cekirdegi ---- */}
          <div className="relative mb-14 flex h-[260px] w-[260px] items-center justify-center">
            {/* Dis halka — yavas donen yorunge */}
            <div
              className={`absolute inset-0 ${
                reducedMotion ? "" : "arqon-orbit"
              }`}
            >
              <svg
                aria-hidden="true"
                className="h-full w-full"
                viewBox="0 0 260 260"
                fill="none"
              >
                <circle
                  cx="130"
                  cy="130"
                  r="118"
                  stroke="rgba(255,255,255,0.06)"
                  strokeWidth="1"
                  strokeDasharray="2 10"
                />
                {/* Yorunge uzerinde 3 dugum */}
                <circle cx="130" cy="12" r="2.5" fill="rgba(255,255,255,0.35)" />
                <circle cx="232" cy="189" r="2" fill="rgba(255,255,255,0.22)" />
                <circle cx="28" cy="189" r="2" fill="rgba(255,255,255,0.22)" />
              </svg>
            </div>

            {/* Cekirdek + sinyal hatlari */}
            <div
              className={`absolute inset-0 flex items-center justify-center ${
                reducedMotion ? "" : "arqon-core-breathe"
              }`}
            >
              <svg
                aria-hidden="true"
                className="h-[200px] w-[200px]"
                viewBox="0 0 200 200"
                fill="none"
              >
                {/* --- Disaridan cekirdege uzanan sinyal hatlari --- */}
                <g>
                  <path
                    d="M100 6V44"
                    pathLength={100}
                    stroke="rgba(255,255,255,0.18)"
                    strokeWidth="1.5"
                    style={drawStyle(1.0, 0.5, reducedMotion)}
                  />
                  <path
                    d="M194 100H156"
                    pathLength={100}
                    stroke="rgba(255,255,255,0.18)"
                    strokeWidth="1.5"
                    style={drawStyle(1.12, 0.5, reducedMotion)}
                  />
                  <path
                    d="M100 194V156"
                    pathLength={100}
                    stroke="rgba(255,255,255,0.18)"
                    strokeWidth="1.5"
                    style={drawStyle(1.24, 0.5, reducedMotion)}
                  />
                  <path
                    d="M6 100H44"
                    pathLength={100}
                    stroke="rgba(255,255,255,0.18)"
                    strokeWidth="1.5"
                    style={drawStyle(1.36, 0.5, reducedMotion)}
                  />
                  {/* Capraz ince hatlar */}
                  <path
                    d="M40 40L66 66"
                    pathLength={100}
                    stroke="rgba(255,255,255,0.10)"
                    strokeWidth="1.5"
                    style={drawStyle(1.2, 0.5, reducedMotion)}
                  />
                  <path
                    d="M160 40L134 66"
                    pathLength={100}
                    stroke="rgba(255,255,255,0.10)"
                    strokeWidth="1.5"
                    style={drawStyle(1.32, 0.5, reducedMotion)}
                  />
                  <path
                    d="M160 160L134 134"
                    pathLength={100}
                    stroke="rgba(255,255,255,0.10)"
                    strokeWidth="1.5"
                    style={drawStyle(1.44, 0.5, reducedMotion)}
                  />
                  <path
                    d="M40 160L66 134"
                    pathLength={100}
                    stroke="rgba(255,255,255,0.10)"
                    strokeWidth="1.5"
                    style={drawStyle(1.56, 0.5, reducedMotion)}
                  />
                </g>

                {/* --- Hatlar boyunca akan isik noktalari --- */}
                <g>
                  <circle r="2.4" fill="rgba(255,255,255,0.95)">
                    <animateMotion
                      dur="2.8s"
                      begin={reducedMotion ? "indefinite" : "2.4s"}
                      repeatCount="indefinite"
                      path="M100 6V44"
                      keyPoints="0;1"
                      keyTimes="0;1"
                    />
                  </circle>
                  <circle r="2.4" fill="rgba(255,255,255,0.95)">
                    <animateMotion
                      dur="2.8s"
                      begin={reducedMotion ? "indefinite" : "3.0s"}
                      repeatCount="indefinite"
                      path="M194 100H156"
                    />
                  </circle>
                  <circle r="2.4" fill="rgba(255,255,255,0.95)">
                    <animateMotion
                      dur="2.8s"
                      begin={reducedMotion ? "indefinite" : "3.6s"}
                      repeatCount="indefinite"
                      path="M100 194V156"
                    />
                  </circle>
                  <circle r="2.4" fill="rgba(255,255,255,0.95)">
                    <animateMotion
                      dur="2.8s"
                      begin={reducedMotion ? "indefinite" : "4.2s"}
                      repeatCount="indefinite"
                      path="M6 100H44"
                    />
                  </circle>
                </g>

                {/* --- Altigen cekirdek (dis hat) --- */}
                <path
                  d="M100 40L152 70V130L100 160L48 130V70L100 40Z"
                  pathLength={100}
                  stroke="rgba(255,255,255,0.85)"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                  style={drawStyle(0.55, 0.85, reducedMotion)}
                />

                {/* --- Altigen ic hat (derinlik) --- */}
                <path
                  d="M100 58L136 79V121L100 142L64 121V79L100 58Z"
                  pathLength={100}
                  stroke="rgba(255,255,255,0.22)"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                  style={drawStyle(0.75, 0.7, reducedMotion)}
                />

                {/* --- Ic devre: yukari ok (markanin DNA'si) --- */}
                <path
                  d="M100 128V86"
                  pathLength={100}
                  stroke="rgba(255,255,255,0.95)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  style={drawStyle(1.0, 0.45, reducedMotion)}
                />
                <path
                  d="M88 98L100 84L112 98"
                  pathLength={100}
                  stroke="rgba(255,255,255,0.95)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={drawStyle(1.18, 0.4, reducedMotion)}
                />
                {/* Devre dugum noktalari */}
                <circle
                  cx="100"
                  cy="128"
                  r="3.5"
                  fill="rgba(255,255,255,0.95)"
                  className={reducedMotion ? "" : "arqon-node-pulse"}
                />
                <circle
                  cx="100"
                  cy="100"
                  r="2.5"
                  fill="rgba(255,255,255,0.55)"
                />

                {/* --- Cekirdek merkez parlaklik --- */}
                <circle
                  cx="100"
                  cy="100"
                  r="30"
                  fill="rgba(255,255,255,0.04)"
                  className={reducedMotion ? "" : "arqon-core-glow"}
                />
              </svg>
            </div>
          </div>

          {/* ---- Wordmark ---- */}
          <div className="mb-5 flex items-center justify-center">
            {WORDMARK.map((letter, index) => (
              <span
                key={`${letter}-${index}`}
                className={`arqon-letter inline-block text-[clamp(2.6rem,5vw,4.25rem)] font-semibold tracking-[0.52em] text-white ${
                  reducedMotion ? "arqon-letter--static" : ""
                }`}
                style={{
                  animationDelay: `${2.6 + index * 0.09}s`,
                  fontFamily: "var(--font-geist-sans), sans-serif",
                  paddingLeft: index === 0 ? "0.52em" : undefined,
                }}
              >
                {letter}
              </span>
            ))}
          </div>

          {/* ---- Tagline ---- */}
          <p
            className={`arqon-tagline mb-12 text-[0.78rem] uppercase tracking-[0.42em] text-white/45 ${
              reducedMotion ? "arqon-tagline--static" : ""
            }`}
            style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
          >
            Intelligence, Sharpened.
          </p>

          {/* ---- Yukleme cizgisi ---- */}
          <div
            className={`arqon-loader w-full max-w-md ${
              reducedMotion ? "arqon-loader--static" : ""
            }`}
          >
            <div className="mb-3 flex items-center justify-between gap-6 text-[0.62rem] uppercase tracking-[0.3em] text-white/35">
              <span>{SIGNAL_TEXT}</span>
              <span className="arqon-loader-status">Session Boot</span>
            </div>
            <div className="relative h-px w-full overflow-hidden bg-white/10">
              <div
                className={`arqon-loader-bar h-full bg-gradient-to-r from-white/20 via-white/80 to-white/20 ${
                  reducedMotion ? "arqon-loader-bar--static" : ""
                }`}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ---- KATMAN 3: Atla ---- */}
      <button
        type="button"
        onClick={onSkip}
        className="absolute right-6 bottom-6 z-20 rounded-full border border-white/10 bg-white/[0.03] px-5 py-2 text-[0.7rem] font-medium uppercase tracking-[0.28em] text-white/55 backdrop-blur-md transition-[transform,color,border-color,background-color] duration-200 hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.07] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
        style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
      >
        Atla
      </button>
    </div>
  );
}

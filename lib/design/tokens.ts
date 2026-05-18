export const designTokens = {
  color: {
    base: "#0B0D10",
    black: "#000000",
    white: "#FFFFFF",
    gray: {
      50: "#F7F7F8",
      100: "#E7E8EA",
      200: "#D1D4D8",
      300: "#AEB4BC",
      400: "#858D99",
      500: "#666F7B",
      600: "#4B535E",
      700: "#333A43",
      800: "#1D2229",
      900: "#0B0D10",
    },
    semantic: {
      connected: "#D8F5E3",
      idle: "#D7DCE3",
      error: "#F1D2D2",
      disconnected: "#8B929D",
      warning: "#EFE3C3",
    },
  },
  surface: {
    app: {
      raw: "#0B0D10",
      className: "bg-[#0B0D10]",
    },
    card: {
      raw: "rgba(255,255,255,0.035)",
      className: "bg-white/[0.035]",
    },
    cardStrong: {
      raw: "rgba(255,255,255,0.055)",
      className: "bg-white/[0.055]",
    },
    overlay: {
      raw: "rgba(0,0,0,0.45)",
      className: "bg-black/45",
    },
    overlayStrong: {
      raw: "rgba(0,0,0,0.55)",
      className: "bg-black/55",
    },
    inverse: {
      raw: "#FFFFFF",
      className: "bg-white",
    },
    hoverSoft: {
      raw: "rgba(255,255,255,0.045)",
      className: "hover:bg-white/[0.045]",
    },
    hoverMedium: {
      raw: "rgba(255,255,255,0.06)",
      className: "hover:bg-white/[0.06]",
    },
    hoverInverse: {
      raw: "rgba(255,255,255,0.85)",
      className: "hover:bg-white/85",
    },
  },
  border: {
    subtle: {
      raw: "rgba(255,255,255,0.10)",
      className: "border-white/10",
    },
    muted: {
      raw: "rgba(255,255,255,0.06)",
      className: "border-white/[0.06]",
    },
    strong: {
      raw: "rgba(255,255,255,0.20)",
      className: "border-white/20",
    },
    transparent: {
      raw: "transparent",
      className: "border-transparent",
    },
  },
  text: {
    primary: {
      raw: "rgba(255,255,255,1)",
      className: "text-white",
    },
    secondary: {
      raw: "rgba(255,255,255,0.70)",
      className: "text-white/70",
    },
    muted: {
      raw: "rgba(255,255,255,0.50)",
      className: "text-white/50",
    },
    faint: {
      raw: "rgba(255,255,255,0.35)",
      className: "text-white/35",
    },
    inverse: {
      raw: "#000000",
      className: "text-black",
    },
    hoverPrimary: {
      raw: "rgba(255,255,255,1)",
      className: "hover:text-white",
    },
  },
  spacing: {
    4: {
      raw: "0.25rem",
      padding: "p-1",
      gap: "gap-1",
    },
    8: {
      raw: "0.5rem",
      padding: "p-2",
      gap: "gap-2",
    },
    12: {
      raw: "0.75rem",
      padding: "p-3",
      gap: "gap-3",
    },
    16: {
      raw: "1rem",
      padding: "p-4",
      gap: "gap-4",
    },
    24: {
      raw: "1.5rem",
      padding: "p-6",
      gap: "gap-6",
    },
    32: {
      raw: "2rem",
      padding: "p-8",
      gap: "gap-8",
    },
    48: {
      raw: "3rem",
      padding: "p-12",
      gap: "gap-12",
    },
  },
  radius: {
    sm: {
      raw: "0.5rem",
      className: "rounded-lg",
    },
    md: {
      raw: "0.75rem",
      className: "rounded-xl",
    },
    lg: {
      raw: "1rem",
      className: "rounded-2xl",
    },
    xl: {
      raw: "1.5rem",
      className: "rounded-3xl",
    },
    "2xl": {
      raw: "2rem",
      className: "rounded-[2rem]",
    },
    full: {
      raw: "9999px",
      className: "rounded-full",
    },
  },
  shadow: {
    soft: {
      raw: "0 24px 80px rgba(0,0,0,0.22)",
      className: "shadow-2xl shadow-black/20",
    },
    lift: {
      raw: "0 32px 90px rgba(0,0,0,0.28)",
      className: "shadow-2xl shadow-white/5",
    },
    none: {
      raw: "none",
      className: "shadow-none",
    },
  },
  typography: {
    pageTitle:
      "text-[clamp(2rem,4vw,4rem)] font-semibold tracking-tight text-white",
    sectionTitle: "text-2xl font-semibold tracking-tight text-white",
    cardTitle: "text-lg font-semibold tracking-tight text-white",
    body: "text-sm leading-6 text-white/50",
    label: "text-[11px] font-semibold uppercase tracking-[0.28em] text-white/35",
  },
  motion: {
    transition: "transition",
    interactive: "transition duration-200 ease-out",
    hoverLift: "hover:-translate-y-[2px]",
    reducedSafe: "motion-reduce:transition-none motion-reduce:hover:translate-y-0",
  },
  focus: {
    visible:
      "focus-visible:outline-none focus-visible:border-white/20 focus-visible:ring-1 focus-visible:ring-white/15 focus-visible:ring-offset-0",
    subtle:
      "focus-visible:outline-none focus-visible:border-white/20 focus-visible:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12)]",
  },
} as const;

export type DesignTokens = typeof designTokens;

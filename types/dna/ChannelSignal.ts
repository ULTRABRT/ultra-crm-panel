export type ChannelId =
  | "whatsapp"
  | "instagram"
  | "messenger"
  | "telegram"
  | "tiktok"
  | "sms"
  | "webchat"
  | "form";

export type ChannelSignalStatus =
  | "connected"
  | "idle"
  | "error"
  | "disconnected";

export type ChannelSignalTrend = "up" | "flat" | "down";

export type ChannelSignal = {
  id: ChannelId;
  label: string;
  status: ChannelSignalStatus;
  throughput: number;
  pendingCount: number;
  responseTimeMinutes: number;
  healthScore: number;
  trend: ChannelSignalTrend;
  lastSignalAt: string;
  description: string;
  errorReason?: string;
};

export type SignalEngineParams = {
  intensity: number;
  pulseDurationMs: number;
  flowDelayMs: number;
  opacity: number;
  scale: number;
};

export type ChannelSignalSnapshot = {
  signals: ChannelSignal[];
  activeSignals: ChannelSignal[];
  errorSignals: ChannelSignal[];
  disconnectedSignals: ChannelSignal[];
  attentionSignals: ChannelSignal[];
  totalThroughput: number;
  averageHealthScore: number;
};

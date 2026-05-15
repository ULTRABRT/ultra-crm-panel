export type Temperature = "veryHot" | "hot" | "warm" | "cold";

export type RequestSource =
  | "instagram"
  | "mail"
  | "forms"
  | "webChat"
  | "whatsapp"
  | "phone"
  | "manual";

export type RequestPriority = "critical" | "high" | "medium" | "low";

export type RequestStage =
  | "new"
  | "temperatureCheck"
  | "offerStage"
  | "humanReview"
  | "ignored";

export type TalepStat = {
  id: string;
  label: string;
  value: string;
  description: string;
};

export type TalepItem = {
  id: string;
  customerName: string;
  source: RequestSource;
  sourceLabel: string;
  requestTitle: string;
  requestDetail: string;
  temperature: Temperature;
  statusLabel: string;
  timeLabel: string;
  ownerLabel: string;
  aiScore: number;
  priority: RequestPriority;
  nextAction: string;
};

export type TalepFunnelStep = {
  id: string;
  label: string;
  value: string;
  description: string;
  stage: RequestStage;
  progress: number;
};

export type KritikAksiyon = {
  id: string;
  title: string;
  description: string;
  impactLabel: string;
  priority: RequestPriority;
};

export type KaynakPerformansi = {
  id: string;
  source: RequestSource;
  sourceLabel: string;
  score: number;
  description: string;
};

export type EnerjiDnaMetric = {
  id: string;
  label: string;
  value: string;
  description: string;
};

export type SistemSagligi = {
  id: string;
  channelLabel: string;
  statusLabel: string;
  status: "active" | "monitoring" | "clean" | "warning";
};

export const temperatureLabels: Record<Temperature, string> = {
  veryHot: "Çok sıcak",
  hot: "Sıcak",
  warm: "Ilık",
  cold: "Soğuk",
};

export const temperatureStyles: Record<Temperature, string> = {
  veryHot: "bg-white text-black",
  hot: "border border-white/20 bg-white/10 text-white",
  warm: "border border-white/10 bg-black text-white/70",
  cold: "border border-white/10 bg-black text-white/50",
};

export const priorityLabels: Record<RequestPriority, string> = {
  critical: "Kritik",
  high: "Yüksek",
  medium: "Orta",
  low: "Düşük",
};
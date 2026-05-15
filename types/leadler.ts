export type LeadTemperature = "veryHot" | "hot" | "warm" | "cold";

export type LeadPriority = "urgent" | "high" | "normal" | "low";

export type LeadStatus =
  | "new"
  | "infoRequest"
  | "priceRequest"
  | "offerRequest"
  | "discoveryRequest"
  | "appointmentWaiting"
  | "offerPreparing"
  | "offerSent"
  | "followUp"
  | "technicalSupport"
  | "humanReview"
  | "notSuitable";

export type LeadChannel =
  | "instagram"
  | "whatsapp"
  | "mail"
  | "forms"
  | "webChat"
  | "phone"
  | "manual";

export type LeadSegment =
  | "all"
  | "today"
  | "veryHot"
  | "urgentFollowUp"
  | "offerWaiting"
  | "discoveryWaiting"
  | "appointmentWaiting"
  | "priceAsking"
  | "batteryInterest"
  | "technicalSupport"
  | "humanReview"
  | "risk";

export type LeadStat = {
  id: string;
  label: string;
  value: string;
  description: string;
};

export type LeadSegmentItem = {
  id: LeadSegment;
  label: string;
  count: number;
};

export type LeadItem = {
  id: string;
  customerName: string;
  phone: string;
  email: string;
  channel: LeadChannel;
  channelLabel: string;
  sourceLabel: string;
  campaignLabel: string;
  interestedService: string;
  locationLabel: string;
  monthlyBillLabel: string;
  hasBatteryInterest: boolean;
  status: LeadStatus;
  statusLabel: string;
  temperature: LeadTemperature;
  priority: LeadPriority;
  lastAction: string;
  lastMessageSummary: string;
  ownerLabel: string;
  followUpDateLabel: string;
  lastUpdateLabel: string;
  aiScore: number;
  riskLabel: string;
  nextAction: string;
};

export type LeadQuickInsight = {
  id: string;
  title: string;
  description: string;
  value: string;
};

export const leadTemperatureLabels: Record<LeadTemperature, string> = {
  veryHot: "Çok sıcak",
  hot: "Sıcak",
  warm: "Ilık",
  cold: "Soğuk",
};

export const leadTemperatureStyles: Record<LeadTemperature, string> = {
  veryHot: "bg-white text-black",
  hot: "border border-white/20 bg-white/10 text-white",
  warm: "border border-white/10 bg-black text-white/70",
  cold: "border border-white/10 bg-black text-white/50",
};

export const leadPriorityLabels: Record<LeadPriority, string> = {
  urgent: "Acil",
  high: "Yüksek",
  normal: "Normal",
  low: "Düşük",
};

export const leadPriorityStyles: Record<LeadPriority, string> = {
  urgent: "bg-white text-black",
  high: "border border-white/20 bg-white/10 text-white",
  normal: "border border-white/10 bg-black text-white/70",
  low: "border border-white/10 bg-black text-white/50",
};
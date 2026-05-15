export type InboxChannel =
  | "instagram"
  | "whatsapp"
  | "mail"
  | "webChat"
  | "forms"
  | "phone"
  | "manual";

export type InboxMessageDirection = "incoming" | "outgoing" | "internal";

export type InboxMessageStatus =
  | "unread"
  | "read"
  | "waitingReply"
  | "answered"
  | "assigned"
  | "convertedToLead"
  | "ignored"
  | "humanReview";

export type InboxIntent =
  | "priceRequest"
  | "offerRequest"
  | "discoveryRequest"
  | "appointmentRequest"
  | "batteryInterest"
  | "technicalSupport"
  | "complaint"
  | "generalQuestion"
  | "spam"
  | "unknown";

export type InboxPriority = "urgent" | "high" | "normal" | "low";

export type InboxTemperature = "veryHot" | "hot" | "warm" | "cold";

export type InboxSentiment = "positive" | "neutral" | "negative" | "confused";

export type InboxAssignee =
  | "sales"
  | "discovery"
  | "support"
  | "project"
  | "manager"
  | "ai"
  | "unassigned";

export type InboxActionType =
  | "reply"
  | "call"
  | "assign"
  | "createLead"
  | "createOffer"
  | "planDiscovery"
  | "askMissingInfo"
  | "markHumanReview"
  | "ignore"
  | "note";

export type InboxKpi = {
  id: string;
  label: string;
  value: string;
  description: string;
};

export type InboxChannelStat = {
  id: InboxChannel;
  label: string;
  total: number;
  unread: number;
  hot: number;
  statusLabel: string;
};

export type InboxMessage = {
  id: string;
  direction: InboxMessageDirection;
  senderName: string;
  senderRole: string;
  channel: InboxChannel;
  channelLabel: string;
  content: string;
  timeLabel: string;
  status: InboxMessageStatus;
  statusLabel: string;
};

export type InboxConversation = {
  id: string;
  customerName: string;
  customerTypeLabel: string;
  phone: string;
  email: string;
  channel: InboxChannel;
  channelLabel: string;
  sourceLabel: string;
  campaignLabel: string;
  subject: string;
  preview: string;
  lastMessage: string;
  lastMessageTimeLabel: string;
  status: InboxMessageStatus;
  statusLabel: string;
  intent: InboxIntent;
  intentLabel: string;
  priority: InboxPriority;
  temperature: InboxTemperature;
  sentiment: InboxSentiment;
  assignee: InboxAssignee;
  assigneeLabel: string;
  aiScore: number;
  isUnread: boolean;
  hasMissingInfo: boolean;
  hasBatteryInterest: boolean;
  isLeadCandidate: boolean;
  nextAction: string;
  messages: InboxMessage[];
};

export type InboxAiReply = {
  id: string;
  title: string;
  toneLabel: string;
  message: string;
  reason: string;
  confidenceLabel: string;
};

export type InboxAction = {
  id: string;
  label: string;
  description: string;
  type: InboxActionType;
};

export type InboxDetail = {
  activeConversation: InboxConversation;
  aiReplies: InboxAiReply[];
  actions: InboxAction[];
};

export const inboxChannelLabels: Record<InboxChannel, string> = {
  instagram: "Instagram",
  whatsapp: "WhatsApp",
  mail: "Mail",
  webChat: "Web Sohbet",
  forms: "Formlar",
  phone: "Telefon",
  manual: "Manuel",
};

export const inboxStatusLabels: Record<InboxMessageStatus, string> = {
  unread: "Okunmadı",
  read: "Okundu",
  waitingReply: "Yanıt bekliyor",
  answered: "Yanıtlandı",
  assigned: "Atandı",
  convertedToLead: "Lead’e dönüştü",
  ignored: "Yok sayıldı",
  humanReview: "İnsan kontrolü",
};

export const inboxIntentLabels: Record<InboxIntent, string> = {
  priceRequest: "Fiyat talebi",
  offerRequest: "Teklif talebi",
  discoveryRequest: "Keşif talebi",
  appointmentRequest: "Randevu talebi",
  batteryInterest: "Batarya ilgisi",
  technicalSupport: "Teknik destek",
  complaint: "Şikayet",
  generalQuestion: "Genel soru",
  spam: "Alakasız",
  unknown: "Belirsiz",
};

export const inboxPriorityLabels: Record<InboxPriority, string> = {
  urgent: "Acil",
  high: "Yüksek",
  normal: "Normal",
  low: "Düşük",
};

export const inboxPriorityStyles: Record<InboxPriority, string> = {
  urgent: "bg-white text-black",
  high: "border border-white/20 bg-white/10 text-white",
  normal: "border border-white/10 bg-black text-white/70",
  low: "border border-white/10 bg-black text-white/50",
};

export const inboxTemperatureLabels: Record<InboxTemperature, string> = {
  veryHot: "Çok sıcak",
  hot: "Sıcak",
  warm: "Ilık",
  cold: "Soğuk",
};

export const inboxTemperatureStyles: Record<InboxTemperature, string> = {
  veryHot: "bg-white text-black",
  hot: "border border-white/20 bg-white/10 text-white",
  warm: "border border-white/10 bg-black text-white/70",
  cold: "border border-white/10 bg-black text-white/50",
};

export const inboxSentimentLabels: Record<InboxSentiment, string> = {
  positive: "Pozitif",
  neutral: "Nötr",
  negative: "Negatif",
  confused: "Kararsız",
};

export const inboxSentimentStyles: Record<InboxSentiment, string> = {
  positive: "border border-white/20 bg-white/10 text-white",
  neutral: "border border-white/10 bg-black text-white/70",
  negative: "bg-white text-black",
  confused: "border border-white/10 bg-black text-white/60",
};

export const inboxAssigneeLabels: Record<InboxAssignee, string> = {
  sales: "Satış Ekibi",
  discovery: "Keşif Ekibi",
  support: "Destek Ekibi",
  project: "Proje Ekibi",
  manager: "Yönetici",
  ai: "AI Kontrol",
  unassigned: "Atanmadı",
};
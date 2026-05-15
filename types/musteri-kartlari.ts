export type CustomerTemperature = "veryHot" | "hot" | "warm" | "cold";

export type CustomerPriority = "urgent" | "high" | "normal" | "low";

export type CustomerChannel =
  | "instagram"
  | "whatsapp"
  | "mail"
  | "forms"
  | "webChat"
  | "phone"
  | "manual";

export type CustomerType =
  | "homeOwner"
  | "detachedHouse"
  | "businessOwner"
  | "factory"
  | "landOwner"
  | "existingCustomer"
  | "technicalSupport"
  | "unknown";

export type LeadStatus =
  | "newLead"
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

export type OfferStatus =
  | "notStarted"
  | "waiting"
  | "preparing"
  | "sent"
  | "followUp"
  | "won"
  | "lost";

export type DiscoveryStatus =
  | "notRequested"
  | "requested"
  | "dateWaiting"
  | "planned"
  | "completed"
  | "cancelled";

export type AppointmentStatus =
  | "notSet"
  | "waiting"
  | "planned"
  | "completed"
  | "missed"
  | "cancelled";

export type SalesStatus =
  | "open"
  | "qualified"
  | "proposal"
  | "negotiation"
  | "won"
  | "lost";

export type TimelineEventType =
  | "leadCreated"
  | "instagramMessage"
  | "whatsappMessage"
  | "mail"
  | "phoneCall"
  | "botReply"
  | "humanReply"
  | "note"
  | "offerNote"
  | "appointmentNote"
  | "discoveryNote"
  | "followUpCreated"
  | "statusUpdated"
  | "humanReview"
  | "riskAlert";

export type RiskLevel = "critical" | "high" | "medium" | "low";

export type CustomerBadge =
  | "veryHot"
  | "urgent"
  | "offerWaiting"
  | "discoveryWaiting"
  | "batteryInterest"
  | "humanReview"
  | "missingInfo"
  | "risk";

export type MusteriKpi = {
  id: string;
  label: string;
  value: string;
  description: string;
};

export type MusteriOzet = {
  id: string;
  customerName: string;
  companyName?: string;
  phone: string;
  email: string;
  city: string;
  district: string;
  addressNote: string;
  customerType: CustomerType;
  customerTypeLabel: string;
  firstSourceLabel: string;
  lastSourceLabel: string;
  activeChannels: CustomerChannel[];
  ownerLabel: string;
  createdAtLabel: string;
  lastUpdateLabel: string;
  badges: CustomerBadge[];
};

export type EnerjiTalepBilgileri = {
  interestedService: string;
  structureType: string;
  roofType: string;
  roofDirection: string;
  roofAreaLabel: string;
  monthlyBillLabel: string;
  monthlyConsumptionLabel: string;
  requestedSystemCapacity: string;
  batteryNeed: boolean;
  lithiumBatteryInterest: boolean;
  landGesInterest: boolean;
  roofGesInterest: boolean;
  savingQuestion: boolean;
  amortizationQuestion: boolean;
  technicalSupportTopic: string;
  missingInfo: string[];
};

export type SatisSureci = {
  leadStatus: LeadStatus;
  leadStatusLabel: string;
  temperature: CustomerTemperature;
  priority: CustomerPriority;
  lastAction: string;
  offerStatus: OfferStatus;
  offerStatusLabel: string;
  offerDateLabel: string;
  offerAmountLabel: string;
  salesStatus: SalesStatus;
  salesStatusLabel: string;
  lostReason?: string;
  potentialRevenueLabel: string;
  actualRevenueLabel: string;
  followUpDateLabel: string;
  ownerLabel: string;
};

export type KesifRandevu = {
  discoveryStatus: DiscoveryStatus;
  discoveryStatusLabel: string;
  appointmentStatus: AppointmentStatus;
  appointmentStatusLabel: string;
  appointmentDateLabel: string;
  appointmentTimeLabel: string;
  appointmentTypeLabel: string;
  discoveryNote: string;
  appointmentNote: string;
  discoveryOwnerLabel: string;
  planningStatusLabel: string;
};

export type MusteriTimelineItem = {
  id: string;
  type: TimelineEventType;
  channel: CustomerChannel;
  channelLabel: string;
  title: string;
  description: string;
  timeLabel: string;
  ownerLabel: string;
  sourceLabel: string;
};

export type MusteriRisk = {
  id: string;
  title: string;
  description: string;
  level: RiskLevel;
  actionLabel: string;
};

export type AiMusteriOzeti = {
  title: string;
  summary: string;
  recommendedAction: string;
  reason: string;
  confidenceLabel: string;
};

export type MusteriAksiyon = {
  id: string;
  label: string;
  description: string;
  type:
    | "call"
    | "whatsapp"
    | "mail"
    | "message"
    | "followUp"
    | "appointment"
    | "offer"
    | "assign"
    | "note"
    | "humanReview";
};

export type MusteriKartDetay = {
  id: string;
  ozet: MusteriOzet;
  aiSummary: AiMusteriOzeti;
  enerjiTalep: EnerjiTalepBilgileri;
  satisSureci: SatisSureci;
  kesifRandevu: KesifRandevu;
  timeline: MusteriTimelineItem[];
  risks: MusteriRisk[];
  actions: MusteriAksiyon[];
};

export const customerTemperatureLabels: Record<CustomerTemperature, string> = {
  veryHot: "Çok sıcak",
  hot: "Sıcak",
  warm: "Ilık",
  cold: "Soğuk",
};

export const customerTemperatureStyles: Record<CustomerTemperature, string> = {
  veryHot: "bg-white text-black",
  hot: "border border-white/20 bg-white/10 text-white",
  warm: "border border-white/10 bg-black text-white/70",
  cold: "border border-white/10 bg-black text-white/50",
};

export const customerPriorityLabels: Record<CustomerPriority, string> = {
  urgent: "Acil",
  high: "Yüksek",
  normal: "Normal",
  low: "Düşük",
};

export const customerPriorityStyles: Record<CustomerPriority, string> = {
  urgent: "bg-white text-black",
  high: "border border-white/20 bg-white/10 text-white",
  normal: "border border-white/10 bg-black text-white/70",
  low: "border border-white/10 bg-black text-white/50",
};

export const riskLevelLabels: Record<RiskLevel, string> = {
  critical: "Kritik",
  high: "Yüksek",
  medium: "Orta",
  low: "Düşük",
};

export const riskLevelStyles: Record<RiskLevel, string> = {
  critical: "bg-white text-black",
  high: "border border-white/20 bg-white/10 text-white",
  medium: "border border-white/10 bg-black text-white/70",
  low: "border border-white/10 bg-black text-white/50",
};

export const customerBadgeLabels: Record<CustomerBadge, string> = {
  veryHot: "Çok sıcak",
  urgent: "Acil takip",
  offerWaiting: "Teklif bekliyor",
  discoveryWaiting: "Keşif bekliyor",
  batteryInterest: "Batarya ilgisi",
  humanReview: "İnsan kontrolü",
  missingInfo: "Eksik bilgi",
  risk: "Riskte",
};

export const customerChannelLabels: Record<CustomerChannel, string> = {
  instagram: "Instagram",
  whatsapp: "WhatsApp",
  mail: "Mail",
  forms: "Formlar",
  webChat: "Web Sohbet",
  phone: "Telefon",
  manual: "Manuel",
};
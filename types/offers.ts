export type OfferStatus =
  | "draft"
  | "sent"
  | "follow_up"
  | "negotiation"
  | "won"
  | "lost";

export type OfferPriority = "low" | "medium" | "high" | "critical";

export type OfferSource =
  | "inbox"
  | "lead"
  | "customer_card"
  | "field_visit";

export type OfferTimelineItem = {
  id: string;
  label: string;
  note: string;
  atLabel: string;
};

export type OfferRecord = {
  id: string;
  customerName: string;
  companyName: string;
  title: string;
  amount: number;
  currency: "TRY" | "USD" | "EUR";
  status: OfferStatus;
  priority: OfferPriority;
  source: OfferSource;
  owner: string;
  createdAt: string;
  lastTouchAt: string;
  followUpAt: string;
  probability: number;
  ageDays: number;
  missingInfo: string[];
  nextAction: string;
  riskLabel: string;
  salesSuggestion: string;
  timeline: OfferTimelineItem[];
};

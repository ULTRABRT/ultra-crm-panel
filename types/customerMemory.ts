export type CustomerMemoryConfidence = "low" | "medium" | "high";

export type CustomerMemorySourceType =
  | "customer"
  | "inbox"
  | "demand"
  | "lead"
  | "offer"
  | "channel"
  | "policy";

export type CustomerMemoryApprovalState =
  | "readonly_snapshot"
  | "human_review_required"
  | "blocked_without_persistence";

export type CustomerMemoryChannel = {
  id: string;
  label: string;
  sourceLabel: string;
};

export type CustomerMemoryTimelineItem = {
  id: string;
  label: string;
  note: string;
  sourceLabel: string;
};

export type CustomerMemoryEvidence = {
  id: string;
  sourceType: CustomerMemorySourceType;
  sourceId: string;
  field: string;
  snapshotValue: string;
  observedAt: string;
  label: string;
  confidence: CustomerMemoryConfidence;
  route: string;
};

export type CustomerMemoryRecord = {
  id: string;
  customerId: string;
  customerName: string;
  companyName?: string;
  channels: CustomerMemoryChannel[];
  activeIntent: string;
  lifecycleStage: string;
  lastTouchAt: string;
  keyFacts: string[];
  missingInfo: string[];
  openRisks: string[];
  nextBestAction: string;
  timeline: CustomerMemoryTimelineItem[];
  evidenceIds: string[];
  evidence: CustomerMemoryEvidence[];
  confidence: CustomerMemoryConfidence;
  approvalState: CustomerMemoryApprovalState;
  approvalNotes: string[];
  sourceLabel: string;
  snapshotLabel: string;
};

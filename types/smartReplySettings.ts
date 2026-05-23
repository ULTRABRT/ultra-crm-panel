export type SmartReplyChannel =
  | "whatsapp"
  | "instagram"
  | "messenger"
  | "web_form"
  | "phone";

export type SmartReplyToneProfile =
  | "professional"
  | "consultative"
  | "warm"
  | "concise"
  | "technical";

export type SmartReplyApprovalMode =
  | "always_review"
  | "review_sensitive"
  | "draft_only"
  | "disabled";

export type SmartReplyRiskLevel = "low" | "medium" | "high" | "blocked";

export type SmartReplyPolicyStatus = "active" | "watch" | "restricted";

export type SmartReplyTimelineItem = {
  id: string;
  label: string;
  note: string;
  atLabel: string;
};

export type SmartReplyPolicyRecord = {
  id: string;
  name: string;
  channel: SmartReplyChannel;
  toneProfile: SmartReplyToneProfile;
  approvalMode: SmartReplyApprovalMode;
  riskLevel: SmartReplyRiskLevel;
  allowedAction: string;
  blockedAction: string;
  owner: string;
  lastUpdatedAt: string;
  status: SmartReplyPolicyStatus;
  safetyBadge: string;
  examplePrompt: string;
  exampleReply: string;
  forbiddenTopics: string[];
  automationBoundary: string;
  timeline: SmartReplyTimelineItem[];
};

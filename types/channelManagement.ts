export type ManagedChannelType =
  | "whatsapp"
  | "instagram"
  | "messenger"
  | "web_form"
  | "phone"
  | "referral";

export type ChannelHealthStatus =
  | "healthy"
  | "watch"
  | "action_required"
  | "paused";

export type ChannelPriority = "low" | "medium" | "high" | "critical";

export type ChannelIntegrationState =
  | "local_mapped"
  | "manual_review"
  | "needs_setup"
  | "paused_local";

export type ChannelTimelineItem = {
  id: string;
  label: string;
  note: string;
  atLabel: string;
};

export type ManagedChannelRecord = {
  id: string;
  name: string;
  type: ManagedChannelType;
  healthStatus: ChannelHealthStatus;
  priority: ChannelPriority;
  owner: string;
  todayLeads: number;
  sevenDayLeads: number;
  offerConversionRate: number;
  averageResponseTime: string;
  lastSignalAt: string;
  statusLabel: string;
  riskLabel: string;
  nextAction: string;
  integrationState: ChannelIntegrationState;
  leadQuality: number;
  offerImpact: string;
  timeline: ChannelTimelineItem[];
};

import type { CustomerMemoryRecord } from "../types/customerMemory";
import { customerChannelLabels } from "../types/musteri-kartlari";

import { managedChannelRecords } from "./channelManagement";
import { inboxConversations } from "./inbox";
import { leadListesi } from "./leadler";
import { aktifMusteriKarti } from "./musteri-kartlari";
import { offerRecords } from "./offers";
import { smartReplyPolicyRecords } from "./smartReplySettings";
import { talepListesi } from "./talep-havuzu";

const customer = aktifMusteriKarti;
const inboxConversation = inboxConversations[0];
const demandRecord = talepListesi[0];
const leadRecord = leadListesi[0];
const offerRecord = offerRecords[0];
const channelRecord = managedChannelRecords[0];
const policyRecord = smartReplyPolicyRecords[0];

const evidence = [
  {
    id: "evidence-customer-summary",
    sourceType: "customer",
    sourceId: customer.id,
    field: "ozet.lastUpdateLabel",
    snapshotValue: customer.ozet.lastUpdateLabel,
    observedAt: "Local fixture snapshot",
    label: "Musteri karti ana kaydi",
    confidence: "high",
    route: "/musteri-kartlari",
  },
  {
    id: "evidence-inbox-intent",
    sourceType: "inbox",
    sourceId: inboxConversation.id,
    field: "intentLabel",
    snapshotValue: inboxConversation.intentLabel,
    observedAt: inboxConversation.lastMessageTimeLabel,
    label: "Inbox niyet sinyali",
    confidence: "medium",
    route: "/inbox",
  },
  {
    id: "evidence-demand-priority",
    sourceType: "demand",
    sourceId: demandRecord.id,
    field: "priority",
    snapshotValue: demandRecord.priority,
    observedAt: demandRecord.timeLabel,
    label: "Talep havuzu onceligi",
    confidence: "medium",
    route: "/talep-havuzu",
  },
  {
    id: "evidence-lead-follow-up",
    sourceType: "lead",
    sourceId: leadRecord.id,
    field: "followUpDateLabel",
    snapshotValue: leadRecord.followUpDateLabel,
    observedAt: leadRecord.lastUpdateLabel,
    label: "Lead takip penceresi",
    confidence: "medium",
    route: "/leadler",
  },
  {
    id: "evidence-offer-context",
    sourceType: "offer",
    sourceId: offerRecord.id,
    field: "status",
    snapshotValue: offerRecord.status,
    observedAt: offerRecord.lastTouchAt,
    label: "Teklif durumu ve tutar baglami",
    confidence: "medium",
    route: "/teklifler",
  },
  {
    id: "evidence-channel-health",
    sourceType: "channel",
    sourceId: channelRecord.id,
    field: "healthStatus",
    snapshotValue: channelRecord.healthStatus,
    observedAt: channelRecord.lastSignalAt,
    label: "Kanal sagligi sinyali",
    confidence: "medium",
    route: "/kanal-yonetimi",
  },
  {
    id: "evidence-policy-approval",
    sourceType: "policy",
    sourceId: policyRecord.id,
    field: "approvalMode",
    snapshotValue: policyRecord.approvalMode,
    observedAt: policyRecord.lastUpdatedAt,
    label: "Akilli yanit onay siniri",
    confidence: "medium",
    route: "/akilli-yanit-ayarlari",
  },
] satisfies CustomerMemoryRecord["evidence"];

export const customerMemorySnapshots: CustomerMemoryRecord[] = [
  {
    id: "memory-snapshot-mehmet-akgun",
    customerId: customer.id,
    customerName: customer.ozet.customerName,
    companyName: customer.ozet.companyName ?? "Bireysel musteri",
    channels: customer.ozet.activeChannels.map((channel) => ({
      id: channel,
      label: customerChannelLabels[channel],
      sourceLabel: "Musteri karti",
    })),
    activeIntent: customer.enerjiTalep.interestedService,
    lifecycleStage: `${customer.satisSureci.leadStatusLabel} / ${customer.satisSureci.offerStatusLabel}`,
    lastTouchAt: customer.ozet.lastUpdateLabel,
    keyFacts: [
      customer.ozet.customerTypeLabel,
      customer.enerjiTalep.monthlyBillLabel,
      customer.enerjiTalep.requestedSystemCapacity,
      customer.satisSureci.potentialRevenueLabel,
      inboxConversation.customerIntelligence.nextBestAction,
    ],
    missingInfo: [
      ...customer.enerjiTalep.missingInfo,
      ...offerRecord.missingInfo,
    ],
    openRisks: [
      ...customer.risks.map((risk) => risk.title),
      leadRecord.riskLabel,
      offerRecord.riskLabel,
      channelRecord.riskLabel,
    ],
    nextBestAction: customer.aiSummary.recommendedAction,
    timeline: customer.timeline.slice(0, 5).map((event) => ({
      id: `memory-${event.id}`,
      label: event.title,
      note: event.description,
      sourceLabel: event.sourceLabel,
    })),
    evidenceIds: evidence.map((item) => item.id),
    evidence,
    confidence: "high",
    approvalState: "human_review_required",
    approvalNotes: [
      "Local readonly snapshot; kalici kayit veya backend yazimi yok.",
      "Dis iletisim, kayit olusturma ve durum degisikligi insan onayi gerektirir.",
      "Finansal riskler sadece kanitli sinyal olarak okunmali; kesin kayip iddiasi degildir.",
    ],
    sourceLabel: "Local-linked / name-match evidence map",
    snapshotLabel: "Local readonly memory snapshot",
  },
];

export const activeCustomerMemorySnapshot = customerMemorySnapshots[0];

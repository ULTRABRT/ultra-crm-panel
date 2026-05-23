import type { NoLostLeadSignal } from "../types/noLostLead";

import { activeCustomerMemorySnapshot } from "./customerMemory";
import { leadListesi } from "./leadler";
import { offerRecords } from "./offers";
import { talepListesi } from "./talep-havuzu";

const hotLead = leadListesi[0];
const discoveryLead = leadListesi[1];
const projectLead = leadListesi[2];
const reviewLead = leadListesi[4];
const hotDemand = talepListesi[0];
const projectDemand = talepListesi[2];
const linkedOffer = offerRecords[0];

export const noLostLeadSignals: NoLostLeadSignal[] = [
  {
    id: "nll-readonly-missing-info",
    subjectType: "demand",
    subjectId: projectDemand.id,
    customerName: projectDemand.customerName,
    companyName: "Local demand record",
    severity: "high",
    reasonCode: "missing_info_blocks_progress",
    description:
      "Talep ve lead kaydi eksik proje bilgisi nedeniyle ilerleme sinyali bekliyor.",
    evidence: [
      {
        id: `local-evidence:demand:${projectDemand.id}:statusLabel`,
        sourceType: "demand",
        sourceId: projectDemand.id,
        sourceRoute: "/talep-havuzu",
        field: "statusLabel",
        snapshotValue: projectDemand.statusLabel,
        observedAt: projectDemand.timeLabel,
        label: "Talep status label",
        confidence: "medium",
      },
      {
        id: `local-evidence:lead:${projectLead.id}:riskLabel`,
        sourceType: "lead",
        sourceId: projectLead.id,
        sourceRoute: "/leadler",
        field: "riskLabel",
        snapshotValue: projectLead.riskLabel,
        observedAt: projectLead.lastUpdateLabel,
        label: "Lead risk label",
        confidence: "medium",
      },
    ],
    suggestedAction:
      "Eksik bilgileri insan kontroluyle teyit et; bu panel kayit yazmaz.",
    blockedActions: [
      "Yeni kayit acma",
      "Durum degistirme",
      "Musteri karti yazma",
    ],
    ownerLabel: projectLead.ownerLabel,
    dueLabel: projectLead.followUpDateLabel,
    confidence: "medium",
    status: "readonly_advisory",
    sourceRoutes: ["/talep-havuzu", "/leadler"],
    requiresHumanApproval: true,
  },
  {
    id: "nll-readonly-high-intent-window",
    subjectType: "lead",
    subjectId: hotLead.id,
    customerName: hotLead.customerName,
    companyName: activeCustomerMemorySnapshot.companyName,
    severity: "critical",
    reasonCode: "high_intent_followup_window",
    description:
      "Yuksek niyetli lead bugun takip penceresinde gorunuyor; tarih label oldugu icin overdue hesabi yapilmaz.",
    evidence: [
      {
        id: `local-evidence:lead:${hotLead.id}:followUpDateLabel`,
        sourceType: "lead",
        sourceId: hotLead.id,
        sourceRoute: "/leadler",
        field: "followUpDateLabel",
        snapshotValue: hotLead.followUpDateLabel,
        observedAt: hotLead.lastUpdateLabel,
        label: "Lead takip label",
        confidence: "medium",
      },
      {
        id: `local-evidence:demand:${hotDemand.id}:priority`,
        sourceType: "demand",
        sourceId: hotDemand.id,
        sourceRoute: "/talep-havuzu",
        field: "priority",
        snapshotValue: hotDemand.priority,
        observedAt: hotDemand.timeLabel,
        label: "Talep oncelik sinyali",
        confidence: "medium",
      },
    ],
    suggestedAction:
      "Takip penceresini satis ekibiyle kontrol et; otomatik islem yoktur.",
    blockedActions: [
      "Arama baslatma",
      "Mesaj aksiyonu",
      "Takip gorevi yazma",
    ],
    ownerLabel: hotLead.ownerLabel,
    dueLabel: hotLead.followUpDateLabel,
    confidence: "medium",
    status: "needs_review",
    sourceRoutes: ["/leadler", "/talep-havuzu"],
    requiresHumanApproval: true,
  },
  {
    id: "nll-readonly-offer-link",
    subjectType: "offer",
    subjectId: linkedOffer.id,
    customerName: hotLead.customerName,
    companyName: linkedOffer.companyName,
    severity: "high",
    reasonCode: "offer_requested_link_unverified",
    description:
      "Teklif talebi ve teklif kaydi local isim eslesmesiyle gorunuyor; canonical bag dogrulanmali.",
    evidence: [
      {
        id: `local-evidence:lead:${hotLead.id}:status`,
        sourceType: "lead",
        sourceId: hotLead.id,
        sourceRoute: "/leadler",
        field: "status",
        snapshotValue: hotLead.status,
        observedAt: hotLead.lastUpdateLabel,
        label: "Lead teklif statusu",
        confidence: "medium",
      },
      {
        id: `local-evidence:offer:${linkedOffer.id}:status`,
        sourceType: "offer",
        sourceId: linkedOffer.id,
        sourceRoute: "/teklifler",
        field: "status",
        snapshotValue: linkedOffer.status,
        observedAt: linkedOffer.lastTouchAt,
        label: "Teklif local statusu",
        confidence: "medium",
      },
    ],
    suggestedAction:
      "Teklif bagini insan kontroluyle dogrula; yeni teklif acma iddiasi yoktur.",
    blockedActions: [
      "Teklif kaydi acma",
      "Teklif statusu degistirme",
      "Finansal sonuc iddiasi",
    ],
    ownerLabel: hotLead.ownerLabel,
    dueLabel: linkedOffer.followUpAt,
    confidence: "medium",
    status: "needs_review",
    sourceRoutes: ["/leadler", "/teklifler"],
    requiresHumanApproval: true,
  },
  {
    id: "nll-readonly-owner-label",
    subjectType: "lead",
    subjectId: reviewLead.id,
    customerName: reviewLead.customerName,
    companyName: "Local lead record",
    severity: "medium",
    reasonCode: "owner_label_unverified",
    description:
      "Sorumlu bilgisi label olarak var; gercek gorev veya ekip atama kaydi dogrulanmiyor.",
    evidence: [
      {
        id: `local-evidence:lead:${reviewLead.id}:ownerLabel`,
        sourceType: "lead",
        sourceId: reviewLead.id,
        sourceRoute: "/leadler",
        field: "ownerLabel",
        snapshotValue: reviewLead.ownerLabel,
        observedAt: reviewLead.lastUpdateLabel,
        label: "Lead sorumlu label",
        confidence: "medium",
      },
      {
        id: `local-evidence:lead:${discoveryLead.id}:ownerLabel`,
        sourceType: "lead",
        sourceId: discoveryLead.id,
        sourceRoute: "/leadler",
        field: "ownerLabel",
        snapshotValue: discoveryLead.ownerLabel,
        observedAt: discoveryLead.lastUpdateLabel,
        label: "Baska lead sorumlu label",
        confidence: "low",
      },
    ],
    suggestedAction:
      "Sorumlu bilgisini operasyon ekibiyle teyit et; bu panel gorev yazmaz.",
    blockedActions: [
      "Sorumlu kaydi yazma",
      "Takip gorevi yazma",
      "Status degistirme",
    ],
    ownerLabel: reviewLead.ownerLabel,
    dueLabel: reviewLead.followUpDateLabel,
    confidence: "low",
    status: "blocked_without_backend",
    sourceRoutes: ["/leadler"],
    requiresHumanApproval: true,
  },
];

"use client";

import { useMemo, useState } from "react";
import {
  HiOutlineBolt,
  HiOutlineChatBubbleLeftRight,
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineExclamationTriangle,
  HiOutlineMagnifyingGlass,
  HiOutlineShare,
  HiOutlineSparkles,
} from "react-icons/hi2";

import { smartReplyPolicyRecords } from "../../data/smartReplySettings";
import type {
  SmartReplyApprovalMode,
  SmartReplyChannel,
  SmartReplyPolicyRecord,
  SmartReplyRiskLevel,
  SmartReplyToneProfile,
} from "../../types/smartReplySettings";

type ChannelFilter = SmartReplyChannel | "all";
type ApprovalFilter = SmartReplyApprovalMode | "all";
type RiskFilter = SmartReplyRiskLevel | "all";

const channelLabels: Record<SmartReplyChannel, string> = {
  whatsapp: "WhatsApp",
  instagram: "Instagram",
  messenger: "Messenger",
  web_form: "Web Form",
  phone: "Telefon",
};

const toneLabels: Record<SmartReplyToneProfile, string> = {
  professional: "Profesyonel",
  consultative: "Danışman",
  warm: "Sıcak",
  concise: "Kısa",
  technical: "Teknik",
};

const approvalLabels: Record<SmartReplyApprovalMode, string> = {
  always_review: "Her zaman onay",
  review_sensitive: "Hassas içerik onayı",
  draft_only: "Sadece taslak",
  disabled: "Kapalı",
};

const riskLabels: Record<SmartReplyRiskLevel, string> = {
  low: "Düşük",
  medium: "Orta",
  high: "Yüksek",
  blocked: "Bloklu",
};

const policyStatusLabels: Record<SmartReplyPolicyRecord["status"], string> = {
  active: "Görünümde",
  watch: "İncelemede",
  restricted: "Kısıtlı",
};

const approvalTone: Record<SmartReplyApprovalMode, string> = {
  always_review: "border-[#1F2937]/20 bg-[#111827] text-[#FFFFFF]",
  review_sensitive: "border-[#8A6A2E]/25 bg-[#F3E9D2] text-[#654A14]",
  draft_only: "border-[#C8CDD5] bg-[#FFFFFF] text-[#525A65]",
  disabled: "border-[#9AA0A8]/25 bg-[#EEF0F3] text-[#6B7280]",
};

const riskTone: Record<SmartReplyRiskLevel, string> = {
  low: "border-[#2F6B4F]/20 bg-[#DDEBE4] text-[#24573F]",
  medium: "border-[#8A6A2E]/25 bg-[#F3E9D2] text-[#654A14]",
  high: "border-[#1F2937]/20 bg-[#111827] text-[#FFFFFF]",
  blocked: "border-[#6B4E16]/25 bg-[#F3E9D2] text-[#6B4E16]",
};

const channelIconMap = {
  whatsapp: HiOutlineChatBubbleLeftRight,
  instagram: HiOutlineSparkles,
  messenger: HiOutlineChatBubbleLeftRight,
  web_form: HiOutlineBolt,
  phone: HiOutlineShare,
};

function normalizeSearch(value: string) {
  return value.trim().toLocaleLowerCase("tr-TR");
}

function matchesSearch(policy: SmartReplyPolicyRecord, query: string) {
  const normalizedQuery = normalizeSearch(query);

  if (!normalizedQuery) {
    return true;
  }

  return [
    policy.name,
    channelLabels[policy.channel],
    toneLabels[policy.toneProfile],
    approvalLabels[policy.approvalMode],
    riskLabels[policy.riskLevel],
    policy.owner,
    policy.safetyBadge,
    policy.allowedAction,
    policy.blockedAction,
  ].some((value) =>
    value.toLocaleLowerCase("tr-TR").includes(normalizedQuery),
  );
}

function KpiStrip({ policies }: { policies: SmartReplyPolicyRecord[] }) {
  const activePolicies = policies.filter((policy) => policy.status === "active");
  const humanReviewPolicies = policies.filter(
    (policy) =>
      policy.approvalMode === "always_review" ||
      policy.approvalMode === "review_sensitive",
  );
  const noDirectDeliveryPolicies = policies.filter(
    (policy) =>
      policy.approvalMode === "draft_only" ||
      policy.approvalMode === "disabled",
  );
  const toneProfileCount = new Set(
    policies.map((policy) => `${policy.channel}:${policy.toneProfile}`),
  ).size;
  const riskyBlocks = policies.filter(
    (policy) => policy.riskLevel === "high" || policy.riskLevel === "blocked",
  );

  const kpis = [
    {
      label: "İzlenen kurallar",
      shortLabel: "İzlenen",
      value: activePolicies.length.toString(),
      detail: "Local policy",
      Icon: HiOutlineSparkles,
    },
    {
      label: "İnsan onayı",
      shortLabel: "Onay",
      value: humanReviewPolicies.length.toString(),
      detail: "Kontrollü akış",
      Icon: HiOutlineCheckCircle,
    },
    {
      label: "Otomasyon kapalı",
      shortLabel: "Kapalı",
      value: noDirectDeliveryPolicies.length.toString(),
      detail: "Güvenli sınır",
      Icon: HiOutlineExclamationTriangle,
    },
    {
      label: "Ton profilleri",
      shortLabel: "Ton",
      value: toneProfileCount.toString(),
      detail: "Kanal bazlı",
      Icon: HiOutlineChatBubbleLeftRight,
    },
    {
      label: "Risk engelleri",
      shortLabel: "Risk",
      value: riskyBlocks.length.toString(),
      detail: "Yüksek hassasiyet",
      Icon: HiOutlineBolt,
    },
  ];

  return (
    <section className="grid grid-cols-3 gap-2 md:grid-cols-5">
      {kpis.map(({ label, shortLabel, value, detail, Icon }) => (
        <div
          key={label}
          className="min-w-0 rounded-[0.85rem] border border-black/[0.08] bg-[#FFFFFF] p-2 shadow-[0_12px_28px_rgba(11,13,16,0.055),inset_0_1px_0_rgba(255,255,255,0.95)] sm:rounded-[0.95rem] sm:p-3"
        >
          <div className="flex items-center justify-between gap-2">
            <p className="min-w-0 truncate text-[9px] font-semibold uppercase tracking-[0.1em] text-[#7A808A] lg:hidden">
              {shortLabel}
            </p>
            <p className="hidden min-w-0 truncate text-[11px] font-semibold uppercase tracking-[0.14em] text-[#7A808A] lg:block">
              {label}
            </p>
            <div className="hidden h-7 w-7 shrink-0 items-center justify-center rounded-[0.7rem] border border-black/[0.08] bg-[#F4F5F7] text-[#0B0D10] sm:flex">
              <Icon className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-1 truncate text-lg font-semibold tracking-tight text-[#0B0D10] sm:mt-2 sm:text-2xl">
            {value}
          </p>
          <p className="mt-0.5 hidden truncate text-xs text-[#7A808A] sm:block">
            {detail}
          </p>
        </div>
      ))}
    </section>
  );
}

function FilterSelect<TValue extends string>({
  label,
  value,
  options,
  onChange,
  className = "",
}: {
  label: string;
  value: TValue;
  options: Array<{ label: string; value: TValue }>;
  onChange: (value: TValue) => void;
  className?: string;
}) {
  return (
    <label className={`min-w-0 ${className}`}>
      <span className="mb-0.5 block truncate text-[10px] font-semibold uppercase tracking-[0.12em] text-[#7A808A] sm:mb-1 sm:text-[11px] sm:tracking-[0.16em]">
        {label}
      </span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value as TValue)}
        className="h-8 w-full rounded-[0.75rem] border border-black/[0.08] bg-[#FFFFFF] px-2 text-xs font-semibold text-[#0B0D10] outline-none transition focus:border-black/[0.25] sm:h-9 sm:rounded-[0.8rem] sm:px-3 sm:text-sm"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function PolicyFilters({
  searchQuery,
  channelFilter,
  approvalFilter,
  riskFilter,
  onSearchChange,
  onChannelChange,
  onApprovalChange,
  onRiskChange,
}: {
  searchQuery: string;
  channelFilter: ChannelFilter;
  approvalFilter: ApprovalFilter;
  riskFilter: RiskFilter;
  onSearchChange: (value: string) => void;
  onChannelChange: (value: ChannelFilter) => void;
  onApprovalChange: (value: ApprovalFilter) => void;
  onRiskChange: (value: RiskFilter) => void;
}) {
  return (
    <section className="rounded-[0.95rem] border border-black/[0.08] bg-[#FFFFFF] p-2 shadow-[0_14px_34px_rgba(11,13,16,0.055),inset_0_1px_0_rgba(255,255,255,0.95)] sm:rounded-[1rem] sm:p-3">
      <div className="grid grid-cols-3 gap-2 lg:grid-cols-[minmax(16rem,1fr)_9rem_11rem_9rem] lg:gap-3">
        <label className="col-span-3 min-w-0 lg:col-span-1">
          <span className="mb-0.5 block text-[10px] font-semibold uppercase tracking-[0.12em] text-[#7A808A] sm:mb-1 sm:text-[11px] sm:tracking-[0.16em]">
            Local arama
          </span>
          <div className="flex h-8 items-center gap-2 rounded-[0.75rem] border border-black/[0.08] bg-[#F7F8FA] px-2.5 text-[#7A808A] sm:h-9 sm:rounded-[0.8rem] sm:px-3">
            <HiOutlineMagnifyingGlass className="h-4 w-4 shrink-0" />
            <input
              value={searchQuery}
              onChange={(event) => onSearchChange(event.target.value)}
              className="h-full min-w-0 flex-1 bg-transparent text-xs font-medium text-[#0B0D10] outline-none placeholder:text-[#9AA0A8] sm:text-sm"
              placeholder="Policy, kanal, ton veya sorumlu ara..."
            />
          </div>
        </label>

        <FilterSelect<ChannelFilter>
          label="Kanal"
          value={channelFilter}
          onChange={onChannelChange}
          options={[
            { label: "Tümü", value: "all" },
            ...Object.entries(channelLabels).map(([value, label]) => ({
              label,
              value: value as ChannelFilter,
            })),
          ]}
        />

        <FilterSelect<ApprovalFilter>
          label="Onay modu"
          value={approvalFilter}
          onChange={onApprovalChange}
          options={[
            { label: "Tümü", value: "all" },
            ...Object.entries(approvalLabels).map(([value, label]) => ({
              label,
              value: value as ApprovalFilter,
            })),
          ]}
        />

        <FilterSelect<RiskFilter>
          label="Risk"
          value={riskFilter}
          onChange={onRiskChange}
          options={[
            { label: "Tümü", value: "all" },
            ...Object.entries(riskLabels).map(([value, label]) => ({
              label,
              value: value as RiskFilter,
            })),
          ]}
        />
      </div>
    </section>
  );
}

function SelectedPolicySignal({
  policy,
}: {
  policy: SmartReplyPolicyRecord | undefined;
}) {
  if (!policy) {
    return null;
  }

  return (
    <section className="hidden rounded-[0.9rem] border border-black/[0.08] bg-[#FFFFFF] p-2.5 shadow-[0_12px_28px_rgba(11,13,16,0.055),inset_0_1px_0_rgba(255,255,255,0.95)] lg:block sm:rounded-[0.95rem] sm:p-3 xl:hidden">
      <div className="flex items-start justify-between gap-2.5">
        <div className="min-w-0">
          <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[#7A808A] sm:text-[10px] sm:tracking-[0.16em]">
            Seçili policy
          </p>
          <p className="mt-1 truncate text-sm font-semibold text-[#0B0D10]">
            {policy.name}
          </p>
          <p className="mt-0.5 truncate text-xs text-[#525A65]">
            {channelLabels[policy.channel]} / {toneLabels[policy.toneProfile]}
          </p>
        </div>
        <span
          className={`shrink-0 rounded-full border px-2.5 py-1 text-xs font-semibold ${
            riskTone[policy.riskLevel]
          }`}
        >
          {riskLabels[policy.riskLevel]}
        </span>
      </div>
      <div className="mt-1.5 flex flex-wrap items-center gap-1.5 text-xs text-[#7A808A] sm:gap-2">
        <span>{approvalLabels[policy.approvalMode]}</span>
        <span aria-hidden="true">/</span>
        <span>{policy.safetyBadge}</span>
      </div>
    </section>
  );
}

function PolicyList({
  policies,
  activePolicyId,
  onSelectPolicy,
}: {
  policies: SmartReplyPolicyRecord[];
  activePolicyId: string;
  onSelectPolicy: (policyId: string) => void;
}) {
  return (
    <section className="min-w-0 w-full max-w-[calc(100vw-2rem)] justify-self-start overflow-hidden rounded-[1rem] border border-black/[0.08] bg-[#FFFFFF] p-2.5 shadow-[0_18px_46px_rgba(11,13,16,0.08),inset_0_1px_0_rgba(255,255,255,0.95)] sm:max-w-full sm:p-3">
      <div className="mb-2.5 flex min-w-0 flex-wrap items-start justify-between gap-2 px-1 sm:mb-3 sm:gap-3">
        <div className="min-w-0">
          <h2 className="text-lg font-semibold tracking-tight text-[#0B0D10]">
            Yanıt policy listesi
          </h2>
          <p className="mt-1 text-sm text-[#7A808A]">
            {policies.length} local kural görünür
          </p>
        </div>
        <span className="max-w-full rounded-full border border-black/[0.08] bg-[#F4F5F7] px-3 py-1 text-[11px] font-semibold text-[#525A65]">
          AI çağrısı yok
        </span>
      </div>

      <div className="grid gap-2">
        {policies.length > 0 ? (
          policies.map((policy) => {
            const active = policy.id === activePolicyId;
            const ChannelIcon = channelIconMap[policy.channel];

            return (
              <button
                key={policy.id}
                type="button"
                onClick={() => onSelectPolicy(policy.id)}
                className={`min-w-0 w-full overflow-hidden rounded-[0.95rem] border p-2.5 text-left transition sm:p-3 ${
                  active
                    ? "border-black/[0.2] bg-[#F7F8FA] shadow-[0_12px_26px_rgba(11,13,16,0.08)]"
                    : "border-transparent bg-[#FFFFFF] hover:border-black/[0.08] hover:bg-[#F7F8FA]"
                }`}
              >
                <div className="grid min-w-0 grid-cols-2 gap-2 sm:grid-cols-[minmax(14rem,1fr)_8rem_8rem] xl:grid-cols-[minmax(15rem,1fr)_7rem_8rem_7rem_8rem] xl:items-center xl:gap-3">
                  <div className="col-span-2 min-w-0 sm:col-span-1">
                    <div className="flex min-w-0 flex-wrap items-center gap-2">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[0.75rem] border border-black/[0.08] bg-[#F4F5F7] text-[#0B0D10]">
                        <ChannelIcon className="h-4 w-4" />
                      </span>
                      <h3 className="min-w-0 truncate text-base font-semibold text-[#0B0D10]">
                        {policy.name}
                      </h3>
                    </div>
                    <p className="mt-1 min-w-0 truncate text-sm text-[#525A65]">
                      {channelLabels[policy.channel]} /{" "}
                      {toneLabels[policy.toneProfile]}
                    </p>
                    <p className="mt-1 text-xs text-[#7A808A]">
                      Güncelleme: {policy.lastUpdatedAt}
                    </p>
                  </div>

                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#9AA0A8]">
                      Onay
                    </p>
                    <span
                      className={`mt-1 inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${
                        approvalTone[policy.approvalMode]
                      }`}
                    >
                      {approvalLabels[policy.approvalMode]}
                    </span>
                  </div>

                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#9AA0A8]">
                      İzinli
                    </p>
                    <p className="mt-1 line-clamp-1 text-sm font-semibold text-[#0B0D10] sm:line-clamp-2">
                      {policy.allowedAction}
                    </p>
                  </div>

                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#9AA0A8]">
                      Risk
                    </p>
                    <span
                      className={`mt-1 inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${
                        riskTone[policy.riskLevel]
                      }`}
                    >
                      {riskLabels[policy.riskLevel]}
                    </span>
                  </div>

                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#9AA0A8]">
                      Sorumlu
                    </p>
                    <p className="mt-1 text-sm font-semibold text-[#0B0D10]">
                      {policy.owner}
                    </p>
                  </div>
                </div>

                <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2 border-t border-black/[0.06] pt-2.5 sm:mt-3 sm:pt-3">
                  <p className="min-w-0 text-xs text-[#7A808A]">
                    Güvenlik:{" "}
                    <span className="font-semibold text-[#525A65]">
                      {policy.safetyBadge}
                    </span>
                  </p>
                  <span className="inline-flex max-w-full min-w-0 items-center gap-1.5 rounded-full border border-[#6B4E16]/20 bg-[#F3E9D2] px-2.5 py-1 text-[11px] font-semibold text-[#6B4E16]">
                    <HiOutlineExclamationTriangle className="h-3.5 w-3.5 shrink-0" />
                    <span className="truncate">{policy.blockedAction}</span>
                  </span>
                </div>
              </button>
            );
          })
        ) : (
          <div className="rounded-[1rem] border border-black/[0.08] bg-[#F7F8FA] px-4 py-10 text-center">
            <p className="text-base font-semibold text-[#0B0D10]">
              Filtreye uygun policy bulunamadı
            </p>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#7A808A]">
              Arama veya filtreler yalnız local policy haritası üzerinde
              eşleşme yapar.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

function PolicyDetailPanel({
  policy,
}: {
  policy: SmartReplyPolicyRecord | undefined;
}) {
  if (!policy) {
    return (
      <aside className="min-w-0 w-full max-w-[calc(100vw-2rem)] justify-self-start overflow-hidden rounded-[1rem] border border-black/[0.08] bg-[#FFFFFF] p-5 shadow-[0_18px_46px_rgba(11,13,16,0.08),inset_0_1px_0_rgba(255,255,255,0.95)] sm:max-w-full">
        <p className="text-sm font-semibold text-[#0B0D10]">
          Policy seçimi bekleniyor
        </p>
        <p className="mt-2 text-sm leading-6 text-[#7A808A]">
          Listeden bir policy seçildiğinde ton, onay sınırı ve güvenlik notu
          burada görünür.
        </p>
      </aside>
    );
  }

  return (
    <aside className="min-w-0 w-full max-w-[calc(100vw-2rem)] justify-self-start overflow-hidden rounded-[1rem] border border-black/[0.08] bg-[#FFFFFF] p-4 shadow-[0_18px_46px_rgba(11,13,16,0.08),inset_0_1px_0_rgba(255,255,255,0.95)] sm:max-w-full xl:sticky xl:top-4 xl:self-start">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#7A808A]">
            Seçili policy
          </p>
          <h2 className="mt-2 truncate text-2xl font-semibold tracking-tight text-[#0B0D10]">
            {policy.name}
          </h2>
          <p className="mt-1 text-sm text-[#525A65]">
            {channelLabels[policy.channel]} / {policy.owner}
          </p>
        </div>
        <span
          className={`shrink-0 rounded-full border px-2.5 py-1 text-xs font-semibold ${
            riskTone[policy.riskLevel]
          }`}
        >
          {riskLabels[policy.riskLevel]}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <div className="rounded-[0.9rem] border border-black/[0.08] bg-[#F7F8FA] p-3">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA0A8]">
            Ton
          </p>
          <p className="mt-1 text-sm font-semibold text-[#0B0D10]">
            {toneLabels[policy.toneProfile]}
          </p>
        </div>
        <div className="rounded-[0.9rem] border border-black/[0.08] bg-[#F7F8FA] p-3">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA0A8]">
            Onay
          </p>
          <p className="mt-1 text-sm font-semibold text-[#0B0D10]">
            {approvalLabels[policy.approvalMode]}
          </p>
        </div>
        <div className="rounded-[0.9rem] border border-black/[0.08] bg-[#F7F8FA] p-3">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA0A8]">
            Durum
          </p>
          <p className="mt-1 text-sm font-semibold text-[#0B0D10]">
            {policyStatusLabels[policy.status]}
          </p>
        </div>
        <div className="rounded-[0.9rem] border border-black/[0.08] bg-[#F7F8FA] p-3">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA0A8]">
            Güncel
          </p>
          <p className="mt-1 text-sm font-semibold text-[#0B0D10]">
            {policy.lastUpdatedAt}
          </p>
        </div>
      </div>

      <div className="mt-4 rounded-[0.95rem] border border-black/[0.08] bg-[#F7F8FA] p-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#7A808A]">
          Örnek önerilen cevap
        </p>
        <p className="mt-2 text-sm leading-6 text-[#525A65]">
          {policy.examplePrompt}
        </p>
        <p className="mt-3 rounded-[0.8rem] border border-black/[0.08] bg-[#FFFFFF] p-3 text-sm leading-6 text-[#0B0D10]">
          {policy.exampleReply}
        </p>
      </div>

      <div className="mt-4 rounded-[0.95rem] border border-[#6B4E16]/18 bg-[#F3E9D2] p-3 text-[#654A14]">
        <div className="flex items-center gap-2">
          <HiOutlineSparkles className="h-4 w-4" />
          <p className="text-sm font-semibold">Güvenlik sınırı</p>
        </div>
        <p className="mt-2 text-sm leading-6">
          Öneri üretir, otomatik gönderim yapmaz. {policy.automationBoundary}
        </p>
      </div>

      <div className="mt-4 rounded-[0.95rem] border border-black/[0.08] bg-[#FFFFFF] p-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#7A808A]">
          Yasaklı konular / işlemler
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {policy.forbiddenTopics.map((topic) => (
            <span
              key={topic}
              className="rounded-full border border-black/[0.08] bg-[#F4F5F7] px-2.5 py-1 text-xs font-semibold text-[#525A65]"
            >
              {topic}
            </span>
          ))}
        </div>
        <p className="mt-3 text-sm leading-6 text-[#7A808A]">
          {policy.blockedAction}
        </p>
      </div>

      <div className="mt-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#7A808A]">
          Policy hafızası
        </p>
        <div className="mt-3 grid gap-3">
          {policy.timeline.map((item) => (
            <div key={item.id} className="flex gap-3">
              <div className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-[#0B0D10]" />
              <div className="min-w-0">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-sm font-semibold text-[#0B0D10]">
                    {item.label}
                  </p>
                  <span className="text-xs text-[#9AA0A8]">
                    {item.atLabel}
                  </span>
                </div>
                <p className="mt-1 text-sm leading-6 text-[#525A65]">
                  {item.note}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}

export function SmartReplySettingsWorkspace() {
  const [searchQuery, setSearchQuery] = useState("");
  const [channelFilter, setChannelFilter] = useState<ChannelFilter>("all");
  const [approvalFilter, setApprovalFilter] = useState<ApprovalFilter>("all");
  const [riskFilter, setRiskFilter] = useState<RiskFilter>("all");
  const [activePolicyId, setActivePolicyId] = useState(
    smartReplyPolicyRecords[0]?.id ?? "",
  );

  const filteredPolicies = useMemo(
    () =>
      smartReplyPolicyRecords.filter((policy) => {
        const channelMatches =
          channelFilter === "all" || policy.channel === channelFilter;
        const approvalMatches =
          approvalFilter === "all" || policy.approvalMode === approvalFilter;
        const riskMatches = riskFilter === "all" || policy.riskLevel === riskFilter;

        return (
          channelMatches &&
          approvalMatches &&
          riskMatches &&
          matchesSearch(policy, searchQuery)
        );
      }),
    [approvalFilter, channelFilter, riskFilter, searchQuery],
  );

  const activePolicy =
    filteredPolicies.find((policy) => policy.id === activePolicyId) ??
    filteredPolicies[0] ??
    smartReplyPolicyRecords[0];

  return (
    <div className="min-w-0 bg-[#EEF0F3] px-2.5 py-2.5 text-[#0B0D10] sm:px-4 lg:px-6 lg:py-4">
      <div className="mx-auto flex w-full max-w-[118rem] flex-col gap-2.5 lg:gap-3">
        <header className="rounded-[0.95rem] border border-black/[0.08] bg-[#FFFFFF] p-3 shadow-[0_16px_40px_rgba(11,13,16,0.075),inset_0_1px_0_rgba(255,255,255,0.95)] sm:rounded-[1rem] sm:p-4">
          <div className="flex flex-col gap-2.5 lg:flex-row lg:items-start lg:justify-between">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <span className="rounded-full border border-black/[0.08] bg-[#F4F5F7] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#525A65] sm:px-3 sm:py-1 sm:text-[11px] sm:tracking-[0.18em]">
                  AI cevap yönetişimi
                </span>
                <span className="rounded-full border border-[#6B4E16]/20 bg-[#F3E9D2] px-2.5 py-0.5 text-[10px] font-semibold text-[#6B4E16] sm:px-3 sm:py-1 sm:text-[11px]">
                  MVP / Local policy map
                </span>
              </div>
              <h1 className="mt-2 text-[clamp(1.65rem,3vw,3rem)] font-semibold leading-[1] tracking-tight text-[#0B0D10] sm:mt-3">
                Akıllı Yanıt Ayarları
              </h1>
              <p className="mt-1.5 max-w-3xl text-[13px] leading-5 text-[#525A65] sm:mt-2 sm:text-[0.95rem] sm:leading-6">
                AI öneri tonu, kanal kuralları, insan onayı ve güvenli cevap
                sınırları tek local çalışma alanında izlenir. Bu MVP gerçek AI
                çağrısı, otomatik iletim veya kalıcı kayıt yapmaz.
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5 sm:gap-2 lg:justify-end">
              <button
                type="button"
                disabled
                className="inline-flex h-8 cursor-not-allowed items-center justify-center rounded-full border border-black/[0.08] bg-[#F4F5F7] px-2.5 text-xs font-semibold text-[#7A808A] sm:h-9 sm:px-3 sm:text-sm"
              >
                Kural taslağı sonraki faz
              </button>
              <span className="inline-flex h-8 items-center rounded-full bg-[#0B0D10] px-2.5 text-xs font-semibold text-[#FFFFFF] sm:h-9 sm:px-3 sm:text-sm">
                Otomatik gönderim kapalı
              </span>
            </div>
          </div>
        </header>

        <SelectedPolicySignal policy={activePolicy} />

        <KpiStrip policies={smartReplyPolicyRecords} />

        <PolicyFilters
          searchQuery={searchQuery}
          channelFilter={channelFilter}
          approvalFilter={approvalFilter}
          riskFilter={riskFilter}
          onSearchChange={setSearchQuery}
          onChannelChange={setChannelFilter}
          onApprovalChange={setApprovalFilter}
          onRiskChange={setRiskFilter}
        />

        <div className="grid min-w-0 w-full max-w-[calc(100vw-2rem)] gap-2.5 overflow-hidden sm:max-w-full sm:gap-3 xl:grid-cols-[minmax(0,1.45fr)_minmax(22rem,0.72fr)] xl:gap-4 xl:overflow-visible">
          <PolicyList
            policies={filteredPolicies}
            activePolicyId={activePolicy?.id ?? ""}
            onSelectPolicy={setActivePolicyId}
          />
          <PolicyDetailPanel policy={activePolicy} />
        </div>
      </div>
    </div>
  );
}

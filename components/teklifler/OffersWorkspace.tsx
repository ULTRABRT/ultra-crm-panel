"use client";

import { useMemo, useState } from "react";
import {
  HiOutlineArrowTrendingUp,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineCurrencyDollar,
  HiOutlineDocumentText,
  HiOutlineExclamationTriangle,
  HiOutlineMagnifyingGlass,
  HiOutlineSparkles,
} from "react-icons/hi2";

import { offerRecords } from "../../data/offers";
import type {
  OfferPriority,
  OfferRecord,
  OfferSource,
  OfferStatus,
} from "../../types/offers";

type OfferStatusFilter = OfferStatus | "all";
type OfferPriorityFilter = OfferPriority | "all";
type OfferSourceFilter = OfferSource | "all";

const statusLabels: Record<OfferStatus, string> = {
  draft: "Taslak",
  sent: "Gonderildi",
  follow_up: "Takipte",
  negotiation: "Pazarlik",
  won: "Kazanildi",
  lost: "Kaybedildi",
};

const priorityLabels: Record<OfferPriority, string> = {
  low: "Dusuk",
  medium: "Orta",
  high: "Yuksek",
  critical: "Kritik",
};

const sourceLabels: Record<OfferSource, string> = {
  inbox: "Ultra Inbox",
  lead: "Lead",
  customer_card: "Musteri karti",
  field_visit: "Saha ziyareti",
};

const statusTone: Record<OfferStatus, string> = {
  draft: "border-[#D6DAE0] bg-[#F4F5F7] text-[#525A65]",
  sent: "border-[#C8CDD5] bg-[#FFFFFF] text-[#0B0D10]",
  follow_up: "border-[#1F2937]/20 bg-[#111827] text-[#FFFFFF]",
  negotiation: "border-[#8A6A2E]/25 bg-[#F3E9D2] text-[#654A14]",
  won: "border-[#2F6B4F]/20 bg-[#DDEBE4] text-[#24573F]",
  lost: "border-[#9AA0A8]/25 bg-[#EEF0F3] text-[#6B7280]",
};

const priorityTone: Record<OfferPriority, string> = {
  low: "border-[#D6DAE0] bg-[#F4F5F7] text-[#6B7280]",
  medium: "border-[#C8CDD5] bg-[#FFFFFF] text-[#525A65]",
  high: "border-[#0B0D10]/15 bg-[#ECEFF3] text-[#0B0D10]",
  critical: "border-[#6B4E16]/25 bg-[#F3E9D2] text-[#6B4E16]",
};

const moneyFormatter = new Intl.NumberFormat("tr-TR", {
  maximumFractionDigits: 0,
  style: "currency",
  currency: "TRY",
});

function formatAmount(offer: OfferRecord) {
  if (offer.currency === "TRY") {
    return moneyFormatter.format(offer.amount);
  }

  return `${offer.amount.toLocaleString("tr-TR")} ${offer.currency}`;
}

function normalizeSearch(value: string) {
  return value.trim().toLocaleLowerCase("tr-TR");
}

function matchesSearch(offer: OfferRecord, query: string) {
  const normalizedQuery = normalizeSearch(query);

  if (!normalizedQuery) {
    return true;
  }

  return [
    offer.customerName,
    offer.companyName,
    offer.title,
    offer.owner,
    statusLabels[offer.status],
    priorityLabels[offer.priority],
    sourceLabels[offer.source],
    offer.nextAction,
  ].some((value) =>
    value.toLocaleLowerCase("tr-TR").includes(normalizedQuery),
  );
}

function getOpenOffers(offers: OfferRecord[]) {
  return offers.filter(
    (offer) => offer.status !== "won" && offer.status !== "lost",
  );
}

function calculateAverageAge(offers: OfferRecord[]) {
  if (offers.length === 0) {
    return 0;
  }

  const totalAge = offers.reduce((total, offer) => total + offer.ageDays, 0);

  return Math.round(totalAge / offers.length);
}

function KpiStrip({ offers }: { offers: OfferRecord[] }) {
  const openOffers = getOpenOffers(offers);
  const waitingOffers = offers.filter(
    (offer) => offer.status === "follow_up" || offer.status === "sent",
  );
  const totalPotential = openOffers.reduce(
    (total, offer) => total + offer.amount,
    0,
  );
  const highProbabilityOffers = openOffers.filter(
    (offer) => offer.probability >= 70,
  );

  const kpis = [
    {
      label: "Acik teklifler",
      value: openOffers.length.toString(),
      detail: "Aktif karar masasi",
      Icon: HiOutlineDocumentText,
    },
    {
      label: "Takip bekleyen",
      value: waitingOffers.length.toString(),
      detail: "Bugun oncelikli",
      Icon: HiOutlineClock,
    },
    {
      label: "Teklif potansiyeli",
      value: moneyFormatter.format(totalPotential),
      detail: "Acik portfoy",
      Icon: HiOutlineCurrencyDollar,
    },
    {
      label: "Ortalama yas",
      value: `${calculateAverageAge(openOffers)} gun`,
      detail: "Acik tekliflerde",
      Icon: HiOutlineCalendarDays,
    },
    {
      label: "Yuksek ihtimal",
      value: highProbabilityOffers.length.toString(),
      detail: "%70 ve uzeri",
      Icon: HiOutlineArrowTrendingUp,
    },
  ];

  return (
    <section className="grid grid-cols-2 gap-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
      {kpis.map(({ label, value, detail, Icon }, index) => (
        <div
          key={label}
          className={`min-w-0 rounded-[0.95rem] border border-black/[0.08] bg-[#FFFFFF] p-2.5 shadow-[0_12px_28px_rgba(11,13,16,0.055),inset_0_1px_0_rgba(255,255,255,0.95)] sm:p-3 ${
            index === kpis.length - 1 ? "col-span-2 md:col-span-1" : ""
          }`}
        >
          <div className="flex items-center justify-between gap-3">
            <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[#7A808A] sm:text-[11px]">
              {label}
            </p>
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-[0.65rem] border border-black/[0.08] bg-[#F4F5F7] text-[#0B0D10] sm:h-8 sm:w-8 sm:rounded-[0.7rem]">
              <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </div>
          </div>
          <p className="mt-1.5 truncate text-lg font-semibold tracking-tight text-[#0B0D10] sm:mt-2 sm:text-2xl">
            {value}
          </p>
          <p className="mt-0.5 text-xs text-[#7A808A]">{detail}</p>
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
      <span className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.16em] text-[#7A808A]">
        {label}
      </span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value as TValue)}
        className="h-9 w-full rounded-[0.8rem] border border-black/[0.08] bg-[#FFFFFF] px-3 text-sm font-semibold text-[#0B0D10] outline-none transition focus:border-black/[0.25]"
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

function OfferFilters({
  searchQuery,
  statusFilter,
  priorityFilter,
  sourceFilter,
  onSearchChange,
  onStatusChange,
  onPriorityChange,
  onSourceChange,
}: {
  searchQuery: string;
  statusFilter: OfferStatusFilter;
  priorityFilter: OfferPriorityFilter;
  sourceFilter: OfferSourceFilter;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: OfferStatusFilter) => void;
  onPriorityChange: (value: OfferPriorityFilter) => void;
  onSourceChange: (value: OfferSourceFilter) => void;
}) {
  return (
    <section className="rounded-[1rem] border border-black/[0.08] bg-[#FFFFFF] p-2.5 shadow-[0_14px_34px_rgba(11,13,16,0.055),inset_0_1px_0_rgba(255,255,255,0.95)] sm:p-3">
      <div className="grid grid-cols-2 gap-2 lg:grid-cols-[minmax(16rem,1fr)_9rem_9rem_10rem] lg:gap-3">
        <label className="col-span-2 min-w-0 lg:col-span-1">
          <span className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.16em] text-[#7A808A]">
            Local arama
          </span>
          <div className="flex h-9 items-center gap-2 rounded-[0.8rem] border border-black/[0.08] bg-[#F7F8FA] px-3 text-[#7A808A]">
            <HiOutlineMagnifyingGlass className="h-4 w-4 shrink-0" />
            <input
              value={searchQuery}
              onChange={(event) => onSearchChange(event.target.value)}
              className="h-full min-w-0 flex-1 bg-transparent text-sm font-medium text-[#0B0D10] outline-none placeholder:text-[#9AA0A8]"
              placeholder="Musteri, firma, baslik veya sorumlu ara..."
            />
          </div>
        </label>

        <FilterSelect<OfferStatusFilter>
          label="Durum"
          value={statusFilter}
          onChange={onStatusChange}
          options={[
            { label: "Tumu", value: "all" },
            ...Object.entries(statusLabels).map(([value, label]) => ({
              label,
              value: value as OfferStatusFilter,
            })),
          ]}
        />

        <FilterSelect<OfferPriorityFilter>
          label="Oncelik"
          value={priorityFilter}
          onChange={onPriorityChange}
          options={[
            { label: "Tumu", value: "all" },
            ...Object.entries(priorityLabels).map(([value, label]) => ({
              label,
              value: value as OfferPriorityFilter,
            })),
          ]}
        />

        <FilterSelect<OfferSourceFilter>
          label="Kaynak"
          value={sourceFilter}
          onChange={onSourceChange}
          className="col-span-2 sm:col-span-1 lg:col-span-1"
          options={[
            { label: "Tumu", value: "all" },
            ...Object.entries(sourceLabels).map(([value, label]) => ({
              label,
              value: value as OfferSourceFilter,
            })),
          ]}
        />
      </div>
    </section>
  );
}

function SelectedOfferSignal({ offer }: { offer: OfferRecord | undefined }) {
  if (!offer) {
    return null;
  }

  return (
    <section className="xl:hidden rounded-[0.95rem] border border-black/[0.08] bg-[#FFFFFF] p-3 shadow-[0_12px_28px_rgba(11,13,16,0.055),inset_0_1px_0_rgba(255,255,255,0.95)]">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7A808A]">
            Secili teklif
          </p>
          <p className="mt-1 truncate text-sm font-semibold text-[#0B0D10]">
            {offer.companyName}
          </p>
          <p className="mt-0.5 truncate text-xs text-[#525A65]">
            {offer.title}
          </p>
        </div>
        <span
          className={`shrink-0 rounded-full border px-2.5 py-1 text-xs font-semibold ${
            statusTone[offer.status]
          }`}
        >
          {statusLabels[offer.status]}
        </span>
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-[#7A808A]">
        <span>{formatAmount(offer)}</span>
        <span aria-hidden="true">/</span>
        <span>%{offer.probability} ihtimal</span>
        <span aria-hidden="true">/</span>
        <span>{offer.followUpAt}</span>
      </div>
    </section>
  );
}

function OfferQueue({
  offers,
  activeOfferId,
  onSelectOffer,
}: {
  offers: OfferRecord[];
  activeOfferId: string;
  onSelectOffer: (offerId: string) => void;
}) {
  return (
    <section className="min-w-0 rounded-[1rem] border border-black/[0.08] bg-[#FFFFFF] p-3 shadow-[0_18px_46px_rgba(11,13,16,0.08),inset_0_1px_0_rgba(255,255,255,0.95)]">
      <div className="mb-3 flex flex-wrap items-start justify-between gap-3 px-1">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-[#0B0D10]">
            Teklif kuyruğu
          </h2>
          <p className="mt-1 text-sm text-[#7A808A]">
            {offers.length} local kayıt görünür
          </p>
        </div>
        <span className="rounded-full border border-black/[0.08] bg-[#F4F5F7] px-3 py-1 text-[11px] font-semibold text-[#525A65]">
          API bağlantısı yok
        </span>
      </div>

      <div className="grid gap-2">
        {offers.length > 0 ? (
          offers.map((offer) => {
            const active = offer.id === activeOfferId;

            return (
              <button
                key={offer.id}
                type="button"
                onClick={() => onSelectOffer(offer.id)}
                className={`w-full rounded-[0.95rem] border p-3 text-left transition ${
                  active
                    ? "border-black/[0.2] bg-[#F7F8FA] shadow-[0_12px_26px_rgba(11,13,16,0.08)]"
                    : "border-transparent bg-[#FFFFFF] hover:border-black/[0.08] hover:bg-[#F7F8FA]"
                }`}
              >
                <div className="grid gap-3 xl:grid-cols-[minmax(16rem,1fr)_8.5rem_7rem_8rem] xl:items-center">
                  <div className="min-w-0">
                    <div className="flex min-w-0 flex-wrap items-center gap-2">
                      <h3 className="truncate text-base font-semibold text-[#0B0D10]">
                        {offer.companyName}
                      </h3>
                      <span
                        className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${
                          priorityTone[offer.priority]
                        }`}
                      >
                        {priorityLabels[offer.priority]}
                      </span>
                    </div>
                    <p className="mt-1 truncate text-sm text-[#525A65]">
                      {offer.title}
                    </p>
                    <p className="mt-1 text-xs text-[#7A808A]">
                      {offer.customerName} · {sourceLabels[offer.source]}
                    </p>
                  </div>

                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#9AA0A8]">
                      Tutar
                    </p>
                    <p className="mt-1 text-sm font-semibold text-[#0B0D10]">
                      {formatAmount(offer)}
                    </p>
                  </div>

                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#9AA0A8]">
                      Durum
                    </p>
                    <span
                      className={`mt-1 inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${
                        statusTone[offer.status]
                      }`}
                    >
                      {statusLabels[offer.status]}
                    </span>
                  </div>

                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#9AA0A8]">
                      Takip
                    </p>
                    <p className="mt-1 text-sm font-semibold text-[#0B0D10]">
                      {offer.followUpAt}
                    </p>
                    <p className="mt-0.5 text-xs text-[#7A808A]">
                      {offer.owner}
                    </p>
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-black/[0.06] pt-3">
                  <p className="text-xs text-[#7A808A]">
                    Son temas:{" "}
                    <span className="font-semibold text-[#525A65]">
                      {offer.lastTouchAt}
                    </span>
                  </p>
                  <span className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-[#6B4E16]/20 bg-[#F3E9D2] px-2.5 py-1 text-[11px] font-semibold text-[#6B4E16]">
                    <HiOutlineExclamationTriangle className="h-3.5 w-3.5 shrink-0" />
                    <span className="truncate">{offer.riskLabel}</span>
                  </span>
                </div>
              </button>
            );
          })
        ) : (
          <div className="rounded-[1rem] border border-black/[0.08] bg-[#F7F8FA] px-4 py-10 text-center">
            <p className="text-base font-semibold text-[#0B0D10]">
              Filtreye uygun teklif bulunamadı
            </p>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#7A808A]">
              Arama veya filtreleri daralttığında yalnız local contract verisi
              üzerinde eşleşme yapılır.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

function OfferDetailPanel({ offer }: { offer: OfferRecord | undefined }) {
  if (!offer) {
    return (
      <aside className="rounded-[1rem] border border-black/[0.08] bg-[#FFFFFF] p-5 shadow-[0_18px_46px_rgba(11,13,16,0.08),inset_0_1px_0_rgba(255,255,255,0.95)]">
        <p className="text-sm font-semibold text-[#0B0D10]">
          Teklif seçimi bekleniyor
        </p>
        <p className="mt-2 text-sm leading-6 text-[#7A808A]">
          Listeden bir teklif seçildiğinde müşteri bağlamı ve satış hafızası
          burada görünür.
        </p>
      </aside>
    );
  }

  return (
    <aside className="rounded-[1rem] border border-black/[0.08] bg-[#FFFFFF] p-4 shadow-[0_18px_46px_rgba(11,13,16,0.08),inset_0_1px_0_rgba(255,255,255,0.95)] lg:sticky lg:top-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7A808A]">
            Seçili teklif
          </p>
          <h2 className="mt-2 text-xl font-semibold tracking-tight text-[#0B0D10]">
            {offer.companyName}
          </h2>
          <p className="mt-1 text-sm text-[#525A65]">{offer.title}</p>
        </div>
        <span
          className={`shrink-0 rounded-full border px-2.5 py-1 text-xs font-semibold ${
            statusTone[offer.status]
          }`}
        >
          {statusLabels[offer.status]}
        </span>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-2">
        <div className="rounded-[0.9rem] border border-black/[0.08] bg-[#F7F8FA] p-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#7A808A]">
            Potansiyel
          </p>
          <p className="mt-1 text-lg font-semibold text-[#0B0D10]">
            {formatAmount(offer)}
          </p>
        </div>
        <div className="rounded-[0.9rem] border border-black/[0.08] bg-[#F7F8FA] p-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#7A808A]">
            Olasılık
          </p>
          <p className="mt-1 text-lg font-semibold text-[#0B0D10]">
            %{offer.probability}
          </p>
        </div>
      </div>

      <div className="mt-4 rounded-[0.95rem] border border-black/[0.08] bg-[#F7F8FA] p-4">
        <div className="flex items-center gap-2">
          <HiOutlineBriefcase className="h-4 w-4 text-[#525A65]" />
          <p className="text-sm font-semibold text-[#0B0D10]">
            Müşteri bağlamı
          </p>
        </div>
        <p className="mt-2 text-sm leading-6 text-[#525A65]">
          {offer.customerName} · {sourceLabels[offer.source]} · sorumlu{" "}
          {offer.owner}
        </p>
      </div>

      <div className="mt-4 rounded-[0.95rem] border border-black/[0.08] bg-[#F7F8FA] p-4">
        <div className="flex items-center gap-2">
          <HiOutlineCheckCircle className="h-4 w-4 text-[#525A65]" />
          <p className="text-sm font-semibold text-[#0B0D10]">
            Takip aksiyonu
          </p>
        </div>
        <p className="mt-2 text-sm leading-6 text-[#525A65]">
          {offer.nextAction}
        </p>
      </div>

      <div className="mt-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#7A808A]">
          Eksik bilgi
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {offer.missingInfo.length > 0 ? (
            offer.missingInfo.map((item) => (
              <span
                key={item}
                className="rounded-full border border-black/[0.08] bg-[#FFFFFF] px-2.5 py-1 text-xs font-semibold text-[#525A65]"
              >
                {item}
              </span>
            ))
          ) : (
            <span className="rounded-full border border-[#2F6B4F]/20 bg-[#DDEBE4] px-2.5 py-1 text-xs font-semibold text-[#24573F]">
              Kritik eksik bilgi yok
            </span>
          )}
        </div>
      </div>

      <div className="mt-4 rounded-[0.95rem] border border-black/[0.08] bg-[#0B0D10] p-4 text-white">
        <div className="flex items-center gap-2">
          <HiOutlineSparkles className="h-4 w-4" />
          <p className="text-sm font-semibold">AI / satış önerisi</p>
        </div>
        <p className="mt-2 text-sm leading-6 text-white/68">
          {offer.salesSuggestion}
        </p>
        <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/35">
          Öneri niteliğindedir · otomatik işlem yok
        </p>
      </div>

      <div className="mt-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#7A808A]">
          Satış hafızası
        </p>
        <div className="mt-3 space-y-3">
          {offer.timeline.map((item) => (
            <div key={item.id} className="flex gap-3">
              <div className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-[#0B0D10]" />
              <div className="min-w-0">
                <div className="flex min-w-0 flex-wrap items-center gap-2">
                  <p className="text-sm font-semibold text-[#0B0D10]">
                    {item.label}
                  </p>
                  <span className="text-xs text-[#9AA0A8]">{item.atLabel}</span>
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

export function OffersWorkspace() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<OfferStatusFilter>("all");
  const [priorityFilter, setPriorityFilter] =
    useState<OfferPriorityFilter>("all");
  const [sourceFilter, setSourceFilter] = useState<OfferSourceFilter>("all");
  const [activeOfferId, setActiveOfferId] = useState(offerRecords[0]?.id ?? "");

  const filteredOffers = useMemo(
    () =>
      offerRecords.filter((offer) => {
        const statusMatches =
          statusFilter === "all" || offer.status === statusFilter;
        const priorityMatches =
          priorityFilter === "all" || offer.priority === priorityFilter;
        const sourceMatches =
          sourceFilter === "all" || offer.source === sourceFilter;

        return (
          statusMatches &&
          priorityMatches &&
          sourceMatches &&
          matchesSearch(offer, searchQuery)
        );
      }),
    [priorityFilter, searchQuery, sourceFilter, statusFilter],
  );

  const activeOffer =
    filteredOffers.find((offer) => offer.id === activeOfferId) ??
    filteredOffers[0] ??
    offerRecords[0];

  return (
    <div className="min-w-0 bg-[#EEF0F3] px-3 py-3 text-[#0B0D10] sm:px-4 lg:px-6 lg:py-4">
      <div className="mx-auto flex w-full max-w-[118rem] flex-col gap-3">
        <header className="rounded-[1rem] border border-black/[0.08] bg-[#FFFFFF] p-3.5 shadow-[0_16px_40px_rgba(11,13,16,0.075),inset_0_1px_0_rgba(255,255,255,0.95)] sm:p-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-black/[0.08] bg-[#F4F5F7] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#525A65]">
                  Satış komut yüzeyi
                </span>
                <span className="rounded-full border border-[#6B4E16]/20 bg-[#F3E9D2] px-3 py-1 text-[11px] font-semibold text-[#6B4E16]">
                  MVP / Local contract
                </span>
              </div>
              <h1 className="mt-3 text-[clamp(1.85rem,3.4vw,3.25rem)] font-semibold leading-[0.98] tracking-tight text-[#0B0D10]">
                Teklifler
              </h1>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-[#525A65] sm:text-[0.95rem]">
                Teklif, takip, ciro riski ve satış önceliği tek local çalışma
                alanında izlenir. Bu MVP gerçek kayıt, gönderim veya kalıcı
                işlem yapmaz.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 lg:justify-end">
              <button
                type="button"
                disabled
                className="inline-flex h-9 cursor-not-allowed items-center justify-center rounded-full border border-black/[0.08] bg-[#F4F5F7] px-3 text-sm font-semibold text-[#7A808A]"
              >
                Yeni teklif sonraki faz
              </button>
              <span className="inline-flex h-9 items-center rounded-full bg-[#0B0D10] px-3 text-sm font-semibold text-[#FFFFFF]">
                Local veri · işlem yok
              </span>
            </div>
          </div>
        </header>

        <SelectedOfferSignal offer={activeOffer} />

        <KpiStrip offers={offerRecords} />

        <OfferFilters
          searchQuery={searchQuery}
          statusFilter={statusFilter}
          priorityFilter={priorityFilter}
          sourceFilter={sourceFilter}
          onSearchChange={setSearchQuery}
          onStatusChange={setStatusFilter}
          onPriorityChange={setPriorityFilter}
          onSourceChange={setSourceFilter}
        />

        <div className="grid min-w-0 gap-3 xl:grid-cols-[minmax(0,1.45fr)_minmax(22rem,0.72fr)] xl:gap-4">
          <OfferQueue
            offers={filteredOffers}
            activeOfferId={activeOffer?.id ?? ""}
            onSelectOffer={setActiveOfferId}
          />
          <OfferDetailPanel offer={activeOffer} />
        </div>
      </div>
    </div>
  );
}

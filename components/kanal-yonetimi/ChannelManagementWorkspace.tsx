"use client";

import { useMemo, useState } from "react";
import {
  HiOutlineArrowTrendingUp,
  HiOutlineBolt,
  HiOutlineChatBubbleLeftRight,
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineExclamationTriangle,
  HiOutlineMagnifyingGlass,
  HiOutlinePhone,
  HiOutlineShare,
  HiOutlineSparkles,
} from "react-icons/hi2";

import { managedChannelRecords } from "../../data/channelManagement";
import type {
  ChannelHealthStatus,
  ChannelIntegrationState,
  ChannelPriority,
  ManagedChannelRecord,
  ManagedChannelType,
} from "../../types/channelManagement";

type ChannelTypeFilter = ManagedChannelType | "all";
type ChannelHealthFilter = ChannelHealthStatus | "all";
type ChannelPriorityFilter = ChannelPriority | "all";

const typeLabels: Record<ManagedChannelType, string> = {
  whatsapp: "WhatsApp",
  instagram: "Instagram",
  messenger: "Messenger",
  web_form: "Web Form",
  phone: "Telefon",
  referral: "Referans",
};

const healthLabels: Record<ChannelHealthStatus, string> = {
  healthy: "Sağlıklı",
  watch: "Izlemede",
  action_required: "Aksiyon gerekli",
  paused: "Duraklatıldı",
};

const priorityLabels: Record<ChannelPriority, string> = {
  low: "Düşük",
  medium: "Orta",
  high: "Yüksek",
  critical: "Kritik",
};

const integrationLabels: Record<ChannelIntegrationState, string> = {
  local_mapped: "Local harita",
  manual_review: "Manuel kontrol",
  needs_setup: "Sonraki faz kurulumu",
  paused_local: "Local beklemede",
};

const healthTone: Record<ChannelHealthStatus, string> = {
  healthy: "border-[#2F6B4F]/20 bg-[#DDEBE4] text-[#24573F]",
  watch: "border-[#8A6A2E]/25 bg-[#F3E9D2] text-[#654A14]",
  action_required: "border-[#1F2937]/20 bg-[#111827] text-[#FFFFFF]",
  paused: "border-[#9AA0A8]/25 bg-[#EEF0F3] text-[#6B7280]",
};

const priorityTone: Record<ChannelPriority, string> = {
  low: "border-[#D6DAE0] bg-[#F4F5F7] text-[#6B7280]",
  medium: "border-[#C8CDD5] bg-[#FFFFFF] text-[#525A65]",
  high: "border-[#0B0D10]/15 bg-[#ECEFF3] text-[#0B0D10]",
  critical: "border-[#6B4E16]/25 bg-[#F3E9D2] text-[#6B4E16]",
};

const typeIconMap = {
  whatsapp: HiOutlineChatBubbleLeftRight,
  instagram: HiOutlineSparkles,
  messenger: HiOutlineChatBubbleLeftRight,
  web_form: HiOutlineBolt,
  phone: HiOutlinePhone,
  referral: HiOutlineShare,
};

function normalizeSearch(value: string) {
  return value.trim().toLocaleLowerCase("tr-TR");
}

function formatPercent(value: number) {
  return `%${value}`;
}

function matchesSearch(channel: ManagedChannelRecord, query: string) {
  const normalizedQuery = normalizeSearch(query);

  if (!normalizedQuery) {
    return true;
  }

  return [
    channel.name,
    typeLabels[channel.type],
    healthLabels[channel.healthStatus],
    priorityLabels[channel.priority],
    channel.owner,
    channel.statusLabel,
    channel.riskLabel,
    channel.nextAction,
  ].some((value) =>
    value.toLocaleLowerCase("tr-TR").includes(normalizedQuery),
  );
}

function getActiveChannels(channels: ManagedChannelRecord[]) {
  return channels.filter((channel) => channel.healthStatus !== "paused");
}

function KpiStrip({ channels }: { channels: ManagedChannelRecord[] }) {
  const activeChannels = getActiveChannels(channels);
  const healthyChannels = channels.filter(
    (channel) => channel.healthStatus === "healthy",
  );
  const actionChannels = channels.filter(
    (channel) =>
      channel.healthStatus === "action_required" ||
      channel.priority === "critical",
  );
  const todayLeads = channels.reduce(
    (total, channel) => total + channel.todayLeads,
    0,
  );
  const offerProducingChannels = channels.filter(
    (channel) => channel.offerConversionRate >= 20,
  );

  const kpis = [
    {
      label: "Aktif kanallar",
      value: activeChannels.length.toString(),
      detail: "Local izleme",
      Icon: HiOutlineShare,
    },
    {
      label: "Sağlıklı",
      value: healthyChannels.length.toString(),
      detail: "Temiz akış",
      Icon: HiOutlineCheckCircle,
    },
    {
      label: "Aksiyon gerekli",
      value: actionChannels.length.toString(),
      detail: "Operasyon riski",
      Icon: HiOutlineExclamationTriangle,
    },
    {
      label: "Bugünkü lead",
      value: todayLeads.toString(),
      detail: "Tüm local kanallar",
      Icon: HiOutlineBolt,
    },
    {
      label: "Teklif üreten",
      value: offerProducingChannels.length.toString(),
      detail: "%20 ve üzeri",
      Icon: HiOutlineArrowTrendingUp,
    },
  ];

  return (
    <section className="grid grid-cols-2 gap-2 md:grid-cols-3 xl:grid-cols-5">
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

function ChannelFilters({
  searchQuery,
  typeFilter,
  healthFilter,
  priorityFilter,
  onSearchChange,
  onTypeChange,
  onHealthChange,
  onPriorityChange,
}: {
  searchQuery: string;
  typeFilter: ChannelTypeFilter;
  healthFilter: ChannelHealthFilter;
  priorityFilter: ChannelPriorityFilter;
  onSearchChange: (value: string) => void;
  onTypeChange: (value: ChannelTypeFilter) => void;
  onHealthChange: (value: ChannelHealthFilter) => void;
  onPriorityChange: (value: ChannelPriorityFilter) => void;
}) {
  return (
    <section className="rounded-[1rem] border border-black/[0.08] bg-[#FFFFFF] p-2.5 shadow-[0_14px_34px_rgba(11,13,16,0.055),inset_0_1px_0_rgba(255,255,255,0.95)] sm:p-3">
      <div className="grid grid-cols-2 gap-2 lg:grid-cols-[minmax(16rem,1fr)_9rem_10rem_9rem] lg:gap-3">
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
              placeholder="Kanal, platform, durum veya sorumlu ara..."
            />
          </div>
        </label>

        <FilterSelect<ChannelTypeFilter>
          label="Kanal"
          value={typeFilter}
          onChange={onTypeChange}
          options={[
            { label: "Tümü", value: "all" },
            ...Object.entries(typeLabels).map(([value, label]) => ({
              label,
              value: value as ChannelTypeFilter,
            })),
          ]}
        />

        <FilterSelect<ChannelHealthFilter>
          label="Sağlık"
          value={healthFilter}
          onChange={onHealthChange}
          options={[
            { label: "Tümü", value: "all" },
            ...Object.entries(healthLabels).map(([value, label]) => ({
              label,
              value: value as ChannelHealthFilter,
            })),
          ]}
        />

        <FilterSelect<ChannelPriorityFilter>
          label="Öncelik"
          value={priorityFilter}
          onChange={onPriorityChange}
          className="col-span-2 sm:col-span-1 lg:col-span-1"
          options={[
            { label: "Tümü", value: "all" },
            ...Object.entries(priorityLabels).map(([value, label]) => ({
              label,
              value: value as ChannelPriorityFilter,
            })),
          ]}
        />
      </div>
    </section>
  );
}

function SelectedChannelSignal({
  channel,
}: {
  channel: ManagedChannelRecord | undefined;
}) {
  if (!channel) {
    return null;
  }

  return (
    <section className="xl:hidden rounded-[0.95rem] border border-black/[0.08] bg-[#FFFFFF] p-3 shadow-[0_12px_28px_rgba(11,13,16,0.055),inset_0_1px_0_rgba(255,255,255,0.95)]">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7A808A]">
            Seçili kanal
          </p>
          <p className="mt-1 truncate text-sm font-semibold text-[#0B0D10]">
            {channel.name}
          </p>
          <p className="mt-0.5 truncate text-xs text-[#525A65]">
            {typeLabels[channel.type]} / {channel.owner}
          </p>
        </div>
        <span
          className={`shrink-0 rounded-full border px-2.5 py-1 text-xs font-semibold ${
            healthTone[channel.healthStatus]
          }`}
        >
          {healthLabels[channel.healthStatus]}
        </span>
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-[#7A808A]">
        <span>{channel.todayLeads} bugun</span>
        <span aria-hidden="true">/</span>
        <span>{formatPercent(channel.offerConversionRate)} teklif</span>
        <span aria-hidden="true">/</span>
        <span>{channel.averageResponseTime}</span>
      </div>
    </section>
  );
}

function ChannelList({
  channels,
  activeChannelId,
  onSelectChannel,
}: {
  channels: ManagedChannelRecord[];
  activeChannelId: string;
  onSelectChannel: (channelId: string) => void;
}) {
  return (
    <section className="min-w-0 rounded-[1rem] border border-black/[0.08] bg-[#FFFFFF] p-3 shadow-[0_18px_46px_rgba(11,13,16,0.08),inset_0_1px_0_rgba(255,255,255,0.95)]">
      <div className="mb-3 flex flex-wrap items-start justify-between gap-3 px-1">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-[#0B0D10]">
            Kanal operasyon listesi
          </h2>
          <p className="mt-1 text-sm text-[#7A808A]">
            {channels.length} local kanal kaydi gorunur
          </p>
        </div>
        <span className="rounded-full border border-black/[0.08] bg-[#F4F5F7] px-3 py-1 text-[11px] font-semibold text-[#525A65]">
          Gercek saglayici islemi yok
        </span>
      </div>

      <div className="grid gap-2">
        {channels.length > 0 ? (
          channels.map((channel) => {
            const active = channel.id === activeChannelId;
            const TypeIcon = typeIconMap[channel.type];

            return (
              <button
                key={channel.id}
                type="button"
                onClick={() => onSelectChannel(channel.id)}
                className={`w-full rounded-[0.95rem] border p-3 text-left transition ${
                  active
                    ? "border-black/[0.2] bg-[#F7F8FA] shadow-[0_12px_26px_rgba(11,13,16,0.08)]"
                    : "border-transparent bg-[#FFFFFF] hover:border-black/[0.08] hover:bg-[#F7F8FA]"
                }`}
              >
                <div className="grid gap-3 xl:grid-cols-[minmax(15rem,1fr)_6.5rem_6.5rem_7rem_8rem] xl:items-center">
                  <div className="min-w-0">
                    <div className="flex min-w-0 flex-wrap items-center gap-2">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[0.75rem] border border-black/[0.08] bg-[#F4F5F7] text-[#0B0D10]">
                        <TypeIcon className="h-4 w-4" />
                      </span>
                      <h3 className="truncate text-base font-semibold text-[#0B0D10]">
                        {channel.name}
                      </h3>
                      <span
                        className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${
                          priorityTone[channel.priority]
                        }`}
                      >
                        {priorityLabels[channel.priority]}
                      </span>
                    </div>
                    <p className="mt-1 truncate text-sm text-[#525A65]">
                      {typeLabels[channel.type]} / {channel.owner}
                    </p>
                    <p className="mt-1 text-xs text-[#7A808A]">
                      Son sinyal: {channel.lastSignalAt}
                    </p>
                  </div>

                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#9AA0A8]">
                      Bugun
                    </p>
                    <p className="mt-1 text-sm font-semibold text-[#0B0D10]">
                      {channel.todayLeads} lead
                    </p>
                  </div>

                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#9AA0A8]">
                      7 gun
                    </p>
                    <p className="mt-1 text-sm font-semibold text-[#0B0D10]">
                      {channel.sevenDayLeads} lead
                    </p>
                  </div>

                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#9AA0A8]">
                      Teklif
                    </p>
                    <p className="mt-1 text-sm font-semibold text-[#0B0D10]">
                      {formatPercent(channel.offerConversionRate)}
                    </p>
                    <p className="mt-0.5 text-xs text-[#7A808A]">
                      {channel.averageResponseTime}
                    </p>
                  </div>

                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#9AA0A8]">
                      Saglik
                    </p>
                    <span
                      className={`mt-1 inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${
                        healthTone[channel.healthStatus]
                      }`}
                    >
                      {healthLabels[channel.healthStatus]}
                    </span>
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-black/[0.06] pt-3">
                  <p className="text-xs text-[#7A808A]">
                    Kalite:{" "}
                    <span className="font-semibold text-[#525A65]">
                      {formatPercent(channel.leadQuality)}
                    </span>
                  </p>
                  <span className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-[#6B4E16]/20 bg-[#F3E9D2] px-2.5 py-1 text-[11px] font-semibold text-[#6B4E16]">
                    <HiOutlineExclamationTriangle className="h-3.5 w-3.5 shrink-0" />
                    <span className="truncate">{channel.riskLabel}</span>
                  </span>
                </div>
              </button>
            );
          })
        ) : (
          <div className="rounded-[1rem] border border-black/[0.08] bg-[#F7F8FA] px-4 py-10 text-center">
            <p className="text-base font-semibold text-[#0B0D10]">
              Filtreye uygun kanal bulunamadi
            </p>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#7A808A]">
              Arama veya filtreler yalniz local kanal haritasi uzerinde
              eslesme yapar.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

function MetricTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[0.9rem] border border-black/[0.08] bg-[#F7F8FA] p-3">
      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA0A8]">
        {label}
      </p>
      <p className="mt-1 text-sm font-semibold text-[#0B0D10]">{value}</p>
    </div>
  );
}

function ChannelDetailPanel({
  channel,
}: {
  channel: ManagedChannelRecord | undefined;
}) {
  if (!channel) {
    return (
      <aside className="rounded-[1rem] border border-black/[0.08] bg-[#FFFFFF] p-5 shadow-[0_18px_46px_rgba(11,13,16,0.08),inset_0_1px_0_rgba(255,255,255,0.95)]">
        <p className="text-sm font-semibold text-[#0B0D10]">
          Kanal seçimi bekleniyor
        </p>
        <p className="mt-2 text-sm leading-6 text-[#7A808A]">
          Listeden bir kanal seçildiğinde sağlık, kalite ve teklif etkisi
          burada görünür.
        </p>
      </aside>
    );
  }

  return (
    <aside className="rounded-[1rem] border border-black/[0.08] bg-[#FFFFFF] p-4 shadow-[0_18px_46px_rgba(11,13,16,0.08),inset_0_1px_0_rgba(255,255,255,0.95)] xl:sticky xl:top-4 xl:self-start">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#7A808A]">
            Seçili kanal
          </p>
          <h2 className="mt-2 truncate text-2xl font-semibold tracking-tight text-[#0B0D10]">
            {channel.name}
          </h2>
          <p className="mt-1 text-sm text-[#525A65]">
            {typeLabels[channel.type]} / {channel.owner}
          </p>
        </div>
        <span
          className={`shrink-0 rounded-full border px-2.5 py-1 text-xs font-semibold ${
            healthTone[channel.healthStatus]
          }`}
        >
          {healthLabels[channel.healthStatus]}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <MetricTile label="Bugun" value={`${channel.todayLeads} lead`} />
        <MetricTile label="7 gun" value={`${channel.sevenDayLeads} lead`} />
        <MetricTile
          label="Teklif etkisi"
          value={formatPercent(channel.offerConversionRate)}
        />
        <MetricTile label="Cevap" value={channel.averageResponseTime} />
      </div>

      <div className="mt-4 rounded-[0.95rem] border border-black/[0.08] bg-[#F7F8FA] p-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#7A808A]">
          Lead kalitesi
        </p>
        <div className="mt-2 flex items-center gap-3">
          <div className="h-2 min-w-0 flex-1 rounded-full bg-[#D6DAE0]">
            <div
              className="h-full rounded-full bg-[#0B0D10]"
              style={{ width: `${channel.leadQuality}%` }}
            />
          </div>
          <span className="text-sm font-semibold text-[#0B0D10]">
            {formatPercent(channel.leadQuality)}
          </span>
        </div>
        <p className="mt-2 text-sm leading-6 text-[#525A65]">
          {channel.offerImpact}
        </p>
      </div>

      <div className="mt-4 rounded-[0.95rem] border border-[#6B4E16]/18 bg-[#F3E9D2] p-3 text-[#654A14]">
        <div className="flex items-center gap-2">
          <HiOutlineSparkles className="h-4 w-4" />
          <p className="text-sm font-semibold">Operasyon önerisi</p>
        </div>
        <p className="mt-2 text-sm leading-6">{channel.nextAction}</p>
      </div>

      <div className="mt-4 rounded-[0.95rem] border border-black/[0.08] bg-[#FFFFFF] p-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#7A808A]">
          Entegrasyon durumu
        </p>
        <p className="mt-2 text-sm font-semibold text-[#0B0D10]">
          {integrationLabels[channel.integrationState]}
        </p>
        <p className="mt-1 text-sm leading-6 text-[#7A808A]">
          Local veri / gerçek bağlantı yok. Bu yüzey sağlayıcı işlemi
          başlatmaz.
        </p>
      </div>

      <div className="mt-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#7A808A]">
          Kanal hafızası
        </p>
        <div className="mt-3 grid gap-3">
          {channel.timeline.map((item) => (
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

export function ChannelManagementWorkspace() {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<ChannelTypeFilter>("all");
  const [healthFilter, setHealthFilter] = useState<ChannelHealthFilter>("all");
  const [priorityFilter, setPriorityFilter] =
    useState<ChannelPriorityFilter>("all");
  const [activeChannelId, setActiveChannelId] = useState(
    managedChannelRecords[0]?.id ?? "",
  );

  const filteredChannels = useMemo(
    () =>
      managedChannelRecords.filter((channel) => {
        const typeMatches = typeFilter === "all" || channel.type === typeFilter;
        const healthMatches =
          healthFilter === "all" || channel.healthStatus === healthFilter;
        const priorityMatches =
          priorityFilter === "all" || channel.priority === priorityFilter;

        return (
          typeMatches &&
          healthMatches &&
          priorityMatches &&
          matchesSearch(channel, searchQuery)
        );
      }),
    [healthFilter, priorityFilter, searchQuery, typeFilter],
  );

  const activeChannel =
    filteredChannels.find((channel) => channel.id === activeChannelId) ??
    filteredChannels[0] ??
    managedChannelRecords[0];

  return (
    <div className="min-w-0 bg-[#EEF0F3] px-3 py-3 text-[#0B0D10] sm:px-4 lg:px-6 lg:py-4">
      <div className="mx-auto flex w-full max-w-[118rem] flex-col gap-3">
        <header className="rounded-[1rem] border border-black/[0.08] bg-[#FFFFFF] p-3.5 shadow-[0_16px_40px_rgba(11,13,16,0.075),inset_0_1px_0_rgba(255,255,255,0.95)] sm:p-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-black/[0.08] bg-[#F4F5F7] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#525A65]">
                  Kanal komut yüzeyi
                </span>
                <span className="rounded-full border border-[#6B4E16]/20 bg-[#F3E9D2] px-3 py-1 text-[11px] font-semibold text-[#6B4E16]">
                  MVP / Local integration map
                </span>
              </div>
              <h1 className="mt-3 text-[clamp(1.85rem,3.4vw,3.25rem)] font-semibold leading-[0.98] tracking-tight text-[#0B0D10]">
                Kanal Yönetimi
              </h1>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-[#525A65] sm:text-[0.95rem]">
                Kanal sağlığı, lead kalitesi, cevap süresi ve teklif etkisi tek
                local çalışma alanında izlenir. Bu MVP gerçek entegrasyon,
                sağlayıcı işlemi veya kalıcı kayıt yapmaz.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 lg:justify-end">
              <button
                type="button"
                disabled
                className="inline-flex h-9 cursor-not-allowed items-center justify-center rounded-full border border-black/[0.08] bg-[#F4F5F7] px-3 text-sm font-semibold text-[#7A808A]"
              >
                Bağlantı ekle sonraki faz
              </button>
              <span className="inline-flex h-9 items-center rounded-full bg-[#0B0D10] px-3 text-sm font-semibold text-[#FFFFFF]">
                Local veri / işlem yok
              </span>
            </div>
          </div>
        </header>

        <SelectedChannelSignal channel={activeChannel} />

        <KpiStrip channels={managedChannelRecords} />

        <ChannelFilters
          searchQuery={searchQuery}
          typeFilter={typeFilter}
          healthFilter={healthFilter}
          priorityFilter={priorityFilter}
          onSearchChange={setSearchQuery}
          onTypeChange={setTypeFilter}
          onHealthChange={setHealthFilter}
          onPriorityChange={setPriorityFilter}
        />

        <div className="grid min-w-0 gap-3 xl:grid-cols-[minmax(0,1.45fr)_minmax(22rem,0.72fr)] xl:gap-4">
          <ChannelList
            channels={filteredChannels}
            activeChannelId={activeChannel?.id ?? ""}
            onSelectChannel={setActiveChannelId}
          />
          <ChannelDetailPanel channel={activeChannel} />
        </div>
      </div>
    </div>
  );
}

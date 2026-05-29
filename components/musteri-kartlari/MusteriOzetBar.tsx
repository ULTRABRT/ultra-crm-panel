import type { IconType } from "react-icons";
import {
  HiOutlineBolt,
  HiOutlineChatBubbleLeftRight,
  HiOutlineDocumentText,
  HiOutlineEnvelope,
  HiOutlineExclamationTriangle,
  HiOutlineFire,
  HiOutlineGlobeAlt,
  HiOutlineInboxStack,
  HiOutlineMapPin,
  HiOutlinePhone,
  HiOutlineRectangleGroup,
  HiOutlineShieldCheck,
  HiOutlineSparkles,
  HiOutlineUserCircle,
  HiOutlineUserGroup,
} from "react-icons/hi2";

import { aktifMusteriKarti } from "../../data/musteri-kartlari";
import type {
  CustomerBadge,
  CustomerChannel,
} from "../../types/musteri-kartlari";
import {
  customerBadgeLabels,
  customerChannelLabels,
} from "../../types/musteri-kartlari";

const channelIcons: Record<CustomerChannel, IconType> = {
  instagram: HiOutlineChatBubbleLeftRight,
  whatsapp: HiOutlineChatBubbleLeftRight,
  mail: HiOutlineEnvelope,
  forms: HiOutlineDocumentText,
  webChat: HiOutlineGlobeAlt,
  phone: HiOutlinePhone,
  manual: HiOutlineInboxStack,
};

const badgeIcons: Record<CustomerBadge, IconType> = {
  veryHot: HiOutlineFire,
  urgent: HiOutlineBolt,
  offerWaiting: HiOutlineDocumentText,
  discoveryWaiting: HiOutlineMapPin,
  batteryInterest: HiOutlineSparkles,
  humanReview: HiOutlineUserGroup,
  missingInfo: HiOutlineExclamationTriangle,
  risk: HiOutlineShieldCheck,
};

const strongBadges: CustomerBadge[] = [
  "veryHot",
  "urgent",
  "offerWaiting",
  "risk",
];

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function MusteriOzetBar() {
  const customer = aktifMusteriKarti.ozet;

  return (
    <section className="mb-5 min-w-0 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 shadow-2xl shadow-black/20">
      <div className="flex min-w-0 flex-col gap-5 2xl:flex-row 2xl:items-start 2xl:justify-between">
        <div className="flex min-w-0 gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-3xl bg-white text-lg font-bold text-black shadow-2xl shadow-white/10">
            {getInitials(customer.customerName)}
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-2xl font-semibold tracking-tight text-white">
                {customer.customerName}
              </h2>

              <span className="rounded-full border border-white/10 bg-black/45 px-3 py-1 text-xs font-medium text-white/55">
                {customer.customerTypeLabel}
              </span>

              {customer.companyName ? (
                <span className="rounded-full border border-white/10 bg-black/45 px-3 py-1 text-xs font-medium text-white/55">
                  {customer.companyName}
                </span>
              ) : null}
            </div>

            <p className="mt-2 max-w-3xl text-sm leading-6 text-white/48">
              {customer.addressNote}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {customer.badges.map((badge) => {
                const BadgeIcon = badgeIcons[badge] ?? HiOutlineSparkles;
                const isStrong = strongBadges.includes(badge);

                return (
                  <span
                    key={badge}
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${
                      isStrong
                        ? "bg-white text-black"
                        : "border border-white/10 bg-black/45 text-white/60"
                    }`}
                  >
                    <BadgeIcon className="h-3.5 w-3.5" />
                    {customerBadgeLabels[badge]}
                  </span>
                );
              })}
            </div>
          </div>
        </div>

        <div className="grid min-w-0 gap-3 sm:grid-cols-2 2xl:w-[360px] 2xl:shrink-0">
          <div className="min-w-0 rounded-2xl border border-white/10 bg-black/40 px-4 py-3">
            <p className="truncate text-[10px] uppercase tracking-[0.18em] text-white/35">
              İlk Kaynak
            </p>
            <p className="mt-1 truncate text-sm font-semibold text-white">
              {customer.firstSourceLabel}
            </p>
          </div>

          <div className="min-w-0 rounded-2xl border border-white/10 bg-black/40 px-4 py-3">
            <p className="truncate text-[10px] uppercase tracking-[0.18em] text-white/35">
              Son Kaynak
            </p>
            <p className="mt-1 truncate text-sm font-semibold text-white">
              {customer.lastSourceLabel}
            </p>
          </div>

          <div className="min-w-0 rounded-2xl border border-white/10 bg-black/40 px-4 py-3">
            <p className="truncate text-[10px] uppercase tracking-[0.18em] text-white/35">
              Kayıt
            </p>
            <p className="mt-1 truncate text-sm font-semibold text-white">
              {customer.createdAtLabel}
            </p>
          </div>

          <div className="min-w-0 rounded-2xl border border-white/10 bg-black/40 px-4 py-3">
            <p className="truncate text-[10px] uppercase tracking-[0.18em] text-white/35">
              Son Güncelleme
            </p>
            <p className="mt-1 truncate text-sm font-semibold text-white">
              {customer.lastUpdateLabel}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-3 lg:grid-cols-4">
        <div className="rounded-2xl border border-white/10 bg-black/35 p-4">
          <div className="mb-2 flex items-center gap-2 text-white/55">
            <HiOutlinePhone className="h-4 w-4" />
            <p className="text-xs font-medium">Telefon</p>
          </div>

          <p className="truncate text-sm font-semibold text-white">
            {customer.phone}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/35 p-4">
          <div className="mb-2 flex items-center gap-2 text-white/55">
            <HiOutlineEnvelope className="h-4 w-4" />
            <p className="text-xs font-medium">E-posta</p>
          </div>

          <p className="truncate text-sm font-semibold text-white">
            {customer.email}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/35 p-4">
          <div className="mb-2 flex items-center gap-2 text-white/55">
            <HiOutlineMapPin className="h-4 w-4" />
            <p className="text-xs font-medium">Lokasyon</p>
          </div>

          <p className="truncate text-sm font-semibold text-white">
            {customer.city} / {customer.district}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/35 p-4">
          <div className="mb-2 flex items-center gap-2 text-white/55">
            <HiOutlineUserCircle className="h-4 w-4" />
            <p className="text-xs font-medium">Sorumlu</p>
          </div>

          <p className="truncate text-sm font-semibold text-white">
            {customer.ownerLabel}
          </p>
        </div>
      </div>

      <div className="mt-5 rounded-[1.5rem] border border-white/10 bg-black/35 p-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-white/65">
              <HiOutlineRectangleGroup className="h-4 w-4" />
              <p className="text-sm font-semibold text-white">
                Kanal görünümü
              </p>
            </div>

            <p className="text-sm leading-6 text-white/45">
              Bu müşteriye ait temaslar birden fazla kanaldan tek müşteri
              hafızasında birleştirilir.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {customer.activeChannels.map((channel) => {
              const ChannelIcon = channelIcons[channel] ?? HiOutlineInboxStack;

              return (
                <span
                  key={channel}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-3 py-2 text-xs font-medium text-white/60"
                >
                  <ChannelIcon className="h-3.5 w-3.5" />
                  {customerChannelLabels[channel]}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

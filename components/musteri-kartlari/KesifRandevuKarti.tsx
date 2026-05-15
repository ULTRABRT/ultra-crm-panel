import type { IconType } from "react-icons";
import {
  HiOutlineArrowTrendingUp,
  HiOutlineCalendarDays,
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineExclamationTriangle,
  HiOutlineHomeModern,
  HiOutlineMapPin,
  HiOutlineShieldCheck,
  HiOutlineUserCircle,
} from "react-icons/hi2";

import { aktifMusteriKarti } from "../../data/musteri-kartlari";
import type {
  AppointmentStatus,
  DiscoveryStatus,
} from "../../types/musteri-kartlari";

type ScheduleItem = {
  id: string;
  label: string;
  value: string;
  icon: IconType;
  strong?: boolean;
};

const discoveryStatusStyles: Record<DiscoveryStatus, string> = {
  notRequested: "border border-white/10 bg-black text-white/50",
  requested: "border border-white/20 bg-white/10 text-white",
  dateWaiting: "bg-white text-black",
  planned: "border border-white/20 bg-white/10 text-white",
  completed: "border border-white/10 bg-black text-white/70",
  cancelled: "border border-white/10 bg-black text-white/40",
};

const appointmentStatusStyles: Record<AppointmentStatus, string> = {
  notSet: "border border-white/10 bg-black text-white/50",
  waiting: "bg-white text-black",
  planned: "border border-white/20 bg-white/10 text-white",
  completed: "border border-white/10 bg-black text-white/70",
  missed: "bg-white text-black",
  cancelled: "border border-white/10 bg-black text-white/40",
};

export function KesifRandevuKarti() {
  const kesif = aktifMusteriKarti.kesifRandevu;

  const scheduleItems: ScheduleItem[] = [
    {
      id: "discovery-status",
      label: "Keşif Durumu",
      value: kesif.discoveryStatusLabel,
      icon: HiOutlineMapPin,
      strong: true,
    },
    {
      id: "appointment-status",
      label: "Randevu Durumu",
      value: kesif.appointmentStatusLabel,
      icon: HiOutlineCalendarDays,
      strong: true,
    },
    {
      id: "appointment-date",
      label: "Randevu Tarihi",
      value: kesif.appointmentDateLabel,
      icon: HiOutlineClock,
    },
    {
      id: "appointment-time",
      label: "Randevu Saati",
      value: kesif.appointmentTimeLabel,
      icon: HiOutlineClock,
    },
    {
      id: "appointment-type",
      label: "Randevu Tipi",
      value: kesif.appointmentTypeLabel,
      icon: HiOutlineHomeModern,
    },
    {
      id: "discovery-owner",
      label: "Keşif Sorumlusu",
      value: kesif.discoveryOwnerLabel,
      icon: HiOutlineUserCircle,
    },
    {
      id: "planning-status",
      label: "Planlama Durumu",
      value: kesif.planningStatusLabel,
      icon: HiOutlineArrowTrendingUp,
      strong: true,
    },
  ];

  return (
    <section className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 shadow-2xl shadow-black/20">
      <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-3 py-1.5">
            <HiOutlineCalendarDays className="h-4 w-4 text-white/70" />
            <span className="text-xs font-medium text-white/55">
              Keşif / Randevu Akışı
            </span>
          </div>

          <h2 className="text-2xl font-semibold tracking-tight text-white">
            Keşif ve Randevu Kartı
          </h2>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-white/45">
            Müşterinin keşif talebi, randevu durumu, planlama notları ve
            keşif sorumlusu burada takip edilir.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <span
            className={`rounded-full px-3 py-1.5 text-xs font-semibold ${discoveryStatusStyles[kesif.discoveryStatus]}`}
          >
            {kesif.discoveryStatusLabel}
          </span>

          <span
            className={`rounded-full px-3 py-1.5 text-xs font-semibold ${appointmentStatusStyles[kesif.appointmentStatus]}`}
          >
            {kesif.appointmentStatusLabel}
          </span>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {scheduleItems.map((item) => {
          const Icon = item.icon;

          return (
            <article
              key={item.id}
              className={`rounded-2xl border p-4 transition hover:border-white/20 hover:bg-white/[0.035] ${
                item.strong
                  ? "border-white/15 bg-white/[0.055]"
                  : "border-white/10 bg-black/35"
              }`}
            >
              <div className="mb-3 flex items-center justify-between gap-3">
                <div className="rounded-2xl border border-white/10 bg-black/45 p-2.5">
                  <Icon className="h-4 w-4 text-white/70" />
                </div>

                {item.strong ? (
                  <span className="rounded-full bg-white px-2.5 py-1 text-[10px] font-semibold text-black">
                    Kritik
                  </span>
                ) : null}
              </div>

              <p className="text-[10px] uppercase tracking-[0.18em] text-white/35">
                {item.label}
              </p>

              <p className="mt-2 text-sm font-semibold leading-6 text-white">
                {item.value}
              </p>
            </article>
          );
        })}
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,0.9fr)_minmax(320px,0.65fr)]">
        <article className="rounded-[1.5rem] border border-white/10 bg-black/35 p-5">
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3">
              <HiOutlineMapPin className="h-5 w-5 text-white" />
            </div>

            <div>
              <p className="text-sm font-semibold text-white">Keşif Notu</p>
              <p className="mt-1 text-xs text-white/40">
                Saha / çatı kontrolü için operasyon bilgisi
              </p>
            </div>
          </div>

          <p className="text-sm leading-7 text-white/55">
            {kesif.discoveryNote}
          </p>

          <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.025] p-4">
            <div className="flex items-start gap-3">
              <HiOutlineExclamationTriangle className="mt-0.5 h-4 w-4 shrink-0 text-white/60" />

              <p className="text-sm leading-6 text-white/48">
                Keşif istendi fakat tarih henüz netleşmedi. Randevu tarihi
                alınmadan teklif süreci eksik kalabilir.
              </p>
            </div>
          </div>
        </article>

        <article className="rounded-[1.5rem] border border-white/10 bg-black/35 p-5">
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3">
              <HiOutlineShieldCheck className="h-5 w-5 text-white" />
            </div>

            <div>
              <p className="text-sm font-semibold text-white">Randevu Notu</p>
              <p className="mt-1 text-xs text-white/40">
                Müşteriyle netleştirilecek planlama
              </p>
            </div>
          </div>

          <p className="text-sm leading-7 text-white/55">
            {kesif.appointmentNote}
          </p>

          <div className="mt-4 space-y-2.5">
            <button className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/85">
              <HiOutlineCalendarDays className="h-4 w-4" />
              Randevu Tarihi Belirle
            </button>

            <button className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-black/45 px-5 py-3 text-sm font-semibold text-white/65 transition hover:bg-white/[0.06] hover:text-white">
              <HiOutlineCheckCircle className="h-4 w-4" />
              Keşif Planlandı İşaretle
            </button>
          </div>
        </article>
      </div>
    </section>
  );
}
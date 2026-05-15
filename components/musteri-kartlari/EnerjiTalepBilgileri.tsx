import type { IconType } from "react-icons";
import {
  HiOutlineBolt,
  HiOutlineCheckCircle,
  HiOutlineExclamationTriangle,
  HiOutlineHomeModern,
  HiOutlineMapPin,
  HiOutlineSparkles,
  HiOutlineSun,
} from "react-icons/hi2";

import { aktifMusteriKarti } from "../../data/musteri-kartlari";

type InfoItem = {
  id: string;
  label: string;
  value: string;
  icon: IconType;
  strong?: boolean;
};

type BooleanSignal = {
  id: string;
  label: string;
  active: boolean;
};

export function EnerjiTalepBilgileri() {
  const enerjiTalep = aktifMusteriKarti.enerjiTalep;

  const infoItems: InfoItem[] = [
    {
      id: "interested-service",
      label: "İlgilendiği Hizmet",
      value: enerjiTalep.interestedService,
      icon: HiOutlineSun,
      strong: true,
    },
    {
      id: "structure-type",
      label: "Yapı Tipi",
      value: enerjiTalep.structureType,
      icon: HiOutlineHomeModern,
    },
    {
      id: "roof-type",
      label: "Çatı Tipi",
      value: enerjiTalep.roofType,
      icon: HiOutlineHomeModern,
    },
    {
      id: "roof-direction",
      label: "Çatı Yönü",
      value: enerjiTalep.roofDirection,
      icon: HiOutlineMapPin,
    },
    {
      id: "roof-area",
      label: "Çatı Alanı",
      value: enerjiTalep.roofAreaLabel,
      icon: HiOutlineMapPin,
    },
    {
      id: "monthly-bill",
      label: "Aylık Fatura",
      value: enerjiTalep.monthlyBillLabel,
      icon: HiOutlineBolt,
      strong: true,
    },
    {
      id: "monthly-consumption",
      label: "Aylık Tüketim",
      value: enerjiTalep.monthlyConsumptionLabel,
      icon: HiOutlineBolt,
    },
    {
      id: "capacity",
      label: "Sistem Kapasitesi",
      value: enerjiTalep.requestedSystemCapacity,
      icon: HiOutlineSparkles,
      strong: true,
    },
  ];

  const booleanSignals: BooleanSignal[] = [
    {
      id: "battery-need",
      label: "Batarya ihtiyacı",
      active: enerjiTalep.batteryNeed,
    },
    {
      id: "lithium-interest",
      label: "Lityum batarya ilgisi",
      active: enerjiTalep.lithiumBatteryInterest,
    },
    {
      id: "land-ges",
      label: "Arazi GES ilgisi",
      active: enerjiTalep.landGesInterest,
    },
    {
      id: "roof-ges",
      label: "Çatı GES ilgisi",
      active: enerjiTalep.roofGesInterest,
    },
    {
      id: "saving-question",
      label: "Tasarruf sorusu",
      active: enerjiTalep.savingQuestion,
    },
    {
      id: "amortization-question",
      label: "Amortisman sorusu",
      active: enerjiTalep.amortizationQuestion,
    },
  ];

  return (
    <section className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 shadow-2xl shadow-black/20">
      <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-3 py-1.5">
            <HiOutlineSun className="h-4 w-4 text-white/70" />
            <span className="text-xs font-medium text-white/55">
              Enerji / Solify DNA
            </span>
          </div>

          <h2 className="text-2xl font-semibold tracking-tight text-white">
            Enerji Talep Bilgileri
          </h2>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-white/45">
            Müşterinin enerji ihtiyacı, çatı bilgisi, fatura seviyesi, batarya
            ilgisi ve eksik bilgiler burada tek müşteri hafızasında görünür.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/45 px-4 py-3">
          <p className="text-[10px] uppercase tracking-[0.18em] text-white/35">
            Eksik Bilgi
          </p>
          <p className="mt-1 text-sm font-semibold text-white">
            {enerjiTalep.missingInfo.length} kayıt
          </p>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {infoItems.map((item) => {
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

      <div className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,0.95fr)_minmax(320px,0.65fr)]">
        <article className="rounded-[1.5rem] border border-white/10 bg-black/35 p-5">
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3">
              <HiOutlineSparkles className="h-5 w-5 text-white" />
            </div>

            <div>
              <p className="text-sm font-semibold text-white">
                Enerji Sinyalleri
              </p>
              <p className="mt-1 text-xs text-white/40">
                Satış ve teklif sürecini etkileyen özel alanlar
              </p>
            </div>
          </div>

          <div className="grid gap-2 sm:grid-cols-2">
            {booleanSignals.map((signal) => (
              <div
                key={signal.id}
                className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.025] px-3 py-2.5"
              >
                <span className="text-sm text-white/60">{signal.label}</span>

                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                    signal.active
                      ? "bg-white text-black"
                      : "border border-white/10 bg-black text-white/45"
                  }`}
                >
                  {signal.active ? (
                    <HiOutlineCheckCircle className="h-3.5 w-3.5" />
                  ) : (
                    <HiOutlineExclamationTriangle className="h-3.5 w-3.5" />
                  )}
                  {signal.active ? "Var" : "Yok"}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.025] p-4">
            <p className="text-[10px] uppercase tracking-[0.18em] text-white/35">
              Teknik Destek Konusu
            </p>

            <p className="mt-2 text-sm leading-6 text-white/58">
              {enerjiTalep.technicalSupportTopic}
            </p>
          </div>
        </article>

        <article className="rounded-[1.5rem] border border-white/10 bg-black/35 p-5">
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3">
              <HiOutlineExclamationTriangle className="h-5 w-5 text-white" />
            </div>

            <div>
              <p className="text-sm font-semibold text-white">
                Eksik Bilgiler
              </p>
              <p className="mt-1 text-xs text-white/40">
                Teklif / keşif öncesi tamamlanmalı
              </p>
            </div>
          </div>

          <div className="space-y-2.5">
            {enerjiTalep.missingInfo.map((info) => (
              <div
                key={info}
                className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.025] p-3"
              >
                <HiOutlineExclamationTriangle className="mt-0.5 h-4 w-4 shrink-0 text-white/55" />

                <p className="text-sm leading-6 text-white/55">{info}</p>
              </div>
            ))}
          </div>

          <button className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/85">
            <HiOutlineCheckCircle className="h-4 w-4" />
            Eksikleri Tamamlama Görevi Aç
          </button>
        </article>
      </div>
    </section>
  );
}
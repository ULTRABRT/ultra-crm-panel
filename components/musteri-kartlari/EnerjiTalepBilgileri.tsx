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
    <section className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-3 shadow-2xl shadow-black/20 sm:p-4 xl:p-5">
      <div className="mb-3 flex flex-col gap-3 xl:mb-5 xl:flex-row xl:items-start xl:justify-between xl:gap-4">
        <div>
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-2.5 py-1.5 xl:mb-3 xl:px-3">
            <HiOutlineSun className="h-3.5 w-3.5 text-white/70 xl:h-4 xl:w-4" />
            <span className="text-xs font-medium text-white/55">
              Enerji / Solify DNA
            </span>
          </div>

          <h2 className="text-xl font-semibold tracking-tight text-white xl:text-2xl">
            Enerji Talep Bilgileri
          </h2>

          <p className="mt-1.5 max-w-3xl text-xs leading-5 text-white/45 xl:mt-2 xl:text-sm xl:leading-6">
            Müşterinin enerji ihtiyacı, çatı bilgisi, fatura seviyesi, batarya
            ilgisi ve eksik bilgiler burada tek müşteri hafızasında görünür.
          </p>
        </div>

        <div className="min-w-0 rounded-2xl border border-white/10 bg-black/45 px-3 py-2.5 xl:px-4 xl:py-3">
          <p className="text-[10px] uppercase tracking-[0.16em] text-white/35 xl:tracking-[0.18em]">
            Eksik Bilgi
          </p>
          <p className="mt-1 text-sm font-semibold text-white">
            {enerjiTalep.missingInfo.length} kayıt
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:gap-3 xl:grid-cols-4">
        {infoItems.map((item) => {
          const Icon = item.icon;

          return (
            <article
              key={item.id}
              className={`min-w-0 rounded-2xl border p-3 transition hover:border-white/20 hover:bg-white/[0.035] xl:p-4 ${
                item.strong
                  ? "border-white/15 bg-white/[0.055]"
                  : "border-white/10 bg-black/35"
              }`}
            >
              <div className="mb-2 flex items-center justify-between gap-2 xl:mb-3 xl:gap-3">
                <div className="rounded-2xl border border-white/10 bg-black/45 p-2 xl:p-2.5">
                  <Icon className="h-4 w-4 text-white/70" />
                </div>

                {item.strong ? (
                  <span className="rounded-full bg-white px-2 py-0.5 text-[10px] font-semibold text-black xl:px-2.5 xl:py-1">
                    Kritik
                  </span>
                ) : null}
              </div>

              <p className="break-words text-[9px] uppercase leading-4 tracking-[0.12em] text-white/35 xl:text-[10px] xl:tracking-[0.18em]">
                {item.label}
              </p>

              <p className="mt-1.5 break-words text-xs font-semibold leading-5 text-white xl:mt-2 xl:text-sm xl:leading-6">
                {item.value}
              </p>
            </article>
          );
        })}
      </div>

      <div className="mt-4 grid gap-3 xl:mt-5 xl:grid-cols-[minmax(0,0.95fr)_minmax(320px,0.65fr)] xl:gap-5">
        <article className="rounded-[1.5rem] border border-white/10 bg-black/35 p-3 xl:p-5">
          <div className="mb-3 flex items-center gap-2.5 xl:mb-4 xl:gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-2.5 xl:p-3">
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

          <div className="grid grid-cols-2 gap-2">
            {booleanSignals.map((signal) => (
              <div
                key={signal.id}
                className="flex min-w-0 items-center justify-between gap-2 rounded-2xl border border-white/10 bg-white/[0.025] px-2.5 py-2 xl:gap-3 xl:px-3 xl:py-2.5"
              >
                <span className="min-w-0 break-words text-xs leading-4 text-white/60 xl:text-sm">
                  {signal.label}
                </span>

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

          <div className="mt-3 rounded-2xl border border-white/10 bg-white/[0.025] p-3 xl:mt-4 xl:p-4">
            <p className="text-[10px] uppercase tracking-[0.16em] text-white/35 xl:tracking-[0.18em]">
              Teknik Destek Konusu
            </p>

            <p className="mt-1.5 text-xs leading-5 text-white/58 xl:mt-2 xl:text-sm xl:leading-6">
              {enerjiTalep.technicalSupportTopic}
            </p>
          </div>
        </article>

        <article className="rounded-[1.5rem] border border-white/10 bg-black/35 p-3 xl:p-5">
          <div className="mb-3 flex items-center gap-2.5 xl:mb-4 xl:gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-2.5 xl:p-3">
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

          <div className="space-y-2 xl:space-y-2.5">
            {enerjiTalep.missingInfo.map((info) => (
              <div
                key={info}
                className="flex items-start gap-2.5 rounded-2xl border border-white/10 bg-white/[0.025] p-2.5 xl:gap-3 xl:p-3"
              >
                <HiOutlineExclamationTriangle className="mt-0.5 h-4 w-4 shrink-0 text-white/55" />

                <p className="text-xs leading-5 text-white/55 xl:text-sm xl:leading-6">
                  {info}
                </p>
              </div>
            ))}
          </div>

          <button className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-4 py-2.5 text-xs font-semibold text-black transition hover:bg-white/85 xl:mt-4 xl:px-5 xl:py-3 xl:text-sm">
            <HiOutlineCheckCircle className="h-4 w-4" />
            Eksikleri Tamamlama Görevi Aç
          </button>
        </article>
      </div>
    </section>
  );
}

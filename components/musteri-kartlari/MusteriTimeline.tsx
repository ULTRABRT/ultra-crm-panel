import type { IconType } from "react-icons";
import {
  HiOutlineArrowPath,
  HiOutlineBellAlert,
  HiOutlineChatBubbleLeftRight,
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineDocumentText,
  HiOutlineEnvelope,
  HiOutlineExclamationTriangle,
  HiOutlineInboxStack,
  HiOutlinePhone,
  HiOutlineSparkles,
  HiOutlineUserCircle,
} from "react-icons/hi2";

import { aktifMusteriKarti } from "../../data/musteri-kartlari";
import type { TimelineEventType } from "../../types/musteri-kartlari";

const timelineIcons: Record<TimelineEventType, IconType> = {
  leadCreated: HiOutlineInboxStack,
  instagramMessage: HiOutlineChatBubbleLeftRight,
  whatsappMessage: HiOutlineChatBubbleLeftRight,
  mail: HiOutlineEnvelope,
  phoneCall: HiOutlinePhone,
  botReply: HiOutlineSparkles,
  humanReply: HiOutlineUserCircle,
  note: HiOutlineDocumentText,
  offerNote: HiOutlineDocumentText,
  appointmentNote: HiOutlineClock,
  discoveryNote: HiOutlineCheckCircle,
  followUpCreated: HiOutlineBellAlert,
  statusUpdated: HiOutlineArrowPath,
  humanReview: HiOutlineUserCircle,
  riskAlert: HiOutlineExclamationTriangle,
};

const timelineTypeLabels: Record<TimelineEventType, string> = {
  leadCreated: "Lead Kaydı",
  instagramMessage: "Instagram Mesajı",
  whatsappMessage: "WhatsApp Mesajı",
  mail: "Mail",
  phoneCall: "Telefon",
  botReply: "AI Yanıtı",
  humanReply: "İnsan Yanıtı",
  note: "Not",
  offerNote: "Teklif Notu",
  appointmentNote: "Randevu Notu",
  discoveryNote: "Keşif Notu",
  followUpCreated: "Takip",
  statusUpdated: "Durum Güncellendi",
  humanReview: "İnsan Kontrolü",
  riskAlert: "Risk Uyarısı",
};

const strongEventTypes: TimelineEventType[] = [
  "leadCreated",
  "offerNote",
  "riskAlert",
  "humanReview",
];

export function MusteriTimeline() {
  const timeline = aktifMusteriKarti.timeline;

  return (
    <section className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 shadow-2xl shadow-black/20">
      <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-3 py-1.5">
            <HiOutlineClock className="h-4 w-4 text-white/70" />
            <span className="text-xs font-medium text-white/55">
              Etkileşim Hafızası
            </span>
          </div>

          <h2 className="text-2xl font-semibold tracking-tight text-white">
            Müşteri Timeline
          </h2>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-white/45">
            Müşteriye ait mesajlar, AI cevapları, satış notları, teklif süreci
            ve risk uyarıları tek akışta görünür.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/45 px-4 py-3">
          <p className="text-[10px] uppercase tracking-[0.18em] text-white/35">
            Toplam Kayıt
          </p>
          <p className="mt-1 text-sm font-semibold text-white">
            {timeline.length} olay
          </p>
        </div>
      </div>

      <div className="mb-5 flex flex-wrap gap-2">
        {["Tüm Olaylar", "Mesajlar", "Notlar", "Teklifler", "Riskler"].map(
          (filter, index) => (
            <button
              key={filter}
              className={`rounded-full px-3 py-2 text-xs font-semibold transition ${
                index === 0
                  ? "bg-white text-black"
                  : "border border-white/10 bg-black/45 text-white/55 hover:border-white/20 hover:bg-white/[0.04] hover:text-white"
              }`}
            >
              {filter}
            </button>
          )
        )}
      </div>

      <div className="relative">
        <div className="absolute left-[21px] top-4 hidden h-[calc(100%-2rem)] w-px bg-white/10 md:block" />

        <div className="space-y-4">
          {timeline.map((event) => {
            const Icon = timelineIcons[event.type] ?? HiOutlineDocumentText;
            const isStrong = strongEventTypes.includes(event.type);

            return (
              <article
                key={event.id}
                className="relative rounded-[1.5rem] border border-white/10 bg-black/35 p-4 transition hover:border-white/20 hover:bg-white/[0.035] md:ml-12"
              >
                <div
                  className={`absolute -left-[3.25rem] top-5 hidden h-11 w-11 items-center justify-center rounded-2xl border md:flex ${
                    isStrong
                      ? "border-white/20 bg-white text-black"
                      : "border-white/10 bg-black text-white/70"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </div>

                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="min-w-0">
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${
                          isStrong
                            ? "bg-white text-black"
                            : "border border-white/10 bg-white/[0.035] text-white/60"
                        }`}
                      >
                        <Icon className="h-3.5 w-3.5" />
                        {timelineTypeLabels[event.type]}
                      </span>

                      <span className="rounded-full border border-white/10 bg-black/45 px-3 py-1.5 text-xs font-medium text-white/50">
                        {event.channelLabel}
                      </span>

                      <span className="rounded-full border border-white/10 bg-black/45 px-3 py-1.5 text-xs font-medium text-white/50">
                        {event.sourceLabel}
                      </span>
                    </div>

                    <h3 className="text-base font-semibold text-white">
                      {event.title}
                    </h3>

                    <p className="mt-2 max-w-4xl text-sm leading-6 text-white/48">
                      {event.description}
                    </p>
                  </div>

                  <div className="grid shrink-0 gap-2 sm:grid-cols-2 lg:w-[260px] lg:grid-cols-1">
                    <div className="rounded-2xl border border-white/10 bg-white/[0.025] px-3 py-2">
                      <p className="text-[10px] uppercase tracking-[0.18em] text-white/35">
                        Zaman
                      </p>
                      <p className="mt-1 text-xs font-semibold text-white/75">
                        {event.timeLabel}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/[0.025] px-3 py-2">
                      <p className="text-[10px] uppercase tracking-[0.18em] text-white/35">
                        Sorumlu
                      </p>
                      <p className="mt-1 text-xs font-semibold text-white/75">
                        {event.ownerLabel}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
import {
  HiOutlineArrowPath,
  HiOutlineBolt,
  HiOutlineChatBubbleLeftRight,
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineInboxStack,
  HiOutlineSparkles,
} from "react-icons/hi2";

import { inboxChannelStats, inboxDetail } from "../../data/inbox";

const inboxSignals = [
  {
    label: "Yanıt bekleyen",
    value: "24",
    note: "açık konuşma",
  },
  {
    label: "Çok sıcak",
    value: "32",
    note: "öncelikli mesaj",
  },
  {
    label: "AI önerisi",
    value: "18",
    note: "hazır cevap",
  },
  {
    label: "Riskli lead",
    value: "7",
    note: "gecikme uyarısı",
  },
];

export function InboxHero() {
  const activeConversation = inboxDetail.activeConversation;

  const totalMessages = inboxChannelStats.reduce(
    (total, channel) => total + channel.total,
    0
  );

  return (
    <section className="mb-4 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] shadow-2xl shadow-black/25">
      <div className="relative p-5">
        <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute left-1/2 top-0 h-36 w-36 rounded-full bg-white/[0.05] blur-3xl" />

        <div className="relative grid gap-5 xl:grid-cols-[minmax(0,1fr)_420px]">
          <div className="min-w-0">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-3 py-1.5">
                <HiOutlineInboxStack className="h-4 w-4 text-white/70" />
                <span className="text-xs font-medium text-white/55">
                  Arqon / Mesaj Operasyon Merkezi
                </span>
              </span>

              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-3 py-1.5 text-xs font-medium text-white/50">
                <HiOutlineClock className="h-4 w-4" />
                Canlı akış
              </span>
            </div>

            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h1 className="text-4xl font-semibold tracking-tight text-white lg:text-5xl">
                  Ultra Inbox
                </h1>

                <p className="mt-4 max-w-3xl text-sm leading-6 text-white/52 lg:text-base lg:leading-7">
                  Müşterilerinizin nereden mesaj attığı fark etmez. Tüm
                  platformlarınızdaki mesaj akışlarını Ultra Inbox ile tek
                  yerden kusursuz yönetin.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:w-[520px]">
                {inboxSignals.map((signal, index) => (
                  <div
                    key={signal.label}
                    className={`rounded-2xl border p-3 ${
                      index === 0
                        ? "border-white/20 bg-white text-black"
                        : "border-white/10 bg-black/35 text-white"
                    }`}
                  >
                    <p
                      className={`text-[10px] uppercase tracking-[0.16em] ${
                        index === 0 ? "text-black/45" : "text-white/35"
                      }`}
                    >
                      {signal.label}
                    </p>

                    <p
                      className={`mt-2 text-2xl font-semibold tracking-tight ${
                        index === 0 ? "text-black" : "text-white"
                      }`}
                    >
                      {signal.value}
                    </p>

                    <p
                      className={`mt-1 text-[11px] ${
                        index === 0 ? "text-black/50" : "text-white/38"
                      }`}
                    >
                      {signal.note}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-2">
              {inboxChannelStats.slice(0, 5).map((channel, index) => (
                <span
                  key={channel.id}
                  className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ${
                    index === 0
                      ? "bg-white text-black"
                      : "border border-white/10 bg-black/45 text-white/50"
                  }`}
                >
                  <HiOutlineChatBubbleLeftRight className="h-3.5 w-3.5" />
                  {channel.label}
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] ${
                      index === 0 ? "bg-black text-white" : "bg-white/10"
                    }`}
                  >
                    {channel.total}
                  </span>
                </span>
              ))}
            </div>
          </div>

          <aside className="rounded-[1.75rem] border border-white/10 bg-black/45 p-4">
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5">
                  <HiOutlineSparkles className="h-4 w-4 text-white/70" />
                  <span className="text-xs font-medium text-white/55">
                    Aktif Operasyon
                  </span>
                </div>

                <h2 className="text-xl font-semibold tracking-tight text-white">
                  Mesajlar satış aksiyonuna bağlanıyor
                </h2>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.035] px-3 py-2 text-right">
                <p className="text-[10px] uppercase tracking-[0.18em] text-white/35">
                  Toplam
                </p>
                <p className="text-lg font-semibold text-white">
                  {totalMessages}
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-4">
              <div className="flex items-start gap-3">
                <div className="rounded-xl border border-white/10 bg-black/45 p-2.5">
                  <HiOutlineBolt className="h-5 w-5 text-white" />
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-semibold text-white">
                    Aktif konuşma: {activeConversation.customerName}
                  </p>

                  <p className="mt-1 text-xs leading-5 text-white/42">
                    {activeConversation.nextAction}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              <button className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-4 py-3 text-sm font-semibold text-black transition hover:bg-white/85">
                <HiOutlineCheckCircle className="h-4 w-4" />
                Yanıt Kuyruğu
              </button>

              <button className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-black/45 px-4 py-3 text-sm font-semibold text-white/65 transition hover:border-white/20 hover:bg-white/[0.055] hover:text-white">
                <HiOutlineArrowPath className="h-4 w-4" />
                Akışı Yenile
              </button>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

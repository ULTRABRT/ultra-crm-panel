import {
  FiActivity,
  FiBatteryCharging,
  FiCalendar,
  FiMapPin,
  FiRadio,
  FiTrendingUp,
} from "react-icons/fi";

const sources = [
  {
    name: "Instagram",
    leads: 94,
    hot: 21,
    offer: 12,
    quality: 78,
    note: "Hacim güçlü",
  },
  {
    name: "Mail",
    leads: 36,
    hot: 14,
    offer: 9,
    quality: 86,
    note: "Kalite yüksek",
  },
  {
    name: "WhatsApp",
    leads: 42,
    hot: 11,
    offer: 6,
    quality: 69,
    note: "Hızlı dönüş gerekli",
  },
];

const operationCards = [
  {
    title: "Keşif Akışı",
    value: "6",
    note: "tarih bekleyen kayıt",
    icon: FiCalendar,
  },
  {
    title: "Teklif Akışı",
    value: "14",
    note: "hazırlanmayı bekliyor",
    icon: FiTrendingUp,
  },
  {
    title: "Batarya Fırsatları",
    value: "4",
    note: "yüksek potansiyelli talep",
    icon: FiBatteryCharging,
  },
  {
    title: "Hizmet Bölgesi",
    value: "9",
    note: "Hatay dışı proje bazlı talep",
    icon: FiMapPin,
  },
];

const activities = [
  "Mehmet Akgün için teklif hazırlama aksiyonu açıldı.",
  "Instagram kanalından 3 yeni sıcak talep geldi.",
  "Karaqaş Metal kaydı eksik bilgi nedeniyle kontrole alındı.",
  "Batarya ilgisi olan 2 müşteri teklif listesine eklendi.",
];

export function CommandInsights() {
  return (
    <section className="arqon-section-gap arqon-split-grid [--arqon-split-min:24rem]">
      <div className="rounded-[2rem] border border-white/10 bg-black/45 p-6 shadow-2xl shadow-black/40">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-sm text-white/40">Kaynak Performansı</p>
            <h2 className="mt-1 text-2xl font-semibold">
              Bugünün Kaynak Gücü
            </h2>
          </div>

          <div className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/60">
            Kalite görünümü
          </div>
        </div>

        <div className="space-y-4">
          {sources.map((source) => (
            <div
              key={source.name}
              className="rounded-3xl border border-white/10 bg-black/55 p-5"
            >
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <p className="text-lg font-semibold">{source.name}</p>
                  <p className="mt-1 text-sm text-white/45">{source.note}</p>
                </div>

                <div className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-black">
                  %{source.quality}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 text-sm">
                <div>
                  <p className="text-white/40">Lead</p>
                  <p className="mt-1 text-xl font-semibold">{source.leads}</p>
                </div>

                <div>
                  <p className="text-white/40">Çok Sıcak</p>
                  <p className="mt-1 text-xl font-semibold">{source.hot}</p>
                </div>

                <div>
                  <p className="text-white/40">Teklif</p>
                  <p className="mt-1 text-xl font-semibold">{source.offer}</p>
                </div>
              </div>

              <div className="mt-4 h-2 rounded-full bg-white/10">
                <div
                  className="h-2 rounded-full bg-white"
                  style={{ width: `${source.quality}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-5">
        <div className="rounded-[2rem] border border-white/10 bg-black/45 p-6 shadow-2xl shadow-black/40">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-white/40">Enerji Operasyon Katmanı</p>
              <h2 className="mt-1 text-2xl font-semibold">
                Solify DNA Kartları
              </h2>
            </div>

            <FiRadio className="text-xl text-white/50" />
          </div>

          <div className="arqon-card-grid [--arqon-grid-min:13.5rem]">
            {operationCards.map((card) => {
              const Icon = card.icon;

              return (
                <div
                  key={card.title}
                  className="rounded-3xl border border-white/10 bg-black/55 p-5"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06]">
                    <Icon className="text-xl" />
                  </div>

                  <p className="text-sm text-white/45">{card.title}</p>
                  <p className="mt-2 text-4xl font-semibold">{card.value}</p>
                  <p className="mt-2 text-sm leading-6 text-white/50">
                    {card.note}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-black/45 p-6 shadow-2xl shadow-black/40">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-sm text-white/40">Canlı Operasyon Günlüğü</p>
              <h2 className="mt-1 text-2xl font-semibold">Son Aktiviteler</h2>
            </div>

            <FiActivity className="text-xl text-white/50" />
          </div>

          <div className="space-y-3">
            {activities.map((activity, index) => (
              <div
                key={activity}
                className="flex gap-4 rounded-3xl border border-white/10 bg-black/55 p-4"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-sm font-semibold text-black">
                  {index + 1}
                </div>

                <p className="text-sm leading-6 text-white/65">{activity}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

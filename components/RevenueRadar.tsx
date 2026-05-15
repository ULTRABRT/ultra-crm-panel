const revenueCards = [
  {
    label: "Açık Teklif",
    value: "₺701K",
    note: "aktif fırsat hacmi",
  },
  {
    label: "Kapanma Olasılığı",
    value: "%74",
    note: "ortalama başarı skoru",
  },
  {
    label: "Bugünkü Aksiyon",
    value: "18",
    note: "öncelikli görev",
  },
];

const opportunities = [
  {
    name: "Mehmet Akgün",
    segment: "Konut Enerji",
    value: "₺185.000",
    stage: "Teklif Hazırlanıyor",
    action: "Bugün aranmalı",
    score: 86,
  },
  {
    name: "Karakaş Metal",
    segment: "Sanayi",
    value: "₺420.000",
    stage: "Keşif Bekliyor",
    action: "Eksik bilgi alınmalı",
    score: 71,
  },
  {
    name: "Ayşe Demir",
    segment: "Bireysel",
    value: "₺96.000",
    stage: "Fiyatlandırma",
    action: "Teklif gönderilmeli",
    score: 64,
  },
];

export function RevenueRadar() {
  return (
    <section className="rounded-[2rem] border border-white/10 bg-black/45 p-5 shadow-2xl shadow-white/5 backdrop-blur">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-white/40">Satış Komuta Katmanı</p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight">
            Gelir ve Teklif Radarı
          </h2>
        </div>

        <button className="rounded-full border border-white/10 px-5 py-2 text-sm font-medium text-white/70 transition hover:bg-white/10 hover:text-white">
          Canlı fırsat görünümü
        </button>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {revenueCards.map((card) => (
          <div
            key={card.label}
            className="rounded-3xl border border-white/10 bg-white/[0.03] p-5"
          >
            <p className="text-sm text-white/45">{card.label}</p>
            <p className="mt-3 text-3xl font-semibold">{card.value}</p>
            <p className="mt-2 text-sm text-white/45">{card.note}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 space-y-4">
        {opportunities.map((deal) => (
          <div
            key={deal.name}
            className="rounded-3xl border border-white/10 bg-black/50 p-5"
          >
            <div className="grid gap-5 lg:grid-cols-[1.2fr_0.6fr_0.7fr_0.7fr] lg:items-center">
              <div>
                <p className="text-lg font-semibold">{deal.name}</p>
                <p className="mt-1 text-sm text-white/45">{deal.segment}</p>
              </div>

              <div>
                <p className="text-sm text-white/40">Potansiyel Değer</p>
                <p className="mt-1 font-semibold">{deal.value}</p>
              </div>

              <div>
                <p className="text-sm text-white/40">Aşama</p>
                <p className="mt-1 font-semibold">{deal.stage}</p>
              </div>

              <div>
                <p className="text-sm text-white/40">Sıradaki Aksiyon</p>
                <p className="mt-1 font-semibold">{deal.action}</p>
              </div>
            </div>

            <div className="mt-5">
              <div className="mb-2 flex items-center justify-between text-xs text-white/40">
                <span>Kapanma Skoru</span>
                <span>%{deal.score}</span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-white"
                  style={{ width: `${deal.score}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
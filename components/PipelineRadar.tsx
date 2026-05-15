const pipelineItems = [
  {
    company: "Mehmet Akgün",
    sector: "Konut Enerji",
    value: "₺185.000",
    probability: 86,
    stage: "Teklif Hazırlanıyor",
    nextAction: "Bugün aranmalı",
  },
  {
    company: "Karakaş Metal",
    sector: "Sanayi",
    value: "₺420.000",
    probability: 71,
    stage: "Keşif Bekliyor",
    nextAction: "Eksik bilgi alınmalı",
  },
  {
    company: "Ayşe Demir",
    sector: "Bireysel",
    value: "₺96.000",
    probability: 64,
    stage: "Fiyatlandırma",
    nextAction: "Teklif gönderilmeli",
  },
];

const commandCards = [
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

export function PipelineRadar() {
  return (
    <section className="rounded-[2rem] border border-white/10 bg-black/45 p-6 shadow-2xl shadow-black/30">
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-sm text-white/40">Satış Komuta Katmanı</p>
          <h2 className="mt-1 text-2xl font-semibold">Gelir ve Teklif Radarı</h2>
        </div>

        <div className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/60">
          Canlı fırsat görünümü
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {commandCards.map((card) => (
          <div
            key={card.label}
            className="rounded-3xl border border-white/10 bg-white/[0.035] p-5"
          >
            <p className="text-sm text-white/45">{card.label}</p>
            <p className="mt-3 text-3xl font-semibold">{card.value}</p>
            <p className="mt-2 text-sm text-white/45">{card.note}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-4">
        {pipelineItems.map((item) => (
          <div
            key={item.company}
            className="rounded-3xl border border-white/10 bg-black/50 p-5 transition hover:border-white/20 hover:bg-white/[0.035]"
          >
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <div>
                <p className="text-lg font-semibold text-white">{item.company}</p>
                <p className="mt-1 text-sm text-white/45">{item.sector}</p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3 md:min-w-[560px]">
                <div>
                  <p className="text-xs text-white/35">Potansiyel Değer</p>
                  <p className="mt-1 font-semibold text-white">{item.value}</p>
                </div>

                <div>
                  <p className="text-xs text-white/35">Aşama</p>
                  <p className="mt-1 font-semibold text-white">{item.stage}</p>
                </div>

                <div>
                  <p className="text-xs text-white/35">Sıradaki Aksiyon</p>
                  <p className="mt-1 font-semibold text-white">{item.nextAction}</p>
                </div>
              </div>
            </div>

            <div className="mt-5">
              <div className="mb-2 flex items-center justify-between text-xs text-white/40">
                <span>Kapanma Skoru</span>
                <span>%{item.probability}</span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-white"
                  style={{ width: `${item.probability}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
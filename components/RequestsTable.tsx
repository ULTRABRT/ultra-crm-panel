const requests = [
  {
    customer: "Mehmet Akgün",
    type: "Müşteri",
    request: "Güneş paneli + lityum batarya",
    temperature: "Çok sıcak",
    action: "Teklif hazırlanmalı",
    score: 96,
    stage: "Teklif",
  },
  {
    customer: "Ayşe Demir",
    type: "Müşteri",
    request: "Elektrik faturası düşürme",
    temperature: "Sıcak",
    action: "Keşif bilgisi istenmeli",
    score: 82,
    stage: "Keşif",
  },
  {
    customer: "Karakaş Metal",
    type: "Kurumsal",
    request: "Üretim / sanayi talebi",
    temperature: "Ilık",
    action: "Eksik bilgi tamamlanmalı",
    score: 61,
    stage: "Bilgi",
  },
  {
    customer: "Sistem Bildirimi",
    type: "Otomasyon",
    request: "Alakasız bildirim",
    temperature: "Soğuk",
    action: "Yok sayıldı",
    score: 18,
    stage: "Kapandı",
  },
];

const actionQueue = [
  {
    title: "Öncelikli Takip",
    value: "32",
    note: "sıcak talep takipte",
  },
  {
    title: "Teklif Aşaması",
    value: "14",
    note: "hazırlanmayı bekliyor",
  },
  {
    title: "Eksik Bilgi",
    value: "9",
    note: "müşteri dönüşü gerekli",
  },
];

const temperatureStyles = {
  "Çok sıcak": "bg-white text-black",
  Sıcak: "border border-white/20 bg-white/10 text-white",
  Ilık: "border border-white/15 bg-white/[0.04] text-white/70",
  Soğuk: "border border-white/10 bg-black text-white/55",
};

export function RequestsTable() {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-black/40 p-5 shadow-2xl shadow-black/30">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-medium text-white/40">Talep Kalite Motoru</p>
          <h2 className="mt-1 text-xl font-semibold">Son Gelen Talepler</h2>
        </div>

        <button className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/70 transition hover:border-white/25 hover:text-white">
          Tümünü Gör
        </button>
      </div>

      <div className="overflow-hidden rounded-[1.5rem] border border-white/10">
        {requests.map((request, index) => (
          <div
            key={request.customer}
            className={`arqon-card-grid px-4 py-3.5 text-sm [--arqon-grid-min:10rem] ${
              index !== requests.length - 1 ? "border-b border-white/10" : ""
            }`}
          >
            <div>
              <p className="font-medium text-white">{request.customer}</p>
              <p className="mt-1 text-white/40">{request.type}</p>
            </div>

            <div className="text-white/60">{request.request}</div>

            <div>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  temperatureStyles[
                    request.temperature as keyof typeof temperatureStyles
                  ]
                }`}
              >
                {request.temperature}
              </span>
            </div>

            <div className="text-white/55">{request.action}</div>
          </div>
        ))}
      </div>

      <div className="arqon-card-grid mt-4 [--arqon-grid-min:12rem]">
        {actionQueue.map((item) => (
          <div
            key={item.title}
            className="rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-4"
          >
            <p className="text-sm text-white/45">{item.title}</p>
            <p className="mt-2 text-2xl font-semibold">{item.value}</p>
            <p className="mt-1.5 text-sm text-white/45">{item.note}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-white/40">Akıllı Öneri</p>
            <h3 className="mt-1 text-lg font-semibold">
              Bugün önce çok sıcak talepler kapatılmalı.
            </h3>
          </div>

          <span className="shrink-0 rounded-full bg-white px-4 py-2 text-xs font-semibold text-black">
            Öncelik
          </span>
        </div>

        <p className="mt-3 max-w-2xl text-sm leading-5 text-white/50">
          Sistem, teklif ihtimali yüksek talepleri öne çıkarır. Satış ekibi önce
          sıcak müşterilere dönüş yapar, düşük kaliteli bildirimler otomatik
          olarak arka plana alınır.
        </p>
      </div>
    </div>
  );
}

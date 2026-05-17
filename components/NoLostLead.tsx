import { FiAlertTriangle, FiClock, FiUserCheck } from "react-icons/fi";

const lostLeadAlerts = [
  {
    customer: "Mehmet Akgün",
    issue: "Teklif istendi ama hazırlık başlamadı",
    heat: "Çok sıcak",
    wait: "2 sa 18 dk",
    owner: "Satış Ekibi",
    action: "Bugün aranmalı",
  },
  {
    customer: "Karaqaş Metal",
    issue: "Eksik bilgi nedeniyle teklif bekliyor",
    heat: "Ilık",
    wait: "5 sa 40 dk",
    owner: "Operasyon",
    action: "Bilgi tamamlanmalı",
  },
  {
    customer: "Ayşe Demir",
    issue: "Keşif bilgisi netleşmedi",
    heat: "Sıcak",
    wait: "1 sa 12 dk",
    owner: "Satış Ekibi",
    action: "Keşif tarihi alınmalı",
  },
];

const heatStyles: Record<string, string> = {
  "Çok sıcak": "bg-white text-black",
  Sıcak: "border border-white/20 bg-white/10 text-white",
  Ilık: "border border-white/10 bg-black text-white/70",
};

export function NoLostLead() {
  return (
    <section className="rounded-[2rem] border border-white/10 bg-black/45 p-5 shadow-2xl shadow-black/40">
      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-medium text-white/40">No Lost Lead Motoru</p>
          <h2 className="mt-1 text-xl font-semibold tracking-tight">
            Kaybolma Riski Taşıyan Fırsatlar
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-5 text-white/50">
            Sistem, teklif isteyen, keşif bekleyen veya uzun süre dönüş almayan
            talepleri satış kaybına dönüşmeden öne çıkarır.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/70">
          <FiAlertTriangle />
          <span>3 kritik aksiyon</span>
        </div>
      </div>

      <div className="grid gap-3">
        {lostLeadAlerts.map((alert) => (
          <div
            key={alert.customer}
            className="arqon-card-grid rounded-[1.5rem] border border-white/10 bg-black/55 p-4 transition hover:border-white/25 hover:bg-white/[0.04] [--arqon-grid-min:10rem]"
          >
            <div>
              <p className="font-semibold">{alert.customer}</p>
              <p className="mt-1 text-sm text-white/40">{alert.owner}</p>
            </div>

            <div>
              <p className="text-sm text-white/45">Risk</p>
              <p className="mt-1 font-medium text-white">{alert.issue}</p>
            </div>

            <div>
              <p className="text-sm text-white/45">Sıcaklık</p>
              <span
                className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                  heatStyles[alert.heat]
                }`}
              >
                {alert.heat}
              </span>
            </div>

            <div>
              <p className="flex items-center gap-2 text-sm text-white/45">
                <FiClock />
                Bekleme
              </p>
              <p className="mt-2 font-semibold">{alert.wait}</p>
            </div>

            <div>
              <p className="flex items-center gap-2 text-sm text-white/45">
                <FiUserCheck />
                Önerilen Aksiyon
              </p>
              <p className="mt-2 font-semibold">{alert.action}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

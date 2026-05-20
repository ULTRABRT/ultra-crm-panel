import { Header } from "../../components/Header";
import { PanelCard } from "../../components/PanelCard";
import { Sidebar } from "../../components/Sidebar";
import { SignalCore } from "../../components/dna/SignalCore";

const signalStats = [
  { label: "Sinyal kaynağı", value: "8 kanal" },
  { label: "DNA katmanı", value: "Tek çekirdek" },
  { label: "Aksiyon dili", value: "Sektörel" },
];

const moduleCards = [
  {
    title: "Kanal sinyalleri",
    description:
      "WhatsApp, Instagram, Messenger, Telegram, TikTok, SMS, webchat ve form sinyalleri tek operasyon haritasında birleşir.",
  },
  {
    title: "KPI mantığı",
    description:
      "Her sektör kendi takip ritmini, başarı göstergesini ve öncelik skorunu aynı çekirdekte taşır.",
  },
  {
    title: "Müşteri hafızası",
    description:
      "Alanlar, notlar, temas geçmişi ve karar izleri sektör bağlamıyla okunabilir hale gelir.",
  },
  {
    title: "AI aksiyon katmanı",
    description:
      "Sinyaller, temsilciye sıradaki doğru aksiyonu sakin ve ölçülebilir bir dille önerir.",
  },
];

export default function SektorelDnaPage() {
  return (
    <main className="arqon-app-shell">
      <div className="arqon-app-frame">
        <Sidebar />

        <section className="arqon-main-panel">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.14),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.08),transparent_30%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.055)_1px,transparent_1px)] bg-[size:72px_72px] opacity-20" />

          <Header />

          <div className="arqon-page-scroll">
            <section className="arqon-split-grid items-center [--arqon-split-min:25rem]">
              <PanelCard className="p-6 lg:p-8" variant="strong">
                <p className="text-[11px] font-semibold uppercase tracking-[0.45em] text-white/35">
                  Arqon Signal Core
                </p>

                <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-white md:text-5xl">
                  Sektörel DNA
                </h1>

                <p className="mt-5 max-w-2xl text-base leading-8 text-white/52">
                  Arqon, kanal sinyallerini, KPI mantığını ve müşteri hafızasını
                  tek operasyon çekirdeğinde birleştirir.
                </p>

                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  {signalStats.map((item) => (
                    <div
                      key={item.label}
                      className="rounded-2xl border border-white/10 bg-black/35 p-4"
                    >
                      <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-white/35">
                        {item.label}
                      </p>
                      <p className="mt-2 text-sm font-semibold text-white">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
              </PanelCard>

              <SignalCore />
            </section>

            <section className="arqon-card-grid mt-6">
              {moduleCards.map((card) => (
                <PanelCard key={card.title} className="p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-white/30">
                    DNA Modülü
                  </p>
                  <h2 className="mt-4 text-lg font-semibold text-white">
                    {card.title}
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-white/45">
                    {card.description}
                  </p>
                </PanelCard>
              ))}
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}

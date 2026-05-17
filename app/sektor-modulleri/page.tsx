import { Header } from "../../components/Header";
import { PanelCard } from "../../components/PanelCard";
import { Sidebar } from "../../components/Sidebar";
import { SignalCore } from "../../components/dna/SignalCore";

const signalStats = [
  { label: "Sinyal kaynağı", value: "7 kanal" },
  { label: "DNA katmanı", value: "Tek çekirdek" },
  { label: "Aksiyon dili", value: "Sektörel" },
];

const moduleCards = [
  {
    title: "Kanal sinyalleri",
    description:
      "WhatsApp, Instagram, mail, telefon, form, web chat ve referans akışları tek operasyon haritasına bağlanır.",
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

export default function SektorModulleriPage() {
  return (
    <main className="h-dvh min-h-dvh overflow-hidden bg-black text-white">
      <div className="flex h-full min-h-0 overflow-hidden">
        <Sidebar />

        <section className="relative flex min-h-0 min-w-0 flex-1 flex-col">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.14),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.08),transparent_30%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.055)_1px,transparent_1px)] bg-[size:72px_72px] opacity-20" />

          <Header />

          <div className="relative min-h-0 flex-1 overflow-y-auto p-4 pb-14 sm:p-5 lg:p-6 lg:pb-16 2xl:p-8 2xl:pb-20">
            <section className="grid items-center gap-6 2xl:grid-cols-[minmax(0,0.88fr)_minmax(460px,1.12fr)]">
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

            <section className="mt-6 grid gap-5 md:grid-cols-2 2xl:grid-cols-4">
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

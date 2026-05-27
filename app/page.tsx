import { ChannelStatus } from "../components/ChannelStatus";
import { CommandInsights } from "../components/CommandInsights";
import { ExecutiveSummary } from "../components/ExecutiveSummary";
import { Header } from "../components/Header";
import { NoLostLead } from "../components/NoLostLead";
import { RequestsTable } from "../components/RequestsTable";
import { RevenueRadar } from "../components/RevenueRadar";
import { Sidebar } from "../components/Sidebar";
import { AiBoardroomBriefing } from "../components/dna/AiBoardroomBriefing";
import { SectorKpiGroup } from "../components/dna/SectorKpiGroup";
import { PageShell, SectionHeader } from "../components/ui";
import { DnaProvider } from "../context/DnaContext";
import { activeDna } from "../data/dna/active";

export default function Home() {
  return (
    <DnaProvider dna={activeDna}>
      <main className="arqon-app-shell">
        <div className="arqon-app-frame">
          <Sidebar />

          <section className="arqon-main-panel">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.14),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.08),transparent_30%)]" />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.055)_1px,transparent_1px)] bg-[size:72px_72px] opacity-20" />

            <Header />

            <div className="arqon-page-scroll">
              <PageShell
                eyebrow="Kontrol Merkezi"
                title="Executive AI Boardroom"
                description="Açık talepler, gelir riski ve insan onayı bekleyen kararlar tek readonly kontrol yüzeyinde özetlenir."
              >
                <section className="arqon-section-gap overflow-hidden rounded-[2.25rem] border border-white/10 bg-white/[0.035] p-3 shadow-2xl shadow-black/30 sm:p-4 xl:p-5">
                  <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
                    <div className="min-w-0">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/35">
                        Boardroom karar katmanı
                      </p>
                      <h2 className="mt-1 text-2xl font-semibold tracking-tight text-white">
                        Bugünün yönetici karar yüzeyi
                      </h2>
                    </div>

                    <div className="flex flex-wrap gap-2 text-xs font-semibold text-white/55">
                      <span className="rounded-full border border-white/10 bg-black/35 px-3 py-1.5">
                        Readonly
                      </span>
                      <span className="rounded-full border border-white/10 bg-black/35 px-3 py-1.5">
                        Yerel kanıt
                      </span>
                      <span className="rounded-full border border-white/10 bg-black/35 px-3 py-1.5">
                        İnsan onayı
                      </span>
                    </div>
                  </div>

                  <div className="grid items-start gap-4 xl:grid-cols-[minmax(0,1.08fr)_minmax(23rem,0.92fr)]">
                    <div className="grid min-w-0 gap-4 xl:order-2">
                      <section className="rounded-[2rem] border border-white/10 bg-black/35 p-5 shadow-xl shadow-black/20">
                        <SectorKpiGroup
                          zone="boardroom_briefing"
                          eyebrow="Karar matrisi"
                          title="Dört öncelikli sinyal"
                          description="Aktif DNA, kritik operasyon metriklerini yönetici karar setinde öne çıkarır."
                          columns={2}
                        />
                      </section>

                      <ExecutiveSummary />
                    </div>

                    <div className="min-w-0 xl:order-1">
                      <AiBoardroomBriefing />
                    </div>
                  </div>

                  <div className="mt-4 rounded-[1.5rem] border border-white/10 bg-black/30 px-4 py-3 text-sm leading-6 text-white/48">
                    Bu yüzey mevcut yerel kaynaklardan okunan karar özetidir;
                    müşteri, lead, teklif veya görev kaydı yazmaz.
                  </div>
                </section>

                <section className="arqon-section-gap rounded-[2rem] border border-white/10 bg-black/25 p-4 sm:p-5">
                  <SectionHeader
                    eyebrow="Destek katmanı"
                    title="Operasyon kanıtları ve akışlar"
                    description="Boardroom kararını destekleyen kaynak, talep, kanal, lead ve gelir yüzeyleri aşağıda okunur."
                    align="stack"
                  />

                  <div className="space-y-5">
                    <SectorKpiGroup
                      zone="boardroom_right_column"
                      eyebrow="DNA destek sinyali"
                      title="Sektörel KPI destekleri"
                      description="Aktif sektör DNA'sından gelen destek metrikleri karar yüzeyinin altında tutulur."
                      columns={2}
                    />

                    <CommandInsights />

                    <div className="arqon-fluid-grid items-start [--arqon-grid-min:24rem]">
                      <RequestsTable />
                      <ChannelStatus />
                    </div>

                    <NoLostLead />

                    <RevenueRadar />
                  </div>
                </section>
              </PageShell>
            </div>
          </section>
        </div>
      </main>
    </DnaProvider>
  );
}

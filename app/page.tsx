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
                title="AI Boardroom"
                description="Açık talepler, gelir riski ve insan onayı bekleyen aksiyonlar tek karar ekranında özetlenir."
              >
                <section className="arqon-section-gap arqon-fluid-grid items-start [--arqon-grid-min:22rem]">
                  <div className="min-w-0 space-y-5">
                    <AiBoardroomBriefing />

                    <SectorKpiGroup
                      zone="boardroom_briefing"
                      eyebrow="Ana KPI"
                      title="Bugünün dört karar sinyali"
                      description="Aktif DNA, kritik operasyon metriklerini tek karar setinde öne çıkarır."
                      columns={4}
                    />
                  </div>

                  <aside className="self-start rounded-[2rem] border border-white/10 bg-white/[0.025] p-5">
                    <SectionHeader
                      eyebrow="Sağ Kolon"
                      title="Komut Paneli"
                      description="Riskler, DNA sinyalleri ve mevcut operasyon destekleri."
                      align="stack"
                    />

                    <div className="space-y-5">
                      <ExecutiveSummary />

                      <SectorKpiGroup
                        zone="boardroom_right_column"
                        eyebrow="DNA Sinyali"
                        title="Sektörel KPI'lar"
                        description="Aktif sektör DNA'sından gelen destek metrikleri."
                        columns={2}
                      />
                    </div>
                  </aside>
                </section>
              </PageShell>

              <section className="arqon-section-gap">
                <CommandInsights />
              </section>

              <section className="arqon-section-gap arqon-fluid-grid items-start [--arqon-grid-min:24rem]">
                <RequestsTable />
                <ChannelStatus />
              </section>

              <section className="arqon-section-gap">
                <NoLostLead />
              </section>

              <section className="arqon-section-gap">
                <RevenueRadar />
              </section>
            </div>
          </section>
        </div>
      </main>
    </DnaProvider>
  );
}

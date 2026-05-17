import { ChannelStatus } from "../components/ChannelStatus";
import { CommandInsights } from "../components/CommandInsights";
import { DashboardHero } from "../components/DashboardHero";
import { ExecutiveSummary } from "../components/ExecutiveSummary";
import { Header } from "../components/Header";
import { NoLostLead } from "../components/NoLostLead";
import { RequestsTable } from "../components/RequestsTable";
import { RevenueRadar } from "../components/RevenueRadar";
import { Sidebar } from "../components/Sidebar";
import { DnaProvider } from "../context/DnaContext";
import { energyDna } from "../data/dna/energy";
import { SectorKpiGroup } from "../components/dna/SectorKpiGroup";

export default function Home() {
  return (
    <DnaProvider dna={energyDna}>
      <main className="arqon-app-shell">
        <div className="arqon-app-frame">
          <Sidebar />

          <section className="arqon-main-panel">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.14),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.08),transparent_30%)]" />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.055)_1px,transparent_1px)] bg-[size:72px_72px] opacity-20" />

            <Header />

            <div className="arqon-page-scroll">
              <section className="arqon-section-gap arqon-fluid-grid [--arqon-grid-min:22rem]">
                <DashboardHero />
                <ExecutiveSummary />
              </section>

              <section className="arqon-section-gap">
                <CommandInsights />
              </section>

              <section className="arqon-section-gap arqon-fluid-grid [--arqon-grid-min:24rem]">
                <RequestsTable />
                <ChannelStatus />
              </section>

              <section className="arqon-section-gap">
                <NoLostLead />
              </section>

              <section className="arqon-section-gap">
                <RevenueRadar />
              </section>

              {/* ── YENİ: DNA Sektörel KPI Bloku ─────────────────────────── */}
              <section className="arqon-section-gap">
                <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 shadow-2xl shadow-black/30 backdrop-blur-xl">
                  <SectorKpiGroup
                    zone="boardroom_right_column"
                    eyebrow="DNA Test Alanı"
                    title="Sektörel KPI'lar (Enerji DNA)"
                    description="Bu blok yeni DNA mimarisinden besleniyor. Mevcut Solify DNA Kartları üstte hâlâ duruyor — ikisi karşılaştırılabilir."
                    columns={4}
                  />
                </div>
              </section>
            </div>
          </section>
        </div>
      </main>
    </DnaProvider>
  );
}

/*
 * Ne değişti?
 * 3 import eklendi: DnaProvider, energyDna, SectorKpiGroup.
 * <main> DnaProvider ile sarıldı (dna={energyDna}).
 * RevenueRadar section'ından sonra DNA KPI bloku eklendi.
 * Mevcut hiçbir satıra dokunulmadı.
 */

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
      <main className="h-dvh min-h-dvh overflow-hidden bg-black text-white">
        <div className="flex h-full min-h-0 overflow-hidden">
          <Sidebar />

          <section className="relative flex min-h-0 min-w-0 flex-1 flex-col">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.14),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.08),transparent_30%)]" />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.055)_1px,transparent_1px)] bg-[size:72px_72px] opacity-20" />

            <Header />

            <div className="relative min-h-0 flex-1 overflow-y-auto p-4 pb-14 sm:p-5 lg:p-6 lg:pb-16 2xl:p-8 2xl:pb-20">
              <section className="mb-6 grid gap-5 2xl:mb-8 2xl:grid-cols-[1.4fr_0.8fr]">
                <DashboardHero />
                <ExecutiveSummary />
              </section>

              <section className="mb-5">
                <CommandInsights />
              </section>

              <section className="mb-5 grid gap-5 xl:grid-cols-[1fr_0.75fr]">
                <RequestsTable />
                <ChannelStatus />
              </section>

              <section className="mb-5">
                <NoLostLead />
              </section>

              <section className="mb-5">
                <RevenueRadar />
              </section>

              {/* ── YENİ: DNA Sektörel KPI Bloku ─────────────────────────── */}
              <section className="mb-5">
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

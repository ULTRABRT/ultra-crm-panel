import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { LeadAksiyonPaneli } from "../../components/leadler/LeadAksiyonPaneli";
import { LeadlerHero } from "../../components/leadler/LeadlerHero";
import { LeadListesi } from "../../components/leadler/LeadListesi";
import { LeadSegmentleri } from "../../components/leadler/LeadSegmentleri";
import { LeadStats } from "../../components/leadler/LeadStats";
import { ReadonlyNoLostLeadSignals } from "../../components/leadler/ReadonlyNoLostLeadSignals";

export default function LeadlerPage() {
  return (
    <main className="arqon-app-shell">
      <div className="arqon-app-frame">
        <Sidebar />

        <section className="arqon-main-panel">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.14),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.08),transparent_30%)]" />

          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.055)_1px,transparent_1px)] bg-[size:72px_72px] opacity-20" />

          <Header />

          <div className="arqon-page-scroll">
            <LeadlerHero />

            <section className="arqon-split-grid [--arqon-split-min:24rem] xl:items-start">
              <LeadListesi />

              <div className="grid gap-4">
                <ReadonlyNoLostLeadSignals />

                <LeadAksiyonPaneli />
              </div>
            </section>

            <section className="pt-2">
              <div className="mb-4 flex flex-col gap-2 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/35">
                    Destek katmanı
                  </p>
                  <h2 className="mt-1 text-xl font-semibold tracking-tight text-white">
                    Operasyon özetleri ve segmentler
                  </h2>
                </div>

                <p className="max-w-2xl text-sm leading-6 text-white/42">
                  KPI ve hazır segmentler cockpit kararını destekler; ana
                  çalışma sırası üstteki lead akışında kalır.
                </p>
              </div>

              <LeadStats />

              <LeadSegmentleri />
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}

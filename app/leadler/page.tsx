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

            <LeadSegmentleri />

            <LeadStats />

            <ReadonlyNoLostLeadSignals />

            <section className="arqon-split-grid [--arqon-split-min:24rem]">
              <LeadListesi />

              <LeadAksiyonPaneli />
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}

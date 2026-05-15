import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { LeadAksiyonPaneli } from "../../components/leadler/LeadAksiyonPaneli";
import { LeadlerHero } from "../../components/leadler/LeadlerHero";
import { LeadListesi } from "../../components/leadler/LeadListesi";
import { LeadSegmentleri } from "../../components/leadler/LeadSegmentleri";
import { LeadStats } from "../../components/leadler/LeadStats";

export default function LeadlerPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="flex min-h-screen overflow-hidden">
        <Sidebar />

        <section className="relative flex min-w-0 flex-1 flex-col">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.14),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.08),transparent_30%)]" />

          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.055)_1px,transparent_1px)] bg-[size:72px_72px] opacity-20" />

          <Header />

          <div className="relative flex-1 overflow-auto p-6 lg:p-8">
            <LeadlerHero />

            <LeadSegmentleri />

            <LeadStats />

            <section className="grid gap-5 xl:grid-cols-[minmax(0,1.45fr)_minmax(340px,0.72fr)]">
              <LeadListesi />

              <LeadAksiyonPaneli />
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}
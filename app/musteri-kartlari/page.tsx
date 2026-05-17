import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { AiMusteriOzeti } from "../../components/musteri-kartlari/AiMusteriOzeti";
import { EnerjiTalepBilgileri } from "../../components/musteri-kartlari/EnerjiTalepBilgileri";
import { KesifRandevuKarti } from "../../components/musteri-kartlari/KesifRandevuKarti";
import { MusteriAksiyonPaneli } from "../../components/musteri-kartlari/MusteriAksiyonPaneli";
import { MusteriKartlariHero } from "../../components/musteri-kartlari/MusteriKartlariHero";
import { MusteriKpiSatiri } from "../../components/musteri-kartlari/MusteriKpiSatiri";
import { MusteriOzetBar } from "../../components/musteri-kartlari/MusteriOzetBar";
import { MusteriTimeline } from "../../components/musteri-kartlari/MusteriTimeline";
import { SatisSureciKarti } from "../../components/musteri-kartlari/SatisSureciKarti";

export default function MusteriKartlariPage() {
  return (
    <main className="arqon-app-shell">
      <div className="arqon-app-frame">
        <Sidebar />

        <section className="arqon-main-panel">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.14),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.08),transparent_30%)]" />

          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.055)_1px,transparent_1px)] bg-[size:72px_72px] opacity-20" />

          <Header />

          <div className="arqon-page-scroll">
            <MusteriKartlariHero />

            <MusteriKpiSatiri />

            <MusteriOzetBar />

            <section className="arqon-split-grid [--arqon-split-min:24rem]">
              <div className="space-y-5">
                <AiMusteriOzeti />

                <EnerjiTalepBilgileri />

                <SatisSureciKarti />

                <KesifRandevuKarti />

                <MusteriTimeline />
              </div>

              <MusteriAksiyonPaneli />
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}

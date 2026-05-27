import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { AiMusteriOzeti } from "../../components/musteri-kartlari/AiMusteriOzeti";
import { CustomerMemorySnapshot } from "../../components/musteri-kartlari/CustomerMemorySnapshot";
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

            <section className="arqon-section-gap overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] p-3 shadow-2xl shadow-black/25 sm:p-4 xl:p-5">
              <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/35">
                    Müşteri kanıt katmanı
                  </p>
                  <h2 className="mt-1 text-2xl font-semibold tracking-tight text-white">
                    Hafıza ve yerel kanıt merkezi
                  </h2>
                  <p className="mt-2 max-w-3xl text-sm leading-6 text-white/45">
                    İlk okuma müşteri geçmişi, kaynak izi ve danışman sinyali
                    üzerinden yapılır; aksiyon panelleri destek katmanında kalır.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 text-xs font-semibold text-white/55">
                  <span className="rounded-full border border-white/10 bg-black/35 px-3 py-1.5">
                    Readonly
                  </span>
                  <span className="rounded-full border border-white/10 bg-black/35 px-3 py-1.5">
                    Yerel görünüm
                  </span>
                  <span className="rounded-full border border-white/10 bg-black/35 px-3 py-1.5">
                    Onay gerekir
                  </span>
                </div>
              </div>

              <div className="grid items-start gap-4 xl:grid-cols-[minmax(0,1.08fr)_minmax(23rem,0.92fr)]">
                <CustomerMemorySnapshot />

                <aside className="grid min-w-0 gap-4">
                  <MusteriOzetBar />

                  <AiMusteriOzeti />
                </aside>
              </div>
            </section>

            <MusteriKpiSatiri />

            <section className="mt-5 rounded-[2rem] border border-white/10 bg-black/25 p-4 sm:p-5">
              <div className="mb-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/35">
                  Destek ve danışman katmanı
                </p>
                <h2 className="mt-1 text-2xl font-semibold tracking-tight text-white">
                  Enerji bağlamı, süreç ve aksiyon desteği
                </h2>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-white/45">
                  Talep alanları, satış süreci, keşif notları ve öneri panelleri
                  müşteri hafızasını destekleyen ikincil yüzeyler olarak okunur.
                </p>
              </div>

              <section className="arqon-split-grid [--arqon-split-min:24rem]">
                <div className="space-y-5">
                  <EnerjiTalepBilgileri />

                  <SatisSureciKarti />

                  <KesifRandevuKarti />

                  <MusteriTimeline />
                </div>

                <MusteriAksiyonPaneli />
              </section>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}

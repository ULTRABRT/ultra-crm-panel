import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { EnerjiDnaOzet } from "../../components/talep-havuzu/EnerjiDnaOzet";
import { KaynakPerformansi } from "../../components/talep-havuzu/KaynakPerformansi";
import { KritikAksiyonlar } from "../../components/talep-havuzu/KritikAksiyonlar";
import { TalepAkisi } from "../../components/talep-havuzu/TalepAkisi";
import { TalepHavuzuHero } from "../../components/talep-havuzu/TalepHavuzuHero";
import { TalepHunisi } from "../../components/talep-havuzu/TalepHunisi";
import { TalepStats } from "../../components/talep-havuzu/TalepStats";

export default function TalepHavuzuPage() {
  return (
    <main className="arqon-app-shell">
      <div className="arqon-app-frame">
        <Sidebar />

        <section className="arqon-main-panel">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.14),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.08),transparent_30%)]" />

          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.055)_1px,transparent_1px)] bg-[size:72px_72px] opacity-20" />

          <Header />

          <div className="arqon-page-scroll">
            <TalepHavuzuHero />

            <section className="arqon-split-grid [--arqon-split-min:24rem]">
              <TalepAkisi />

              <aside className="space-y-5">
                <KritikAksiyonlar />
                <TalepHunisi />
              </aside>
            </section>

            <TalepStats />

            <div className="mt-5">
              <EnerjiDnaOzet />
            </div>

            <div className="mt-5">
              <KaynakPerformansi />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

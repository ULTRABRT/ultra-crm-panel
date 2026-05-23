import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { OffersWorkspace } from "../../components/teklifler/OffersWorkspace";

export default function TekliflerPage() {
  return (
    <main className="arqon-app-shell">
      <div className="arqon-app-frame">
        <Sidebar />

        <section className="arqon-main-panel bg-[#0B0D10]">
          <Header />

          <div className="arqon-page-scroll">
            <OffersWorkspace />
          </div>
        </section>
      </div>
    </main>
  );
}

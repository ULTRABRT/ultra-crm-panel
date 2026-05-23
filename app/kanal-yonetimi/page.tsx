import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { ChannelManagementWorkspace } from "../../components/kanal-yonetimi/ChannelManagementWorkspace";

export default function KanalYonetimiPage() {
  return (
    <main className="arqon-app-shell">
      <div className="arqon-app-frame">
        <Sidebar />

        <section className="arqon-main-panel bg-[#0B0D10]">
          <Header />

          <div className="arqon-page-scroll">
            <ChannelManagementWorkspace />
          </div>
        </section>
      </div>
    </main>
  );
}

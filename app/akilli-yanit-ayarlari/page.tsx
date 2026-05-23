import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { SmartReplySettingsWorkspace } from "../../components/akilli-yanit-ayarlari/SmartReplySettingsWorkspace";

export default function AkilliYanitAyarlariPage() {
  return (
    <main className="arqon-app-shell">
      <div className="arqon-app-frame">
        <Sidebar />

        <section className="arqon-main-panel bg-[#0B0D10]">
          <Header />

          <div className="arqon-page-scroll">
            <SmartReplySettingsWorkspace />
          </div>
        </section>
      </div>
    </main>
  );
}

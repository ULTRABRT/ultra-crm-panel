import { Sidebar } from "../../components/Sidebar";
import { InboxWorkspace } from "../../components/inbox/InboxWorkspace";
import { DnaProvider } from "../../context/DnaContext";
import { activeDna } from "../../data/dna/active";

export default function InboxPage() {
  return (
    <DnaProvider dna={activeDna}>
      <main className="arqon-app-shell">
        <div className="arqon-app-frame">
          <Sidebar />

          <section className="arqon-main-panel arqon-inbox-shell-final bg-[#0B0D10]">
            <div className="arqon-inbox-page-final">
              <InboxWorkspace />
            </div>
          </section>
        </div>
      </main>
    </DnaProvider>
  );
}

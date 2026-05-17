import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { InboxWorkspace } from "../../components/inbox/InboxWorkspace";

export default function InboxPage() {
  return (
    <main className="arqon-app-shell">
      <div className="arqon-app-frame">
        <Sidebar />

        <section className="arqon-main-panel overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.10),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.045),transparent_34%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:72px_72px] opacity-25" />

          <Header />

          <div className="relative min-h-0 flex-1 overflow-hidden p-[clamp(0.85rem,1.2vw,1.75rem)]">
            <InboxWorkspace />
          </div>
        </section>
      </div>
    </main>
  );
}

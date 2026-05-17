import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { InboxWorkspace } from "../../components/inbox/InboxWorkspace";

export default function InboxPage() {
  return (
    <main className="h-dvh min-h-dvh overflow-hidden bg-black text-white">
      <div className="flex h-full min-h-0 overflow-hidden">
        <Sidebar />

        <section className="relative flex min-w-0 flex-1 flex-col overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.10),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.045),transparent_34%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:72px_72px] opacity-25" />

          <Header />

          <div className="relative min-h-0 flex-1 overflow-hidden p-4 sm:p-5 lg:px-6 2xl:px-7">
            <InboxWorkspace />
          </div>
        </section>
      </div>
    </main>
  );
}

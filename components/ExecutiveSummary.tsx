import { executiveNotes } from "../data/dashboard";
import { PanelCard } from "./PanelCard";

export function ExecutiveSummary() {
  return (
    <PanelCard className="p-6">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-sm text-white/40">AI Yönetici Masası</p>
          <h3 className="mt-1 text-2xl font-semibold">Bugünkü Riskler</h3>
        </div>

        <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-black">
          CANLI
        </span>
      </div>

      <div className="space-y-4">
        {executiveNotes.map((note) => (
          <div
            key={note.title}
            className="rounded-3xl border border-white/10 bg-black/45 p-5 transition hover:border-white/20 hover:bg-white/[0.06]"
          >
            <p className="font-medium">{note.title}</p>
            <p className="mt-2 text-sm leading-6 text-white/50">
              {note.description}
            </p>
          </div>
        ))}
      </div>
    </PanelCard>
  );
}

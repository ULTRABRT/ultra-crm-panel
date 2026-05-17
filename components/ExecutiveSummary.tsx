import { executiveNotes } from "../data/dashboard";
import { PanelCard } from "./PanelCard";

export function ExecutiveSummary() {
  return (
    <PanelCard className="self-start p-[clamp(1.15rem,1.4cqi,1.55rem)]">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-medium text-white/40">AI Yönetici Masası</p>
          <h3 className="mt-1 text-xl font-semibold">Bugünkü Riskler</h3>
        </div>

        <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-black">
          CANLI
        </span>
      </div>

      <div className="space-y-3">
        {executiveNotes.map((note) => (
          <div
            key={note.title}
            className="rounded-[1.35rem] border border-white/10 bg-black/45 p-4 transition hover:border-white/20 hover:bg-white/[0.06]"
          >
            <p className="text-sm font-medium">{note.title}</p>
            <p className="mt-1.5 text-sm leading-5 text-white/50">
              {note.description}
            </p>
          </div>
        ))}
      </div>
    </PanelCard>
  );
}

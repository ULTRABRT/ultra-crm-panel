import { stats } from "../data/dashboard";
import { PanelCard } from "./PanelCard";
import { CountUpValue } from "./ui/CountUpValue";

function getSafeIntegerValue(value: string): number | null {
  if (!/^\d+$/.test(value)) return null;

  const numericValue = Number(value);
  return Number.isSafeInteger(numericValue) ? numericValue : null;
}

export function DashboardHero() {
  return (
    <PanelCard className="p-[clamp(1.15rem,1.55cqi,2rem)]">
      <div>
        <p className="text-xs font-medium text-white/40">Operasyon özeti</p>
        <h2 className="mt-1 text-xl font-semibold">Bugünkü karar göstergeleri</h2>
      </div>

      <div className="arqon-hero-kpi-grid mt-4">
        {stats.map((stat) => {
          const numericValue = getSafeIntegerValue(stat.value);

          return (
            <div
              key={stat.label}
              className="group rounded-[1.5rem] border border-white/10 bg-black/45 p-4 transition hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.055]"
            >
              <p className="text-xs font-medium text-white/45">{stat.label}</p>
              <p className="mt-2 text-[clamp(1.85rem,2.5cqi,2.4rem)] font-semibold leading-none tracking-tight">
                {numericValue === null ? (
                  stat.value
                ) : (
                  <CountUpValue value={numericValue} />
                )}
              </p>
              <p className="mt-1.5 text-xs leading-5 text-white/45">{stat.note}</p>

              <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-2/3 rounded-full bg-white transition group-hover:w-full" />
              </div>
            </div>
          );
        })}
      </div>
    </PanelCard>
  );
}

import { stats } from "../data/dashboard";
import { PanelCard } from "./PanelCard";
import { CountUpValue } from "./ui/CountUpValue";

const operationFlow = [
  "2 saati aşan sıcak talepleri sıraya al",
  "Teklif isteyen müşterileri kilitle",
  "9 insan onayını kapat",
  "Geciken takipleri satışa ata",
];

function getSafeIntegerValue(value: string): number | null {
  if (!/^\d+$/.test(value)) return null;

  const numericValue = Number(value);
  return Number.isSafeInteger(numericValue) ? numericValue : null;
}

export function DashboardHero() {
  return (
    <PanelCard className="arqon-dashboard-hero relative overflow-hidden p-[clamp(1.15rem,1.55cqi,2rem)]">
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-white/[0.08] blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 right-10 h-80 w-80 rounded-full bg-white/[0.055] blur-3xl" />

      <div className="pointer-events-none absolute inset-0 opacity-[0.08]">
        <div className="h-full w-full bg-[linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] bg-[size:42px_42px]" />
      </div>

      <div className="relative">
        <div className="inline-flex rounded-full border border-white/10 bg-black/45 px-3.5 py-1.5 text-xs font-medium text-white/58">
          AI Boardroom · Canlı brifing · Gelir riski · Öncelikli aksiyon
        </div>

        <div className="arqon-split-grid mt-5 [--arqon-split-min:21rem]">
          <div>
            <h1 className="max-w-4xl text-[clamp(1.8rem,3.15cqi,3.05rem)] font-semibold leading-[1.06] tracking-[-0.05em]">
              Bugün 32 sıcak müşteri, ₺701K açık fırsat ve 9 insan onayı bekliyor.
            </h1>

            <p className="mt-4 max-w-3xl text-[clamp(0.95rem,1.15cqi,1.05rem)] leading-6 text-white/55">
              İlk aksiyon: 2 saattir bekleyen çok sıcak talepleri satış ekibine
              aktar, teklif isteyen müşterileri aynı gün içinde kapatma masasına al.
            </p>
          </div>

          <div className="rounded-[1.65rem] border border-white/10 bg-black/45 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-white/40">Yönetici Brifingi</p>
                <h3 className="mt-1 text-lg font-semibold">Öncelik Sırası</h3>
              </div>

              <span className="flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold text-black">
                <span className="h-2 w-2 animate-pulse rounded-full bg-black" />
                Canlı
              </span>
            </div>

            <div className="mt-4 space-y-2.5">
              {operationFlow.map((item, index) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.035] p-2.5"
                >
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-white text-xs font-bold text-black">
                    {index + 1}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium leading-5">{item}</p>
                    <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-white"
                        style={{ width: `${92 - index * 13}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="arqon-hero-kpi-grid mt-5">
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
      </div>
    </PanelCard>
  );
}

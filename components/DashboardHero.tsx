import { stats } from "../data/dashboard";
import { PanelCard } from "./PanelCard";
import { CountUpValue } from "./ui/CountUpValue";

const operationFlow = [
  "Talep alındı",
  "Sıcaklık ölçüldü",
  "Öncelik verildi",
  "Takip aksiyonu hazır",
];

function getSafeIntegerValue(value: string): number | null {
  if (!/^\d+$/.test(value)) return null;

  const numericValue = Number(value);
  return Number.isSafeInteger(numericValue) ? numericValue : null;
}

export function DashboardHero() {
  return (
    <PanelCard className="relative overflow-hidden p-8 md:p-10">
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-white/[0.08] blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 right-10 h-80 w-80 rounded-full bg-white/[0.055] blur-3xl" />

      <div className="pointer-events-none absolute inset-0 opacity-[0.08]">
        <div className="h-full w-full bg-[linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] bg-[size:42px_42px]" />
      </div>

      <div className="relative">
        <div className="inline-flex rounded-full border border-white/10 bg-black/45 px-4 py-2 text-sm text-white/60">
          CRM Çekirdeği · Talep Yönetimi · Teklif Takibi · Yönetici Özeti
        </div>

        <div className="mt-8 grid gap-8 xl:grid-cols-[1fr_0.72fr]">
          <div>
            <h1 className="max-w-4xl text-5xl font-semibold leading-[1.05] tracking-[-0.05em] md:text-6xl">
              Her kanaldan gelen talebi tek merkezde yakalayan akıllı CRM.
            </h1>

            <p className="mt-7 max-w-3xl text-lg leading-8 text-white/55">
              Mail, sosyal medya, web sohbet ve manuel formlardan gelen talepler
              analiz edilir, önceliklendirilir, doğru aksiyona yönlendirilir ve
              satış süreci görünür hale gelir.
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-black/45 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/40">Canlı Operasyon Akışı</p>
                <h3 className="mt-1 text-xl font-semibold">Talep Motoru</h3>
              </div>

              <span className="flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold text-black">
                <span className="h-2 w-2 animate-pulse rounded-full bg-black" />
                Canlı
              </span>
            </div>

            <div className="mt-5 space-y-3">
              {operationFlow.map((item, index) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.035] p-3"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white text-xs font-bold text-black">
                    {index + 1}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium">{item}</p>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
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

        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const numericValue = getSafeIntegerValue(stat.value);

            return (
              <div
                key={stat.label}
                className="group rounded-3xl border border-white/10 bg-black/45 p-5 transition hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.055]"
              >
                <p className="text-sm text-white/45">{stat.label}</p>
                <p className="mt-3 text-4xl font-semibold tracking-tight">
                  {numericValue === null ? (
                    stat.value
                  ) : (
                    <CountUpValue value={numericValue} />
                  )}
                </p>
                <p className="mt-2 text-sm text-white/45">{stat.note}</p>

                <div className="mt-5 h-1 overflow-hidden rounded-full bg-white/10">
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

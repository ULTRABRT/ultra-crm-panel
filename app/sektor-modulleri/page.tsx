import {
  HiOutlineBeaker,
  HiOutlineBriefcase,
  HiOutlineBuildingOffice2,
  HiOutlineChartBarSquare,
  HiOutlineCheckBadge,
  HiOutlineCog6Tooth,
  HiOutlineCubeTransparent,
  HiOutlineDocumentMagnifyingGlass,
  HiOutlineGlobeAlt,
  HiOutlineShieldCheck,
  HiOutlineSquares2X2,
  HiOutlineTruck,
} from "react-icons/hi2";

import { Sidebar } from "../../components/Sidebar";

type ModuleTone = "graphite" | "platinum" | "amber" | "green";

type SectorModule = {
  name: string;
  family: string;
  statusLabel: string;
  description: string;
  scope: string[];
  tone: ModuleTone;
  Icon: typeof HiOutlineSquares2X2;
};

type BoundaryNote = {
  title: string;
  body: string;
  Icon: typeof HiOutlineShieldCheck;
};

const moduleToneStyles: Record<ModuleTone, string> = {
  graphite: "border-[#0B0D10]/15 bg-[#111827] text-white",
  platinum: "border-black/[0.08] bg-white text-[#0B0D10]",
  amber: "border-[#6B4E16]/20 bg-[#F3E9D2] text-[#654A14]",
  green: "border-[#2F6B4F]/20 bg-[#DDEBE4] text-[#24573F]",
};

const sectorModules: SectorModule[] = [
  {
    name: "Çekirdek müşteri operasyon katmanı",
    family: "Core Panel",
    statusLabel: "Readonly katalog",
    description:
      "Talep, lead, müşteri hafızası, teklif, kanal ve yanıt yönetişimi yüzeyleri genel temel katman olarak kalır.",
    scope: ["Sayfa modeli", "Kanıt dili", "Onay sınırı"],
    tone: "graphite",
    Icon: HiOutlineCubeTransparent,
  },
  {
    name: "Enerji ve altyapı",
    family: "Örnek DNA yönü",
    statusLabel: "DNA adayı",
    description:
      "Sektör dili, alanlar ve öneri kuralları core kimliği değiştirmeden uzmanlaşabilir.",
    scope: ["Proje bağlamı", "Teknik alanlar", "Risk dili"],
    tone: "amber",
    Icon: HiOutlineBeaker,
  },
  {
    name: "Endüstriyel üretim",
    family: "Gelecek modül ailesi",
    statusLabel: "Hazırlık katmanı",
    description:
      "Üretim talebi, tesis bağlamı ve B2B satış niteliği kaynak ve onay tasarımı sonrası haritalanabilir.",
    scope: ["Tesis profili", "B2B satış hattı", "Kalite notları"],
    tone: "platinum",
    Icon: HiOutlineCog6Tooth,
  },
  {
    name: "Saha servis operasyonları",
    family: "Gelecek modül ailesi",
    statusLabel: "İnceleme gerekli",
    description:
      "Saha talebi, randevu bağlamı ve yerel kanıt kalıcı akış tasarımı sonrası şekillendirilebilir.",
    scope: ["Ziyaret bağlamı", "Servis kuyruğu", "İnsan onayı"],
    tone: "green",
    Icon: HiOutlineTruck,
  },
  {
    name: "Ticaret ve perakende",
    family: "Gelecek modül ailesi",
    statusLabel: "Hazırlık katmanı",
    description:
      "Kaynak kalitesi, ürün ilgisi ve teklif hazırlığı runtime çalışması başlamadan kataloglanabilir.",
    scope: ["Ürün ilgisi", "Kanal kalitesi", "Teklif yolu"],
    tone: "platinum",
    Icon: HiOutlineGlobeAlt,
  },
  {
    name: "Profesyonel hizmetler",
    family: "Gelecek modül ailesi",
    statusLabel: "DNA adayı",
    description:
      "Danışman satış, teklif hafızası ve hesap bağlamı sonraki bir sektör katmanı olarak incelenebilir.",
    scope: ["Hesap bağlamı", "Teklif yolu", "Öneri notları"],
    tone: "platinum",
    Icon: HiOutlineBriefcase,
  },
];

const boundaryNotes: BoundaryNote[] = [
  {
    title: "Core Panel generic kalır",
    body:
      "Sayfa yapısı, müşteri operasyon dili ve güven sınırları Core Panel katmanındadır. Sector DNA yalnızca alan dili ve karar bağlamını daraltır.",
    Icon: HiOutlineShieldCheck,
  },
  {
    title: "Katalog readonly çalışır",
    body:
      "Bu modül yönleri local planlama notudur. Modül hazırlamaz, kayıt yazmaz ve kalıcı iş akışı davranışı açmaz.",
    Icon: HiOutlineDocumentMagnifyingGlass,
  },
  {
    title: "Uygulama için onay gerekir",
    body:
      "Her modül yolu bu katalogdan ileri geçmeden önce kaynak kontratı, kalıcı kayıt altyapısı ve denetim izi için ayrı onay ister.",
    Icon: HiOutlineCheckBadge,
  },
];

const readinessRows = [
  ["Kaynak kontratı", "Uygulama öncesi sayfa ve kanıt haritası gerekir."],
  ["Veri sınırı", "Yalnızca local örnek veri; kalıcı doğruluk kaynağı yok."],
  ["İnsan onayı", "İş akışı, görev, teklif veya müşteri değişimi öncesi onay gerekir."],
  ["Sektör uyumu", "Her modül kendi dilini, alanlarını ve risk kurallarını ayrı kanıtlamalıdır."],
];

export default function SektorModulleriPage() {
  return (
    <div className="flex min-h-dvh bg-[#0B0D10] text-white">
      <Sidebar />

      <main className="arqon-main-panel relative min-w-0 flex-1 overflow-hidden bg-[#0B0D10]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.12),transparent_34rem),linear-gradient(135deg,rgba(255,255,255,0.055),transparent_36rem)]" />
        <div className="relative z-10 flex min-h-dvh min-w-0 flex-col">
          <div className="min-w-0 flex-1 overflow-y-auto px-3 py-4 sm:px-5 lg:px-7">
            <div className="mx-auto flex min-w-0 w-full max-w-[118rem] flex-col gap-4">
              <section className="overflow-hidden rounded-[1.35rem] border border-white/10 bg-white/[0.045] shadow-[0_22px_70px_rgba(0,0,0,0.32)]">
                <div className="p-4 lg:p-5">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full border border-white/10 bg-black/45 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">
                        Sektör modül kataloğu
                      </span>
                      <span className="rounded-full border border-[#D6DAE0]/20 bg-white px-3 py-1 text-[11px] font-semibold text-black">
                        Readonly / yerel planlama yüzeyi
                      </span>
                    </div>

                    <h1 className="mt-4 text-[clamp(2rem,4vw,4.25rem)] font-semibold leading-[0.95] tracking-tight text-white">
                      Sektör Modül Kataloğu
                    </h1>

                    <p className="mt-3 max-w-3xl text-sm leading-6 text-white/52 sm:text-base sm:leading-7">
                      Sektör modülleri Arqon Core Panel üzerine kurulabilecek
                      gelecek katman yönleridir. Bu sayfa bir katalog görünümüdür;
                      modül runtime veya kurulum ekranı değildir.
                    </p>
                  </div>
                </div>
              </section>

              <section className="grid min-w-0 grid-cols-[minmax(0,1fr)] gap-3 xl:grid-cols-[minmax(0,1.45fr)_minmax(22rem,0.72fr)]">
                <div className="min-w-0 rounded-[1.25rem] border border-black/[0.08] bg-[#EEF0F3] p-3 text-[#0B0D10] shadow-[0_18px_48px_rgba(0,0,0,0.22)] sm:p-4">
                  <div className="mb-3 flex flex-col gap-2 lg:flex-row lg:items-end lg:justify-between">
                    <div className="min-w-0">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#7A808A]">
                        Ana katalog
                      </p>
                      <h2 className="mt-1 text-2xl font-semibold tracking-tight text-[#0B0D10]">
                        Modül aile yönleri
                      </h2>
                    </div>
                    <span className="inline-flex w-fit rounded-full border border-black/[0.08] bg-white px-3 py-1 text-xs font-semibold text-[#525A65]">
                      Gelecek uygulama yolu
                    </span>
                  </div>

                  <div className="grid gap-3 md:grid-cols-2 2xl:grid-cols-3">
                    {sectorModules.map((module) => {
                      const Icon = module.Icon;

                      return (
                        <article
                          key={module.name}
                          className="min-w-0 rounded-[1.05rem] border border-black/[0.08] bg-white p-4 shadow-[0_14px_34px_rgba(11,13,16,0.055),inset_0_1px_0_rgba(255,255,255,0.95)]"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[0.9rem] border border-black/[0.08] bg-[#F4F5F7] text-[#0B0D10]">
                              <Icon className="h-5 w-5" />
                            </div>
                            <span
                              className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold ${moduleToneStyles[module.tone]}`}
                            >
                              {module.statusLabel}
                            </span>
                          </div>

                          <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#7A808A]">
                            {module.family}
                          </p>
                          <h3 className="mt-1 text-lg font-semibold tracking-tight text-[#0B0D10]">
                            {module.name}
                          </h3>
                          <p className="mt-2 text-sm leading-6 text-[#525A65]">
                            {module.description}
                          </p>

                          <div className="mt-4 flex flex-wrap gap-2">
                            {module.scope.map((item) => (
                              <span
                                key={item}
                                className="rounded-full border border-black/[0.08] bg-[#F7F8FA] px-2.5 py-1 text-xs font-semibold text-[#6B7280]"
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </div>

                <aside className="grid min-w-0 grid-cols-[minmax(0,1fr)] gap-3">
                  <section className="min-w-0 max-w-full overflow-hidden rounded-[1.25rem] border border-white/10 bg-white/[0.045] p-3 shadow-[0_18px_48px_rgba(0,0,0,0.22)] sm:p-4">
                    <p className="break-words text-[11px] font-semibold uppercase tracking-[0.18em] text-white/35">
                      Zeka sınırı
                    </p>
                    <h2 className="mt-2 break-words text-xl font-semibold tracking-tight text-white">
                      Sector DNA neyi değiştirebilir?
                    </h2>
                    <div className="mt-4 grid min-w-0 grid-cols-[minmax(0,1fr)] gap-3">
                      {boundaryNotes.map((note) => {
                        const Icon = note.Icon;

                        return (
                          <article
                            key={note.title}
                            className="min-w-0 max-w-full overflow-hidden rounded-[1rem] border border-white/10 bg-black/35 p-3"
                          >
                            <div className="flex min-w-0 items-start gap-2 sm:gap-3">
                              <div className="shrink-0 rounded-[0.85rem] border border-white/10 bg-white/[0.05] p-2">
                                <Icon className="h-4 w-4 text-white/70" />
                              </div>
                              <div className="min-w-0 break-words">
                                <h3 className="break-words text-sm font-semibold text-white">
                                  {note.title}
                                </h3>
                                <p className="mt-1 break-words text-xs leading-5 text-white/48">
                                  {note.body}
                                </p>
                              </div>
                            </div>
                          </article>
                        );
                      })}
                    </div>
                  </section>

                  <section className="min-w-0 max-w-full overflow-hidden rounded-[1.25rem] border border-white/10 bg-black/40 p-3 sm:p-4">
                    <div className="flex min-w-0 items-center gap-2">
                      <HiOutlineChartBarSquare className="h-5 w-5 shrink-0 text-white/70" />
                      <h2 className="min-w-0 break-words text-lg font-semibold tracking-tight text-white">
                        Hazırlık notları
                      </h2>
                    </div>

                    <div className="mt-4 grid min-w-0 grid-cols-[minmax(0,1fr)] gap-2">
                      {readinessRows.map(([label, detail]) => (
                        <div
                          key={label}
                          className="min-w-0 max-w-full overflow-hidden rounded-[0.95rem] border border-white/10 bg-white/[0.035] p-3"
                        >
                          <p className="break-words text-[11px] font-semibold uppercase tracking-[0.14em] text-white/35">
                            {label}
                          </p>
                          <p className="mt-1 break-words text-sm leading-5 text-white/55">
                            {detail}
                          </p>
                        </div>
                      ))}
                    </div>
                  </section>
                </aside>
              </section>

              <section className="grid min-w-0 grid-cols-[minmax(0,1fr)] gap-3 lg:grid-cols-3">
                {[
                  {
                    title: "Modül runtime yok",
                    body:
                      "Bu katalog sektör modüllerini çalıştırmaz, hazırlamaz veya kurulum başlatmaz.",
                    Icon: HiOutlineCog6Tooth,
                  },
                  {
                    title: "Kalıcı işlem yok",
                    body:
                      "Bu sayfa müşteri, lead, teklif, görev veya modül konfigürasyonu değiştirmez.",
                    Icon: HiOutlineShieldCheck,
                  },
                  {
                    title: "Build öncesi inceleme",
                    body:
                      "Her gelecek sektör yolu onaylı kaynak haritası, kanıt modeli ve denetim izi gerektirir.",
                    Icon: HiOutlineBuildingOffice2,
                  },
                ].map((item) => {
                  const Icon = item.Icon;

                  return (
                    <article
                      key={item.title}
                      className="min-w-0 max-w-full overflow-hidden rounded-[1.15rem] border border-white/10 bg-white/[0.035] p-3 sm:p-4"
                    >
                      <div className="flex min-w-0 items-start gap-2 sm:gap-3">
                        <div className="shrink-0 rounded-[0.9rem] border border-white/10 bg-white/[0.05] p-2.5">
                          <Icon className="h-5 w-5 text-white/75" />
                        </div>
                        <div className="min-w-0 break-words">
                          <h2 className="break-words text-base font-semibold text-white">
                            {item.title}
                          </h2>
                          <p className="mt-1 break-words text-sm leading-6 text-white/48">
                            {item.body}
                          </p>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

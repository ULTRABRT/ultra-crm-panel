import Link from "next/link";
import type { IconType } from "react-icons";
import {
  HiOutlineArrowLeft,
  HiOutlineArrowRight,
  HiOutlineSparkles,
} from "react-icons/hi2";

import { Header } from "./Header";
import { PanelCard } from "./PanelCard";
import { Sidebar } from "./Sidebar";

type RoadmapPlaceholderPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  moduleLabel: string;
  roadmapNote: string;
  Icon: IconType;
};

export function RoadmapPlaceholderPage({
  eyebrow,
  title,
  description,
  moduleLabel,
  roadmapNote,
  Icon,
}: RoadmapPlaceholderPageProps) {
  return (
    <main className="arqon-app-shell">
      <div className="arqon-app-frame">
        <Sidebar />

        <section className="arqon-main-panel">
          <Header />

          <div className="arqon-page-scroll">
            <section className="flex min-h-[calc(100dvh-9rem)] items-center">
              <PanelCard
                className="mx-auto w-full max-w-5xl p-6 sm:p-8 lg:p-10"
                variant="strong"
              >
                <div className="grid items-center gap-8 lg:grid-cols-[1fr_18rem]">
                  <div className="min-w-0">
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/35 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/40">
                      <HiOutlineSparkles className="h-4 w-4 text-white/55" />
                      {eyebrow}
                    </div>

                    <h1 className="mt-6 max-w-3xl text-[clamp(2.1rem,5vw,4.5rem)] font-semibold leading-[0.98] tracking-tight text-white">
                      {title}
                    </h1>

                    <p className="mt-5 max-w-2xl text-base leading-8 text-white/55">
                      {description}
                    </p>

                    <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-black/30 p-5">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-white/35">
                        Yol haritası notu
                      </p>
                      <p className="mt-3 text-sm leading-7 text-white/58">
                        {roadmapNote}
                      </p>
                    </div>

                    <div className="mt-8 flex flex-wrap gap-3">
                      <Link
                        href="/inbox"
                        className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-white px-4 text-sm font-semibold text-black transition hover:bg-white/85"
                      >
                        <HiOutlineArrowLeft className="h-4 w-4" />
                        Ultra Inbox'a dön
                      </Link>

                      <Link
                        href="/"
                        className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-white/10 bg-black/35 px-4 text-sm font-semibold text-white/75 transition hover:bg-white/[0.06] hover:text-white"
                      >
                        Kontrol Merkezi
                        <HiOutlineArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>

                  <aside className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-5">
                    <div className="flex h-14 w-14 items-center justify-center rounded-[1.25rem] bg-white text-black">
                      <Icon className="h-7 w-7" />
                    </div>

                    <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/35">
                      Hazırlanıyor
                    </p>
                    <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">
                      {moduleLabel}
                    </h2>
                    <p className="mt-4 text-sm leading-6 text-white/48">
                      Bu ekran, ürün navigasyonunda güvenli bir hedef olarak
                      açılır. Gerçek modül kapsamı sonraki geliştirme fazında
                      netleştirilecektir.
                    </p>
                  </aside>
                </div>
              </PanelCard>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}

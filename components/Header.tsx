"use client";

import { usePathname } from "next/navigation";
import {
  HiOutlineBellAlert,
  HiOutlineMagnifyingGlass,
  HiOutlinePlus,
} from "react-icons/hi2";
import { ArqonWordmark } from "./brand/ArqonWordmark";
import { useDnaSafe } from "../context/DnaContext";
import { resolveLabel } from "../lib/dna/keys";

type HeaderConfig = {
  eyebrow: string;
  title: string;
  searchPlaceholder: string;
};

const headerConfigs: Record<string, HeaderConfig> = {
  "/": {
    eyebrow: "Premium Operasyon Merkezi",
    title: "Kontrol Merkezi",
    searchPlaceholder: "Müşteri, talep, telefon veya kaynak ara...",
  },
  "/talep-havuzu": {
    eyebrow: "Premium Operasyon Merkezi",
    title: "Talep Havuzu",
    searchPlaceholder: "Müşteri, talep, telefon veya kaynak ara...",
  },
  "/leadler": {
    eyebrow: "Satış Çalışma Listesi",
    title: "Leadler",
    searchPlaceholder: "Lead, müşteri, telefon veya durum ara...",
  },
  "/musteri-kartlari": {
    eyebrow: "Müşteri Hafıza Merkezi",
    title: "Müşteri Kartları",
    searchPlaceholder: "Müşteri, telefon, kaynak veya not ara...",
  },
  "/inbox": {
    eyebrow: "Mesaj Operasyon Merkezi",
    title: "Ultra Inbox",
    searchPlaceholder: "Mesaj, müşteri, kanal veya durum ara...",
  },
  "/sektor-modulleri": {
    eyebrow: "Sektörel DNA Mimarisi",
    title: "Sektör Modülleri",
    searchPlaceholder: "Sektör, sinyal, KPI veya modül ara...",
  },
};

function getHeaderConfig(pathname: string): HeaderConfig {
  if (pathname === "/") {
    return headerConfigs["/"];
  }

  const matchedPath = Object.keys(headerConfigs)
    .filter((path) => path !== "/")
    .find((path) => pathname.startsWith(path));

  return matchedPath ? headerConfigs[matchedPath] : headerConfigs["/"];
}

export function Header() {
  const pathname = usePathname();
  const config = getHeaderConfig(pathname);
  const dnaContext = useDnaSafe();
  const activeSectorName = dnaContext?.activeDna.meta.name
    ? resolveLabel(dnaContext.activeDna.meta.name)
    : "Solify";
  const activePackageLabel = dnaContext?.activeDna.meta.packageLabel
    ? resolveLabel(dnaContext.activeDna.meta.packageLabel)
    : "Enerji Paketi";
  const sectorInitial = activeSectorName.trim().charAt(0).toUpperCase() || "S";

  return (
    <header className="relative z-10 shrink-0 border-b border-white/10 bg-black/35 backdrop-blur-2xl">
      <div className="grid min-h-[104px] gap-3 px-5 py-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:px-6 2xl:grid-cols-[minmax(0,1fr)_minmax(280px,430px)_auto] 2xl:items-center 2xl:gap-4 2xl:px-8">
        <div className="flex min-w-0 items-center gap-4 sm:gap-5">
          <div className="w-[11.5rem] shrink-0 sm:w-[12.5rem]">
            <ArqonWordmark
              className="h-7 w-48 sm:h-8 sm:w-52"
              decorative={false}
              label="Arqon"
            />
            <div className="mt-0.5 text-[9px] font-medium uppercase tracking-[0.24em] text-white/30">
              Operation Intelligence
            </div>
          </div>

          <div className="hidden h-10 w-px bg-white/10 sm:block" />

          <div className="min-w-0 flex-1">
            <p className="hidden text-[10px] font-semibold uppercase tracking-[0.36em] text-white/35 sm:block xl:text-[11px] xl:tracking-[0.45em]">
              {config.eyebrow}
            </p>

            <h1 className="mt-1 whitespace-nowrap text-xl font-semibold tracking-tight text-white sm:mt-2 lg:text-2xl">
              {config.title}
            </h1>
          </div>
        </div>

        <div className="order-3 min-w-0 lg:col-span-2 2xl:order-none 2xl:col-span-1">
          <div className="flex h-11 min-w-0 items-center gap-3 rounded-full border border-white/10 bg-black/45 px-4 text-white/45 lg:h-12">
            <HiOutlineMagnifyingGlass className="h-5 w-5 shrink-0" />

            <input
              className="h-full min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/35"
              placeholder={config.searchPlaceholder}
            />
          </div>
        </div>

        <div className="order-2 flex shrink-0 flex-wrap items-center justify-start gap-2 lg:justify-end 2xl:order-none 2xl:flex-nowrap">
            <div className="inline-flex h-11 items-center rounded-full border border-white/10 bg-black/45 px-3 text-sm font-semibold text-white xl:h-12 xl:px-4">
              <span className="text-white/55">Sistem:</span>
              <span className="ml-1 text-white">Aktif</span>
            </div>

            <button className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/45 text-white transition hover:bg-white/[0.06] xl:h-12 xl:w-12">
              <HiOutlineBellAlert className="h-5 w-5" />
            </button>

            <div className="hidden h-11 items-center gap-3 rounded-full border border-white/10 bg-black/45 px-3 pr-4 xl:flex xl:h-12">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-sm font-semibold text-black">
                {sectorInitial}
              </div>

              <div>
                <p className="text-xs font-semibold leading-none text-white">
                  {activeSectorName}
                </p>
                <p className="mt-1 text-[11px] leading-none text-white/40">
                  {activePackageLabel}
                </p>
              </div>
            </div>

            <button className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-white px-4 text-sm font-semibold text-black transition hover:bg-white/85 xl:h-12 xl:px-5">
              <HiOutlinePlus className="h-4 w-4" />
              Yeni Talep
            </button>
        </div>
      </div>
    </header>
  );
}

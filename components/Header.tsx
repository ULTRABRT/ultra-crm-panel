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
    <header className="relative z-10 border-b border-white/10 bg-black/35 backdrop-blur-2xl">
      <div className="flex min-h-[104px] flex-col gap-4 px-5 py-5 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
          <div className="shrink-0">
            <ArqonWordmark
              className="h-7 w-40"
              decorative={false}
              label="Arqon"
            />
            <div className="mt-1 text-[10px] font-medium uppercase tracking-[0.28em] text-white/35">
              Operation Intelligence
            </div>
          </div>

          <div className="hidden h-10 w-px bg-white/10 sm:block" />

          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.45em] text-white/35">
              {config.eyebrow}
            </p>

            <h1 className="mt-2 truncate text-2xl font-semibold tracking-tight text-white">
              {config.title}
            </h1>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex h-12 min-w-0 items-center gap-3 rounded-full border border-white/10 bg-black/45 px-4 text-white/45 sm:w-[360px] lg:w-[430px]">
            <HiOutlineMagnifyingGlass className="h-5 w-5 shrink-0" />

            <input
              className="h-full min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/35"
              placeholder={config.searchPlaceholder}
            />
          </div>

          <div className="flex items-center gap-2">
            <div className="inline-flex h-12 items-center rounded-full border border-white/10 bg-black/45 px-4 text-sm font-semibold text-white">
              <span className="text-white/55">Sistem:</span>
              <span className="ml-1 text-white">Aktif</span>
            </div>

            <button className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-black/45 text-white transition hover:bg-white/[0.06]">
              <HiOutlineBellAlert className="h-5 w-5" />
            </button>

            <div className="hidden h-12 items-center gap-3 rounded-full border border-white/10 bg-black/45 px-3 pr-4 sm:flex">
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

            <button className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-black transition hover:bg-white/85">
              <HiOutlinePlus className="h-4 w-4" />
              Yeni Talep
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

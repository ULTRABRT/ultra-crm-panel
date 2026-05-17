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
    <header className="arqon-header relative z-10 shrink-0 border-b border-white/10 bg-black/35 backdrop-blur-2xl">
      <div className="arqon-header-inner">
        <div className="flex min-w-0 items-center gap-4 sm:gap-5">
          <div className="arqon-header-brand shrink-0">
            <ArqonWordmark
              className="h-auto w-full"
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

            <h1 className="arqon-header-title mt-1 font-semibold tracking-tight text-white sm:mt-2">
              {config.title}
            </h1>
          </div>
        </div>

        <div className="arqon-header-search">
          <div className="flex h-[clamp(2.75rem,4cqi,3rem)] min-w-0 items-center gap-3 rounded-full border border-white/10 bg-black/45 px-4 text-white/45">
            <HiOutlineMagnifyingGlass className="h-5 w-5 shrink-0" />

            <input
              className="h-full min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/35"
              placeholder={config.searchPlaceholder}
            />
          </div>
        </div>

        <div className="arqon-header-actions shrink-0">
            <div className="inline-flex h-[clamp(2.75rem,4cqi,3rem)] items-center rounded-full border border-white/10 bg-black/45 px-3 text-sm font-semibold text-white">
              <span className="text-white/55">Sistem:</span>
              <span className="ml-1 text-white">Aktif</span>
            </div>

            <button className="flex h-[clamp(2.75rem,4cqi,3rem)] w-[clamp(2.75rem,4cqi,3rem)] items-center justify-center rounded-full border border-white/10 bg-black/45 text-white transition hover:bg-white/[0.06]">
              <HiOutlineBellAlert className="h-5 w-5" />
            </button>

            <div className="arqon-header-sector h-[clamp(2.75rem,4cqi,3rem)] items-center gap-3 rounded-full border border-white/10 bg-black/45 px-3 pr-4">
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

            <button className="inline-flex h-[clamp(2.75rem,4cqi,3rem)] items-center justify-center gap-2 rounded-full bg-white px-4 text-sm font-semibold text-black transition hover:bg-white/85">
              <HiOutlinePlus className="h-4 w-4" />
              Yeni Talep
            </button>
        </div>
      </div>
    </header>
  );
}

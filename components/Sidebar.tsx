"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { IconType } from "react-icons";
import {
  HiOutlineBars3,
  HiOutlineBolt,
  HiOutlineChatBubbleLeftRight,
  HiOutlineCog6Tooth,
  HiOutlineCubeTransparent,
  HiOutlineDocumentText,
  HiOutlineInboxStack,
  HiOutlineShare,
  HiOutlineSquares2X2,
  HiOutlineUserGroup,
  HiOutlineXMark,
} from "react-icons/hi2";
import { useDnaSafe } from "../context/DnaContext";
import { resolveLabel } from "../lib/dna/keys";
import { ArqonLockup } from "./brand/ArqonLockup";

type SidebarItem = {
  label: string;
  href: string;
  icon: IconType;
};

const menuItems: SidebarItem[] = [
  {
    label: "Kontrol Merkezi",
    href: "/",
    icon: HiOutlineSquares2X2,
  },
  {
    label: "Talep Havuzu",
    href: "/talep-havuzu",
    icon: HiOutlineInboxStack,
  },
  {
    label: "Leadler",
    href: "/leadler",
    icon: HiOutlineUserGroup,
  },
  {
    label: "Ultra Inbox",
    href: "/inbox",
    icon: HiOutlineChatBubbleLeftRight,
  },
  {
    label: "Teklifler",
    href: "/teklifler",
    icon: HiOutlineDocumentText,
  },
  {
    label: "Müşteri Kartları",
    href: "/musteri-kartlari",
    icon: HiOutlineCubeTransparent,
  },
  {
    label: "Kanal Yönetimi",
    href: "/kanal-yonetimi",
    icon: HiOutlineShare,
  },
  {
    label: "Akıllı Yanıt Ayarları",
    href: "/akilli-yanit-ayarlari",
    icon: HiOutlineCog6Tooth,
  },
  {
    label: "Sektörel DNA",
    href: "/sektorel-dna",
    icon: HiOutlineBolt,
  },
];

function isActivePath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname.startsWith(href);
}

export function Sidebar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dnaContext = useDnaSafe();
  const activeSectorName = dnaContext?.activeDna.meta.name
    ? resolveLabel(dnaContext.activeDna.meta.name)
    : "Local workspace";
  const activePackageLabel = dnaContext?.activeDna.meta.packageLabel
    ? resolveLabel(dnaContext.activeDna.meta.packageLabel)
    : "Aktif DNA";
  const workspaceInitial =
    activeSectorName.trim().charAt(0).toUpperCase() || "A";
  const activeItem =
    menuItems.find((item) => isActivePath(pathname, item.href)) ?? menuItems[0]!;

  return (
    <>
      <div className="arqon-mobile-topbar">
        <div className="arqon-mobile-topbar-inner">
          <ArqonLockup
            emblemSize={32}
            wordmarkClassName="h-4 w-[7.2rem]"
          />

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold tracking-tight text-white">
              {activeItem.label}
            </p>
            <p className="mt-0.5 truncate text-[11px] font-medium text-white/40">
              {activePackageLabel}
            </p>
          </div>

          <button
            type="button"
            aria-expanded={mobileMenuOpen}
            className="arqon-mobile-menu-button"
            onClick={() => setMobileMenuOpen((current) => !current)}
          >
            {mobileMenuOpen ? (
              <HiOutlineXMark className="h-4 w-4" />
            ) : (
              <HiOutlineBars3 className="h-4 w-4" />
            )}
            Menü
          </button>
        </div>

        <nav
          aria-label="Mobil panel navigasyonu"
          className={`arqon-mobile-menu ${mobileMenuOpen ? "is-open" : ""}`}
        >
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActivePath(pathname, item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`arqon-mobile-menu-link ${
                  active ? "is-active" : ""
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <aside className="arqon-sidebar arqon-command-surface sticky top-0 hidden h-dvh shrink-0 border-r backdrop-blur-2xl md:flex">
      <div className="flex min-h-0 w-full flex-col">
        <div className="arqon-sidebar-shell shrink-0 pb-5">
          <div className="arqon-sidebar-brand flex flex-col">
            <ArqonLockup
              className="-ml-1"
              emblemSize={42}
              wordmarkClassName="arqon-sidebar-wordmark h-6 w-[clamp(8.75rem,11cqw,10.75rem)]"
            />
            <p className="arqon-sidebar-caption mt-1.5 text-[9px] font-semibold uppercase tracking-[0.24em] text-white/30">
              Intelligence OS
            </p>
          </div>

          <div className="arqon-sidebar-tenant arqon-shell-panel mt-5 items-center gap-3 rounded-[1.35rem] p-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-base font-semibold text-black">
              {workspaceInitial}
            </div>

            <div className="min-w-0">
              <p className="arqon-shell-kicker">
                Workspace
              </p>
              <h2 className="mt-1 truncate text-lg font-semibold text-white">
                Arqon Local
              </h2>
              <p className="mt-1 truncate text-xs text-white/46">
                {activeSectorName}
              </p>
            </div>
          </div>
        </div>

        <nav className="min-h-0 flex-1 overflow-y-auto px-3 pb-5 pt-2 xl:px-4 2xl:px-5 2xl:pb-6">
          <div className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActivePath(pathname, item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`arqon-sidebar-link group flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium transition ${
                    active
                      ? "is-active bg-white text-black"
                      : "text-white/58 hover:bg-white/[0.055] hover:text-white"
                  }`}
                >
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl transition ${
                      active
                        ? "bg-black text-white"
                        : "bg-white/[0.055] text-white/58 group-hover:bg-white/[0.09] group-hover:text-white"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </span>

                  <span className="arqon-sidebar-label truncate">{item.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="arqon-sidebar-cards mt-6 space-y-3">
            <div className="arqon-shell-panel-soft rounded-[1.35rem] p-4">
              <p className="arqon-shell-kicker">Sector DNA</p>

              <h3 className="mt-2 truncate text-base font-semibold text-white">
                {activeSectorName}
              </h3>

              <p className="mt-2 text-xs leading-5 text-white/48">
                Resolver ve registry bağlamı route seviyesinde okunur; shell
                davranışı generic kalır.
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                <span className="arqon-readonly-pill">Registry</span>
                <span className="arqon-readonly-pill">Route-level</span>
              </div>
            </div>

            <div className="arqon-shell-panel-soft rounded-[1.35rem] p-4">
              <p className="arqon-shell-kicker">
                Release surface
              </p>

              <div className="mt-3 flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-white">
                    Local MVP scope
                  </p>
                  <p className="mt-1 text-xs leading-5 text-white/42">
                    Readonly surfaces; durable actions require backend.
                  </p>
                </div>

                <span className="arqon-readonly-pill shrink-0">
                  Readonly
                </span>
              </div>
            </div>
          </div>
        </nav>
      </div>
      </aside>
    </>
  );
}

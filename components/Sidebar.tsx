"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { IconType } from "react-icons";
import {
  HiOutlineBolt,
  HiOutlineChatBubbleLeftRight,
  HiOutlineCog6Tooth,
  HiOutlineCubeTransparent,
  HiOutlineDocumentText,
  HiOutlineInboxStack,
  HiOutlineShare,
  HiOutlineSquares2X2,
  HiOutlineUserGroup,
} from "react-icons/hi2";
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
    label: "Sektör Modülleri",
    href: "/sektor-modulleri",
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

  return (
    <aside className="arqon-sidebar sticky top-0 hidden h-dvh shrink-0 border-r border-white/10 bg-black/80 backdrop-blur-2xl lg:flex">
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

          <div className="arqon-sidebar-tenant mt-6 items-center gap-3 rounded-[1.35rem] border border-white/10 bg-white/[0.035] p-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-lg font-semibold text-black">
              S
            </div>

            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/35">
                Tenant
              </p>
              <h2 className="mt-1 truncate text-xl font-semibold tracking-tight text-white">
                Solify Panel
              </h2>
              <p className="mt-1 text-xs text-white/38">Enerji Paketi</p>
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
                  className={`arqon-sidebar-link group flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium transition ${
                    active
                      ? "bg-white text-black shadow-2xl shadow-white/10"
                      : "text-white/58 hover:bg-white/[0.055] hover:text-white"
                  }`}
                >
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl transition ${
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

          <div className="arqon-sidebar-cards mt-8 space-y-4">
            <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-4">
              <p className="text-xs text-white/40">Sektörel DNA</p>

              <h3 className="mt-2 text-lg font-semibold text-white">
                Yenilenebilir Enerji
              </h3>

              <p className="mt-3 text-sm leading-6 text-white/45">
                Panel dili, alanları, takip önceliği ve teklif mantığı sektöre
                göre şekillenir.
              </p>

              <div className="mt-4">
                <div className="mb-2 flex items-center justify-between text-xs text-white/40">
                  <span>Modül Uyumu</span>
                  <span>%84</span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-[84%] rounded-full bg-white" />
                </div>
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-white/10 bg-black/55 p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-white/30">
                Ultra Durum
              </p>

              <div className="mt-4 flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-white">
                    Çekirdek aktif
                  </p>
                  <p className="mt-1 text-xs text-white/35">
                    Sistem sağlıklı çalışıyor.
                  </p>
                </div>

                <span className="shrink-0 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-black">
                  Sağlam
                </span>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
}

import type { IconType } from "react-icons";
import {
  HiOutlineBanknotes,
  HiOutlineChatBubbleLeftRight,
  HiOutlineDocumentText,
  HiOutlineEnvelope,
  HiOutlineGlobeAlt,
  HiOutlineInboxStack,
  HiOutlinePhone,
  HiOutlineSparkles,
} from "react-icons/hi2";

import { inboxChannelStats } from "../../data/inbox";
import type { InboxChannel } from "../../types/inbox";

const channelIcons: Record<InboxChannel, IconType> = {
  instagram: HiOutlineChatBubbleLeftRight,
  whatsapp: HiOutlineChatBubbleLeftRight,
  mail: HiOutlineEnvelope,
  webChat: HiOutlineGlobeAlt,
  forms: HiOutlineDocumentText,
  phone: HiOutlinePhone,
  manual: HiOutlineInboxStack,
};

export function KanalFiltreleri() {
  return (
    <section className="mb-5 rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 shadow-2xl shadow-black/20">
      <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-3 py-1.5">
            <HiOutlineSparkles className="h-4 w-4 text-white/70" />
            <span className="text-xs font-medium text-white/55">
              Kanal Filtreleri
            </span>
          </div>

          <h2 className="text-2xl font-semibold tracking-tight text-white">
            Mesaj Kanalları
          </h2>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-white/45">
            Tüm kanallardan gelen mesajlar tek merkezde izlenir. Okunmamış,
            sıcak talep ve lead adayı olabilecek görüşmeler öne çıkar.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/45 px-4 py-3">
          <p className="text-[10px] uppercase tracking-[0.18em] text-white/35">
            Aktif görünüm
          </p>
          <p className="mt-1 text-sm font-semibold text-white">
            Tüm Kanallar
          </p>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
        {inboxChannelStats.map((channel, index) => {
          const Icon = channelIcons[channel.id] ?? HiOutlineInboxStack;
          const active = index === 0;

          return (
            <button
              key={channel.id}
              className={`group rounded-2xl border p-4 text-left transition ${
                active
                  ? "border-white/20 bg-white text-black shadow-2xl shadow-white/10"
                  : "border-white/10 bg-black/35 text-white hover:border-white/20 hover:bg-white/[0.035]"
              }`}
            >
              <div className="mb-4 flex items-center justify-between gap-3">
                <span
                  className={`flex h-11 w-11 items-center justify-center rounded-2xl transition ${
                    active
                      ? "bg-black text-white"
                      : "border border-white/10 bg-white/[0.04] text-white/65 group-hover:text-white"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </span>

                <span
                  className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                    active
                      ? "bg-black text-white"
                      : "border border-white/10 bg-white/[0.035] text-white/55"
                  }`}
                >
                  {channel.total}
                </span>
              </div>

              <p
                className={`text-sm font-semibold ${
                  active ? "text-black" : "text-white"
                }`}
              >
                {channel.label}
              </p>

              <p
                className={`mt-1 text-xs leading-5 ${
                  active ? "text-black/55" : "text-white/40"
                }`}
              >
                {channel.statusLabel}
              </p>

              <div
                className={`mt-4 grid grid-cols-2 gap-2 ${
                  active ? "text-black" : "text-white"
                }`}
              >
                <div
                  className={`rounded-2xl px-3 py-2 ${
                    active
                      ? "bg-black/5"
                      : "border border-white/10 bg-white/[0.025]"
                  }`}
                >
                  <p
                    className={`text-[10px] uppercase tracking-[0.16em] ${
                      active ? "text-black/40" : "text-white/35"
                    }`}
                  >
                    Okunmamış
                  </p>
                  <p className="mt-1 text-lg font-semibold">
                    {channel.unread}
                  </p>
                </div>

                <div
                  className={`rounded-2xl px-3 py-2 ${
                    active
                      ? "bg-black/5"
                      : "border border-white/10 bg-white/[0.025]"
                  }`}
                >
                  <p
                    className={`text-[10px] uppercase tracking-[0.16em] ${
                      active ? "text-black/40" : "text-white/35"
                    }`}
                  >
                    Sıcak
                  </p>
                  <p className="mt-1 text-lg font-semibold">{channel.hot}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
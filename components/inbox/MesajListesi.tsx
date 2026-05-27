import type { IconType } from "react-icons";
import {
  HiOutlineArrowTrendingUp,
  HiOutlineChatBubbleLeftRight,
  HiOutlineClock,
  HiOutlineDocumentText,
  HiOutlineEnvelope,
  HiOutlineExclamationTriangle,
  HiOutlineGlobeAlt,
  HiOutlineInboxStack,
  HiOutlineMagnifyingGlass,
  HiOutlinePhone,
  HiOutlineSparkles,
} from "react-icons/hi2";

import { inboxConversations } from "../../data/inbox";
import type { InboxChannel, InboxConversation } from "../../types/inbox";
import {
  inboxPriorityLabels,
  inboxPriorityStyles,
  inboxTemperatureLabels,
  inboxTemperatureStyles,
} from "../../types/inbox";

const channelIcons: Record<InboxChannel, IconType> = {
  instagram: HiOutlineChatBubbleLeftRight,
  whatsapp: HiOutlineChatBubbleLeftRight,
  mail: HiOutlineEnvelope,
  webChat: HiOutlineGlobeAlt,
  forms: HiOutlineDocumentText,
  phone: HiOutlinePhone,
  manual: HiOutlineInboxStack,
};

const inboxTabs = [
  {
    label: "Tümü",
    count: inboxConversations.length,
  },
  {
    label: "Yanıt",
    count: inboxConversations.filter((conversation) => conversation.isUnread)
      .length,
  },
  {
    label: "Sıcak",
    count: inboxConversations.filter(
      (conversation) =>
        conversation.temperature === "veryHot" ||
        conversation.temperature === "hot"
    ).length,
  },
];

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function ConversationItem({
  conversation,
  active = false,
}: {
  conversation: InboxConversation;
  active?: boolean;
}) {
  const ChannelIcon = channelIcons[conversation.channel] ?? HiOutlineInboxStack;

  return (
    <button
      className={`group relative w-full border-b px-4 py-3.5 text-left transition ${
        active
          ? "border-white/10 bg-[#123252] text-white"
          : "border-white/10 bg-transparent text-white hover:bg-white/[0.045]"
      }`}
    >
      <div className="flex gap-3">
        <div className="relative shrink-0">
          <div
            className={`flex h-11 w-11 items-center justify-center rounded-2xl text-xs font-bold ${
              active
                ? "bg-white text-black"
                : "border border-white/10 bg-white/[0.04] text-white/70"
            }`}
          >
            {getInitials(conversation.customerName)}
          </div>

          <span
            className={`absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border ${
              active
                ? "border-[#123252] bg-white text-black"
                : "border-[#071522] bg-[#0d2133] text-white/65"
            }`}
          >
            <ChannelIcon className="h-3.5 w-3.5" />
          </span>

          {conversation.isUnread ? (
            <span className="absolute -left-0.5 -top-0.5 h-3 w-3 rounded-full border border-[#071522] bg-white" />
          ) : null}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex min-w-0 items-center gap-2">
                <h3 className="truncate text-sm font-semibold text-white">
                  {conversation.customerName}
                </h3>

                {conversation.isUnread ? (
                  <span
                    className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                      active ? "bg-white text-black" : "bg-white text-black"
                    }`}
                  >
                    Yeni
                  </span>
                ) : null}
              </div>

              <p
                className={`mt-0.5 truncate text-xs ${
                  active ? "text-white/62" : "text-white/36"
                }`}
              >
                {conversation.channelLabel} • {conversation.intentLabel}
              </p>
            </div>

            <span
              className={`shrink-0 text-[11px] font-medium ${
                active ? "text-white/55" : "text-white/30"
              }`}
            >
              {conversation.lastMessageTimeLabel}
            </span>
          </div>

          <p
            className={`mt-2 line-clamp-2 text-sm leading-5 ${
              active ? "text-white/78" : "text-white/50"
            }`}
          >
            {conversation.preview}
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-1.5">
            <span
              className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                active
                  ? "bg-white text-black"
                  : inboxTemperatureStyles[conversation.temperature]
              }`}
            >
              {inboxTemperatureLabels[conversation.temperature]}
            </span>

            <span
              className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                active
                  ? "bg-white/10 text-white/75"
                  : inboxPriorityStyles[conversation.priority]
              }`}
            >
              {inboxPriorityLabels[conversation.priority]}
            </span>

            {conversation.hasBatteryInterest ? (
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-medium ${
                  active
                    ? "bg-white/10 text-white/70"
                    : "border border-white/10 bg-white/[0.035] text-white/42"
                }`}
              >
                <HiOutlineSparkles className="h-3 w-3" />
                Batarya
              </span>
            ) : null}

            {conversation.hasMissingInfo ? (
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-medium ${
                  active
                    ? "bg-white/10 text-white/70"
                    : "border border-white/10 bg-white/[0.035] text-white/42"
                }`}
              >
                <HiOutlineExclamationTriangle className="h-3 w-3" />
                Eksik
              </span>
            ) : null}

            {conversation.isLeadCandidate ? (
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-medium ${
                  active
                    ? "bg-white/10 text-white/70"
                    : "border border-white/10 bg-white/[0.035] text-white/42"
                }`}
              >
                <HiOutlineArrowTrendingUp className="h-3 w-3" />
                Lead
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </button>
  );
}

export function MesajListesi() {
  return (
    <aside className="flex h-full min-h-0 flex-col overflow-hidden border-r border-white/10 bg-[#071522]">
      <div className="shrink-0 border-b border-white/10 bg-[#071522] px-4 py-4">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1">
              <HiOutlineInboxStack className="h-3.5 w-3.5 text-white/60" />
              <span className="text-[11px] font-medium text-white/50">
                Konuşma Kuyruğu
              </span>
            </div>

            <h2 className="text-lg font-semibold tracking-tight text-white">
              Gelen Kutusu
            </h2>

            <p className="mt-1 text-xs leading-5 text-white/38">
              Öncelikli müşteri mesajları burada sıralanır.
            </p>
          </div>

          <div className="shrink-0 rounded-2xl border border-white/10 bg-black/25 px-3 py-2 text-right">
            <p className="text-[10px] uppercase tracking-[0.18em] text-white/28">
              Açık
            </p>
            <p className="text-lg font-semibold text-white">24</p>
          </div>
        </div>

        <div className="arqon-search-field mb-3 flex h-10 items-center gap-3 rounded-2xl border border-white/10 bg-black/25 px-3 text-white/42">
          <HiOutlineMagnifyingGlass className="h-4 w-4 shrink-0" />

          <input
            className="arqon-search-input h-full min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/35"
            placeholder="Konuşma ara..."
          />
        </div>

        <div className="grid grid-cols-3 gap-2">
          {inboxTabs.map((tab, index) => (
            <button
              key={tab.label}
              className={`rounded-2xl px-2 py-2.5 text-center transition ${
                index === 0
                  ? "bg-white text-black"
                  : "border border-white/10 bg-white/[0.035] text-white/50 hover:bg-white/[0.07] hover:text-white"
              }`}
            >
              <span className="block text-xs font-semibold">{tab.label}</span>
              <span
                className={`mt-0.5 block text-[11px] ${
                  index === 0 ? "text-black/45" : "text-white/30"
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="shrink-0 border-b border-white/10 bg-[#06111d]/70 px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-semibold text-white/65">
              Öncelikli sıra
            </p>
            <p className="mt-0.5 truncate text-[11px] text-white/32">
              Sıcaklık, bekleme süresi ve satış ihtimaline göre
            </p>
          </div>

          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.035] px-2.5 py-1.5 text-[11px] font-medium text-white/45">
            <HiOutlineClock className="h-3.5 w-3.5" />
            Readonly
          </span>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {inboxConversations.map((conversation, index) => (
          <ConversationItem
            key={conversation.id}
            conversation={conversation}
            active={index === 0}
          />
        ))}
      </div>

      <div className="shrink-0 border-t border-white/10 bg-[#071522] p-3">
        <div className="rounded-2xl border border-white/10 bg-black/25 p-3">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white/55">
              <HiOutlineDocumentText className="h-4 w-4" />
            </div>

            <div>
              <p className="text-xs font-semibold text-white/75">
                Inbox disiplini
              </p>
              <p className="mt-1 text-xs leading-5 text-white/38">
                Önce sıcak, okunmamış ve satışa yakın mesajlar kapatılır.
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

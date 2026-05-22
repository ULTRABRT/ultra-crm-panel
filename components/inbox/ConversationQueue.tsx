import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";

import type { InboxConversation } from "@/types/inbox";

export type QueueFilter = "all" | "waiting" | "hot";

type ConversationQueueProps = {
  conversations: InboxConversation[];
  activeConversationId: string;
  activeQueueFilter: QueueFilter;
  totalConversationCount: number;
  onQueueFilterChange: (filter: QueueFilter) => void;
  onSelectConversation: (conversationId: string) => void;
};

const queueFilters: Array<{ id: QueueFilter; label: string }> = [
  { id: "all", label: "Tümü" },
  { id: "waiting", label: "Yanıt" },
  { id: "hot", label: "Sıcak" },
];

const temperatureLabel: Record<InboxConversation["temperature"], string> = {
  veryHot: "Çok sıcak",
  hot: "Sıcak",
  warm: "Ilık",
  cold: "Soğuk",
};

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function getConversationStatus(conversation: InboxConversation) {
  if (conversation.status === "ignored") {
    return "bg-[#9AA0A8]";
  }

  if (conversation.isUnread || conversation.status === "waitingReply") {
    return "bg-[#0B0D10]";
  }

  if (conversation.hasMissingInfo || conversation.status === "humanReview") {
    return "bg-[#6B4E16]";
  }

  return "bg-[#B5BAC2]";
}

function getQueueCount(filter: QueueFilter, conversations: InboxConversation[]) {
  if (filter === "waiting") {
    return conversations.filter(
      (conversation) =>
        conversation.isUnread || conversation.status === "waitingReply",
    ).length;
  }

  if (filter === "hot") {
    return conversations.filter((conversation) =>
      ["veryHot", "hot"].includes(conversation.temperature),
    ).length;
  }

  return conversations.length;
}

function ConversationRow({
  conversation,
  active,
  onSelect,
}: {
  conversation: InboxConversation;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      data-conversation-row
      type="button"
      onClick={onSelect}
      className={`group w-full rounded-[0.85rem] border px-2.5 py-2 text-left transition ${
        active
          ? "border-black/[0.18] bg-[#FFFFFF] shadow-[0_8px_20px_rgba(11,13,16,0.08),inset_0_1px_0_rgba(255,255,255,0.85)]"
          : "border-transparent bg-[#FFFFFF] hover:border-black/[0.08] hover:bg-[#F7F8FA] hover:shadow-[0_8px_18px_rgba(11,13,16,0.045)]"
      }`}
    >
      <div className="flex gap-2.5">
        <div
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-2xl border text-xs font-bold ${
            active
              ? "border-black/[0.14] bg-[#0B0D10] text-[#FFFFFF]"
              : "border-black/[0.08] bg-[#F1F2F4] text-[#0B0D10]"
          }`}
        >
          {getInitials(conversation.customerName)}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <div className="flex min-w-0 items-center gap-2">
                <h3 className="truncate text-sm font-semibold text-[#0B0D10]">
                  {conversation.customerName}
                </h3>
                <span
                  className={`h-2 w-2 shrink-0 rounded-full ${getConversationStatus(
                    conversation,
                  )}`}
                />
              </div>

              <p className="mt-0.5 truncate text-xs text-[#7A808A]">
                {conversation.channelLabel} · {conversation.intentLabel}
              </p>
            </div>

            <span className="shrink-0 text-[11px] font-medium text-[#7A808A]">
              {conversation.lastMessageTimeLabel}
            </span>
          </div>

          <p className="mt-1 line-clamp-1 text-sm leading-5 text-[#525A65]">
            {conversation.preview}
          </p>

          <div className="mt-0.5 flex items-center justify-between gap-2">
            <span className="rounded-full border border-black/[0.08] bg-[#F4F5F7] px-2 py-0.5 text-[11px] font-semibold text-[#525A65]">
              {temperatureLabel[conversation.temperature]}
            </span>
            {conversation.isUnread ? (
              <span className="rounded-full bg-[#0B0D10] px-2 py-0.5 text-[10px] font-semibold text-[#FFFFFF]">
                Yeni
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </button>
  );
}

export function ConversationQueue({
  conversations,
  activeConversationId,
  activeQueueFilter,
  totalConversationCount,
  onQueueFilterChange,
  onSelectConversation,
}: ConversationQueueProps) {
  const waitingCount = conversations.filter(
    (conversation) =>
      conversation.isUnread || conversation.status === "waitingReply",
  ).length;

  return (
    <aside className="arqon-inbox-queue flex flex-col rounded-[1rem] border border-black/[0.08] bg-[#FFFFFF] p-2.5 shadow-[0_16px_42px_rgba(11,13,16,0.08),inset_0_1px_0_rgba(255,255,255,0.95)]">
      <div className="mb-2 flex shrink-0 items-start justify-between gap-3 px-1">
        <div>
          <h2 className="text-base font-semibold tracking-tight text-[#0B0D10]">
            Konuşma Kuyruğu
          </h2>
          <p className="mt-1 text-xs text-[#7A808A]">
            {totalConversationCount} toplam · {waitingCount} yanıt bekliyor
          </p>
        </div>
        <span className="rounded-full border border-black/[0.08] bg-[#F4F5F7] px-2.5 py-1 text-[11px] font-semibold text-[#525A65]">
          {conversations.length} görünür
        </span>
      </div>

      <div className="mb-2 grid shrink-0 grid-cols-3 gap-1.5 rounded-[0.8rem] border border-black/[0.08] bg-[#F4F5F7] p-1">
        {queueFilters.map((filter) => (
          <button
            key={filter.id}
            type="button"
            onClick={() => onQueueFilterChange(filter.id)}
            className={`rounded-[0.85rem] border px-2 py-1 text-center transition ${
              activeQueueFilter === filter.id
                ? "border-black/[0.16] bg-[#0B0D10] text-[#FFFFFF] shadow-[0_8px_18px_rgba(11,13,16,0.16)]"
                : "border-transparent bg-transparent text-[#525A65] hover:bg-[#FFFFFF]"
            }`}
          >
            <span className="block text-xs font-semibold">{filter.label}</span>
            <span
              className={`mt-0.5 block text-[11px] ${
                activeQueueFilter === filter.id
                  ? "text-[#D8DADF]"
                  : "text-[#7A808A]"
              }`}
            >
              {getQueueCount(filter.id, conversations)}
            </span>
          </button>
        ))}
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="grid gap-1.5">
        {conversations.length > 0 ? (
          conversations.map((conversation) => (
            <ConversationRow
              key={conversation.id}
              active={conversation.id === activeConversationId}
              conversation={conversation}
              onSelect={() => onSelectConversation(conversation.id)}
            />
          ))
        ) : (
          <div className="rounded-[1.1rem] border border-black/[0.08] bg-[#F7F8FA] px-4 py-7 text-center">
            <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-2xl border border-black/[0.08] bg-[#FFFFFF] text-[#525A65]">
              <HiOutlineChatBubbleLeftRight className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-semibold text-[#0B0D10]">
              Sonuç bulunamadı
            </h3>
            <p className="mt-1 text-xs leading-5 text-[#7A808A]">
              Arama veya platform filtresini genişleterek kuyruğu tekrar kontrol et.
            </p>
          </div>
        )}
        </div>
      </div>
    </aside>
  );
}

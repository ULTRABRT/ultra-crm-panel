"use client";

import { useMemo, useState, type ReactNode } from "react";
import {
  FaFacebookMessenger,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";
import {
  HiOutlineAdjustmentsHorizontal,
  HiOutlineChatBubbleLeftRight,
  HiOutlineDocumentText,
  HiOutlineEnvelope,
  HiOutlineInboxStack,
  HiOutlineMagnifyingGlass,
  HiOutlineSparkles,
  HiOutlineSquares2X2,
} from "react-icons/hi2";

import {
  inboxChannelStats,
  inboxConversations,
  inboxDetail,
} from "@/data/inbox";
import { useDnaSafe } from "@/context/DnaContext";
import type { InboxChannel, InboxConversation } from "@/types/inbox";

import { ConversationQueue, type QueueFilter } from "./ConversationQueue";
import { ConversationView } from "./ConversationView";
import { CustomerSidePanel } from "./CustomerSidePanel";

type PlatformFilter = InboxChannel | "all" | "messenger";

type PlatformBase = {
  id: PlatformFilter;
  label: string;
};

type PlatformOption = PlatformBase & {
  total: number;
  unread: number;
};

const platformBase: PlatformBase[] = [
  {
    id: "all",
    label: "Tümü",
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
  },
  {
    id: "instagram",
    label: "Instagram",
  },
  {
    id: "messenger",
    label: "Messenger",
  },
  {
    id: "mail",
    label: "Mail",
  },
  {
    id: "webChat",
    label: "Webchat",
  },
  {
    id: "forms",
    label: "Formlar",
  },
];

function getPlatformIcon(platform: PlatformFilter, active: boolean) {
  const className = "h-[21px] w-[21px]";

  if (platform === "whatsapp") {
    return (
      <FaWhatsapp
        className={className}
        style={active ? undefined : { color: "#22A060" }}
      />
    );
  }

  if (platform === "instagram") {
    return (
      <FaInstagram
        className={className}
        style={active ? undefined : { color: "#D62976" }}
      />
    );
  }

  if (platform === "messenger") {
    return (
      <FaFacebookMessenger
        className={className}
        style={active ? undefined : { color: "#0866FF" }}
      />
    );
  }

  if (platform === "mail") {
    return <HiOutlineEnvelope className={className} />;
  }

  if (platform === "webChat") {
    return <HiOutlineChatBubbleLeftRight className={className} />;
  }

  if (platform === "forms") {
    return <HiOutlineDocumentText className={className} />;
  }

  return <HiOutlineSquares2X2 className={className} />;
}

function matchesSearch(conversation: InboxConversation, query: string) {
  const normalizedQuery = query.trim().toLocaleLowerCase("tr-TR");

  if (!normalizedQuery) {
    return true;
  }

  return [
    conversation.customerName,
    conversation.channelLabel,
    conversation.subject,
    conversation.preview,
    conversation.lastMessage,
    conversation.intentLabel,
  ].some((value) =>
    value.toLocaleLowerCase("tr-TR").includes(normalizedQuery),
  );
}

function matchesQueueFilter(
  conversation: InboxConversation,
  filter: QueueFilter,
) {
  if (filter === "waiting") {
    return conversation.isUnread || conversation.status === "waitingReply";
  }

  if (filter === "hot") {
    return (
      conversation.temperature === "veryHot" ||
      conversation.temperature === "hot"
    );
  }

  return true;
}

function TopCommandHeader({
  searchQuery,
  onSearchChange,
}: {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}) {
  return (
    <header className="arqon-inbox-commandbar-final rounded-[1rem] border border-black/[0.08] bg-[#FFFFFF] px-3 py-2 shadow-[0_12px_34px_rgba(11,13,16,0.07),inset_0_1px_0_rgba(255,255,255,0.94)]">
      <div className="arqon-inbox-commandrow-final">
        <div className="flex min-w-0 items-center gap-2.5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-black/[0.08] bg-[#FFFFFF] text-[#0B0D10] shadow-[0_8px_18px_rgba(11,13,16,0.08)]">
            <HiOutlineInboxStack className="h-4 w-4" />
          </div>

          <div className="min-w-0">
            <div className="flex min-w-0 items-center gap-2">
              <h1 className="shrink-0 text-lg font-semibold tracking-tight text-[#0B0D10]">
                Ultra Inbox
              </h1>
              <p className="line-clamp-1 text-[11px] font-medium text-[#6B7280]">
                Müşteri operasyon merkezi · AI destekli kanal komut merkezi
              </p>
            </div>

          </div>
        </div>

        <div className="arqon-inbox-command-search">
          <div className="arqon-search-field flex h-9 w-full items-center gap-2 rounded-full border border-black/[0.08] bg-[#FFFFFF] px-3 text-[#7A808A] shadow-[0_6px_18px_rgba(11,13,16,0.035)]">
            <HiOutlineMagnifyingGlass className="h-4 w-4 shrink-0" />
            <input
              value={searchQuery}
              onChange={(event) => onSearchChange(event.target.value)}
              className="arqon-search-input h-full min-w-0 flex-1 bg-transparent text-sm text-[#0B0D10] outline-none placeholder:text-[#8A9099]"
              placeholder="Müşteri, kanal veya mesaj ara..."
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-end gap-1.5">
          <button
            type="button"
            className="inline-flex h-9 items-center gap-1.5 rounded-[0.7rem] border border-black/[0.08] bg-[#FFFFFF] px-3 text-[11px] font-semibold text-[#0B0D10] transition hover:bg-[#EEF0F3]"
          >
            <HiOutlineAdjustmentsHorizontal className="h-4 w-4" />
            Filtre
          </button>

          <button
            type="button"
            className="inline-flex h-9 items-center gap-1.5 rounded-[0.7rem] bg-[#0B0D10] px-3 text-[11px] font-semibold text-[#FFFFFF] shadow-[0_10px_22px_rgba(11,13,16,0.16)] transition hover:bg-[#1A1D22]"
          >
            <HiOutlineSparkles className="h-4 w-4" />
            AI taslak modu
          </button>
        </div>
      </div>
    </header>
  );
}

function PlatformSwitcher({
  platforms,
  activePlatform,
  onPlatformChange,
}: {
  platforms: PlatformOption[];
  activePlatform: PlatformFilter;
  onPlatformChange: (platform: PlatformFilter) => void;
}) {
  return (
    <nav
      aria-label="Inbox platformları"
      className="arqon-inbox-platform-bar-final arqon-channel-pulse-rail"
    >
      {platforms.map((platform) => {
        const isActive = activePlatform === platform.id;

        return (
          <button
            key={platform.id}
            type="button"
            onClick={() => onPlatformChange(platform.id)}
            className={`arqon-platform-card arqon-channel-pulse-card relative flex h-[62px] min-w-0 items-center gap-3 rounded-[0.85rem] border px-3 text-left transition ${
              isActive
                ? "border-black/[0.18] bg-[#0B0D10] text-[#FFFFFF] shadow-[0_16px_34px_rgba(11,13,16,0.22),inset_0_1px_0_rgba(255,255,255,0.08)]"
                : "border-black/[0.08] bg-[#FFFFFF] text-[#0B0D10] shadow-[0_10px_28px_rgba(11,13,16,0.055),inset_0_1px_0_rgba(255,255,255,0.95)] hover:border-black/[0.12] hover:bg-[#F7F8FA]"
            }`}
          >
            <span
              className={`arqon-platform-icon flex h-9 w-9 shrink-0 items-center justify-center rounded-[0.7rem] border ${
                isActive
                  ? "border-[#FFFFFF]/15 bg-[#FFFFFF]/10 text-[#FFFFFF]"
                  : "border-black/[0.08] bg-[#F4F5F7] text-[#0B0D10]"
              }`}
            >
              {getPlatformIcon(platform.id, isActive)}
            </span>
            <span className="min-w-0 flex-1">
              <span className="arqon-platform-label block text-[12px] font-semibold">
                {platform.label}
              </span>
              <span
                className={`arqon-platform-subtitle mt-1 block truncate text-[10px] font-medium ${
                  isActive ? "text-[#FFFFFF]/72" : "text-[#7A808A]"
                }`}
              >
                <span className="arqon-platform-subtitle-full">
                  {platform.total} toplam · {platform.unread} bekliyor
                </span>
                <span className="arqon-platform-subtitle-compact">
                  {platform.unread} bekliyor
                </span>
              </span>
            </span>
            <span
              className={`arqon-platform-count shrink-0 self-start rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${
                isActive
                  ? "bg-[#FFFFFF]/12 text-[#E5E7EB]"
                  : "bg-[#F1F2F4] text-[#7A808A]"
              }`}
            >
              {platform.unread > 0 ? platform.unread : platform.total}
            </span>
          </button>
        );
      })}
    </nav>
  );
}

function MainCommandGrid({ children }: { children: ReactNode }) {
  return <div className="arqon-inbox-workbench-final">{children}</div>;
}

function CustomerIntelligenceDock({ children }: { children: ReactNode }) {
  return <div className="arqon-inbox-customer-dock-final">{children}</div>;
}

export function InboxWorkspace() {
  const { actions } = inboxDetail;
  const dnaContext = useDnaSafe();
  const activeDna = dnaContext?.activeDna ?? null;
  const [activeConversationId, setActiveConversationId] = useState(
    inboxDetail.activeConversation.id,
  );
  const [activePlatform, setActivePlatform] = useState<PlatformFilter>("all");
  const [activeQueueFilter, setActiveQueueFilter] = useState<QueueFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [draft, setDraft] = useState("");
  const [dismissedReplyIdsByConversation, setDismissedReplyIdsByConversation] =
    useState<Record<string, string[]>>({});

  const filteredConversations = useMemo(
    () =>
      inboxConversations.filter((conversation) => {
        const platformMatch =
          activePlatform === "all" || conversation.channel === activePlatform;

        return (
          platformMatch &&
          matchesQueueFilter(conversation, activeQueueFilter) &&
          matchesSearch(conversation, searchQuery)
        );
      }),
    [activePlatform, activeQueueFilter, searchQuery],
  );

  const activeConversation =
    filteredConversations.find(
      (conversation) => conversation.id === activeConversationId,
    ) ??
    filteredConversations[0] ??
    null;

  const dismissedReplyIds = activeConversation
    ? dismissedReplyIdsByConversation[activeConversation.id] ?? []
    : [];

  const availableReplies =
    activeConversation?.aiReplies.filter(
      (reply) => !dismissedReplyIds.includes(reply.id),
    ) ?? [];

  const waitingCount = inboxConversations.filter(
    (conversation) =>
      conversation.isUnread || conversation.status === "waitingReply",
  ).length;
  const hotCount = inboxConversations.filter((conversation) =>
    ["veryHot", "hot"].includes(conversation.temperature),
  ).length;

  const platformOptions: PlatformOption[] = platformBase.map((platform) => {
    if (platform.id === "all") {
      return {
        ...platform,
        total: inboxConversations.length,
        unread: waitingCount,
      };
    }

    const stat =
      platform.id === "messenger"
        ? undefined
        : inboxChannelStats.find((item) => item.id === platform.id);

    return {
      ...platform,
      total: stat?.total ?? 0,
      unread: stat?.unread ?? 0,
    };
  });

  function handleSelectConversation(conversationId: string) {
    setActiveConversationId(conversationId);
    setDraft("");
  }

  function handleUseReply(message: string) {
    setDraft(message);
  }

  function handleDismissReply(replyId: string) {
    if (!activeConversation) {
      return;
    }

    setDismissedReplyIdsByConversation((current) => {
      const conversationReplyIds = current[activeConversation.id] ?? [];

      if (conversationReplyIds.includes(replyId)) {
        return current;
      }

      return {
        ...current,
        [activeConversation.id]: [...conversationReplyIds, replyId],
      };
    });
  }

  return (
    <section className="arqon-inbox-workspace-final w-full">
      <section className="rounded-[1.35rem] border border-white/10 bg-white/[0.045] p-2 shadow-[0_18px_48px_rgba(11,13,16,0.18),inset_0_1px_0_rgba(255,255,255,0.08)] sm:p-2.5">
        <div className="mb-2 flex flex-col gap-1.5 px-1 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/36">
              Arqon command frame
            </p>
            <h2 className="mt-1 text-base font-semibold tracking-tight text-white sm:text-lg">
              Platinum conversation workbench
            </h2>
            <p className="mt-1 hidden max-w-2xl text-xs leading-5 text-white/46 sm:block">
              Mesaj kuyruğu, AI taslakları ve müşteri kanıtı tek yerel
              çalışma yüzeyinde okunur; kalıcı işlem için onay gerekir.
            </p>
          </div>

          <div className="flex flex-wrap gap-1 text-[10px] font-semibold text-white/54 sm:gap-1.5 sm:text-[11px]">
            <span className="rounded-full border border-white/10 bg-black/35 px-2 py-1 sm:px-2.5">
              Readonly
            </span>
            <span className="rounded-full border border-white/10 bg-black/35 px-2 py-1 sm:px-2.5">
              Yerel görünüm
            </span>
            <span className="rounded-full border border-white/10 bg-black/35 px-2 py-1 sm:px-2.5">
              Backend yazımı yok
            </span>
          </div>
        </div>

        <TopCommandHeader
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <div className="mt-2">
          <PlatformSwitcher
            activePlatform={activePlatform}
            platforms={platformOptions}
            onPlatformChange={setActivePlatform}
          />
        </div>
      </section>

      <MainCommandGrid>
        <ConversationQueue
          activeConversationId={activeConversation?.id ?? ""}
          activeQueueFilter={activeQueueFilter}
          conversations={filteredConversations}
          onQueueFilterChange={setActiveQueueFilter}
          onSelectConversation={handleSelectConversation}
          totalConversationCount={inboxConversations.length}
        />

        <div className="arqon-inbox-command-stack arqon-command-deck-shell">
          <ConversationView
            activeDna={activeDna}
            actions={actions}
            aiReplies={availableReplies}
            conversation={activeConversation}
            draft={draft}
            onDismissReply={handleDismissReply}
            onDraftChange={setDraft}
            onEditReply={handleUseReply}
            onUseReply={handleUseReply}
          />

          <CustomerIntelligenceDock>
            <CustomerSidePanel
              activeDna={activeDna}
              actions={actions}
              conversation={activeConversation}
            />
          </CustomerIntelligenceDock>
        </div>
      </MainCommandGrid>
    </section>
  );
}

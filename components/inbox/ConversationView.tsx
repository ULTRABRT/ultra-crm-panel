import { useEffect, useRef, type ChangeEvent, type ReactNode } from "react";
import {
  HiOutlineArrowTrendingUp,
  HiOutlineChevronDown,
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineDocumentText,
  HiOutlineEllipsisVertical,
  HiOutlineFaceSmile,
  HiOutlinePaperAirplane,
  HiOutlinePaperClip,
  HiOutlinePhone,
  HiOutlineSparkles,
  HiOutlineUserCircle,
} from "react-icons/hi2";

import type {
  InboxAction,
  InboxAiReply,
  InboxConversation,
  InboxMessage,
} from "@/types/inbox";
import type { SectorDna } from "@/types/dna/SectorDna";

import { AiMemoryStrip } from "./AiMemoryStrip";
import { AiReplyBand } from "./AiReplyBand";

const composerMinHeight = 48;
const composerMaxHeight = 176;

type ConversationViewProps = {
  conversation: InboxConversation | null;
  activeDna: SectorDna | null;
  aiReplies: InboxAiReply[];
  actions: InboxAction[];
  draft: string;
  onDraftChange: (value: string) => void;
  onUseReply: (message: string) => void;
  onEditReply: (message: string) => void;
  onDismissReply: (replyId: string) => void;
};

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function LightButton({
  children,
  icon,
  variant = "secondary",
  onClick,
  disabled,
}: {
  children: string;
  icon?: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  onClick?: () => void;
  disabled?: boolean;
}) {
  const className =
    variant === "primary"
      ? "bg-[#0B0D10] text-[#FFFFFF] hover:bg-[#1A1D22]"
      : variant === "ghost"
        ? "bg-transparent text-[#525A65] hover:bg-[#EEF0F3]"
        : "border border-black/[0.08] bg-[#FFFFFF] text-[#0B0D10] hover:bg-[#EEF0F3]";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex h-7 items-center justify-center gap-1.5 rounded-full px-2.5 text-[11px] font-semibold transition disabled:pointer-events-none disabled:opacity-45 ${className}`}
    >
      {icon}
      {children}
    </button>
  );
}

function MessageBubble({ message }: { message: InboxMessage }) {
  const isOutgoing = message.direction === "outgoing";
  const isInternal = message.direction === "internal";

  return (
    <article
      data-message-bubble
      className={`flex ${
        isOutgoing ? "justify-end" : isInternal ? "justify-center" : "justify-start"
      }`}
    >
      <div
        className={`arqon-message-bubble-card w-fit max-w-[min(78%,42rem)] rounded-[1.15rem] border px-3.5 py-2 ${
          isOutgoing
            ? "border-black/[0.075] bg-[#EEF0F3] shadow-[0_12px_30px_rgba(11,13,16,0.08),inset_0_1px_0_rgba(255,255,255,0.72)]"
            : isInternal
              ? "border-black/[0.08] bg-[#E9ECEF] shadow-[0_8px_18px_rgba(11,13,16,0.055)]"
              : "border-black/[0.075] bg-[#FFFFFF] shadow-[0_14px_32px_rgba(11,13,16,0.095),inset_0_1px_0_rgba(255,255,255,0.9)]"
        }`}
      >
        <div className="mb-1.5 flex items-center gap-2">
          <span
            className={`arqon-message-bubble-label inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
              isOutgoing
                ? "border border-black/[0.08] bg-[#F7F8FA] text-[#525A65]"
                : "border border-black/[0.08] bg-[#F4F5F7] text-[#525A65]"
            }`}
          >
            {isOutgoing || isInternal ? (
              <HiOutlineDocumentText className="h-3.5 w-3.5" />
            ) : (
              <HiOutlineUserCircle className="h-3.5 w-3.5" />
            )}
            {isOutgoing ? "Solify" : isInternal ? "İç not" : "Müşteri"}
          </span>
        </div>

        <p
          className={`arqon-message-bubble-text whitespace-pre-line text-[13px] leading-5 ${
            isOutgoing ? "text-[#0B0D10]" : "text-[#0B0D10]"
          }`}
        >
          {message.content}
        </p>

        <div
          className={`mt-1.5 flex items-center justify-end gap-1.5 text-[11px] ${
            isOutgoing ? "text-[#7A808A]" : "text-[#7A808A]"
          }`}
        >
          {message.timeLabel}
          {isOutgoing ? <HiOutlineCheckCircle className="h-3.5 w-3.5" /> : null}
        </div>
      </div>
    </article>
  );
}

function resizeComposer(element: HTMLTextAreaElement | null) {
  if (!element) {
    return;
  }

  element.style.height = "auto";

  const nextHeight = Math.min(
    Math.max(element.scrollHeight, composerMinHeight),
    composerMaxHeight,
  );

  element.style.height = `${nextHeight}px`;
  element.style.overflowY =
    element.scrollHeight > composerMaxHeight ? "auto" : "hidden";
}

export function ConversationView({
  conversation,
  activeDna,
  aiReplies,
  actions,
  draft,
  onDraftChange,
  onUseReply,
  onEditReply,
  onDismissReply,
}: ConversationViewProps) {
  const composerRef = useRef<HTMLTextAreaElement>(null);
  const messageStageRef = useRef<HTMLElement>(null);

  useEffect(() => {
    resizeComposer(composerRef.current);
  }, [conversation?.id, draft]);

  useEffect(() => {
    const messageStage = messageStageRef.current;

    if (!messageStage) {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      messageStage.scrollTop = messageStage.scrollHeight;
    });

    return () => window.cancelAnimationFrame(frame);
  }, [conversation?.id]);

  function handleDraftChange(event: ChangeEvent<HTMLTextAreaElement>) {
    resizeComposer(event.currentTarget);
    onDraftChange(event.currentTarget.value);
  }

  function handleUseReply(message: string) {
    onUseReply(message);
  }

  function handleEditReply(message: string) {
    onEditReply(message);

    requestAnimationFrame(() => {
      composerRef.current?.focus();
      resizeComposer(composerRef.current);
    });
  }

  if (!conversation) {
    return (
      <section className="arqon-inbox-conversation flex min-h-[34rem] items-center justify-center rounded-[1.5rem] border border-black/[0.08] bg-[#FFFFFF] p-6">
        <div className="max-w-md rounded-[1.35rem] border border-black/[0.08] bg-[#F7F8FA] p-7 text-center">
          <h3 className="text-base font-semibold text-[#0B0D10]">
            Konuşma seçilmedi
          </h3>
          <p className="mt-2 text-sm leading-6 text-[#7A808A]">
            Sol kuyrukta bir müşteri seç veya arama filtresini genişlet.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="arqon-inbox-conversation arqon-command-deck-stage arqon-conversation-center-lock flex h-full min-h-0 flex-col rounded-[1rem] border border-black/[0.08] bg-[#FFFFFF] shadow-[0_20px_56px_rgba(11,13,16,0.11),0_1px_0_rgba(255,255,255,0.95)_inset]">
      <div className="arqon-conversation-command-head flex flex-wrap items-center justify-between gap-2.5 rounded-t-[1rem] border-b border-black/[0.075] bg-[#FFFFFF] px-4 py-2.5">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-[#0B0D10] text-xs font-bold text-[#FFFFFF] shadow-[0_12px_26px_rgba(11,13,16,0.22)]">
            {getInitials(conversation.customerName)}
          </div>

          <div className="min-w-0">
            <p className="arqon-command-eyebrow mb-0.5 text-[10px] font-semibold uppercase tracking-[0.04em] text-[#7A808A]">
              Müşteri operasyon sahnesi
            </p>
            <div className="flex min-w-0 flex-wrap items-center gap-1.5">
              <h2 className="truncate text-base font-semibold tracking-tight text-[#0B0D10]">
                {conversation.customerName}
              </h2>
              <span className="flex h-2.5 w-2.5 rounded-full bg-[#22A060]" />
              <span className="rounded-full border border-black/[0.08] bg-[#F1F2F4] px-2.5 py-1 text-[11px] font-semibold text-[#525A65]">
                {conversation.channelLabel}
              </span>
              <span className="rounded-full border border-black/[0.08] bg-[#F7F8FA] px-2.5 py-1 text-[11px] font-semibold text-[#525A65]">
                {conversation.intentLabel}
              </span>
            </div>

            <p className="mt-0.5 line-clamp-1 text-sm leading-5 text-[#6B7280]">
              {conversation.subject}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-2">
          <LightButton
            icon={<HiOutlinePhone className="h-4 w-4" />}
            variant="primary"
          >
            Ara
          </LightButton>

          <LightButton icon={<HiOutlineArrowTrendingUp className="h-4 w-4" />}>
            Lead
          </LightButton>

          <LightButton icon={<HiOutlineDocumentText className="h-4 w-4" />}>
            Teklif
          </LightButton>

          <LightButton icon={<HiOutlineEllipsisVertical className="h-4 w-4" />}>
            Daha
          </LightButton>
        </div>
      </div>

      <div className="border-b border-black/[0.06] bg-[#FFFFFF] px-4 py-2">
        <AiMemoryStrip activeDna={activeDna} conversation={conversation} />
      </div>

      <main
        ref={messageStageRef}
        className="arqon-message-stage-final min-h-0 flex-1 overflow-y-auto px-5 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <div className="arqon-message-flow mx-auto flex max-w-[980px] flex-col gap-4">
          <div className="flex justify-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-black/[0.08] bg-[#FFFFFF] px-2.5 py-1 text-[11px] font-medium text-[#7A808A]">
              <HiOutlineClock className="h-3.5 w-3.5" />
              Bugün
            </span>
          </div>

          {conversation.messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
        </div>
      </main>

      <footer className="arqon-reply-command-zone-final arqon-ai-console-zone space-y-1.5 rounded-b-[1rem] border-t border-black/[0.075] bg-[#FFFFFF] px-3 py-2 shadow-[0_-12px_30px_rgba(11,13,16,0.045)]">
        <AiReplyBand
          replies={aiReplies}
          onDismissReply={onDismissReply}
          onEditReply={handleEditReply}
          onUseReply={handleUseReply}
        />

        <div className="arqon-search-field arqon-inbox-composer-v5 flex items-end gap-2 rounded-[0.9rem] border border-black/[0.10] bg-[#FFFFFF] p-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_8px_22px_rgba(11,13,16,0.04)]">
          <button
            type="button"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-black/[0.08] bg-[#FFFFFF] text-[#525A65] transition hover:bg-[#EEF0F3]"
          >
            <HiOutlinePaperClip className="h-5 w-5" />
          </button>

          <textarea
            ref={composerRef}
            value={draft}
            onChange={handleDraftChange}
            className="arqon-search-input min-h-10 min-w-0 flex-1 resize-none bg-transparent py-1.5 text-sm leading-6 text-[#0B0D10] outline-none placeholder:text-[#8A9099] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            placeholder="AI önerisini kullan veya yanıt taslağını yaz..."
            rows={1}
          />

          <button
            type="button"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-[#525A65] transition hover:bg-[#EEF0F3]"
          >
            <HiOutlineSparkles className="h-4 w-4" />
          </button>

          <button
            type="button"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-[#525A65] transition hover:bg-[#EEF0F3]"
          >
            <HiOutlineFaceSmile className="h-4 w-4" />
          </button>

          <button
            type="button"
            className="inline-flex h-8 shrink-0 items-center justify-center gap-1.5 rounded-[0.7rem] bg-[#0B0D10] px-3 text-[11px] font-semibold text-[#FFFFFF] transition hover:bg-[#1A1D22]"
          >
            <HiOutlinePaperAirplane className="h-4 w-4" />
            Gönder
            <HiOutlineChevronDown className="h-3.5 w-3.5" />
          </button>
        </div>

        <p className="sr-only">
          Taslak modu: {actions.slice(0, 2).map((action) => action.label).join(" · ")}
        </p>
      </footer>
    </section>
  );
}

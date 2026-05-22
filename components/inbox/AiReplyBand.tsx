import { HiOutlineSparkles } from "react-icons/hi2";

import type { InboxAiReply } from "@/types/inbox";

type AiReplyBandProps = {
  replies: InboxAiReply[];
  onUseReply: (message: string) => void;
  onEditReply: (message: string) => void;
  onDismissReply: (replyId: string) => void;
};

function ReplyAction({
  children,
  variant = "secondary",
  onClick,
}: {
  children: string;
  variant?: "primary" | "secondary" | "ghost";
  onClick: () => void;
}) {
  const className =
    variant === "primary"
      ? "bg-[#0B0D10] text-[#FFFFFF] hover:bg-[#1A1D22]"
      : variant === "ghost"
        ? "text-[#7A808A] hover:bg-[#EEF0F3]"
        : "border border-black/[0.08] bg-[#FFFFFF] text-[#0B0D10] hover:bg-[#EEF0F3]";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`h-7 rounded-full px-3 text-[11px] font-semibold transition ${className}`}
    >
      {children}
    </button>
  );
}

export function AiReplyBand({
  replies,
  onUseReply,
  onEditReply,
  onDismissReply,
}: AiReplyBandProps) {
  const primaryReply = replies[0];

  if (!primaryReply) {
    return (
      <section className="rounded-[1rem] border border-black/[0.08] bg-[#F7F8FA] px-3 py-1.5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-sm font-semibold text-[#0B0D10]">
            AI önerisi pasif
          </h3>
          <p className="text-xs leading-5 text-[#7A808A]">
            Öneriler reddedildi veya hazır yanıt yok.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="arqon-ai-decision-strip rounded-[0.9rem] border border-black/[0.10] bg-[#FFFFFF] px-2.5 py-1.5 shadow-[0_8px_22px_rgba(11,13,16,0.055),inset_0_1px_0_rgba(255,255,255,0.95)]">
      <div className="arqon-ai-decision-row grid gap-2">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="arqon-ai-console-badge inline-flex h-8 items-center gap-1.5 rounded-[0.65rem] bg-[#0B0D10] px-3 text-[11px] font-semibold text-[#FFFFFF] shadow-[0_8px_18px_rgba(11,13,16,0.18)]">
            <HiOutlineSparkles className="h-3.5 w-3.5" />
            ARQON AI
          </span>
          <div className="min-w-0">
            <p className="truncate text-[12px] font-semibold text-[#0B0D10]">
              {primaryReply.title}
            </p>
            <p className="truncate text-[10px] font-semibold text-[#7A808A]">
              {primaryReply.confidenceLabel} · {primaryReply.nextActionLabel}
            </p>
          </div>
        </div>

        <div className="arqon-ai-console-copy min-w-0 border-l border-black/[0.08] pl-3">
          <p className="truncate text-[12px] font-semibold leading-5 text-[#0B0D10]">
            {primaryReply.replyPreview}
          </p>
          <div className="mt-0.5 flex min-w-0 gap-1.5 text-[10px] font-semibold text-[#6B7280]">
            <span className="min-w-0 truncate">
              Gerekçe: {primaryReply.reason}
            </span>
            <span className="shrink-0 text-[#B6BBC3]">|</span>
            <span className="min-w-0 truncate">
              Beklenen çıktı: {primaryReply.expectedOutcome}
            </span>
          </div>
        </div>

        <div className="flex shrink-0 flex-wrap gap-1.5 xl:justify-end">
          <ReplyAction
            variant="primary"
            onClick={() => onUseReply(primaryReply.message)}
          >
            Kullan
          </ReplyAction>
          <ReplyAction onClick={() => onEditReply(primaryReply.message)}>
            Düzenle
          </ReplyAction>
          <ReplyAction
            variant="ghost"
            onClick={() => onDismissReply(primaryReply.id)}
          >
            Reddet
          </ReplyAction>
        </div>
      </div>
    </section>
  );
}

import {
  HiOutlineArrowTrendingUp,
  HiOutlineChatBubbleLeftRight,
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineDocumentText,
  HiOutlinePaperAirplane,
  HiOutlinePaperClip,
  HiOutlinePhone,
  HiOutlineSparkles,
  HiOutlineUserCircle,
} from "react-icons/hi2";

import { inboxDetail } from "../../data/inbox";

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function MesajDetayPaneli() {
  const { activeConversation, aiReplies } = inboxDetail;
  const aiReply = aiReplies[0];

  return (
    <section className="flex h-full min-h-0 flex-col overflow-hidden bg-[#06111d]">
      <header className="flex h-[76px] shrink-0 items-center justify-between gap-4 border-b border-white/10 bg-[#071522] px-5">
        <div className="flex min-w-0 items-center gap-3">
          <div className="relative shrink-0">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-sm font-bold text-black">
              {getInitials(activeConversation.customerName)}
            </div>

            <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border border-[#071522] bg-[#0f6fff] text-white">
              <HiOutlineChatBubbleLeftRight className="h-3 w-3" />
            </span>
          </div>

          <div className="min-w-0">
            <div className="flex min-w-0 items-center gap-2">
              <h2 className="truncate text-lg font-semibold tracking-tight text-white">
                {activeConversation.customerName}
              </h2>

              <span className="shrink-0 rounded-full border border-white/10 bg-white/[0.05] px-2.5 py-1 text-[11px] font-medium text-white/55">
                {activeConversation.channelLabel}
              </span>
            </div>

            <p className="mt-1 truncate text-sm text-white/42">
              {activeConversation.subject}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <button className="inline-flex h-10 items-center gap-2 rounded-2xl bg-white px-4 text-sm font-semibold text-black transition hover:bg-white/85">
            <HiOutlinePhone className="h-4 w-4" />
            Ara
          </button>

          <button className="inline-flex h-10 items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.05] px-4 text-sm font-semibold text-white/62 transition hover:bg-white/[0.09] hover:text-white">
            <HiOutlineArrowTrendingUp className="h-4 w-4" />
            Lead
          </button>

          <button className="inline-flex h-10 items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.05] px-4 text-sm font-semibold text-white/62 transition hover:bg-white/[0.09] hover:text-white">
            <HiOutlineDocumentText className="h-4 w-4" />
            Teklif
          </button>
        </div>
      </header>

      <main className="min-h-0 flex-1 overflow-y-auto bg-[radial-gradient(circle_at_top_right,rgba(15,111,255,0.10),transparent_30%),linear-gradient(to_bottom,#06111d,#04080d)] px-6 py-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="mx-auto flex max-w-[820px] flex-col gap-4">
          <div className="flex justify-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.045] px-3 py-1.5 text-xs font-medium text-white/35">
              <HiOutlineClock className="h-3.5 w-3.5" />
              Bugün
            </span>
          </div>

          {activeConversation.messages.map((message) => {
            const isOutgoing = message.direction === "outgoing";
            const isInternal = message.direction === "internal";

            return (
              <article
                key={message.id}
                className={`flex ${
                  isOutgoing
                    ? "justify-end"
                    : isInternal
                      ? "justify-center"
                      : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[70%] rounded-[1.35rem] px-4 py-3 ${
                    isOutgoing
                      ? "bg-[#0f6fff] text-white shadow-xl shadow-[#0f6fff]/15"
                      : isInternal
                        ? "border border-white/10 bg-white/[0.045] text-white/58"
                        : "border border-white/10 bg-[#10283d] text-white"
                  }`}
                >
                  <div className="mb-2 flex items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                        isOutgoing
                          ? "bg-white/15 text-white"
                          : "border border-white/10 bg-black/20 text-white/50"
                      }`}
                    >
                      {isOutgoing ? (
                        <HiOutlineSparkles className="h-3.5 w-3.5" />
                      ) : isInternal ? (
                        <HiOutlineDocumentText className="h-3.5 w-3.5" />
                      ) : (
                        <HiOutlineUserCircle className="h-3.5 w-3.5" />
                      )}
                      {isOutgoing
                        ? "Solify"
                        : isInternal
                          ? "İç not"
                          : "Müşteri"}
                    </span>
                  </div>

                  <p className="whitespace-pre-line text-sm leading-7 text-white/78">
                    {message.content}
                  </p>

                  <div
                    className={`mt-2 flex items-center justify-end gap-1.5 text-[11px] ${
                      isOutgoing ? "text-white/65" : "text-white/32"
                    }`}
                  >
                    {message.timeLabel}
                    {isOutgoing ? (
                      <HiOutlineCheckCircle className="h-3.5 w-3.5" />
                    ) : null}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </main>

      <footer className="shrink-0 border-t border-white/10 bg-[#071522] px-5 py-3">
        <div className="mx-auto max-w-[860px]">
          {aiReply ? (
            <div className="mb-2 flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.045] px-3 py-2">
              <div className="flex min-w-0 items-center gap-2">
                <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-black">
                  <HiOutlineSparkles className="h-3.5 w-3.5" />
                  AI
                </span>

                <p className="truncate text-sm text-white/58">
                  {aiReply.message}
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <button className="rounded-xl bg-white px-3 py-1.5 text-xs font-semibold text-black transition hover:bg-white/85">
                  Kullan
                </button>

                <button className="rounded-xl border border-white/10 bg-black/25 px-3 py-1.5 text-xs font-semibold text-white/50 transition hover:bg-white/[0.08] hover:text-white">
                  Düzenle
                </button>
              </div>
            </div>
          ) : null}

          <div className="flex items-center gap-3 rounded-[1.5rem] border border-white/10 bg-black/25 p-2.5">
            <button className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-white/55 transition hover:bg-white/[0.08] hover:text-white">
              <HiOutlinePaperClip className="h-5 w-5" />
            </button>

            <input
              className="h-10 min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/35"
              placeholder="Mesajınızı yazın..."
            />

            <button className="flex h-10 shrink-0 items-center justify-center gap-2 rounded-2xl bg-[#0f6fff] px-5 text-sm font-semibold text-white shadow-lg shadow-[#0f6fff]/20 transition hover:bg-[#1f7cff]">
              <HiOutlinePaperAirplane className="h-4 w-4" />
              Gönder
            </button>
          </div>

          <div className="mt-1.5 flex items-center justify-between gap-3 text-[11px] text-white/26">
            <span>AI otomatik göndermez; kritik cevaplar insan kontrolünden geçer.</span>
            <span>{activeConversation.statusLabel}</span>
          </div>
        </div>
      </footer>
    </section>
  );
}
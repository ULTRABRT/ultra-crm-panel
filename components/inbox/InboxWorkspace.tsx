import {
  HiOutlineArrowTrendingUp,
  HiOutlineChatBubbleLeftRight,
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineDocumentText,
  HiOutlineInboxStack,
  HiOutlineMagnifyingGlass,
  HiOutlinePaperAirplane,
  HiOutlinePaperClip,
  HiOutlinePhone,
  HiOutlineSparkles,
  HiOutlineUserCircle,
} from "react-icons/hi2";

import { inboxConversations, inboxDetail } from "../../data/inbox";

const channelFilters = [
  "Tümü",
  "WhatsApp",
  "Instagram",
  "Messenger",
  "E-posta",
  "Web Sohbet",
  "Formlar",
];

const queueFilters = [
  { label: "Tümü", value: "5" },
  { label: "Yanıt", value: "3" },
  { label: "Sıcak", value: "3" },
];

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function StatusPill({
  children,
  active = false,
}: {
  children: React.ReactNode;
  active?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-semibold ${
        active
          ? "bg-white text-black"
          : "border border-white/10 bg-white/[0.045] text-white/48"
      }`}
    >
      {children}
    </span>
  );
}

function ConversationRow({
  conversation,
  active = false,
}: {
  conversation: (typeof inboxConversations)[number];
  active?: boolean;
}) {
  return (
    <button
      className={`group w-full border-b border-white/10 px-4 py-3.5 text-left transition ${
        active ? "bg-white text-black" : "bg-transparent hover:bg-white/[0.045]"
      }`}
    >
      <div className="flex gap-3">
        <div
          className={`relative flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-xs font-bold ${
            active
              ? "bg-black text-white"
              : "border border-white/10 bg-white/[0.045] text-white"
          }`}
        >
          {getInitials(conversation.customerName)}

          {conversation.isUnread ? (
            <span
              className={`absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border ${
                active ? "border-white bg-black" : "border-[#071522] bg-white"
              }`}
            />
          ) : null}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3
                  className={`truncate text-sm font-semibold ${
                    active ? "text-black" : "text-white"
                  }`}
                >
                  {conversation.customerName}
                </h3>

                {conversation.isUnread ? (
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                      active ? "bg-black text-white" : "bg-white text-black"
                    }`}
                  >
                    Yeni
                  </span>
                ) : null}
              </div>

              <p
                className={`mt-0.5 truncate text-xs ${
                  active ? "text-black/50" : "text-white/36"
                }`}
              >
                {conversation.channelLabel} · {conversation.intentLabel}
              </p>
            </div>

            <span
              className={`shrink-0 text-[11px] font-medium ${
                active ? "text-black/45" : "text-white/28"
              }`}
            >
              {conversation.lastMessageTimeLabel}
            </span>
          </div>

          <p
            className={`mt-2 line-clamp-2 text-sm leading-5 ${
              active ? "text-black/72" : "text-white/52"
            }`}
          >
            {conversation.preview}
          </p>

          <div className="mt-3 flex flex-wrap gap-1.5">
            <StatusPill active={active}>Çok sıcak</StatusPill>
            {conversation.hasBatteryInterest ? (
              <StatusPill active={active}>Batarya</StatusPill>
            ) : null}
            {conversation.hasMissingInfo ? (
              <StatusPill active={active}>Eksik</StatusPill>
            ) : null}
            {conversation.isLeadCandidate ? (
              <StatusPill active={active}>Lead</StatusPill>
            ) : null}
          </div>
        </div>
      </div>
    </button>
  );
}

function MessageBubble({
  message,
}: {
  message: (typeof inboxDetail.activeConversation.messages)[number];
}) {
  const isOutgoing = message.direction === "outgoing";
  const isInternal = message.direction === "internal";

  return (
    <article
      className={`flex ${
        isOutgoing ? "justify-end" : isInternal ? "justify-center" : "justify-start"
      }`}
    >
      <div
        className={`max-w-[72%] rounded-[1.35rem] px-4 py-3 ${
          isOutgoing
            ? "bg-[#0f6fff] text-white shadow-xl shadow-[#0f6fff]/15"
            : isInternal
              ? "border border-white/10 bg-white/[0.05] text-white/58"
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

            {isOutgoing ? "Solify" : isInternal ? "İç not" : "Müşteri"}
          </span>
        </div>

        <p className="whitespace-pre-line text-sm leading-7 text-white/80">
          {message.content}
        </p>

        <div
          className={`mt-2 flex items-center justify-end gap-1.5 text-[11px] ${
            isOutgoing ? "text-white/65" : "text-white/32"
          }`}
        >
          {message.timeLabel}
          {isOutgoing ? <HiOutlineCheckCircle className="h-3.5 w-3.5" /> : null}
        </div>
      </div>
    </article>
  );
}

export function InboxWorkspace() {
  const { activeConversation, aiReplies } = inboxDetail;
  const aiReply = aiReplies[0];

  return (
    <section className="arqon-inbox-workspace h-full min-h-0 overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#06111d] shadow-2xl shadow-black/45">
      <div className="flex h-full min-h-0 flex-col">
        <header className="shrink-0 border-b border-white/10 bg-[#071522]">
          <div className="arqon-inbox-top">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-black">
                <HiOutlineInboxStack className="h-5 w-5" />
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h1 className="truncate text-lg font-semibold tracking-tight text-white">
                    Ultra Inbox
                  </h1>
                  <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium text-white/45">
                    Canlı mesaj merkezi
                  </span>
                </div>

                <p className="mt-0.5 truncate text-sm text-white/36">
                  Tüm platform mesajlarını tek yerden yönet, yanıtla ve satış aksiyonuna çevir.
                </p>
              </div>
            </div>

            <div className="arqon-inbox-actions">
              <div className="arqon-search-field arqon-inbox-search h-10 min-w-0 items-center gap-3 rounded-2xl border border-white/10 bg-black/25 px-4 text-white/45">
                <HiOutlineMagnifyingGlass className="h-5 w-5 shrink-0" />
                <input
                  className="arqon-search-input h-full min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/35"
                  placeholder="Mesaj, müşteri veya kanal ara..."
                />
              </div>

              <button className="h-10 rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-sm font-semibold text-white/60 transition hover:bg-white/[0.08] hover:text-white">
                Filtre
              </button>

              <button className="h-10 rounded-2xl bg-white px-4 text-sm font-semibold text-black transition hover:bg-white/85">
                AI Açık
              </button>
            </div>
          </div>

          <div className="flex h-[50px] items-center gap-2 overflow-x-auto border-t border-white/10 px-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {channelFilters.map((channel, index) => (
              <button
                key={channel}
                className={`inline-flex shrink-0 items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-semibold transition ${
                  index === 0
                    ? "bg-white text-black"
                    : "border border-white/10 bg-white/[0.035] text-white/55 hover:bg-white/[0.07] hover:text-white"
                }`}
              >
                <HiOutlineChatBubbleLeftRight className="h-3.5 w-3.5" />
                {channel}
              </button>
            ))}
          </div>
        </header>

        <div className="arqon-inbox-grid">
          <aside className="flex min-h-0 flex-col overflow-hidden border-r border-white/10 bg-[#071522]">
            <div className="shrink-0 border-b border-white/10 px-4 py-4">
              <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                  <p className="mb-2 inline-flex rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium text-white/45">
                    Konuşma Kuyruğu
                  </p>

                  <h2 className="text-lg font-semibold tracking-tight text-white">
                    Gelen Kutusu
                  </h2>

                  <p className="mt-1 text-xs text-white/36">
                    Satışa en yakın mesajlar yukarıda.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/25 px-3 py-2 text-right">
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
                {queueFilters.map((filter, index) => (
                  <button
                    key={filter.label}
                    className={`rounded-2xl px-2 py-2.5 text-center transition ${
                      index === 0
                        ? "bg-white text-black"
                        : "border border-white/10 bg-white/[0.035] text-white/48 hover:bg-white/[0.07] hover:text-white"
                    }`}
                  >
                    <span className="block text-xs font-semibold">
                      {filter.label}
                    </span>
                    <span
                      className={`mt-0.5 block text-[11px] ${
                        index === 0 ? "text-black/45" : "text-white/28"
                      }`}
                    >
                      {filter.value}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {inboxConversations.map((conversation, index) => (
                <ConversationRow
                  key={conversation.id}
                  conversation={conversation}
                  active={index === 0}
                />
              ))}
            </div>
          </aside>

          <section className="flex min-h-0 flex-col overflow-hidden bg-[#06111d]">
            <div className="flex h-[74px] shrink-0 items-center justify-between gap-4 border-b border-white/10 bg-[#071522] px-5">
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

                  <p className="mt-1 truncate text-sm text-white/40">
                    {activeConversation.subject}
                  </p>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <button className="inline-flex h-10 items-center gap-2 rounded-2xl bg-white px-4 text-sm font-semibold text-black">
                  <HiOutlinePhone className="h-4 w-4" />
                  Ara
                </button>

                <button className="inline-flex h-10 items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.05] px-4 text-sm font-semibold text-white/62">
                  <HiOutlineArrowTrendingUp className="h-4 w-4" />
                  Lead
                </button>
              </div>
            </div>

            <main className="min-h-0 flex-1 overflow-y-auto bg-[radial-gradient(circle_at_top_right,rgba(15,111,255,0.10),transparent_30%),linear-gradient(to_bottom,#06111d,#04080d)] px-6 py-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div className="mx-auto flex max-w-[820px] flex-col gap-4">
                <div className="flex justify-center">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.045] px-3 py-1.5 text-xs font-medium text-white/35">
                    <HiOutlineClock className="h-3.5 w-3.5" />
                    Bugün
                  </span>
                </div>

                {activeConversation.messages.map((message) => (
                  <MessageBubble key={message.id} message={message} />
                ))}
              </div>
            </main>

            <footer className="shrink-0 border-t border-white/10 bg-[#071522] px-5 py-3">
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

                  <button className="shrink-0 rounded-xl bg-white px-3 py-1.5 text-xs font-semibold text-black">
                    Kullan
                  </button>
                </div>
              ) : null}

              <div className="arqon-search-field flex items-center gap-3 rounded-[1.5rem] border border-white/10 bg-black/25 p-2.5">
                <button className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-white/55">
                  <HiOutlinePaperClip className="h-5 w-5" />
                </button>

                <input
                  className="arqon-search-input h-10 min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/35"
                  placeholder="Mesajınızı yazın..."
                />

                <button className="flex h-10 shrink-0 items-center justify-center gap-2 rounded-2xl bg-[#0f6fff] px-5 text-sm font-semibold text-white shadow-lg shadow-[#0f6fff]/20">
                  <HiOutlinePaperAirplane className="h-4 w-4" />
                  Gönder
                </button>
              </div>
            </footer>
          </section>

          <aside className="arqon-inbox-detail min-h-0 flex-col overflow-hidden border-l border-white/10 bg-[#071522]">
            <div className="shrink-0 border-b border-white/10 px-5 py-5">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-sm font-bold text-black">
                  {getInitials(activeConversation.customerName)}
                </div>

                <span className="rounded-full bg-white px-2.5 py-1.5 text-[11px] font-semibold text-black">
                  {activeConversation.aiScore} AI skor
                </span>
              </div>

              <h2 className="truncate text-lg font-semibold tracking-tight text-white">
                {activeConversation.customerName}
              </h2>

              <p className="mt-1 truncate text-sm text-white/40">
                {activeConversation.customerTypeLabel}
              </p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                <StatusPill active>Çok sıcak</StatusPill>
                <StatusPill active>Acil</StatusPill>
              </div>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <section className="mb-3 rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/32">
                  Müşteri
                </p>

                <div className="space-y-2">
                  <div className="rounded-xl border border-white/10 bg-black/25 px-3 py-2.5">
                    <p className="text-[10px] uppercase tracking-[0.16em] text-white/28">
                      Telefon
                    </p>
                    <p className="mt-1 truncate text-sm font-semibold text-white/75">
                      {activeConversation.phone}
                    </p>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-black/25 px-3 py-2.5">
                    <p className="text-[10px] uppercase tracking-[0.16em] text-white/28">
                      Kaynak
                    </p>
                    <p className="mt-1 truncate text-sm font-semibold text-white/75">
                      {activeConversation.sourceLabel}
                    </p>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-black/25 px-3 py-2.5">
                    <p className="text-[10px] uppercase tracking-[0.16em] text-white/28">
                      Sorumlu
                    </p>
                    <p className="mt-1 truncate text-sm font-semibold text-white/75">
                      {activeConversation.assigneeLabel}
                    </p>
                  </div>
                </div>
              </section>

              <section className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/32">
                  İşlemler
                </p>

                <div className="space-y-2">
                  <button className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-black">
                    <HiOutlinePhone className="h-4 w-4" />
                    Ara
                  </button>

                  <button className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-4 py-2.5 text-sm font-semibold text-white/62">
                    <HiOutlineArrowTrendingUp className="h-4 w-4" />
                    Lead oluştur
                  </button>

                  <button className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-4 py-2.5 text-sm font-semibold text-white/62">
                    <HiOutlineDocumentText className="h-4 w-4" />
                    Teklif oluştur
                  </button>
                </div>
              </section>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

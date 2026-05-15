import type { IconType } from "react-icons";
import {
  HiOutlineArrowTrendingUp,
  HiOutlineBellAlert,
  HiOutlineChatBubbleLeftRight,
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineDocumentText,
  HiOutlineExclamationTriangle,
  HiOutlineMapPin,
  HiOutlinePhone,
  HiOutlineShieldCheck,
  HiOutlineSparkles,
  HiOutlineUserGroup,
} from "react-icons/hi2";

import { inboxDetail } from "../../data/inbox";
import type { InboxAction, InboxActionType } from "../../types/inbox";
import {
  inboxPriorityLabels,
  inboxPriorityStyles,
  inboxSentimentLabels,
  inboxSentimentStyles,
  inboxTemperatureLabels,
  inboxTemperatureStyles,
} from "../../types/inbox";

const actionIcons: Partial<Record<InboxActionType, IconType>> = {
  reply: HiOutlineChatBubbleLeftRight,
  call: HiOutlinePhone,
  assign: HiOutlineUserGroup,
  createLead: HiOutlineArrowTrendingUp,
  createOffer: HiOutlineDocumentText,
  planDiscovery: HiOutlineMapPin,
  askMissingInfo: HiOutlineExclamationTriangle,
  markHumanReview: HiOutlineShieldCheck,
  ignore: HiOutlineCheckCircle,
  note: HiOutlineDocumentText,
};

const primaryActionTypes: InboxActionType[] = [
  "reply",
  "createLead",
  "createOffer",
  "planDiscovery",
];

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function splitActions(actions: InboxAction[]) {
  return {
    primaryActions: actions.filter((action) =>
      primaryActionTypes.includes(action.type)
    ),
    secondaryActions: actions.filter(
      (action) => !primaryActionTypes.includes(action.type)
    ),
  };
}

export function AiYanitPaneli() {
  const { activeConversation, aiReplies, actions } = inboxDetail;
  const { primaryActions, secondaryActions } = splitActions(actions);

  const bestReply = aiReplies[0];
  const alternativeReply = aiReplies[1];
  const latestMessages = activeConversation.messages.slice(-2);

  return (
    <aside className="flex min-h-[760px] flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-black/45 shadow-2xl shadow-black/25 backdrop-blur-2xl">
      <div className="shrink-0 border-b border-white/10 bg-white/[0.025] p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/45 px-3 py-1.5">
              <HiOutlineSparkles className="h-4 w-4 text-white/70" />
              <span className="text-xs font-medium text-white/55">
                AI Satış Asistanı
              </span>
            </div>

            <h2 className="text-xl font-semibold tracking-tight text-white">
              Karar Paneli
            </h2>

            <p className="mt-1 text-sm leading-6 text-white/42">
              Mesajı doğru yanıta ve satış aksiyonuna bağlar.
            </p>
          </div>

          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-sm font-bold text-black">
            {getInitials(activeConversation.customerName)}
          </div>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto p-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <section className="mb-4 rounded-[1.45rem] border border-white/10 bg-white/[0.035] p-4">
          <div className="mb-4 flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="truncate text-base font-semibold text-white">
                {activeConversation.customerName}
              </p>

              <p className="mt-1 text-xs text-white/38">
                {activeConversation.customerTypeLabel}
              </p>
            </div>

            <span className="shrink-0 rounded-full bg-white px-2.5 py-1 text-[10px] font-semibold text-black">
              {activeConversation.aiScore} skor
            </span>
          </div>

          <div className="grid gap-2">
            <div className="rounded-2xl border border-white/10 bg-black/40 px-3 py-2.5">
              <p className="text-[10px] uppercase tracking-[0.18em] text-white/30">
                Telefon
              </p>
              <p className="mt-1 truncate text-xs font-semibold text-white/75">
                {activeConversation.phone}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/40 px-3 py-2.5">
              <p className="text-[10px] uppercase tracking-[0.18em] text-white/30">
                Kaynak
              </p>
              <p className="mt-1 truncate text-xs font-semibold text-white/75">
                {activeConversation.sourceLabel}
              </p>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            <span
              className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                inboxTemperatureStyles[activeConversation.temperature]
              }`}
            >
              {inboxTemperatureLabels[activeConversation.temperature]}
            </span>

            <span
              className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                inboxPriorityStyles[activeConversation.priority]
              }`}
            >
              {inboxPriorityLabels[activeConversation.priority]}
            </span>

            <span
              className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                inboxSentimentStyles[activeConversation.sentiment]
              }`}
            >
              {inboxSentimentLabels[activeConversation.sentiment]}
            </span>
          </div>
        </section>

        <section className="mb-4 rounded-[1.45rem] border border-white/10 bg-white/[0.035] p-4">
          <div className="mb-3 flex items-start gap-3">
            <div className="rounded-2xl border border-white/10 bg-black/45 p-3">
              <HiOutlineShieldCheck className="h-5 w-5 text-white" />
            </div>

            <div>
              <p className="text-sm font-semibold text-white">
                Sıradaki En Doğru Aksiyon
              </p>
              <p className="mt-1 text-xs text-white/35">
                AI + No Lost Lead değerlendirmesi
              </p>
            </div>
          </div>

          <p className="text-sm leading-6 text-white/52">
            {activeConversation.nextAction}
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            {activeConversation.hasBatteryInterest ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-black">
                <HiOutlineSparkles className="h-3.5 w-3.5" />
                Batarya ilgisi
              </span>
            ) : null}

            {activeConversation.hasMissingInfo ? (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/45 px-3 py-1.5 text-xs font-semibold text-white/60">
                <HiOutlineExclamationTriangle className="h-3.5 w-3.5" />
                Eksik bilgi
              </span>
            ) : null}

            {activeConversation.isLeadCandidate ? (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/45 px-3 py-1.5 text-xs font-semibold text-white/60">
                <HiOutlineArrowTrendingUp className="h-3.5 w-3.5" />
                Lead adayı
              </span>
            ) : null}
          </div>
        </section>

        {bestReply ? (
          <section className="mb-4 rounded-[1.5rem] border border-white/20 bg-white p-4 text-black shadow-2xl shadow-white/10">
            <div className="mb-3 flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-black px-3 py-1.5">
                  <HiOutlineChatBubbleLeftRight className="h-4 w-4 text-white" />
                  <span className="text-xs font-semibold text-white">
                    En iyi AI yanıtı
                  </span>
                </div>

                <p className="text-sm font-semibold text-black">
                  {bestReply.title}
                </p>

                <p className="mt-1 text-xs text-black/48">
                  {bestReply.toneLabel}
                </p>
              </div>

              <span className="shrink-0 rounded-full bg-black px-2.5 py-1 text-[10px] font-semibold text-white">
                {bestReply.confidenceLabel}
              </span>
            </div>

            <p className="line-clamp-6 text-sm leading-7 text-black/70">
              {bestReply.message}
            </p>

            <div className="mt-4 rounded-2xl bg-black/5 p-3">
              <p className="line-clamp-3 text-xs leading-5 text-black/55">
                {bestReply.reason}
              </p>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              <button className="inline-flex items-center justify-center gap-2 rounded-full bg-black px-3 py-2.5 text-xs font-semibold text-white transition hover:bg-black/85">
                <HiOutlineChatBubbleLeftRight className="h-3.5 w-3.5" />
                Kullan
              </button>

              <button className="inline-flex items-center justify-center gap-2 rounded-full border border-black/10 bg-black/5 px-3 py-2.5 text-xs font-semibold text-black/65 transition hover:bg-black/10">
                <HiOutlineDocumentText className="h-3.5 w-3.5" />
                Düzenle
              </button>
            </div>
          </section>
        ) : null}

        {alternativeReply ? (
          <section className="mb-4 rounded-[1.45rem] border border-white/10 bg-white/[0.035] p-4">
            <div className="mb-2 flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-white">
                Alternatif Yanıt
              </p>

              <span className="rounded-full border border-white/10 bg-black/45 px-2.5 py-1 text-[10px] font-semibold text-white/50">
                {alternativeReply.confidenceLabel}
              </span>
            </div>

            <p className="text-xs text-white/38">
              {alternativeReply.toneLabel}
            </p>

            <p className="mt-3 line-clamp-4 text-sm leading-6 text-white/52">
              {alternativeReply.message}
            </p>

            <button className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-black/45 px-4 py-2.5 text-xs font-semibold text-white/65 transition hover:bg-white/[0.06] hover:text-white">
              <HiOutlineChatBubbleLeftRight className="h-3.5 w-3.5" />
              Alternatifi Kullan
            </button>
          </section>
        ) : null}

        <section className="mb-4 rounded-[1.45rem] border border-white/10 bg-white/[0.035] p-4">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/45 px-3 py-1.5">
            <HiOutlineArrowTrendingUp className="h-4 w-4 text-white/70" />
            <span className="text-xs font-medium text-white/55">
              Aksiyon Merkezi
            </span>
          </div>

          <div className="grid gap-2">
            {primaryActions.map((action) => {
              const Icon = actionIcons[action.type] ?? HiOutlineCheckCircle;

              return (
                <button
                  key={action.id}
                  className="inline-flex w-full items-center justify-between gap-3 rounded-full bg-white px-4 py-3 text-sm font-semibold text-black transition hover:bg-white/85"
                >
                  <span className="inline-flex min-w-0 items-center gap-2">
                    <Icon className="h-4 w-4 shrink-0" />
                    <span className="truncate">{action.label}</span>
                  </span>

                  <HiOutlineArrowTrendingUp className="h-4 w-4 shrink-0" />
                </button>
              );
            })}
          </div>

          <div className="mt-3 grid gap-2">
            {secondaryActions.slice(0, 3).map((action) => {
              const Icon = actionIcons[action.type] ?? HiOutlineCheckCircle;

              return (
                <button
                  key={action.id}
                  className="group flex items-start gap-3 rounded-2xl border border-white/10 bg-black/40 p-3 text-left transition hover:border-white/20 hover:bg-white/[0.05]"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white/65 transition group-hover:text-white">
                    <Icon className="h-4 w-4" />
                  </span>

                  <span className="min-w-0">
                    <span className="block truncate text-sm font-semibold text-white">
                      {action.label}
                    </span>

                    <span className="mt-1 line-clamp-2 block text-xs leading-5 text-white/42">
                      {action.description}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        <section className="rounded-[1.45rem] border border-white/10 bg-white/[0.035] p-4">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/45 px-3 py-1.5">
            <HiOutlineClock className="h-4 w-4 text-white/70" />
            <span className="text-xs font-medium text-white/55">
              Son Temaslar
            </span>
          </div>

          <div className="space-y-2.5">
            {latestMessages.map((message) => (
              <div
                key={message.id}
                className="rounded-2xl border border-white/10 bg-black/40 p-3"
              >
                <div className="mb-2 flex items-center justify-between gap-2">
                  <p className="truncate text-xs font-semibold text-white/70">
                    {message.senderName}
                  </p>

                  <span className="shrink-0 text-[11px] text-white/35">
                    {message.timeLabel}
                  </span>
                </div>

                <p className="line-clamp-2 text-xs leading-5 text-white/42">
                  {message.content}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="shrink-0 border-t border-white/10 bg-black/55 p-4">
        <div className="rounded-[1.35rem] border border-white/10 bg-white/[0.035] p-4">
          <div className="mb-3 flex items-start gap-3">
            <div className="rounded-2xl border border-white/10 bg-black/45 p-3">
              <HiOutlineBellAlert className="h-5 w-5 text-white" />
            </div>

            <div>
              <p className="text-sm font-semibold text-white">
                No Lost Lead Uyarısı
              </p>

              <p className="mt-1 text-xs leading-5 text-white/42">
                Bu görüşme sıcak, yanıt bekliyor ve satış aksiyonuna dönüşebilir.
                Gecikirse fırsat kaybı oluşabilir.
              </p>
            </div>
          </div>

          <button className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/85">
            <HiOutlineShieldCheck className="h-4 w-4" />
            İnsan Kontrolüne Al
          </button>
        </div>
      </div>
    </aside>
  );
}
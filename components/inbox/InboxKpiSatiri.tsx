import type { IconType } from "react-icons";
import {
  HiOutlineChatBubbleLeftRight,
  HiOutlineExclamationTriangle,
  HiOutlineFire,
  HiOutlineInboxStack,
} from "react-icons/hi2";

import { inboxKpis } from "../../data/inbox";

const kpiIcons: Record<string, IconType> = {
  "total-messages": HiOutlineInboxStack,
  "unread-messages": HiOutlineExclamationTriangle,
  "hot-requests": HiOutlineFire,
  "lead-candidates": HiOutlineChatBubbleLeftRight,
};

const kpiBadges: Record<string, string> = {
  "total-messages": "Bugün",
  "unread-messages": "Yanıt bekliyor",
  "hot-requests": "Öncelikli",
  "lead-candidates": "Satış fırsatı",
};

export function InboxKpiSatiri() {
  return (
    <section className="mb-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {inboxKpis.map((kpi) => {
        const Icon = kpiIcons[kpi.id] ?? HiOutlineInboxStack;
        const badge = kpiBadges[kpi.id] ?? "Durum";
        const isCritical =
          kpi.id === "unread-messages" || kpi.id === "hot-requests";

        return (
          <article
            key={kpi.id}
            className="group rounded-3xl border border-white/10 bg-white/[0.035] p-5 shadow-2xl shadow-black/20 transition hover:border-white/20 hover:bg-white/[0.055]"
          >
            <div className="mb-5 flex items-center justify-between">
              <div className="rounded-2xl border border-white/10 bg-black/50 p-3">
                <Icon className="h-5 w-5 text-white" />
              </div>

              <span
                className={`rounded-full px-3 py-1 text-[11px] font-semibold ${
                  isCritical
                    ? "bg-white text-black"
                    : "border border-white/10 bg-black/40 text-white/50"
                }`}
              >
                {badge}
              </span>
            </div>

            <p className="text-sm text-white/50">{kpi.label}</p>

            <p className="mt-2 text-4xl font-semibold tracking-tight text-white">
              {kpi.value}
            </p>

            <p className="mt-3 text-xs leading-5 text-white/45">
              {kpi.description}
            </p>
          </article>
        );
      })}
    </section>
  );
}
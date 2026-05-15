import type { IconType } from "react-icons";
import {
  HiOutlineDocumentText,
  HiOutlineExclamationTriangle,
  HiOutlineFire,
  HiOutlineInboxStack,
} from "react-icons/hi2";

import { talepStats } from "../../data/talep-havuzu";

const statIcons: Record<string, IconType> = {
  "total-requests": HiOutlineInboxStack,
  "very-hot": HiOutlineFire,
  "offer-waiting": HiOutlineDocumentText,
  "missing-info": HiOutlineExclamationTriangle,
};

export function TalepStats() {
  return (
    <section className="mb-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {talepStats.map((stat) => {
        const Icon = statIcons[stat.id] ?? HiOutlineInboxStack;

        return (
          <article
            key={stat.id}
            className="group rounded-3xl border border-white/10 bg-white/[0.035] p-5 shadow-2xl shadow-black/20 transition hover:border-white/20 hover:bg-white/[0.055]"
          >
            <div className="mb-5 flex items-center justify-between">
              <div className="rounded-2xl border border-white/10 bg-black/50 p-3">
                <Icon className="h-5 w-5 text-white" />
              </div>

              <span className="rounded-full border border-white/10 bg-black/40 px-3 py-1 text-[11px] font-medium text-white/50">
                Canlı
              </span>
            </div>

            <p className="text-sm text-white/50">{stat.label}</p>

            <p className="mt-2 text-4xl font-semibold tracking-tight text-white">
              {stat.value}
            </p>

            <p className="mt-3 text-xs leading-5 text-white/45">
              {stat.description}
            </p>
          </article>
        );
      })}
    </section>
  );
}
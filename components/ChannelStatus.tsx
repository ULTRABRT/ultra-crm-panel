import type { IconType } from "react-icons";
import {
  FaComments,
  FaEnvelope,
  FaFacebookMessenger,
  FaInstagram,
  FaTelegramPlane,
  FaTiktok,
  FaWhatsapp,
  FaWpforms,
} from "react-icons/fa";
import { MdSms } from "react-icons/md";
import { channels, statusStyles } from "../data/dashboard";
import { PanelCard } from "./PanelCard";

const iconMap: Record<(typeof channels)[number]["icon"], IconType> = {
  mail: FaEnvelope,
  instagram: FaInstagram,
  whatsapp: FaWhatsapp,
  messenger: FaFacebookMessenger,
  tiktok: FaTiktok,
  sms: MdSms,
  telegram: FaTelegramPlane,
  webchat: FaComments,
  forms: FaWpforms,
};

export function ChannelStatus() {
  return (
    <PanelCard className="p-6">
      <div className="mb-5">
        <p className="text-sm text-white/40">Kanal Yönetimi</p>
        <h3 className="mt-1 text-2xl font-semibold">Kanal Durumu</h3>
      </div>

      <div className="grid gap-3">
        {channels.map((channel) => {
          const Icon = iconMap[channel.icon];

          return (
            <div
              key={channel.name}
              className="group flex items-center justify-between gap-4 rounded-3xl border border-white/10 bg-black/45 p-4 transition hover:border-white/20 hover:bg-white/[0.06]"
            >
              <div className="flex min-w-0 items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] transition group-hover:bg-white/[0.1]">
                  <Icon className="text-xl text-white" />
                </div>

                <div className="min-w-0">
                  <p className="font-medium">{channel.name}</p>
                  <p className="mt-1 text-sm text-white/45">
                    {channel.detail}
                  </p>
                </div>
              </div>

              <span
                className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[channel.tone]}`}
              >
                {channel.status}
              </span>
            </div>
          );
        })}
      </div>
    </PanelCard>
  );
}
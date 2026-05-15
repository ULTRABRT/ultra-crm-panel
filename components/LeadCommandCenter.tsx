import type { IconType } from "react-icons";
import {
  FiAlertTriangle,
  FiCheckCircle,
  FiClock,
  FiMessageCircle,
  FiUserCheck,
  FiZap,
} from "react-icons/fi";

type QueueItem = {
  title: string;
  count: string;
  description: string;
  status: string;
  icon: IconType;
};

const queueItems: QueueItem[] = [
  {
    title: "Yeni Talepler",
    count: "24",
    description: "Kanallardan yeni gelen müşteri talepleri",
    status: "İşleniyor",
    icon: FiMessageCircle,
  },
  {
    title: "Çok Sıcak",
    count: "32",
    description: "Öncelikli dönüş bekleyen yüksek potansiyelli talepler",
    status: "Öncelik",
    icon: FiZap,
  },
  {
    title: "Eksik Bilgi",
    count: "9",
    description: "Teklif için ek bilgi bekleyen kayıtlar",
    status: "Kontrol",
    icon: FiAlertTriangle,
  },
  {
    title: "Teklif Bekliyor",
    count: "14",
    description: "Satış ekibi tarafından hazırlanacak teklifler",
    status: "Hazırlanacak",
    icon: FiClock,
  },
  {
    title: "Yanıtlanan",
    count: "186",
    description: "Sistem tarafından güvenli şekilde yanıtlanan talepler",
    status: "Tamamlandı",
    icon: FiCheckCircle,
  },
  {
    title: "İnsan Kontrolü",
    count: "9",
    description: "Onay veya hassas değerlendirme gerektiren kayıtlar",
    status: "Onay",
    icon: FiUserCheck,
  },
];

export function LeadCommandCenter() {
  return (
    <section className="rounded-[2rem] border border-white/10 bg-black/45 p-6 shadow-2xl shadow-black/40">
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm text-white/40">Talep Operasyon Merkezi</p>
          <h2 className="mt-1 text-3xl font-semibold tracking-tight">
            Akıllı Talep Komuta Merkezi
          </h2>
        </div>

        <div className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/60">
          Canlı önceliklendirme
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {queueItems.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="group rounded-3xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-white/25 hover:bg-white/[0.06]"
            >
              <div className="mb-5 flex items-center justify-between gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06]">
                  <Icon className="h-5 w-5 text-white" />
                </div>

                <span className="rounded-full border border-white/10 bg-black px-3 py-1 text-xs font-semibold text-white/60">
                  {item.status}
                </span>
              </div>

              <p className="text-sm text-white/45">{item.title}</p>

              <div className="mt-2 flex items-end justify-between gap-4">
                <p className="text-4xl font-semibold">{item.count}</p>
                <div className="h-1.5 w-20 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-2/3 rounded-full bg-white" />
                </div>
              </div>

              <p className="mt-4 text-sm leading-6 text-white/50">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-5 rounded-3xl border border-white/10 bg-white/[0.03] p-5">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="text-sm text-white/40">Sistem Önerisi</p>
            <h3 className="mt-1 text-xl font-semibold">
              Önce çok sıcak talepler kapatılmalı.
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-white/50">
              Sistem, satış ihtimali yüksek talepleri öne çıkarır. Düşük kaliteli
              bildirimler arka plana alınır, hassas kayıtlar ise insan kontrolüne
              yönlendirilir.
            </p>
          </div>

          <button className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/90">
            Öncelikli Listeyi Aç
          </button>
        </div>
      </div>
    </section>
  );
}
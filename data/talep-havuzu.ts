import type {
  EnerjiDnaMetric,
  KaynakPerformansi,
  KritikAksiyon,
  SistemSagligi,
  TalepFunnelStep,
  TalepItem,
  TalepStat,
} from "../types/talep-havuzu";

export const talepStats: TalepStat[] = [
  {
    id: "total-requests",
    label: "Toplam Talep",
    value: "248",
    description: "Bugün yerel görünümde okunan kayıt",
  },
  {
    id: "very-hot",
    label: "Çok Sıcak",
    value: "32",
    description: "2 saat içinde inceleme önerisi",
  },
  {
    id: "offer-waiting",
    label: "Teklif Bekleyen",
    value: "14",
    description: "Satış incelemesine not düşülmeli",
  },
  {
    id: "missing-info",
    label: "Eksik Bilgi",
    value: "9",
    description: "Keşif / iletişim bilgisi gerekli",
  },
];

export const talepListesi: TalepItem[] = [
  {
    id: "req-001",
    customerName: "Mehmet Akgün",
    source: "instagram",
    sourceLabel: "Instagram",
    requestTitle: "Güneş paneli + lityum batarya",
    requestDetail:
      "Aylık elektrik faturası yüksek. Batarya dahil sistem için hızlı fiyat istiyor.",
    temperature: "veryHot",
    statusLabel: "Teklif taslağı incelenmeli",
    timeLabel: "12 dk önce",
    ownerLabel: "Satış Ekibi",
    aiScore: 94,
    priority: "critical",
    nextAction:
      "Bugün inceleme notu öncelikli; batarya ihtiyacı teklif taslağında görünür kalmalı.",
  },
  {
    id: "req-002",
    customerName: "Ayşe Demir",
    source: "mail",
    sourceLabel: "Mail",
    requestTitle: "Elektrik faturası düşürme",
    requestDetail:
      "Müstakil ev için tasarruf ve amortisman süresi hakkında bilgi istedi.",
    temperature: "hot",
    statusLabel: "Keşif bilgisi inceleme notu",
    timeLabel: "28 dk önce",
    ownerLabel: "Keşif Ekibi",
    aiScore: 82,
    priority: "high",
    nextAction:
      "Çatı tipi, aylık fatura ve lokasyon bilgisi inceleme notunda eksik görünüyor.",
  },
  {
    id: "req-003",
    customerName: "Karaqaş Metal",
    source: "forms",
    sourceLabel: "Formlar",
    requestTitle: "Üretim / sanayi talebi",
    requestDetail:
      "İşletme çatısı için proje bazlı GES kurulumu hakkında ön görüşme istiyor.",
    temperature: "warm",
    statusLabel: "Eksik bilgi inceleme notu",
    timeLabel: "1 sa önce",
    ownerLabel: "Proje Ekibi",
    aiScore: 68,
    priority: "medium",
    nextAction:
      "İşletme tüketimi, çatı alanı ve proje lokasyonu netleşmesi beklenen yerel not.",
  },
  {
    id: "req-004",
    customerName: "Sistem Bildirimi",
    source: "webChat",
    sourceLabel: "Web Sohbet",
    requestTitle: "Alakasız bildirim",
    requestDetail:
      "Satış fırsatı üretmeyen düşük kalite temas olarak yerel notta görünür.",
    temperature: "cold",
    statusLabel: "Yok sayıldı",
    timeLabel: "2 sa önce",
    ownerLabel: "İnceleme notu",
    aiScore: 21,
    priority: "low",
    nextAction:
      "İnceleme gerekmiyor. Kaynak kalite notunda düşük öncelik olarak görünür.",
  },
];

export const talepHunisi: TalepFunnelStep[] = [
  {
    id: "funnel-new",
    label: "Yeni Gelen",
    value: "24",
    description: "İlk ayrıştırma bekliyor",
    stage: "new",
    progress: 76,
  },
  {
    id: "funnel-temperature",
    label: "Sıcaklık Ölçümü",
    value: "32",
    description: "AI önerisi",
    stage: "temperatureCheck",
    progress: 88,
  },
  {
    id: "funnel-offer",
    label: "Teklif Aşaması",
    value: "14",
    description: "Satış incelemesine not düşülmeli",
    stage: "offerStage",
    progress: 54,
  },
  {
    id: "funnel-human-review",
    label: "İnsan Kontrolü",
    value: "9",
    description: "Eksik bilgi var",
    stage: "humanReview",
    progress: 36,
  },
];

export const kritikAksiyonlar: KritikAksiyon[] = [
  {
    id: "action-call-hot-leads",
    title: "Çok sıcak talepler bugün incelenmeli",
    description:
      "2 saatten fazla bekleyen sıcak talep satış inceleme notunda öncelikli görünmeli.",
    impactLabel: "Ciro risk sinyali",
    priority: "critical",
  },
  {
    id: "action-complete-missing-info",
    title: "Eksik bilgi bekleyen kayıtlar incelenmeli",
    description:
      "Çatı tipi, lokasyon, fatura ve telefon bilgisi eksik olan kayıtlar yerel inceleme notunda öncelikli görünür.",
    impactLabel: "Teklif akışı riski",
    priority: "high",
  },
  {
    id: "action-transfer-offer-stage",
    title: "Teklif aşamasındaki müşteriler incelenmeli",
    description:
      "Teklif isteyen ve sahiplik notu eksik talepler satış inceleme görünümünde kalmalı.",
    impactLabel: "No Lost Lead uyarısı",
    priority: "high",
  },
];

export const kaynakPerformansi: KaynakPerformansi[] = [
  {
    id: "source-instagram",
    source: "instagram",
    sourceLabel: "Instagram",
    score: 92,
    description: "Lead hacmi güçlü",
  },
  {
    id: "source-mail",
    source: "mail",
    sourceLabel: "Mail",
    score: 81,
    description: "Satış kalitesi yüksek",
  },
  {
    id: "source-forms",
    source: "forms",
    sourceLabel: "Formlar",
    score: 74,
    description: "Proje bazlı talep",
  },
];

export const enerjiDnaMetrikleri: EnerjiDnaMetric[] = [
  {
    id: "battery-interest",
    label: "Batarya İlgisi",
    value: "18",
    description: "Teklif taslağında görünür kalması gereken kayıtlar.",
  },
  {
    id: "high-bill",
    label: "Yüksek Fatura",
    value: "41",
    description: "Tasarruf ve amortisman sorusu olan talepler.",
  },
  {
    id: "discovery-waiting",
    label: "Keşif Bekleyen",
    value: "11",
    description: "Çatı / lokasyon bilgisi inceleme notunda eksik.",
  },
];

export const sistemSagligi: SistemSagligi[] = [
  {
    id: "channel-instagram",
    channelLabel: "Instagram",
    statusLabel: "Readonly",
    status: "active",
  },
  {
    id: "channel-mail",
    channelLabel: "Mail",
    statusLabel: "İzleniyor",
    status: "monitoring",
  },
  {
    id: "channel-web-chat",
    channelLabel: "Web Sohbet",
    statusLabel: "Temiz",
    status: "clean",
  },
];

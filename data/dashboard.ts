export const menuItems = [
  "Kontrol Merkezi",
  "Talep Havuzu",
  "Birleşik Gelen Kutusu",
  "Teklifler",
  "Müşteri Kartları",
  "Kanal Yönetimi",
  "Akıllı Yanıt Ayarları",
  "Sektör Modülleri",
];

export const stats = [
  {
    label: "Açık Fırsat",
    value: "₺701K",
    note: "bugün takipte olan hacim",
  },
  {
    label: "Sıcak Talep",
    value: "32",
    note: "öncelikli müşteri bekliyor",
  },
  {
    label: "İnsan Onayı",
    value: "9",
    note: "hassas karar masasında",
  },
  {
    label: "Geciken Takip",
    value: "4",
    note: "para kaçırma riski",
  },
];

export const requests = [
  {
    customer: "Mehmet Akgün",
    request: "Güneş paneli + lityum batarya",
    temperature: "Çok sıcak",
    action: "Teklif hazırlanmalı",
  },
  {
    customer: "Ayşe Demir",
    request: "Elektrik faturası düşürme",
    temperature: "Sıcak",
    action: "Keşif bilgisi istenmeli",
  },
  {
    customer: "Karakaş Metal",
    request: "Üretim / sanayi talebi",
    temperature: "Ilık",
    action: "Eksik bilgi tamamlanmalı",
  },
  {
    customer: "Sistem Bildirimi",
    request: "Alakasız bildirim",
    temperature: "Soğuk",
    action: "Yok sayıldı",
  },
];

export const channels = [
  {
    name: "Mail",
    status: "Aktif",
    detail: "E-posta talepleri",
    icon: "mail",
    tone: "active",
  },
  {
    name: "Instagram",
    status: "Aktif",
    detail: "DM, yorum ve reklam dönüşleri",
    icon: "instagram",
    tone: "active",
  },
  {
    name: "WhatsApp",
    status: "Hazırlanıyor",
    detail: "Mesaj ve hızlı dönüş süreci",
    icon: "whatsapp",
    tone: "preparing",
  },
  {
    name: "Messenger",
    status: "Planlandı",
    detail: "Sosyal mesajlaşma kanalı",
    icon: "messenger",
    tone: "planned",
  },
  {
    name: "TikTok",
    status: "Planlandı",
    detail: "Mesaj ve etkileşim talepleri",
    icon: "tiktok",
    tone: "planned",
  },
  {
    name: "SMS",
    status: "Planlandı",
    detail: "Bildirim ve takip mesajları",
    icon: "sms",
    tone: "planned",
  },
  {
    name: "Telegram",
    status: "Planlandı",
    detail: "Alternatif mesajlaşma kanalı",
    icon: "telegram",
    tone: "planned",
  },
  {
    name: "Web Sohbet",
    status: "Planlandı",
    detail: "Site üzerinden gelen görüşmeler",
    icon: "webchat",
    tone: "planned",
  },
  {
    name: "Formlar",
    status: "Aktif",
    detail: "Manuel ve hızlı talep formları",
    icon: "forms",
    tone: "active",
  },
] as const;

export const executiveNotes = [
  {
    title: "Kayıp talep riski",
    description:
      "3 sıcak müşteri iki saati aştı; bugün aranmazsa teklif masası soğuyabilir.",
  },
  {
    title: "Takip gecikmesi",
    description:
      "4 takip satış ekibine atanmadı; açık fırsat hacminde ₺186K risk görünüyor.",
  },
  {
    title: "Teklif fırsatı",
    description:
      "Batarya ilgisi yükseldi; 6 kayıt aynı gün teklif akışına alınmalı.",
  },
  {
    title: "İnsan kontrolü",
    description:
      "9 hassas kayıt otomasyon yerine yönetici onayı bekliyor.",
  },
];

export const statusStyles = {
  active: "bg-white text-black",
  preparing: "border border-white/20 bg-white/10 text-white",
  planned: "border border-white/10 bg-black text-white/60",
};

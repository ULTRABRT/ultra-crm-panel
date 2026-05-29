export const menuItems = [
  "Kontrol Merkezi",
  "Talep Havuzu",
  "Birleşik Gelen Kutusu",
  "Teklifler",
  "Müşteri Kartları",
  "Kanal Yönetimi",
  "Akıllı Yanıt Ayarları",
  "Sektörel DNA",
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

export const noLostLeadAlerts = [
  {
    customer: "Mehmet Akgün",
    issue: "Teklif istendi ama hazırlık başlamadı",
    heat: "Çok sıcak",
    wait: "2 sa 18 dk",
    owner: "Satış Ekibi",
    action: "Bugün incelenmeli",
    href: "/leadler",
  },
  {
    customer: "Karaqaş Metal",
    issue: "Eksik bilgi nedeniyle teklif bekliyor",
    heat: "Ilık",
    wait: "5 sa 40 dk",
    owner: "Operasyon",
    action: "Bilgi inceleme notu",
    href: "/talep-havuzu",
  },
  {
    customer: "Ayşe Demir",
    issue: "Keşif bilgisi netleşmedi",
    heat: "Sıcak",
    wait: "1 sa 12 dk",
    owner: "Satış Ekibi",
    action: "Keşif tarihi incelenmeli",
    href: "/leadler",
  },
] as const;

export const requests = [
  {
    customer: "Mehmet Akgün",
    request: "Güneş paneli + lityum batarya",
    temperature: "Çok sıcak",
    action: "Teklif hazırlık notu",
  },
  {
    customer: "Ayşe Demir",
    request: "Elektrik faturası düşürme",
    temperature: "Sıcak",
    action: "Keşif bilgi notu",
  },
  {
    customer: "Karakaş Metal",
    request: "Üretim / sanayi talebi",
    temperature: "Ilık",
    action: "Eksik bilgi notu",
  },
  {
    customer: "Sistem Bildirimi",
    request: "Alakasız bildirim",
    temperature: "Soğuk",
    action: "Düşük öncelik notu",
  },
];

export const channels = [
  {
    name: "Mail",
    status: "İzlenen",
    detail: "E-posta talepleri",
    icon: "mail",
    tone: "active",
  },
  {
    name: "Instagram",
    status: "İzlenen",
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
    status: "İzlenen",
    detail: "Manuel ve hızlı talep formları",
    icon: "forms",
    tone: "active",
  },
] as const;

export const executiveNotes = [
  {
    title: "Kayıp talep riski",
    description:
      "3 sıcak müşteri iki saati aştı; bugün incelenmezse teklif masası soğuyabilir.",
  },
  {
    title: "Takip gecikmesi",
    description:
      "4 takip yerel inceleme notunda bekliyor; açık fırsat hacminde ₺186K risk sinyali görünüyor.",
  },
  {
    title: "Teklif fırsatı",
    description:
      "Batarya ilgisi yükseldi; 6 kayıt aynı gün teklif hazırlık notunda incelenmeli.",
  },
  {
    title: "İnsan kontrolü",
    description:
      "9 hassas kayıt yerel inceleme notunda yönetici onayı bekliyor.",
  },
];

export const statusStyles = {
  active: "bg-white text-black",
  preparing: "border border-white/20 bg-white/10 text-white",
  planned: "border border-white/10 bg-black text-white/60",
};

import type { SmartReplyPolicyRecord } from "../types/smartReplySettings";

export const smartReplyPolicyRecords: SmartReplyPolicyRecord[] = [
  {
    id: "reply-whatsapp-sales-review",
    name: "WhatsApp sıcak talep tonu",
    channel: "whatsapp",
    toneProfile: "consultative",
    approvalMode: "always_review",
    riskLevel: "medium",
    allowedAction:
      "Taslak cevap önerisi üretir; fiyat ve kapasite dili insan kontrolünden geçer.",
    blockedAction:
      "Müşteriye otomatik iletim, indirim taahhüdü ve sözleşme onayı kapalıdır.",
    owner: "Satış Ekibi",
    lastUpdatedAt: "Bugün 10:40",
    status: "active",
    safetyBadge: "İnsan onayı zorunlu",
    examplePrompt:
      "Müşteri çatı GES ve batarya için hızlı bilgi istiyor; teknik bilgi eksik.",
    exampleReply:
      "Talebinizi aldık. Doğru paket için çatı alanı, aylık tüketim ve batarya beklentinizi netleştirelim; ardından size sade bir ön teklif hazırlayalım.",
    forbiddenTopics: ["Kesin tasarruf garantisi", "Anında fiyat taahhüdü"],
    automationBoundary:
      "Öneri üretir, otomatik iletim yapmaz. Satış temsilcisi metni onaylamadan akış ilerlemez.",
    timeline: [
      {
        id: "reply-whatsapp-sales-review-a",
        label: "Ton güncellemesi",
        note: "Cevap dili teknik detaydan önce ihtiyaç netleştirmeye alındı.",
        atLabel: "Bugün",
      },
      {
        id: "reply-whatsapp-sales-review-b",
        label: "Güvenlik notu",
        note: "Fiyat ve garanti ifadeleri insan onayına bağlandı.",
        atLabel: "Dün",
      },
    ],
  },
  {
    id: "reply-instagram-soft-intake",
    name: "Instagram ilk temas filtresi",
    channel: "instagram",
    toneProfile: "warm",
    approvalMode: "review_sensitive",
    riskLevel: "low",
    allowedAction:
      "Kısa karşılama, ihtiyaç sorusu ve lead bilgisi tamamlama önerisi sunar.",
    blockedAction:
      "Kampanya, indirim veya teknik uygunluk iddiası otomatik akışa alınmaz.",
    owner: "Pazarlama",
    lastUpdatedAt: "Dün 16:15",
    status: "active",
    safetyBadge: "Hassas içerik incelemede",
    examplePrompt:
      "Instagram DM üzerinden konut tipi panel ilgisi var; müşteri sadece genel fiyat soruyor.",
    exampleReply:
      "Merhaba, size doğru aralık verebilmemiz için konut tipi, aylık tüketim ve çatı bilgisi önemli. İsterseniz kısa bilgileri alıp uygun seçenekleri sadece özetleyelim.",
    forbiddenTopics: ["Rakip marka yorumu", "Kesin kurulum tarihi"],
    automationBoundary:
      "Sadece öneri taslağı gösterir; DM yanıtı ekip onayı olmadan ilerlemez.",
    timeline: [
      {
        id: "reply-instagram-soft-intake-a",
        label: "DM kalitesi",
        note: "Cevaplar daha kısa ve bilgi tamamlayıcı hale getirildi.",
        atLabel: "Dün",
      },
      {
        id: "reply-instagram-soft-intake-b",
        label: "Risk kontrolü",
        note: "Kampanya dili otomatik öneriden çıkarıldı.",
        atLabel: "3 gün önce",
      },
    ],
  },
  {
    id: "reply-messenger-aged-leads",
    name: "Messenger geciken yanıt kuralı",
    channel: "messenger",
    toneProfile: "concise",
    approvalMode: "draft_only",
    riskLevel: "high",
    allowedAction:
      "Geciken talepler için kısa özür ve manuel takip taslağı önerir.",
    blockedAction:
      "Kanal üzerinden otomatik kapanış, fiyat cevabı veya taahhüt üretmez.",
    owner: "Müşteri Başarı",
    lastUpdatedAt: "2 gün önce",
    status: "watch",
    safetyBadge: "Taslak modunda",
    examplePrompt:
      "Müşteri iki gündür cevap bekliyor; karar verici ve tüketim bilgisi eksik.",
    exampleReply:
      "Gecikme için kusura bakmayın. Talebinizi doğru değerlendirmek için tüketim ve lokasyon bilgisini netleştirip sizi uzman arkadaşımıza aktaralım.",
    forbiddenTopics: ["Süre garantisi", "Otomatik kapanış mesajı"],
    automationBoundary:
      "Taslak üretir. Takip aksiyonu ve müşteri iletisi manuel ekip kontrolündedir.",
    timeline: [
      {
        id: "reply-messenger-aged-leads-a",
        label: "Bekleyen talep",
        note: "Gecikme dilinde özür ve net sonraki adım zorunlu hale getirildi.",
        atLabel: "2 gün önce",
      },
      {
        id: "reply-messenger-aged-leads-b",
        label: "Kısıt",
        note: "Fiyat ve kapanış ifadeleri bu kuraldan çıkarıldı.",
        atLabel: "4 gün önce",
      },
    ],
  },
  {
    id: "reply-web-form-commercial",
    name: "Web Form kurumsal ön değerlendirme",
    channel: "web_form",
    toneProfile: "technical",
    approvalMode: "always_review",
    riskLevel: "medium",
    allowedAction:
      "Form verisine göre eksik teknik alanları ve toplantı önerisini hazırlar.",
    blockedAction:
      "Fizibilite onayı, resmi teklif dili veya proje uygunluğu ilanı yapmaz.",
    owner: "Kurumsal Satış",
    lastUpdatedAt: "Bugün 09:20",
    status: "active",
    safetyBadge: "Teknik onay bekler",
    examplePrompt:
      "Kurumsal formda tüketim, trafo ve çatı alanı dolu; müşteri toplantı talep ediyor.",
    exampleReply:
      "Bilgileriniz ön değerlendirme için yeterli görünüyor. Teknik ekibimizin tüketim ve saha notlarını kontrol etmesi sonrası size toplantı için en uygun iki zaman aralığını önerebiliriz.",
    forbiddenTopics: ["Proje onayı", "Yasal uygunluk beyanı"],
    automationBoundary:
      "Teknik ekip kontrolü olmadan resmi teklif veya uygunluk iddiası oluşturmaz.",
    timeline: [
      {
        id: "reply-web-form-commercial-a",
        label: "Form bağlamı",
        note: "Eksik alan kontrolü kuralın ilk adımı yapıldı.",
        atLabel: "Bugün",
      },
      {
        id: "reply-web-form-commercial-b",
        label: "Onay sınırı",
        note: "Resmi teklif dili insan onayına bağlandı.",
        atLabel: "5 gün önce",
      },
    ],
  },
  {
    id: "reply-phone-note-summary",
    name: "Telefon notu özet önerisi",
    channel: "phone",
    toneProfile: "professional",
    approvalMode: "review_sensitive",
    riskLevel: "low",
    allowedAction:
      "Telefon notunu müşteri kartı için sade özet ve sonraki adım haline getirir.",
    blockedAction:
      "Müşteri adına karar, teklif onayı veya çağrı sonucu kapatma yapmaz.",
    owner: "Operasyon",
    lastUpdatedAt: "Bugün 12:00",
    status: "active",
    safetyBadge: "Özet önerisi",
    examplePrompt:
      "Telefonda müşteri aylık fatura ve çatı alanını paylaştı; temsilci kısa not girdi.",
    exampleReply:
      "Müşteri çatı GES için ilk değerlendirme istedi. Aylık tüketim ve çatı alanı not edildi; sonraki adım teknik ön kontrol ve uygun teklif senaryosu.",
    forbiddenTopics: ["Müşteri adına onay", "Çağrı sonucu kapatma"],
    automationBoundary:
      "Sadece iç ekip özetine yardımcı olur; dış müşteri iletisi oluşturmaz.",
    timeline: [
      {
        id: "reply-phone-note-summary-a",
        label: "Not standardı",
        note: "Telefon notu özeti müşteri kartı diliyle hizalandı.",
        atLabel: "Bugün",
      },
      {
        id: "reply-phone-note-summary-b",
        label: "Güvenli sınır",
        note: "Çağrı sonucunu otomatik kapatma davranışı kapsam dışı bırakıldı.",
        atLabel: "Dün",
      },
    ],
  },
  {
    id: "reply-high-risk-block",
    name: "Yüksek riskli cevap engeli",
    channel: "whatsapp",
    toneProfile: "professional",
    approvalMode: "disabled",
    riskLevel: "blocked",
    allowedAction:
      "Yalnızca risk nedenini ve manuel inceleme ihtiyacını ekip içinde gösterir.",
    blockedAction:
      "Garanti, hukuki ifade, ödeme sözü veya otomasyonla müşteri iletisi üretmez.",
    owner: "Yönetim",
    lastUpdatedAt: "3 gün önce",
    status: "restricted",
    safetyBadge: "Riskli cevap engeli",
    examplePrompt:
      "Müşteri garanti, iade ve kesin üretim değeriyle ilgili bağlayıcı cevap istiyor.",
    exampleReply:
      "Bu talep manuel inceleme gerektirir. Garanti, iade veya kesin üretim değeri içeren cevaplar yetkili ekip onayı olmadan hazırlanmaz.",
    forbiddenTopics: ["Garanti taahhüdü", "Hukuki beyan", "Ödeme sözü"],
    automationBoundary:
      "Bu kuralda müşteri metni oluşturulmaz; yalnızca iç risk notu gösterilir.",
    timeline: [
      {
        id: "reply-high-risk-block-a",
        label: "Blok kuralı",
        note: "Bağlayıcı ticari ve hukuki ifadeler otomasyon sınırı dışına alındı.",
        atLabel: "3 gün önce",
      },
      {
        id: "reply-high-risk-block-b",
        label: "Yönetim notu",
        note: "Yüksek riskli konular sadece manuel inceleme ile ilerler.",
        atLabel: "6 gün önce",
      },
    ],
  },
];

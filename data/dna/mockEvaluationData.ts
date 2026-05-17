import type { KpiDataset } from "../../lib/dna/kpiEvaluator";

export const mockEvaluationDataset: KpiDataset = {
  customers: [
    // ── 1 ─ Lityum batarya ilgisi: true | Fatura >= 4000 | Çatı GES ilgisi: true
    {
      id: "cust-001",
      customerName: "Mehmet Akgün",
      energy_basics_aylik_fatura: 4800,
      energy_basics_aylik_tuketim: 620,
      energy_basics_cati_tipi: "tile",
      energy_basics_cati_yonu: "south",
      energy_basics_ilgilendigi_hizmet: "panel_battery",
      energy_signals_batarya_ihtiyaci: true,
      energy_signals_lityum_batarya_ilgisi: true,
      energy_signals_arazi_ges_ilgisi: false,
      energy_signals_cati_ges_ilgisi: true,
    },

    // ── 2 ─ Lityum batarya ilgisi: true | Fatura >= 4000 | Keşif bekleyen (cati_yonu eksik)
    {
      id: "cust-002",
      customerName: "Ayşe Demir",
      energy_basics_aylik_fatura: 5200,
      energy_basics_aylik_tuketim: 680,
      energy_basics_cati_tipi: "flat",
      energy_basics_cati_yonu: null, // eksik → keşif bekliyor
      energy_basics_ilgilendigi_hizmet: "panel_battery",
      energy_signals_batarya_ihtiyaci: true,
      energy_signals_lityum_batarya_ilgisi: true,
      energy_signals_arazi_ges_ilgisi: false,
      energy_signals_cati_ges_ilgisi: true,
    },

    // ── 3 ─ Arazi GES ilgisi: true | Fatura >= 4000 | Keşif bekleyen (cati_tipi eksik)
    {
      id: "cust-003",
      customerName: "Karaqaş Metal San.",
      energy_basics_aylik_fatura: 42000,
      energy_basics_aylik_tuketim: 8500,
      energy_basics_cati_tipi: null, // eksik → keşif bekliyor
      energy_basics_cati_yonu: "southeast",
      energy_basics_ilgilendigi_hizmet: "arazi_ges",
      energy_signals_batarya_ihtiyaci: false,
      energy_signals_lityum_batarya_ilgisi: false,
      energy_signals_arazi_ges_ilgisi: true,
      energy_signals_cati_ges_ilgisi: false,
    },

    // ── 4 ─ Lityum batarya ilgisi: true | Fatura >= 4000 | Normal
    {
      id: "cust-004",
      customerName: "Selin Arslan",
      energy_basics_aylik_fatura: 3900,
      energy_basics_aylik_tuketim: 510,
      energy_basics_cati_tipi: "tile",
      energy_basics_cati_yonu: "south",
      energy_basics_ilgilendigi_hizmet: "panel_only",
      energy_signals_batarya_ihtiyaci: false,
      energy_signals_lityum_batarya_ilgisi: false,
      energy_signals_arazi_ges_ilgisi: false,
      energy_signals_cati_ges_ilgisi: true,
    },

    // ── 5 ─ Arazi GES ilgisi: true | Fatura >= 4000
    {
      id: "cust-005",
      customerName: "Yılmaz Tarım A.Ş.",
      energy_basics_aylik_fatura: 18500,
      energy_basics_aylik_tuketim: 3200,
      energy_basics_cati_tipi: "metal",
      energy_basics_cati_yonu: "south",
      energy_basics_ilgilendigi_hizmet: "arazi_ges",
      energy_signals_batarya_ihtiyaci: false,
      energy_signals_lityum_batarya_ilgisi: false,
      energy_signals_arazi_ges_ilgisi: true,
      energy_signals_cati_ges_ilgisi: false,
    },

    // ── 6 ─ Lityum batarya ilgisi: true | Fatura düşük | Keşif bekleyen (cati_yonu needs_check)
    {
      id: "cust-006",
      customerName: "Burak Kaya",
      energy_basics_aylik_fatura: 2100,
      energy_basics_aylik_tuketim: 290,
      energy_basics_cati_tipi: "tile",
      energy_basics_cati_yonu: "needs_check", // keşif bekliyor
      energy_basics_ilgilendigi_hizmet: "panel_battery",
      energy_signals_batarya_ihtiyaci: true,
      energy_signals_lityum_batarya_ilgisi: true,
      energy_signals_arazi_ges_ilgisi: false,
      energy_signals_cati_ges_ilgisi: true,
    },

    // ── 7 ─ Lityum batarya ilgisi: true | Fatura >= 4000
    {
      id: "cust-007",
      customerName: "Esra Çelik",
      energy_basics_aylik_fatura: 6400,
      energy_basics_aylik_tuketim: 820,
      energy_basics_cati_tipi: "concrete",
      energy_basics_cati_yonu: "west",
      energy_basics_ilgilendigi_hizmet: "panel_battery",
      energy_signals_batarya_ihtiyaci: true,
      energy_signals_lityum_batarya_ilgisi: true,
      energy_signals_arazi_ges_ilgisi: false,
      energy_signals_cati_ges_ilgisi: false,
    },

    // ── 8 ─ Normal müşteri | Fatura >= 4000
    {
      id: "cust-008",
      customerName: "Hakan Yıldırım",
      energy_basics_aylik_fatura: 4100,
      energy_basics_aylik_tuketim: 540,
      energy_basics_cati_tipi: "tile",
      energy_basics_cati_yonu: "southwest",
      energy_basics_ilgilendigi_hizmet: "panel_only",
      energy_signals_batarya_ihtiyaci: false,
      energy_signals_lityum_batarya_ilgisi: false,
      energy_signals_arazi_ges_ilgisi: false,
      energy_signals_cati_ges_ilgisi: true,
    },
  ],

  // Bu adımda diğer scope'lar boş — ilerleyen adımlarda doldurulacak
  leads: [],
  requests: [],
  deals: [],
  messages: [],
};

/*
 * Ne değişti?
 * Yeni dosya: Enerji DNA evaluator'larına yönelik 8 mock customer kaydı.
 * 4 müşteri lityum batarya ilgisi true, 5'i fatura >= 4000, 2'si arazi GES, 3'ü keşif bekliyor.
 * Diğer scope'lar (leads/requests/deals/messages) bu adımda boş array.
 */

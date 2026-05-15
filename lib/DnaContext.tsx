"use client";

/**
 * Ultra CRM — DNA Context (Skeleton)
 *
 * V1'de minimal sorumluluk: aktif sektor DNA'sini provider ile uygulamaya tasir.
 * Tum component'ler useDna() ile erisir.
 *
 * Adim 2'de bu context su yetenekleri kazanacak:
 *   - tenantOverride enjeksiyonu
 *   - resolveActiveConfig() ile birlestirme
 *   - useActiveConfig() hook'u
 *   - useVocabulary(), useCustomField(), useDnaKpi() helper hooklari
 *
 * Adim 4'te:
 *   - DNA hot-swap (draft -> activate flow)
 *   - DnaProvider config history (audit icin)
 *
 * V1'de MEVCUT PANEL bu provider'i HENUZ KULLANMIYOR.
 * Bu dosya sadece tip iskeletinin React tarafinda calistigini dogrulamak icindir.
 */

import { createContext, useContext, useMemo, type ReactNode } from "react";

import type { SectorDna } from "../types/dna/SectorDna";

type DnaContextValue = {
  /** Aktif sektor DNA'si */
  activeDna: SectorDna;
};

const DnaContext = createContext<DnaContextValue | null>(null);

type DnaProviderProps = {
  /** Aktif sektor DNA'si */
  dna: SectorDna;
  children: ReactNode;
};

export function DnaProvider({ dna, children }: DnaProviderProps) {
  const value = useMemo<DnaContextValue>(() => ({ activeDna: dna }), [dna]);

  return <DnaContext.Provider value={value}>{children}</DnaContext.Provider>;
}

/**
 * Aktif DNA'yi okur.
 * Provider disinda cagrilirsa anlamli bir hata firlatir.
 */
export function useDna(): DnaContextValue {
  const ctx = useContext(DnaContext);

  if (ctx === null) {
    throw new Error(
      "useDna must be used within a <DnaProvider>. Wrap your app with <DnaProvider dna={...}>.",
    );
  }

  return ctx;
}

/**
 * Provider opsiyonel kullanim icin guvenli versiyon — null donebilir.
 * Mevcut paneldeki component'ler henuz DNA kullanmadigi icin
 * useDnaSafe() ile yumusak fallback yapilabilir.
 */
export function useDnaSafe(): DnaContextValue | null {
  return useContext(DnaContext);
}

import type { SectorDna } from "../../types/dna/SectorDna";

import { baselineSectorDna, sectorDnaRegistry } from "./sectorRegistry";

export type ResolveActiveDnaInput = {
  sectorId?: string | null;
};

export function resolveActiveDna({
  sectorId,
}: ResolveActiveDnaInput = {}): SectorDna {
  const normalizedSectorId = normalizeSectorId(sectorId);

  if (!normalizedSectorId) {
    return baselineSectorDna;
  }

  return sectorDnaRegistry[normalizedSectorId] ?? baselineSectorDna;
}

function normalizeSectorId(sectorId: string | null | undefined): string | null {
  const trimmedSectorId = sectorId?.trim();

  return trimmedSectorId ? trimmedSectorId : null;
}

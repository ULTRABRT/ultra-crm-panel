import type { SectorDna } from "../../types/dna/SectorDna";

import { DEFAULT_SECTOR_DNA_ID, sectorDnaRegistry } from "./sectorRegistry";

export type ResolveActiveDnaInput = {
  sectorId?: string | null;
};

export function resolveActiveDna({
  sectorId,
}: ResolveActiveDnaInput = {}): SectorDna {
  if (!sectorId) {
    return sectorDnaRegistry[DEFAULT_SECTOR_DNA_ID];
  }

  return sectorDnaRegistry[sectorId] ?? sectorDnaRegistry[DEFAULT_SECTOR_DNA_ID];
}


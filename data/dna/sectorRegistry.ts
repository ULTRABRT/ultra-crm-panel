import type { SectorDna } from "../../types/dna/SectorDna";

import { energyDna } from "./energy";

export const DEFAULT_SECTOR_DNA_ID = energyDna.meta.id;

export const sectorDnaRegistry: Readonly<Record<string, SectorDna>> = {
  [DEFAULT_SECTOR_DNA_ID]: energyDna,
};

export const baselineSectorDna: SectorDna =
  sectorDnaRegistry[DEFAULT_SECTOR_DNA_ID];

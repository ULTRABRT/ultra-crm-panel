import type { SectorDna } from "../../types/dna/SectorDna";

import { resolveActiveDna } from "./resolveActiveDna";

export const activeDna: SectorDna = resolveActiveDna();

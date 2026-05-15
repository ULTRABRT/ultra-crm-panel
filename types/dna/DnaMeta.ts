/**
 * Ultra CRM — DNA Meta
 *
 * Bir sektor DNA'sinin kimligi: id, versiyon, isim, paket etiketi.
 * Sektor Modulleri sayfasinda galeri goruntusu icin de bu tip kullanilir.
 */

import type { DnaId } from "./DnaKey";
import type { Localizable } from "./Localizable";

/** DNA yayim durumu */
export type DnaStatus = "active" | "draft" | "deprecated";

/** DNA kimlik bilgileri */
export type DnaMeta = {
  /** Branded DNA id (orn: "energy_renewable_v1") */
  id: DnaId;

  /** UI'da gosterilecek sektor adi */
  name: Localizable<string>;

  /** Sektor slug'i — id convention'inin namespace'i (orn: "energy") */
  slug: string;

  /** Header rozetinde gozukecek paket etiketi (orn: "Enerji Paketi") */
  packageLabel: Localizable<string>;

  /** Sektor grup adi — DNA chain icin (orn: "energy", "industry") */
  industryGroup: string;

  /** Ikon tanimlayicisi — UI tarafinda iconRegistry'den cozulur */
  icon: string;

  /** Semver versiyon — meta_versioning bunu kullanacak */
  version: string;

  /** Kisa aciklama (Sektor Modulleri galerisinde) */
  description: Localizable<string>;

  /** Galeri kart gorseli icin opsiyonel thumbnail path */
  thumbnail?: string;

  /** DNA yayim durumu */
  status: DnaStatus;

  /** ISO tarih, yayim gunu */
  releaseDate: string;

  /** DNA yazari (Ultra CRM, partner, tenant override sahibi) */
  author?: string;
};

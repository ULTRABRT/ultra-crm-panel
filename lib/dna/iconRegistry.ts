import type { IconType } from "react-icons";
import {
  HiOutlineBolt,
  HiOutlineSparkles,
  HiOutlineBattery0,
  HiOutlineArrowTrendingUp,
  HiOutlineMapPin,
  HiOutlineWrenchScrewdriver,
  HiOutlineFire,
  HiOutlineInboxStack,
  HiOutlineDocumentText,
  HiOutlineExclamationTriangle,
  HiOutlineCheckCircle,
  HiOutlineUserGroup,
  HiOutlineChatBubbleLeftRight,
  HiOutlineSquares2X2,
  HiOutlineCalendar,
  HiOutlineClock,
  HiOutlinePhone,
  HiOutlineCurrencyDollar,
} from "react-icons/hi2";

export const iconRegistry: Record<string, IconType> = {
  HiOutlineBolt,
  HiOutlineSparkles,
  HiOutlineBatteryCharging: HiOutlineBattery0,
  HiOutlineBattery0,
  HiOutlineArrowTrendingUp,
  HiOutlineMapPin,
  HiOutlineWrenchScrewdriver,
  HiOutlineFire,
  HiOutlineInboxStack,
  HiOutlineDocumentText,
  HiOutlineExclamationTriangle,
  HiOutlineCheckCircle,
  HiOutlineUserGroup,
  HiOutlineChatBubbleLeftRight,
  HiOutlineSquares2X2,
  HiOutlineCalendar,
  HiOutlineClock,
  HiOutlinePhone,
  HiOutlineCurrencyDollar,
};

const FALLBACK_ICON: IconType = HiOutlineSquares2X2;

export function resolveIcon(name: string | undefined): IconType {
  if (!name) return FALLBACK_ICON;
  return iconRegistry[name] ?? FALLBACK_ICON;
}

/*
 * Ne değişti?
 * HiOutlineBatteryCharging bu react-icons versiyonunda yok → HiOutlineBattery0 kullanıldı.
 * Registry'de "HiOutlineBatteryCharging" key alias olarak bırakıldı (DNA uyumu için).
 */

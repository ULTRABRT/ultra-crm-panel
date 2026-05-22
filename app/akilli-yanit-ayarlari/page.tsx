import { HiOutlineCog6Tooth } from "react-icons/hi2";

import { RoadmapPlaceholderPage } from "../../components/RoadmapPlaceholderPage";

export default function AkilliYanitAyarlariPage() {
  return (
    <RoadmapPlaceholderPage
      Icon={HiOutlineCog6Tooth}
      eyebrow="AI Yanıt Ayarları"
      title="Akıllı yanıt ayarları hazırlanıyor"
      description="Arqon'un AI yanıt ayarları, Ultra Inbox deneyimiyle tutarlı olacak şekilde hazırlanıyor. Bu ekran şimdilik modülün yol haritasında olduğunu açıkça gösterir."
      moduleLabel="Akıllı Yanıt Ayarları"
      roadmapNote="Bu aşamada gerçek prompt yönetimi, otomasyon kuralı, API çağrısı veya ayar formu eklenmedi. AI yanıt konfigürasyonu ayrı kalite ve ürün fazında uygulanacaktır."
    />
  );
}

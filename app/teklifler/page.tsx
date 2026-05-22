import { HiOutlineDocumentText } from "react-icons/hi2";

import { RoadmapPlaceholderPage } from "../../components/RoadmapPlaceholderPage";

export default function TekliflerPage() {
  return (
    <RoadmapPlaceholderPage
      Icon={HiOutlineDocumentText}
      eyebrow="Teklif Modülü"
      title="Teklifler hazırlanıyor"
      description="Arqon teklif yönetimi, müşteri talebi ve satış bağlamı ile birlikte kurgulanıyor. Bu sayfa şimdilik 404 yerine güvenli bir ürün durağı olarak yayında."
      moduleLabel="Teklifler"
      roadmapNote="Bu modül, teklif hazırlama ve onay akışları gerçek ürün kapsamı netleştiğinde aktive edilecek. Bu aşamada veri girişi, teklif üretimi veya sahte iş akışı bulunmaz."
    />
  );
}

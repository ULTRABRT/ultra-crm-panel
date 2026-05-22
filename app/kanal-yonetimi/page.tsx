import { HiOutlineShare } from "react-icons/hi2";

import { RoadmapPlaceholderPage } from "../../components/RoadmapPlaceholderPage";

export default function KanalYonetimiPage() {
  return (
    <RoadmapPlaceholderPage
      Icon={HiOutlineShare}
      eyebrow="Kanal Yönetimi"
      title="Kanal yönetimi hazırlanıyor"
      description="Arqon kanal yönetimi, platform bağlantıları ve operasyon sinyallerini ürün yol haritasındaki sıraya göre ele alacak. Bu sayfa, modül tamamlanana kadar güvenli yönlendirme noktasıdır."
      moduleLabel="Kanal Yönetimi"
      roadmapNote="Bu görevde gerçek kanal entegrasyonu, ChannelSignal genişletmesi veya sağlayıcı bağlantısı eklenmedi. Modül kapsamı sonraki fazda ürün kararıyla açılacaktır."
    />
  );
}

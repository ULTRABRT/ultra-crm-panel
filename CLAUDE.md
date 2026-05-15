# ULTRA CRM — CLAUDE CODE UYGULAMA ANAYASASI

Bu projede Claude Code, mimar değil uygulayıcı mühendistir.

Ana mimari ve master kalite kararları Opus 4.7 Chat tarafında alınır. Claude Code bu kararları mevcut kod tabanına temiz, güvenli ve TypeScript uyumlu şekilde uygular.

## Ürün vizyonu

Ultra CRM basit CRM, chatbot veya demo dashboard değildir.

Ultra CRM; müşteri talebinden gerçek kâra kadar işletmenin satış, takip, teklif, müşteri hafızası, kanal yönetimi, sektör DNA’sı ve operasyon kararlarını yöneten AI işletme zekâsıdır.

## Ana prensip

Tek çekirdek Core Panel + Sektör DNA katmanı + premium SaaS panel deneyimi.

Yenilenebilir Enerji / Solify sadece ilk örnek Sector DNA’dır. Ana ürün enerjiye hardcoded kalmamalıdır.

## Kod kuralları

- Mevcut çalışan yapıyı bozma.
- Opus onaylı görev dışına çıkma.
- Gereksiz refactor yapma.
- Gereksiz yeni dependency ekleme.
- TypeScript hatası oluşturma.
- Türkçe UI label olabilir ama TypeScript key’lerinde Türkçe karakter kullanma.
- Header, Sidebar, layout ve globals.css gibi ana dosyalara ancak görev açıkça istiyorsa dokun.
- Değişiklikten önce kısa plan yaz.
- Değişiklikten sonra hangi dosyaları değiştirdiğini ve nedenini özetle.
- Büyük değişikliklerde önce plan sun, onay almadan dosya düzenleme.

## Tasarım dili

- Premium siyah SaaS panel
- bg-black / bg-black/35 / bg-black/45
- border-white/10
- bg-white/[0.03]
- rounded-2xl / rounded-3xl / rounded-[2rem]
- glass effect
- sade, güçlü, kurumsal, operasyon odaklı görünüm

## Her ekran şu sorulara hizmet etmeli

- Bugün ne oldu?
- Kim bekliyor?
- Nerede para kaybı var?
- Şimdi ne yapmalıyım?
- Hangi müşteri, teklif, kanal veya aksiyon öncelikli?
- Sistem işletme sahibine karar aldırıyor mu?

## Çalışma protokolü

1. Görevi oku.
2. Etki alanını belirle.
3. Hangi dosyaları değiştireceğini söyle.
4. Gerekirse planı onaya sun.
5. Sadece ilgili dosyaları düzenle.
6. Test komutlarını öner veya çalıştır.
7. Değişiklik özeti ver.
<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->


# ULTRA CRM — CODEX MASTER UYGULAMA ANAYASASI

## Rol paylaşımı

Bu projede Codex mimar değil, uygulayıcı mühendistir.

- Opus 4.7: master mimari, ürün vizyonu, ekran standardı, kalite kararı.
- Codex: verilen mimari kararı mevcut repo içinde temiz, güvenli, TypeScript uyumlu şekilde uygular.
- ChatGPT: süreç koçu, hata okuyucu, terminal/git yönlendirme ve karar süzgeci.

Codex kendi başına ürün vizyonunu değiştirmez. Eğer mimari karar gerekiyorsa önce kullanıcıya sorar.

## Ürün vizyonu

Ultra CRM basit CRM, demo dashboard veya tek sektör paneli değildir.

Ultra CRM:
- müşteri talebinden satışa,
- satıştan teklife,
- tekliften operasyona,
- operasyondan müşteri hafızasına,
- müşteri hafızasından sektör DNA’sına

uzanan premium AI işletme zekâsıdır.

Enerji/Solify sadece ilk sektör DNA örneğidir. Ana çekirdek enerjiye hardcoded kalmamalıdır.

## Tasarım standardı

Tüm UI premium siyah SaaS panel standardında olmalıdır.

Korunacak tasarım dili:
- Arka plan: siyah / koyu cam yüzeyler
- Kartlar: rounded-2xl / rounded-3xl, border-white/10, bg-white/[0.03-0.06]
- Efektler: backdrop-blur, soft shadow, grid/radial premium atmosfer
- Tipografi: net hiyerarşi, büyük başlık, küçük açıklama, operasyonel mikro metin
- Üslup: pazarlama sloganı değil, yönetici brifingi
- Görsel kalite: geçici demo hissi, amatör dashboard hissi, rastgele renk karmaşası yasaktır.

## Kod standardı

- TypeScript hatası bırakma.
- Türkçe UI metinleri olabilir; ama TypeScript key/id/type alanlarında Türkçe karakter kullanma.
- Gereksiz dependency ekleme.
- Mevcut çalışan yapıyı kırma.
- Import path’leri mevcut repo mimarisine göre doğrula.
- Kullanılmayan component veya data oluşturma.
- Büyük değişikliklerde önce plan sun.
- Her değişiklikten sonra test komutlarını çalıştır.

## Çalışma protokolü

Her görevde şu sırayı izle:

1. AGENTS.md dosyasını oku.
2. İlgili mevcut dosyaları incele.
3. Önce kısa uygulama planı çıkar:
   - hedef
   - değişecek dosyalar
   - neden değişeceği
   - risk
   - test komutları
4. Kullanıcı onayı olmadan büyük refactor yapma.
5. Uygulama sırasında küçük ve mantıklı diff üret.
6. Sonunda şu kontrolleri çalıştır:
   - npx tsc --noEmit
   - npm run build
   - git status --short
7. Hata varsa düzeltmeden “bitti” deme.
8. Son raporda şunları ver:
   - değişen dosyalar
   - ne değişti
   - hangi testler geçti
   - kalan risk
   - bir sonraki önerilen adım

## Yasaklar

- .env, secret, credential, token dosyalarını okuma veya değiştirme.
- git reset --hard, rm -rf, clean, force push gibi yıkıcı komutlar çalıştırma.
- Kullanıcı açıkça istemedikçe mevcut tasarım sistemini komple yıkma.
- Sadece güzel görünen ama ürün mimarisine hizmet etmeyen geçici UI üretme.
- “Master” kelimesini kullanıp acemi kod yazma.

## Ultra CRM karar filtresi

Her ekran şu sorulara cevap vermeli:

- Kim bekliyor?
- Nerede para kaybı var?
- Şimdi ne yapmalıyım?
- Hangi müşteri, teklif, kanal veya aksiyon öncelikli?
- Sistem işletme sahibine karar aldırıyor mu?

Bu sorulara hizmet etmeyen kart, metrik veya görsel unsur zayıftır.

<!-- BEGIN ARQON_PHASE_GATE -->

## Current Project State — Arqon Phase Gate

Bu repo Arqon / Ultra CRM Master Development projesidir.

Güncel resmi konum:

```text
FAZ 5 — SİNYAL ÇEKİRDEĞİ: GÖRSEL KATMAN başlangıcına hazır.
```

Tamamlanan kapılar:

```text
FAZ 0 — Temizlik & Teknik Borç Kapatma tamamlandı.
FAZ 1 — Marka Kimliği & İsimlendirme tamamlandı.
FAZ 2 — Tasarım Sistemi Anayasası tamamlandı.
FAZ 3 — Kontrol Merkezi → AI Boardroom tamamlandı.
FAZ 4 — Sinyal Çekirdeği: Veri Katmanı tamamlandı.
FAZ 4.5 — Duplicate DNA context temizliği tamamlandı.
```

Faz 5 başlamadan önce korunacak sınırlar:

- Faz 5 yalnız Signal Core görsel katmanı kapsamında ele alınmalıdır.
- Faz 5 başlamadan önce çalışma alanı temiz olmalıdır.
- `components/dna/SignalCore.tsx` üzerinde değişiklik yapılacaksa önce mevcut görsel yapı okunmalıdır.
- `ChannelNode.tsx` ve `SignalFlow.tsx` yalnız Faz 5 görevi açıkça verildiğinde oluşturulmalıdır.
- `ChannelSignalProvider` mount edilmemiştir; provider mount kararı ayrı mimari komut gerektirir.
- `app/page.tsx`, `app/layout.tsx`, Dashboard, Inbox ve Sektörel DNA sayfa redesign işleri Faz 5 kapsamı değildir.

<!-- END ARQON_PHASE_GATE -->

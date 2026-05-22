
# AGENTS.md — Arqon / Ultra CRM Codex Çalışma Kuralları

## Konum kuralı

Bu dosya repo root içinde, yani `package.json` ile aynı klasörde bulunmalıdır. Codex için kaynak dosyası olarak Project Sources'ta eklenmesi faydalıdır; ancak repo guardrail'i için asıl konum repo root'tur.

Yanlış konumlar: Masaüstü, indirilen zip klasörü, `app/`, `components/`.

## Aktif proje konumu

```text
Aktif faz: FAZ 6 — ULTRA INBOX TAM YENİDEN TASARIM
Aktif alt faz: Faz 6A — premium visual match / final inbox implementation
Durum: devam ediyor
Görsel kabul: yok
Commit: kullanıcı görsel onayı olmadan yasak
```

## Kaynak önceliği

Codex ve yardımcı modeller şu sırayı izler:

```text
1. AGENTS.md
2. 01_ARQON_MASTER_ROADMAP_v1.0.md
3. 02_ARQON_CURRENT_STATE_HANDOFF.md
4. 06_ARQON_ULTRA_INBOX_FINAL_VISUAL_SPEC.md
5. 05_ARQON_ULTRA_INBOX_MASTER_STANDARD.md
6. 03_ARQON_DNA_ARCHITECTURE_CONTEXT.md
7. 04_ARQON_BRAND_AND_UI_RULES.md
8. Repo terminal çıktıları ve gerçek dosyalar
```

Ana kural:

```text
Roadmap pusuladır. Handoff güncel konumdur. Repo çıktısı teknik gerçektir. Kullanıcı görsel kabulü UI gerçeğidir.
```

## Codex rolü

Codex repo üzerinde dar kapsamlı uygulama yapar.

Codex şunları yapmaz:

```text
- Faz dışı mimari yorum yapmaz.
- Yeni package eklemez.
- Görsel tasarım standardını keyfi değiştirmez.
- Kullanıcı görsel onayı olmadan commit atmaz.
- Build geçti diye görsel kabul varsaymaz.
```

## Faz 6A izinli dosyalar

Faz 6A kapsamında yalnız şu dosyalara dokunulabilir:

```text
app/inbox/page.tsx
components/inbox/InboxWorkspace.tsx
components/inbox/ConversationQueue.tsx
components/inbox/ConversationView.tsx
components/inbox/AiMemoryStrip.tsx
components/inbox/AiReplyBand.tsx
components/inbox/CustomerSidePanel.tsx
app/globals.css
data/inbox.ts
types/inbox.ts
```

Gerekirse `data/inbox.ts` ve `types/inbox.ts` yalnız type-safe mock/local data düzeni için değişir.

## Faz 6A yasak dosyalar

Şu dosyalara dokunulmaz:

```text
app/layout.tsx
app/page.tsx
data/dashboard.ts
context/DnaContext.tsx
context/ChannelSignalContext.tsx
lib/DnaContext.tsx
types/dna/ChannelSignal.ts
data/dna/channelStatus.ts
hooks/useChannelSignals.ts
lib/dna/signalEngine.ts
```

`lib/DnaContext.tsx` yeniden oluşturulmaz, import edilmez.

## Faz 6A ürün hedefi

Ultra Inbox final hedefi:

```text
Dark Arqon sidebar + light/platinum premium inbox canvas + platform switcher + conversation command center + AI action strip + auto-grow composer + Customer Intelligence executive dock/rail.
```

Uygulama sıradan admin panel gibi görünürse kabul edilmez.

## Görsel kabul kilidi

Faz 6A için teknik başarı tek başına yeterli değildir.

```text
npx tsc --noEmit başarılı olabilir.
npm run build başarılı olabilir.
Yine de kullanıcı görsel kabulü yoksa commit yok.
```

## İşlevsel davranışlar korunur

Şunlar kırılmamalıdır:

```text
- local search
- platform filter
- quick filters
- active conversation selection
- Customer dock/rail update
- AI Kullan/Düzenle draft'a metin basma
- Reddet öneriyi pasifleştirme
- composer auto-grow
```

Gerçek mesaj gönderimi eklenmez.

## DNA/provider sınırı

Faz 6A sırasında:

```text
- DnaProvider mount edilmez.
- ChannelSignalProvider mount edilmez.
- useDna/useDnaSafe/activeDna bağlanmaz.
- No Lost Lead / No Lost Money gerçek entegrasyonu yapılmaz.
```

DNA bağlantısı Faz 6C konusudur.

## Renk ve UI sınırı

Faz 6A `/inbox` workspace light/platinum olabilir.

Kullanılabilir:

```text
#F4F5F7
#F6F7F9
#FFFFFF
#EEF0F3
#F1F2F4
#0B0D10
#4B5563
#7A808A
black/[0.08]
black/[0.10]
```

Yasak:

```text
blue
cyan
sky
indigo
teal
purple
from-
to-
via-
neon
glow
```

Not: `glow` araması global boot/signal dosyalarında false positive verebilir; aktif inbox path içinde olmamalıdır.

## Platform switcher kuralı

Platformlar:

```text
Tümü
WhatsApp
Instagram
Messenger
Mail
Webchat
Formlar
```

Kurallar:

```text
- icon/logo + label + sayı görünür.
- yatay scroll yok.
- kesik chip yok.
- Mail ChannelSignal'a eklenmez.
```

## Customer Intelligence kuralı

CustomerSidePanel şu şekilde davranabilir:

```text
- geniş desktop: sağ rail
- laptop/monitor: compact executive bottom dock
```

Yasak:

```text
- uzun form
- eski dört büyük kart grid'i
- aktif UI'da "Müşteri hafızası / İletişim ve kaynak / Lead ve aksiyon / Sector DNA" dev blokları
```

## Her uygulama sonunda zorunlu kontroller

```bash
git status --short
git diff --stat
npx tsc --noEmit
npm run build
git status --short
```

Faz 6A özel audit:

```bash
rg -n "TopCommandHeader|PlatformSwitcher|MainCommandGrid|CustomerIntelligenceDock" components/inbox app/inbox
rg -n "Müşteri hafızası|İletişim ve kaynak|Lead ve aksiyon|Sector DNA|Bağlantıya hazır" components/inbox app/inbox
rg -n "overflow-x-auto|overflow-x-scroll|whitespace-nowrap" app/inbox components/inbox app/globals.css
rg -n "h-dvh|h-screen|height: 100vh|height: 100dvh|absolute|fixed|inset-0" app/inbox components/inbox app/globals.css
rg -n "blue|cyan|sky|indigo|teal|purple|from-|to-|via-|neon|glow" components/inbox app/inbox/page.tsx app/globals.css
rg -n "useDna|DnaProvider|ChannelSignalProvider|useChannelSignalContext|lib/DnaContext" app/inbox components/inbox context hooks lib data types
rg -n "any" app/inbox components/inbox data/inbox.ts types/inbox.ts
```

## Rapor formatı

Her Codex raporu şunları içerir:

```text
1. Değişen dosyalar
2. Aktif render path
3. Görsel hedefe hangi noktalarla yaklaşıldı
4. Search/platform/quick filter durumu
5. Active conversation update durumu
6. AI Kullan/Düzenle/Reddet durumu
7. Composer auto-grow durumu
8. DNA/provider bağlanmadı doğrulaması
9. Yasak dosyalara dokunulmadı doğrulaması
10. any kullanılmadı doğrulaması
11. Typecheck sonucu
12. Build sonucu
13. git status --short sonucu
14. Commit atıldı mı? Cevap: atılmamalı
```

## Kapanış

Faz 6A ancak kullanıcı şu kararı verdiğinde kapanır:

```text
Bu görünüm Arqon'un premium Ultra Inbox standardını karşılıyor; Faz 6A görsel kabul veriyorum.
```

Bu karar yoksa commit yok.

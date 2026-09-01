# İzhar Medya — Portfolyo Sitesi

Video kurgu portfolyo sitesi. Statik HTML + Tailwind (CDN) + vanilla JS.
Dosyalar: [index.html](index.html), [style.css](style.css), [app.js](app.js).

## Barındırma & Domain

- **Domain:** `izharmedya.store` — **Hostinger**'dan alındı. DNS ayarları Hostinger panelinden yapılacak.
- **GitHub hesabı mevcut.** Repo henüz hiçbir remote'a bağlı değil (yerel).
- **Planlanan yayın yolu:** GitHub'a push → **Cloudflare Pages**'e bağla → `izharmedya.store` domainini Cloudflare Pages'e yönlendir.
  - Neden Cloudflare Pages: tamamen ücretsiz, **sınırsız bant genişliği**, ücretsiz SSL, kolay custom domain bağlama.
  - Alternatif: GitHub Pages (daha basit ama aylık ~100GB bant genişliği sınırı var).
- Henüz deploy edilmedi — sıradaki iş.

## ⚠️ Video Stratejisi

**Orijinal proje/export dosyaları silindi, artık yok.** Bu yüzden sadece resmi embed'ler kullanılıyor:

- **YouTube:** `iframe` embed (youtube-nocookie.com), `openEmbedModal()` ile modalde açılır.
- **Instagram:** resmi `/embed/` iframe'i, aynı `openEmbedModal()` ile modalde açılır (hem `/reel/` hem `/p/` linkleri çalışıyor).
- **X/Twitter mp4:** doğrudan `video.twimg.com` kaynağı, `openModal()` ile modalde açılır. Sadece YouTube karşılığı bulunamayan/istenmeyen 3 video için kullanılıyor (Altay Cem Meriç Kurgusu, "vs 5 Benzemez", ACM Van Gogh Edit — kullanıcı bunların X'te kalmasını özellikle istedi).
- ❌ Video dosyası yerel olarak barındırılmıyor, 3.taraf embed servisi kullanılmıyor.

Error 153 (YouTube) kök sebebi: `file://` protokolünden servis edilme. Gerçek domainden sorun yok.

## Site Yapısı (GÜNCEL — son onaylanan hâli)

Kullanıcı iki kez fikir değiştirdi bu konuda, aşağıdaki yapı **ikinci ve son** revizyon:

1. `#hero` — başlık: "Video kurgu, ses tasarımı ve 3D." Alt metin kısa/uzun format, motion design ve Unreal Engine üretimini doğrudan açıklar. "Çalışmaları İncele" butonu `#after-effects` bölümüne gider; "▶ Showreel'i İzle" Altay Cem Meriç videosunu modalde açar. Masaüstünde üç somut üretim kartı vardır; mobilde bu kartlar gizlenir.
2. `.intro-section` — kurgu, motion design ve 3D kapsamını tek cümlede açıklar; Premiere Pro / After Effects / Unreal Engine 5 / YouTube Shorts etiketleri bulunur.
3. `#kurgular` (01) — tag: "01 — KURGU ÜZERİNE", başlık: "Kurgu tekniklerini anlattığım kısa videolar." İçerik: 6 YouTube Shorts (kompozisyon/montaj/ritim/hikâye anlatımı), manuel rail.
4. `#after-effects` (02) **"After Effects"** — tag: "02 — AFTER EFFECTS", başlık: "After Effects çalışmaları." İçerik: **6 video karışık sırada** (manuel rail):
   - Altay Cem Meriç Kurgusu (X mp4)
   - Mizah Bir Silahtır! (YouTube `EnudnPX_lyk`)
   - Altay Cem Meriç vs 5 Benzemez — eski adıyla "5. Kol Kurgusu" (X mp4, `2014414561596567553`)
   - Hz. İsa Tanrı mıdır? (YouTube `ceeIMxcfj0U`)
   - ACM Van Gogh Edit — eski adıyla "Van Gogh Konsept Kurgusu" (X mp4, `2040354828233097219`)
   - Bilimsel Olgular Bir Şey Yapar mı? (YouTube `_ed8yFjcv7U`)
5. `#tangor-urkan` (03) **"Tangör Urkan İçin"** — 3 video, masaüstünde sabit 3'lü grid, mobilde manuel yatay rail. Videolar: `Vmz8Aa8xtlc`, `oDgsXPXCpaU`, `ulr5B0MHt2M`. Hesap @tangorurkan1'e ait ama kullanıcının kendi kurgu işi (freelance/müşteri işi).
6. `#anlatim-videolari` (04) **"Anlatım Videoları"** — 8 liste dışı (unlisted) YouTube videosu, soru-cevap formatı: `f0FzqwGpSos`, `jiNviI03j80`, `RndRAEiMQFA`, `Emzlscur_Zk`, `YCu_-XTOuG0`, `0uTheVR0dQc`, `BIPk6NSGf2U`, `kpiIYxvZU4A`.
7. `#unreal-engine` (05) — başlık: "Unreal Engine ile hazırladığım 3D çalışmalar." Metinler sahne, ışık, kamera ve render kapsamını düz biçimde açıklar.
8. `#iletisim` — mavi kapanış CTA'sı; ardından e-posta, X/Twitter, Instagram ve YouTube bağlantılarının bulunduğu footer.

**Silinen:** "Sosyal Medya" bölümü (3 genel Instagram reel: `DbD73syIO55`, `DaLsGExyhvE`, `DaDgTdGSGPj`) kullanıcı isteğiyle **tamamen kaldırıldı**. Bu 3 reel şu an sitede hiçbir yerde yok. Kullanıcı geri istemediği sürece eklenmeyecek.

Nav (desktop): Kurgular / After Effects / Tangör / Anlatım / 3D — 5 pill.

**Sayfa yüksekliği masaüstünde yaklaşık 6.100px, 8 `<section>`** — hero, editoryal geçiş ve iletişim CTA'sı eklendi.

## ⚠️ Rail (şerit) davranışı — otomatik akış tamamen KAPALI

`initRails()` (app.js): hiçbir rail otomatik kaymaz ve kart klonlamaz. Şeritler manuel kaydırma, sürükleme, klavye ve ok düğmeleriyle çalışır. Kartlar JavaScript ile `role="button"`, `tabindex="0"` ve açıklayıcı `aria-label` alır. Tangör Urkan bölümü masaüstünde sabit üçlü grid, mobilde yatay rail'dir. Otomatik akış/sonsuz döngü tekrar eklenmemeli.

## Tasarım Kararları / Kullanıcı Tercihleri (kronolojik, en önemlisi en altta)

- Kartlar/bölümler devasa olmamalı → rail pattern'i.
- Header scroll'da logo görünmezliği: `.site-header.scrolled .brand-logo` kuralı iç `<span class="text-white">`'ı da hedeflemeli, düzeltildi.
- Tekrar eden kartlar/bölümler büyük rahatsızlık kaynağı.
- Üçüncü şahıs hesabına ait içerik bulununca **kullanıcıya sormadan silme** — freelance müşteri işi olabilir (Tangör Urkan örneği).
- **Kopya/metin tonu:** kullanıcı "motivasyon konuşması gibi duruyor" diye açıkça rahatsızlığını belirtti (örn. "kendimi sınamak amacıyla tek günde tasarladığım videolar" gibi öznel/hikayeleştirilmiş ifadeler). **Yeni kural: section başlıkları/açıklamaları düz, faktüel, iddiasız yazılacak.** Örnek: "After Effects ile kurgulanan videolar." / "Tangör Urkan'ın YouTube kanalı için kurguladığım videolar." — süsleme yok, sıfat yok, "imzam", "öncelik" gibi pazarlamacı kelimelerden kaçın (tek istisna: kullanıcının kendi seçtiği/onayladığı "Öncelik müzik düzeni ve hikaye anlatımı" cümlesi — bunu o kendi yazdı/istedi, dokunma).
- Kullanıcı zaman zaman kararlarını **değiştiriyor** (örn. After Effects içeriği 3 kez farklı şekilde tanımlandı). Her seferinde en son mesajı otorite kabul et, önceki turdaki kendi kararını savunmaya çalışma — sadece uygula ve CLAUDE.md'yi güncelle.
- Referans tasarım: [cofounder.co](https://cofounder.co/).
- Hero ve tüm bölüm metinleri 1 Eylül 2026'da düz, faktüel tona çevrildi. Yeni metinlerde motivasyon konuşması, soyut kurgu felsefesi veya kanıtlanmayan pazarlama iddiaları kullanılmamalı.

## Açık Sorular / Sıradaki İşler

- [ ] GitHub'a push → Cloudflare Pages bağlantısı → `izharmedya.store` domain DNS yönlendirmesi (Hostinger nameserver/CNAME ayarı).
- [ ] `assets/reels/README.md` artık kullanılan hiçbir bölümü referans almıyor (Sosyal Medya silindi) — kullanıcı yeniden Instagram reel eklerse tekrar gündeme gelebilir, şimdilik dokunma.
- [ ] Tailwind CDN üretim uyarısı: yayın turunda Tailwind statik CSS olarak derlenmeli veya utility sınıfları ana CSS'e taşınmalı.

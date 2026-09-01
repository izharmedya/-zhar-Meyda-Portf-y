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

1. `#hero` — "Çalışmaları İncele" + "▶ Showreel'i İzle" (Altay Cem Meriç videosunu modalde açar)
2. `#kurgular` (01) **"İzhar'ın Kurguları"** — tag: "01 — İZHAR'IN KURGULARI", başlık: "Öncelik müzik düzeni ve hikaye anlatımı." İçerik: 6 YouTube Shorts (kurgu felsefesi/tempo videoları), plain rail. **NOT:** bu başlık daha önce ayrı bir "3'lü flagship kart" bölümündeydi (Altay/5Benzemez/VanGogh) — kullanıcı bu kimlik başlığının aslında Shorts videolarına ait olması gerektiğini söyledi, taşındı.
3. `#after-effects` (02) **"After Effects"** — tag: "02 — AFTER EFFECTS", başlık: "After Effects ile kurgulanan videolar." İçerik: **6 video karışık sırada** (plain rail, feature-block/app-window YOK — kullanıcı özellikle "normal akış" istedi):
   - Altay Cem Meriç Kurgusu (X mp4)
   - Mizah Bir Silahtır! (YouTube `EnudnPX_lyk`)
   - Altay Cem Meriç vs 5 Benzemez — eski adıyla "5. Kol Kurgusu" (X mp4, `2014414561596567553`)
   - Hz. İsa Tanrı mıdır? (YouTube `ceeIMxcfj0U`)
   - ACM Van Gogh Edit — eski adıyla "Van Gogh Konsept Kurgusu" (X mp4, `2040354828233097219`)
   - Bilimsel Olgular Bir Şey Yapar mı? (YouTube `_ed8yFjcv7U`)
4. `#tangor-urkan` (03) **"Tangör Urkan İçin"** — 3 video, hepsi YouTube: `Vmz8Aa8xtlc`, `oDgsXPXCpaU`, `ulr5B0MHt2M`. Hesap @tangorurkan1'e ait ama kullanıcının kendi kurgu işi (freelance/müşteri işi).
5. `#anlatim-videolari` (04) **"Anlatım Videoları"** — 8 liste dışı (unlisted) YouTube videosu, soru-cevap formatı: `f0FzqwGpSos`, `jiNviI03j80`, `RndRAEiMQFA`, `Emzlscur_Zk`, `YCu_-XTOuG0`, `0uTheVR0dQc`, `BIPk6NSGf2U`, `kpiIYxvZU4A`.
6. `#unreal-engine` (05) — Unreal Engine 3D, en altta. Metinler kullanıcı isteğiyle henüz değiştirilmedi.
7. `#iletisim` — footer: e-posta (izharmedya@gmail.com), X/Twitter, Instagram, YouTube.

**Silinen:** "Sosyal Medya" bölümü (3 genel Instagram reel: `DbD73syIO55`, `DaLsGExyhvE`, `DaDgTdGSGPj`) kullanıcı isteğiyle **tamamen kaldırıldı**. Bu 3 reel şu an sitede hiçbir yerde yok. Kullanıcı geri istemediği sürece eklenmeyecek.

Nav (desktop): Kurgular / After Effects / Tangör / Anlatım / 3D — 5 pill.

**Sayfa yüksekliği ~4.900px, 6 `<section>`** — en kısa/sade hâli bu, tekrarlı deneme turlarından sonra buraya oturdu.

## ⚠️ Rail (şerit) davranışı — 5'ten az kartta otomatik akış KAPALI

`initRails()` (app.js): bir rail'de **5'ten az kart varsa otomatik kaydırma/döngü/klonlama tamamen atlanır** (`canAutoScroll = originalCards.length >= 5`). Sebep: kullanıcı, 3 kartlık bir rail'in kendiliğinden akıp aynı kartı bir ekran genişliği içinde iki kez göstermesini ("Dikey Kurgu — 03" iki kez yan yana çıkması) bariz bir hata olarak gördü ve sert tepki verdi. 3-4 kartlı rail'lerde artık: kartlar sabit durur, ok tuşları ve sürükleme (drag) ile gezilebilir, otomatik akış yok. **Yeni bir rail eklerken kart sayısı 5'in altındaysa bu davranışı hatırla — sürpriz olmasın.**

## Tasarım Kararları / Kullanıcı Tercihleri (kronolojik, en önemlisi en altta)

- Kartlar/bölümler devasa olmamalı → rail pattern'i.
- Header scroll'da logo görünmezliği: `.site-header.scrolled .brand-logo` kuralı iç `<span class="text-white">`'ı da hedeflemeli, düzeltildi.
- Tekrar eden kartlar/bölümler büyük rahatsızlık kaynağı.
- Üçüncü şahıs hesabına ait içerik bulununca **kullanıcıya sormadan silme** — freelance müşteri işi olabilir (Tangör Urkan örneği).
- **Kopya/metin tonu:** kullanıcı "motivasyon konuşması gibi duruyor" diye açıkça rahatsızlığını belirtti (örn. "kendimi sınamak amacıyla tek günde tasarladığım videolar" gibi öznel/hikayeleştirilmiş ifadeler). **Yeni kural: section başlıkları/açıklamaları düz, faktüel, iddiasız yazılacak.** Örnek: "After Effects ile kurgulanan videolar." / "Tangör Urkan'ın YouTube kanalı için kurguladığım videolar." — süsleme yok, sıfat yok, "imzam", "öncelik" gibi pazarlamacı kelimelerden kaçın (tek istisna: kullanıcının kendi seçtiği/onayladığı "Öncelik müzik düzeni ve hikaye anlatımı" cümlesi — bunu o kendi yazdı/istedi, dokunma).
- Kullanıcı zaman zaman kararlarını **değiştiriyor** (örn. After Effects içeriği 3 kez farklı şekilde tanımlandı). Her seferinde en son mesajı otorite kabul et, önceki turdaki kendi kararını savunmaya çalışma — sadece uygula ve CLAUDE.md'yi güncelle.
- Referans tasarım: [cofounder.co](https://cofounder.co/).
- **Hero metni henüz revize edilmedi** — kullanıcı ayrı bir tur olarak ele alınmasını istedi.

## Açık Sorular / Sıradaki İşler

- [ ] Hero paragrafı ve floating-task-card metinleri — kullanıcı istediğinde plain/faktüel tona çevrilecek (bkz. yukarıdaki kural).
- [ ] GitHub'a push → Cloudflare Pages bağlantısı → `izharmedya.store` domain DNS yönlendirmesi (Hostinger nameserver/CNAME ayarı).
- [ ] Unreal Engine bölümündeki metinler kullanıcı tarafından değiştirilecek.
- [ ] `assets/reels/README.md` artık kullanılan hiçbir bölümü referans almıyor (Sosyal Medya silindi) — kullanıcı yeniden Instagram reel eklerse tekrar gündeme gelebilir, şimdilik dokunma.

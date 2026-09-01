# İzhar Medya — Portfolyo Sitesi

Video kurgu portfolyo sitesi. Statik HTML + vanilla CSS/JS.
Dosyalar: [index.html](index.html), [style.css](style.css), [app.js](app.js).

## Barındırma & Domain

- **Domain:** `izharmedya.store` — Hostinger'dan alındı. DNS ayarları Hostinger panelinden yapılacak.
- **GitHub hesabı mevcut.** Repo henüz hiçbir remote'a bağlı değil.
- **Planlanan yayın yolu:** GitHub'a push → Cloudflare Pages → domain yönlendirme.
- Henüz deploy edilmedi.

## Video Stratejisi

Toplam **17 video**: 13 YouTube embed (`openEmbedModal()`) + 4 **yerel mp4** (`openModal()`).

### ⚠️ X/Twitter videoları artık YEREL — hotlink çalışmıyor (1 Eylül 2026)
`video.twimg.com` tarayıcıdan gelen istekleri **403** ile reddediyor (hotlink koruması).
curl'den 206 döner ama tarayıcıdan 4/4 403 — yani canlı sitede de açılmıyorlardı.
Çözüm: 4 mp4 indirilip `assets/videos/` altına konuldu (~31 MB):
`kurgu-01.mp4` (13 MB, 1080x1080), `kurgu-02.mp4` (13 MB, 1440x1080),
`van-gogh-edit.mp4` (2 MB, 722x720), `unreal-engine-intro.mp4` (2 MB, 1280x720).
Dosya adlarında **kasıtlı olarak şahıs ismi yok**. Hepsinin oynadığı tarayıcıda doğrulandı.
**Bir daha twimg.com'a doğrudan link verme.** Küçük resimler (`pbs.twimg.com`) hâlâ
uzaktan geliyor ve çalışıyor (200) — onlar hotlink'e izin veriyor.

### ⚠️ Modal artık ÇIPLAK — 1 Eylül 2026'da kasıtlı olarak sadeleştirildi
Kullanıcı açıkça istedi: **video modalinde başlık, meta bilgi (izlenme/açıklama) ve
"kaynağı aç" linki YOK.** Sadece video + sağ üstte yuvarlak kapatma butonu. `modalTitle`,
`modalMeta`, `modalExternalLink` DOM elemanları ve JS referansları tamamen kaldırıldı.
`openModal()`/`openEmbedModal()` hâlâ `title`/`meta`/`externalUrl` parametrelerini alıyor
(geriye dönük uyumluluk, çağrı yerlerini tek tek değiştirmemek için) ama artık hiçbirini
kullanmıyor. **Bir daha modale başlık/meta eklemeye kalkma — bilinçli bir tercih bu.**

## Site Yapısı (GÜNCEL — 1 Eylül 2026, ikinci revizyon)

**Önceki turda** (aynı gün) her konu tek bir bölümde birleştirilmişti ("İzhar Medya'nın
Videoları" diye 7 videoyu tek grid'e koymuştum). **Kullanıcı bunu da beğenmedi** — 3 kurgu-
teknik videosu ile 4 anlatım videosu KARIŞTIRILMAMALI, ayrı ayrı ama HER İKİSİ DE akan şerit
(rail) olmalıydı, statik grid değil. Geri ayırdım. **Ders: "birleştir" dediğinde her zaman
"tek grid'e" anlamına gelmiyor — bazen sadece "aynı görsel dilde, akan şerit olsun" demek
istiyor. Emin olmadığında soru sor, tahmin etme.**

1. `#hero` — başlık **"İzhar Medya'nın / Portföyü"** (iki satır, iki tonlu). Açıklama
   paragrafı ve sağdaki 3 "görev kartı" (`.hero-task-stack`) **silindi** — kullanıcı istedi.
   Sağ kolon boşalınca `justify-content` `space-between`→`flex-start` yapıldı,
   `align-items: center` + `padding-bottom: 300px` ile metin mavi gökyüzüne taşındı.
   İkinci buton **Instagram linki** (`instagram.com/izhar.medya`, `target="_blank"`).
2. `#kurgular` (01) **"İzhar Medya'nın Videoları"** — **rail/şerit**, **6 video** (Yapay
   Zeka İşimizi Elimizden Alacak Mı?, Kuleshov'un Etkisi, Önemli Olan Programları Bilmek
   Değildir!, Yönetmenlerin Kompozisyon Tekniği, Doğru Montaj Nedir?, Seçim Yaparak Hikaye
   Anlatın — orijinal 6'lı YouTube Shorts vitrini). **Kullanıcı bu 6'nın en baştaki bölüm
   olmasını istedi** (sayfada ilk collection-section), ve önceki turda yanlışlıkla sadece
   3'ü kalmıştı (rebuild sırasında 3'ü kaybolmuş) — kullanıcı fark edip tekrar tüm 6 linki
   verdi, hepsi eklendi.
3. `#after-effects` (02) **"After Effects ile yapılan videolar"** — 3 yerel mp4,
   statik `media-grid` (rail değil, kullanıcı istemedi). **560px altında tek sütun.**
4. `#anlatim` (03) **"Anlatım Videoları"** — **rail/şerit**, 4 video (Kur'an'da Namaz,
   Allah'ı Görmüyorum, Kur'an Yetmiyor, Kur'an Detaylı).
5. `#tangor-urkan` (04) — başlık **"Farklı tarzda denenmiş kurgular"** (kullanıcının kendi
   seçimi; daha akıcı alternatifler önerildi, reddedildi). Kart etiketleri "FARKLI TARZ".
   ⚠️ **Ama After Effects kartlarının başlıklarında hâlâ şahıs ismi var** ("Altay Cem Meriç
   Kurgusu" vb.) — kullanıcıya soruldu, cevap gelmedi, kasıtlı bırakıldı.
6. `#unreal-engine` (05) — video var, `.small-case-thumb` (16:9, `openModal()`).
7. `#iletisim` — düz mavi zemin yerine artık **pixel-art arka plan**: `.contact-art` +
   `.contact-art-overlay` (hero'daki `.hero-art` yapısının aynısı). Görsel
   `assets/contact-bg.png` — şu an `hero-arcade.png`'nin kopyası, **kullanıcı kendi
   görselini bu dosyanın üzerine yazacak**, kod değişikliği gerekmiyor. Soldaki karartma
   `.82` — daha düşükte "konuşalım." parlak monitörün üstünde okunmuyordu.

**Silinen metinler (kullanıcı istedi):** tüm `.section-copy` alt yazıları (biri hariç:
01. bölümdeki müzik/ses efektleri cümlesi) ve hero açıklaması.

Nav (desktop): Videolar / After Effects / Anlatım / İşler / 3D (bu sırada — Videolar ilk).
Hero'daki "Seçkileri gör" butonu ve scroll-cue linki de `#kurgular`'a (ilk bölüm) gidiyor.

### Boyut/yerleşim düzeltmeleri (aynı gün, üçüncü tur)
Kullanıcı ekran görüntüleriyle şunu gösterdi: az kartlı rail'ler ve Unreal Engine bölümü
sayfada "kaybolmuş", büyük boş alanlar bırakıyordu. Kök sebep: flex/grid'de `1fr` gibi
sınırsız büyüyen kolonlar, içerik onları doldurmayınca devasa boş alan bırakıyordu.
Düzeltmeler:
- `.rail` artık `justify-content: safe center` — içerik rail genişliğini doldurmuyorsa
  ortalanıyor (soldan yapışık durmuyor), doldurup taşıyorsa (6 kartlı İzhar Medya rail'i
  gibi) güvenli şekilde sola yaslanıp kaydırılabilir kalıyor (`safe` anahtar kelimesi ilk
  kartın kesilmesini engelliyor).
- `.rail .media-card` genişliği 200px → 232px.
- `.media-grid-three` üzerindeki `max-width:870px` kaldırıldı — artık `#after-effects`
  ile birebir aynı genişlikte (1052px), ikisi de 3 kart olduğu için tutarlı duruyorlar.
- `.small-case-inner` (Unreal Engine bölümü) CSS Grid'den flex'e çevrildi: eskiden
  `grid-template-columns: minmax(0,1fr) auto` metin kolonunu sınırsız genişletip videoyu
  sayfanın öbür ucuna itiyordu. Şimdi metin `max-width:460px`, video/meta bloğu
  `max-width:320px`, aralarında sadece gerçek boşluk kadar `justify-content:center` +
  `gap:56px` var — ikisi birbirine yakın, ortalanmış duruyor.

## ⚠️ Rail/şerit teknik notu

`app.js` içinde `railScroll()`/`initRails()` fonksiyonları zaten vardı (önceki bir turdan
kalma) ama HTML'de `.rail`/`.rail-card` işaretlemesi yoktu (rebuild `.media-grid` sistemine
geçmişti) — yani JS ölü kod duruyordu. Şimdi 2 bölüm için `.rail-wrap`/`.rail`/`.rail-card`
(+ `.media-card` ile birlikte, çift class) markup'ı eklenip bu JS canlandırıldı. **Sadece
manuel kaydırma var (ok tuşları + sürükleme + dokunma), OTOMATİK AKIŞ YOK** — 3-4 kartlık
şeritlerde otomatik döngü çok çabuk tekrarladığı için daha önce "bariz hata" olarak
şikayet edilmişti (bkz. aşağıdaki kural). CSS: `.rail-wrap`, `.rail`, `.rail-nav` stil
tanımları style.css'e eklendi.

## 🎨 cofounder.co'dan çıkarılan tasarım sistemi

Kullanıcı bu sefer **gerçek ekran görüntüleri gönderdi** (önceki turda hiçbiri ulaşmamıştı).
Görsellerden ve daha önceki canlı-site incelemesinden çıkanlar:

- **Ana font: "TT Neoris Trial"** — UYGULANDI. `assets/fonts/` altında 4 statik TTF
  (Regular/Medium/DemiBold/Bold), `--font-sans` ile her yerde kullanılıyor.
  ⚠️ **Bunlar "Trial" dosyaları** — canlı yayın için lisans gerekir. cofounder.co'nun
  kullandığı dosya `tt_neoris_variable.woff2` yani **Variable** sürüm (doğrulandı);
  onlar 430/440/460 gibi ondalık ağırlıklar kullanıyor, bizim statik dosyalar
  400/500/600/700'e kilitli. DemiBold/Bold hiç kullanılmıyor (ağırlık 600/700 yok).
  Cofounder'ın kendi logosu da ("Cofounder" yazısı) düz text değil, **SVG görsel/özel
  logotype** — yani oradan da tam bir "font adı" çıkarılamıyor.
- **Logo fontu:** Fraunces DENENDİ ve VAZGEÇİLDİ — logo artık `--font-sans` (TT Neoris).
- **"Departure Mono" — UYGULANDI**, jsdelivr CDN'den woff2. Eyebrow etiketleri, kart alt
  yazıları, rozetler, footer. (cofounder.co da aynı fontu kullanıyor, doğrulandı.)

### ⚠️ Tracking dersi — "font farklı görünüyor" şikayetinin gerçek sebebi
Kullanıcı "cofounder'ın fontu bizde farklı duruyor" dedi. Font aynıydı; sebep **aşırı
negatif letter-spacing**'di (hero `-.075em`, iletişim `-.08em` = 72px'te harf başına -5.4px,
harfler çarpışıyordu). Cofounder'ın `<h1>`'inde hiç tracking sınıfı yok, fontun doğal
aralığını kullanıyorlar. Hepsi `-.012em` / `-.015em`'e çekildi. **Sitede artık `-.02em`'den
agresif tracking yok.** Departure Mono'nun pozitif aralıkları (.17em vb.) kasıtlı, dokunma.
- **Buton tarifi — cofounder.co'dan CANLI SİTEDEN ÇEKİLDİ (2 Eylül 2026), birebir uygulandı.**
  Tahmin değil: tarayıcıda `getComputedStyle` ile okundu, bizimkiler aynı değerlere getirildi.
  Ortak: `border-radius: 8px`, `font-size: 16px`, `font-weight: 400`, `padding: 0 12px`.
  - Açık (`.button-light`): `background: #f5f5f2`, `border: 1px solid rgba(32,32,32,.1)`,
    `box-shadow: 0 2px 3px rgba(0,0,0,.06), inset 0 0 .357px 1.5px rgba(255,255,255,.35),
    inset 0 2px 0 #fff`, `color: #171717`.
  - Koyu (`.button-header` — İletişim): iki katmanlı gradyan
    `linear-gradient(rgba(32,32,32,.1),rgba(32,32,32,.1)), linear-gradient(#4f4f4f, rgba(32,32,32,.85))`,
    `border: 1px solid #383838`, dört katmanlı gölge
    `0 0 0 1px rgba(64,64,64,.12), inset 0 2px 0 rgba(255,255,255,.24),
    inset 0 -.5px 2px rgba(0,0,0,.25), 0 2px 8px rgba(0,0,0,.03)`.
  ⚠️ **Kilit nokta: gölge NEREDEYSE GÖRÜNMEZ.** Daha önce bizde `0 3px 0 #111` sert alt kenar
  ve `0 11px 20px rgba(14,13,13,.34)` koca dış gölge vardı; kullanıcı "aşırı kötü" dedi.
  Referansın dış gölgesi sadece `0 2px 8px rgba(0,0,0,.03)`. **Butona ağır gölge ekleme.**
  Hover da hafif: `translateY(-1px)`, eskiden -2px'ti.

- **İki tonlu başlık deseni:** cümlenin vurgulu kısmı koyu, tamamlayıcı kısmı soluk
  (`.text-soft` / `.text-soft-light`). Şu an sadece hero başlığında ("Kurguladığım
  videolar **burada.**").
- **Header düzeni (bu turda düzeltildi):** kullanıcı kendi header ekran görüntüsüne kırmızı
  ok çizip nav ile İletişim butonu arasındaki büyük boşluğu işaretledi. Sebep: logo/nav/buton
  3 ayrı flex elemanıydı, `space-between` iki büyük boşluk yaratıyordu. Çözüm: nav ve
  buton grubu `.header-right` adlı tek bir kapsayıcıya alındı, artık sadece logo↔grup
  arasında TEK boşluk var (referans sitedeki gibi).

## Yapılan Denetimler (1 Eylül 2026)

- **17/17 video test edildi:** 13 YouTube oEmbed'den 200 (hepsi açık + gömülebilir),
  4 yerel mp4 tarayıcıda gerçekten oynatıldı (currentTime ilerledi, hata yok).
- **Mobil:** 320 / 375 / 768 px — hiçbirinde yatay taşma yok. Rail dışı taşan eleman 0.
  Dokunma hedefleri 44px'e çıkarıldı (`@media max-width:900px` bloğu). Mobil menü
  açılıp kapanıyor, 6 linkin hedefi de mevcut. Temiz sekmede **0 konsol hatası**.
- **Modal:** `.modal-vertical` class'ı JS tarafından ekleniyordu ama **CSS'i hiç yoktu** —
  13 dikey Short 850px kutuda iki yanı siyah bantlı açılıyordu. CSS eklendi, artık
  9:16 (mobilde 351x622, oran 0.564). `.modal-player`'a `height:auto` verildi, mp4'ler
  kendi en-boy oranında açılıyor (kare 347x347, 16:9 347x242). Kapatma butonu mobilde 44x44.
- **Ölü kod temizlendi:** `app.js` 568 → 306 satır. Silinenler: `initPixelCanvas`
  (~180 satır, hiç çağrılmıyordu), `initAccordions`, `toggleAccordion`, `toggleInlinePlay`.
  CSS'ten `.button-dark`, `.preview-play`. CSS'te başka ölü class yok (tarandı).
- **SEO/paylaşım:** OG + Twitter Card meta etiketleri eklendi (önceden 0 taneydi),
  `canonical` eklendi. og:image = `hero-reference.png`.

## Mobil Düzen Sistemi (2 Eylül 2026)

**Tek eşik: 860px.** Altında "kaydır" modu, üstünde "grid + ok tuşu" modu.

- `< 860px` → `.rail` VE `.media-grid`'ler yatay kaydırmalı şeride dönüşür
  (`scroll-snap: x proximity`), `.rail-hint` ("KAYDIR ——") görünür, kenar solmaları aktif.
  Kart genişliği: 860-621px arası `%42`, 620px altı `%74` — **yarım kalan sonraki kart
  kasıtlı**, kaydırılabildiğini o anlatıyor.
- `≥ 860px` → grid'ler 3 sütun, `.rail-nav` ok tuşları görünür, ipuçları gizli.

`initRails()` artık `.rail`'in yanı sıra `.media-grid`'i de yönetiyor ve her `.rail-wrap`'e
`is-scrollable` / `can-left` / `can-right` sınıflarını basıyor (kenar solmaları bunlara bağlı).

### Dikkat edilecek tuzaklar
- `.rail-hint` **`z-index: 5`** olmalı — kenar solmaları `z-index: 4` ve aksi hâlde ipucunun
  üstünü örtüyor ("KAYDIR" yazısı kesik görünüyordu).
- Şeritlerde `padding-inline: 4px` var; `scroll-padding-inline: 4px` olmadan snap
  `scrollLeft`'i 4'te bırakıp sol solmayı yanlışlıkla tetikliyordu. JS eşiği de `> 6`.

### `#unreal-engine` boşluğu — kolon modunda flex-basis tuzağı
`.small-case-inner` 900px altında `flex-direction: column` oluyor. İlk çocuktaki
`flex: 1 1 460px` kolon modunda **yüksekliğe** uygulanınca başlık bloğu 460px'e şişip
devasa boşluk bırakıyordu. `flex: 0 0 auto` ile çözüldü. **Kolon flex'te basis = yükseklik.**

### Mobil hero
Metin ve butonlar 900px altında **ortalı** (`text-align: center` + `justify-content: center`).
Header'daki İletişim butonu 900px altında **gizli** — hamburger menüde zaten var.
Ortalanınca başlık görselin parlak bulut kısmına denk gelip okunmaz oldu; `.hero-art-overlay`
mobil sürümü yatay gradyandan **dikey scrim'e** çevrildi (metin bandı %34-52 arası karartılı).

## Açık Sorular / Sıradaki İşler (güncel)

- [ ] **Font lisansı:** elindekiler `-Trial` dosyaları. Canlıya çıkmadan TT Neoris
      (tercihen Variable) satın alınmalı ya da Fontshare "Switzer"a geçilmeli.
- [ ] **`assets/contact-bg.png`** kullanıcının kendi pixel-art görseliyle değiştirilecek
      (deniz kenarında CRT/kurgu masası + ağaç). Sadece dosyayı üzerine yazmak yeterli.
- [ ] **Kullanılmayan görseller silinebilir:** `hero-bg.png` (964 KB), `hero-bg.jpg`
      (370 KB), `hero-arcade.png` (1.5 MB — `contact-bg.png` olarak kopyası var).
      Ayrıca `TTNeorisTrial-DemiBold/Bold.ttf` (~500 KB) hiç yüklenmiyor.
- [ ] After Effects kart başlıklarındaki şahıs ismi kalsın mı?
- [ ] Başlıklarda nokta tutarsızlığı: bazıları "." ile bitiyor, 2 yeni başlık bitmiyor.
- [ ] GitHub'a push → Cloudflare Pages → `izharmedya.store` DNS.
      Not: repo artık ~31 MB video içeriyor; Pages'te sorun değil (dosya başı limit 25 MB,
      en büyüğü 13 MB) ama ilk push uzun sürebilir.

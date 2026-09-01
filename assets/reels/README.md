# Reels kapak görselleri

Instagram, kapak görsellerini dışarıya kapattığı için reels kartları
şu an tipografik poster (renk geçişi + ikon) ile gösteriliyor.

Gerçek kapağı eklemek için:

1. Videonun bir karesini `.jpg` olarak kaydedin (dikey, en az 720x1280).
2. Dosyayı bu klasöre reel kimliğiyle adlandırarak koyun, örn:
   `Db3XWg2IyBx.jpg`  (link: instagram.com/reel/**Db3XWg2IyBx**/)
3. `index.html` içinde o karta ait `<img src="assets/reels/....jpg" ...>`
   satırını saran `<!-- ... -->` yorumunu kaldırın.

Görsel eklenmezse kart yine düzgün görünür — poster arkada durmaya devam eder.

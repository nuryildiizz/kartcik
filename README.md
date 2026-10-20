# Kartçık

Özel gün kartı tasarlayıp sevdiklerine link olarak gönderebileceğin bir site.
Next.js 15 (App Router) + TypeScript ile yazıldı.

## Çalıştırma

```bash
npm install
npm run dev      # http://localhost:3000
```

Yayın için: `npm run build && npm start` (ya da projeyi Vercel'e yükle, ek ayar gerekmez).

## Özellikler

- 14 özel gün: Doğum günü, Yılbaşı, Sevgililer Günü, Geçmiş Olsun, Teşekkürler, Anneler Günü,
  Babalar Günü, Tebrikler, Bayram, Hoş Geldin Bebek, Düğün & Nişan, Öğretmenler Günü, Seni Özledim, Başka Bir Gün
- 45 hazır tasarım ve "Kendin tasarla": renk paleti, renk seçici, 17 çizim, 8 desen,
  6 yazı tipi, 5 çerçeve, 6 açılış efekti
- Her gün için hazır mesaj önerileri
- Gönderme: kopyalanabilir link, WhatsApp, e-posta, SMS, Telegram, telefonun paylaş menüsü
- Alıcı linki açınca zarf açılır, kart çıkar ve efekt (konfeti, kalp, kar...) yağar
- Kartı PNG olarak indirme, alıcının "Teşekkür kartı gönder" ile cevap yazabilmesi
- Taslak tarayıcıda saklanır; sayfa yenilense de kaybolmaz

## Nasıl çalışıyor?

Veritabanı yok. Kartın tüm bilgileri sıkıştırılıp linkin içine (`/kart?k=...`) yazılır
(`lib/encode.ts`). Link açılınca kart aynen geri çözülür. Bu yüzden sunucu tarafında
hiçbir şey saklanmaz; linke sahip olan herkes kartı görebilir.

## Dosya yapısı

```
app/
  page.tsx            Ana sayfa
  olustur/page.tsx    Kart oluşturma (4 adım)
  kart/page.tsx       Alıcının açtığı sayfa
components/
  Art.tsx             Sevimli SVG çizimler (pasta, ayıcık, çam...)
  CardView.tsx        Kartın kendisi (desen, çerçeve, yazılar)
  Editor.tsx          Kart oluşturma ekranı
  CardOpener.tsx      Zarf animasyonu
  Effects.tsx         Konfeti / kalp / kar efektleri
lib/
  occasions.ts        Özel günler, mesajlar, hazır tasarımlar, paletler
  encode.ts           Kartı linke çevirme
```

Yeni bir özel gün ya da tasarım eklemek için `lib/occasions.ts` dosyasına yeni bir kayıt eklemen yeterli.

## Sonraki adım fikirleri

- Kartı ileri bir tarihte e-postayla otomatik göndermek için bir e-posta servisi (Resend vb.) ve veritabanı eklenebilir.
- Link önizlemesi için `next/og` ile dinamik paylaşım görseli üretilebilir.

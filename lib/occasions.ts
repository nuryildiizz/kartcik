import type { ArtKey, CardDesign, EffectKey, FontKey, FrameKey, Occasion, PatternKey, Template } from "./types";

export interface Palette {
  name: string;
  b1: string;
  b2: string;
  ik: string;
  ac: string;
}

/** Kendin tasarla ekranındaki hazır renk paletleri */
export const PALETTES: Record<string, Palette> = {
  pembe: { name: "Pamuk Şeker", b1: "#FFE6EE", b2: "#FFC6D6", ik: "#5A2A3C", ac: "#FF6F91" },
  seftali: { name: "Şeftali", b1: "#FFF1E3", b2: "#FFD2B3", ik: "#5B3424", ac: "#FF8A5B" },
  limon: { name: "Limonata", b1: "#FFF9DB", b2: "#FFE896", ik: "#4E3D12", ac: "#F0A500" },
  nane: { name: "Nane", b1: "#E6F8F0", b2: "#BDEBD7", ik: "#1F4A3C", ac: "#2FAE7F" },
  gok: { name: "Gökyüzü", b1: "#E6F2FF", b2: "#BFDBFF", ik: "#1E3A5F", ac: "#4A8FE2" },
  lavanta: { name: "Lavanta", b1: "#F2EDFF", b2: "#D8CCFF", ik: "#3D2C66", ac: "#8E6CEF" },
  gece: { name: "Gece", b1: "#2B2452", b2: "#433680", ik: "#FFF4DA", ac: "#FFD166" },
  cam: { name: "Çam", b1: "#1E4A3D", b2: "#2F6B57", ik: "#FFF7E6", ac: "#FF6B6B" },
  kirmizi: { name: "Kiraz", b1: "#FF6B85", b2: "#E83A5E", ik: "#FFFFFF", ac: "#FFFFFF" },
  krem: { name: "Krem", b1: "#FFF9F0", b2: "#F5E6D0", ik: "#4A3426", ac: "#D9825B" },
  gul: { name: "Gül Kurusu", b1: "#F8E4E1", b2: "#EBC3BE", ik: "#5C3333", ac: "#C76B6B" },
  altin: { name: "Altın", b1: "#FFFCF4", b2: "#F2E4C6", ik: "#5A4520", ac: "#C9A24A" },
  bebek: { name: "Bebek Mavisi", b1: "#EEF7FF", b2: "#D5EBFB", ik: "#2E4A66", ac: "#7DB8E8" },
  lila: { name: "Lila Pembe", b1: "#FBEFFF", b2: "#F1D3FF", ik: "#4B2660", ac: "#C06BE0" },
};

function tpl(
  name: string,
  palette: keyof typeof PALETTES,
  a: ArtKey,
  p: PatternKey,
  f: FontKey,
  fm: FrameKey,
  fx: EffectKey,
  solid = false,
): Template {
  const { b1, b2, ik, ac } = PALETTES[palette];
  return { name, b1, b2: solid ? b1 : b2, ik, ac, a, p, f, fm, fx };
}

export const OCCASIONS: Occasion[] = [
  {
    id: "dogum-gunu",
    name: "Doğum Günü",
    hint: "Pasta, balon, sürpriz",
    title: "İyi ki Doğdun!",
    art: "cake",
    tint: "#FFC6D6",
    messages: [
      "Yeni yaşın sana bol kahkaha, güzel sürprizler ve sevdiğin her şeyden biraz daha fazlasını getirsin. İyi ki varsın!",
      "Bugün senin günün! Pastan tatlı, dileklerin gerçek, yılın kocaman bir mutluluk olsun.",
      "Bir yaş daha büyüdün ama bence hâlâ en tatlı halindesin. Nice mutlu yaşlara!",
    ],
    templates: [
      tpl("Pastalı Kutlama", "pembe", "cake", "confetti", "fredoka", "dashed", "confetti"),
      tpl("Balon Partisi", "gok", "balloons", "dots", "pacifico", "line", "confetti"),
      tpl("Hediye Paketi", "limon", "gift", "stars", "caveat", "double", "stars"),
      tpl("Gece Partisi", "gece", "cake", "stars", "dancing", "dotted", "stars"),
    ],
  },
  {
    id: "yilbasi",
    name: "Yılbaşı",
    hint: "Yeni yıl dilekleri",
    title: "Mutlu Yıllar!",
    art: "tree",
    tint: "#BDEBD7",
    messages: [
      "Yeni yıl sana sağlık, huzur ve bolca güzel an getirsin. Mutlu yıllar!",
      "Eski yılın tüm yorgunluğu geride kalsın, yeni yıl sıcacık bir başlangıç olsun.",
      "Yeni yılda dileklerin bir bir gerçekleşsin, yüzünden gülümsemen eksik olmasın.",
    ],
    templates: [
      tpl("Karlı Çam", "cam", "tree", "snow", "fredoka", "double", "snow"),
      tpl("Yıldızlı Gece", "gece", "star", "stars", "dancing", "dotted", "stars"),
      tpl("Kış Masalı", "gok", "tree", "snow", "caveat", "dashed", "snow"),
      tpl("Yeni Yıl Hediyesi", "pembe", "gift", "confetti", "pacifico", "line", "confetti"),
    ],
  },
  {
    id: "sevgililer",
    name: "Sevgililer Günü",
    hint: "Kalpten gelen sözler",
    title: "Seni Seviyorum",
    art: "heart",
    tint: "#FFB3C4",
    messages: [
      "Seninle geçen her gün, takvimdeki en güzel gün. Sevgililer günümüz kutlu olsun.",
      "Kalbimin en güzel köşesi hep senin. İyi ki benimlesin.",
      "Dünyanın tüm çiçekleri bir yana, senin gülüşün bir yana. Seni çok seviyorum.",
    ],
    templates: [
      tpl("Kiraz Kalp", "kirmizi", "heart", "hearts", "pacifico", "line", "hearts"),
      tpl("Sarılan Ayıcık", "pembe", "bear", "hearts", "fredoka", "dashed", "hearts"),
      tpl("Gül Kurusu", "gul", "flower", "flowers", "dancing", "double", "petals"),
      tpl("Aşk Mektubu", "krem", "envelope", "hearts", "caveat", "dotted", "hearts"),
    ],
  },
  {
    id: "gecmis-olsun",
    name: "Geçmiş Olsun",
    hint: "Acil şifalar dileği",
    title: "Geçmiş Olsun",
    art: "tea",
    tint: "#FFE896",
    messages: [
      "Bir an önce iyileşip eski enerjine kavuşmanı diliyorum. Sıcak bir çay benden, şifa Allah'tan.",
      "Kendine iyi bak, bol bol dinlen. Seni yeniden ayakta görmek için sabırsızlanıyoruz.",
      "Acil şifalar! Bu günler çabucak geçsin, yerini güzel günler alsın.",
    ],
    templates: [
      tpl("Sıcak Çay", "seftali", "tea", "dots", "fredoka", "dashed", "petals"),
      tpl("Güneşli Günler", "limon", "sun", "none", "caveat", "line", "stars"),
      tpl("Şifalı Çiçek", "nane", "flower", "flowers", "quicksand", "double", "petals"),
    ],
  },
  {
    id: "tesekkur",
    name: "Teşekkürler",
    hint: "Minnetini göster",
    title: "Teşekkür Ederim",
    art: "envelope",
    tint: "#D8CCFF",
    messages: [
      "Yaptığın her şey için kocaman teşekkürler. İyi ki hayatımdasın.",
      "Desteğin benim için çok kıymetliydi. Bu iyiliği unutmayacağım.",
      "Küçük bir teşekkür, kocaman bir minnet. Her şey için sağ ol!",
    ],
    templates: [
      tpl("Minik Mektup", "lavanta", "envelope", "dots", "caveat", "dashed", "hearts"),
      tpl("Teşekkür Buketi", "krem", "flower", "flowers", "playfair", "double", "petals"),
      tpl("Kalpten", "nane", "heart", "hearts", "fredoka", "line", "hearts"),
    ],
  },
  {
    id: "anneler-gunu",
    name: "Anneler Günü",
    hint: "Canım anneme",
    title: "Anneler Günün Kutlu Olsun",
    art: "flower",
    tint: "#F1D3FF",
    messages: [
      "Dünyanın en güzel kalbine sahip anneme... İyi ki benim annemsin, seni çok seviyorum.",
      "Her şeyimi sana borçluyum. Anneler günün kutlu olsun, canım annem.",
      "Sarılmaların, sabrın ve sevgin için teşekkür ederim. Seni çok seviyorum anneciğim.",
    ],
    templates: [
      tpl("Lale Bahçesi", "lila", "flower", "flowers", "dancing", "double", "petals"),
      tpl("Kocaman Sevgi", "pembe", "heart", "hearts", "fredoka", "dashed", "hearts"),
      tpl("Ayıcıklı", "seftali", "bear", "dots", "caveat", "line", "hearts"),
    ],
  },
  {
    id: "babalar-gunu",
    name: "Babalar Günü",
    hint: "Kahraman babama",
    title: "Babalar Günün Kutlu Olsun",
    art: "tie",
    tint: "#BFDBFF",
    messages: [
      "Benim ilk kahramanım, en büyük destekçim. Babalar günün kutlu olsun, iyi ki varsın.",
      "Her zaman yanımda olduğun için teşekkürler baba. Seni çok seviyorum.",
      "Güçlü ellerin ve kocaman yüreğin için... Babalar günün kutlu olsun.",
    ],
    templates: [
      tpl("Şık Kravat", "gok", "tie", "stripes", "fredoka", "line", "stars"),
      tpl("Yıldız Baba", "gece", "star", "stars", "quicksand", "dotted", "stars"),
      tpl("Sabah Çayı", "krem", "tea", "dots", "caveat", "dashed", "none"),
    ],
  },
  {
    id: "tebrikler",
    name: "Tebrikler",
    hint: "Mezuniyet, başarı, terfi",
    title: "Tebrikler!",
    art: "star",
    tint: "#FFE896",
    messages: [
      "Emeğinin karşılığını aldın, seninle gurur duyuyorum. Nice başarılara!",
      "Bu başarı tam sana yakıştı. Yolun hep açık, şansın hep yaver olsun.",
      "Hak ettiğin her şeye kavuşman dileğiyle... Tebrikler!",
    ],
    templates: [
      tpl("Parlayan Yıldız", "limon", "star", "confetti", "fredoka", "dashed", "confetti"),
      tpl("Mezuniyet", "gece", "cap", "stars", "playfair", "double", "confetti"),
      tpl("Balonlu Kutlama", "nane", "balloons", "dots", "pacifico", "line", "confetti"),
    ],
  },
  {
    id: "bayram",
    name: "Bayram",
    hint: "Bayram tebriği",
    title: "İyi Bayramlar",
    art: "moon",
    tint: "#C9B8FF",
    messages: [
      "Bayramın sana ve sevdiklerine huzur, sağlık ve bereket getirsin. İyi bayramlar!",
      "Sofraların bereketli, gönlün ferah, kapın misafirli olsun. Bayramın mübarek olsun.",
      "Uzakta da olsak bayram sevinci hep bir arada. Nice güzel bayramlara!",
    ],
    templates: [
      tpl("Hilal ve Yıldız", "gece", "moon", "stars", "playfair", "double", "stars"),
      tpl("Bayram Şekeri", "pembe", "gift", "dots", "fredoka", "dashed", "confetti"),
      tpl("Bahar Bayramı", "nane", "flower", "flowers", "dancing", "line", "petals"),
    ],
  },
  {
    id: "yeni-bebek",
    name: "Hoş Geldin Bebek",
    hint: "Ailenin yeni üyesi",
    title: "Hoş Geldin Minik",
    art: "baby",
    tint: "#D5EBFB",
    messages: [
      "Minik mucizeniz dünyaya hoş geldi! Sağlıkla, mutlulukla, kucak dolusu sevgiyle büyüsün.",
      "Evinize neşe dolu bir yıldız düştü. Allah analı babalı büyütsün.",
      "Minik ellere, minik ayaklara, kocaman bir sevgiye... Gözünüz aydın!",
    ],
    templates: [
      tpl("Mavi Tulum", "bebek", "baby", "dots", "fredoka", "dashed", "stars"),
      tpl("Pembe Tulum", "pembe", "baby", "hearts", "quicksand", "dashed", "hearts"),
      tpl("Uyku Ayıcığı", "lavanta", "bear", "stars", "caveat", "line", "stars"),
    ],
  },
  {
    id: "dugun",
    name: "Düğün & Nişan",
    hint: "Bir ömür mutluluk",
    title: "Bir Ömür Mutluluk",
    art: "rings",
    tint: "#F2E4C6",
    messages: [
      "Bir yastıkta kocayın! Hayatınız sevgi, anlayış ve kahkahayla dolsun.",
      "İki kalbin yolu birleşti. Mutluluğunuz hiç eksilmesin, tebrikler!",
      "Birlikte yazacağınız hikâye en güzel hikâye olsun. Nice mutlu yıllara!",
    ],
    templates: [
      tpl("Altın Yüzükler", "altin", "rings", "none", "playfair", "double", "petals", true),
      tpl("Gül Bahçesi", "gul", "flower", "flowers", "dancing", "line", "petals"),
      tpl("İki Kalp", "krem", "heart", "hearts", "caveat", "dotted", "hearts"),
    ],
  },
  {
    id: "ogretmenler-gunu",
    name: "Öğretmenler Günü",
    hint: "Emeğiniz için teşekkürler",
    title: "Öğretmenler Gününüz Kutlu Olsun",
    art: "apple",
    tint: "#FFC9B8",
    messages: [
      "Bize öğrettiğiniz her şey için teşekkür ederiz. Öğretmenler gününüz kutlu olsun!",
      "Işığınız hep yolumuzu aydınlattı. Emekleriniz için minnettarız.",
      "Sabrınız ve sevginizle bize kattığınız her şey için çok teşekkürler hocam.",
    ],
    templates: [
      tpl("Kırmızı Elma", "seftali", "apple", "dots", "caveat", "dashed", "stars"),
      tpl("Yıldız Öğretmen", "limon", "star", "stars", "fredoka", "line", "confetti"),
      tpl("Çiçek Teşekkür", "nane", "flower", "flowers", "quicksand", "double", "petals"),
    ],
  },
  {
    id: "ozledim",
    name: "Seni Özledim",
    hint: "Aklımdasın diye",
    title: "Seni Özledim",
    art: "bear",
    tint: "#FFD2B3",
    messages: [
      "Bugün yine aklıma düştün. Seni çok özledim, en kısa zamanda görüşelim.",
      "Aramızda kilometreler olsa da kalbim hep yanında.",
      "Sadece seni düşündüğümü bilmeni istedim. Kendine iyi bak.",
    ],
    templates: [
      tpl("Kucak Dolusu", "seftali", "bear", "hearts", "caveat", "dashed", "hearts"),
      tpl("Ay Işığı", "gece", "moon", "stars", "dancing", "dotted", "stars"),
      tpl("Güneşim", "limon", "sun", "dots", "fredoka", "line", "none"),
    ],
  },
  {
    id: "ozel-gun",
    name: "Başka Bir Gün",
    hint: "Kendi gününü yarat",
    title: "Sana Bir Not",
    art: "envelope",
    tint: "#E6F8F0",
    messages: [
      "Bunu sadece seni düşündüğüm için gönderiyorum. Güzel bir gün geçirmeni dilerim!",
      "Hayatımda olduğun için çok mutluyum.",
      "Küçük bir hatırlatma: Sen harikasın!",
    ],
    templates: [
      tpl("Nane Notu", "nane", "envelope", "dots", "caveat", "dashed", "none"),
      tpl("Güneşli Not", "limon", "sun", "none", "fredoka", "line", "stars"),
      tpl("Lavanta Kalp", "lavanta", "heart", "hearts", "pacifico", "dotted", "hearts"),
    ],
  },
];

export function getOccasion(id: string | undefined | null): Occasion {
  return OCCASIONS.find((o) => o.id === id) ?? OCCASIONS[0];
}

export function designOf(t: CardDesign): CardDesign {
  const { b1, b2, ik, ac, f, p, a, fm, fx } = t;
  return { b1, b2, ik, ac, f, p, a, fm, fx };
}

export const FONTS: { key: FontKey; name: string; css: string; scale: number }[] = [
  { key: "fredoka", name: "Yuvarlak", css: "'Fredoka Variable', sans-serif", scale: 1 },
  { key: "caveat", name: "El Yazısı", css: "'Caveat Variable', cursive", scale: 1.25 },
  { key: "pacifico", name: "Neşeli", css: "'Pacifico', cursive", scale: 0.9 },
  { key: "dancing", name: "Zarif", css: "'Dancing Script Variable', cursive", scale: 1.15 },
  { key: "quicksand", name: "Sade", css: "'Quicksand Variable', sans-serif", scale: 1 },
  { key: "playfair", name: "Klasik", css: "'Playfair Display Variable', serif", scale: 0.95 },
];

export const fontOf = (k: FontKey) => FONTS.find((f) => f.key === k) ?? FONTS[0];

export const PATTERNS: { key: PatternKey; name: string }[] = [
  { key: "none", name: "Sade" },
  { key: "dots", name: "Puantiye" },
  { key: "hearts", name: "Kalpler" },
  { key: "stars", name: "Yıldızlar" },
  { key: "snow", name: "Kar" },
  { key: "confetti", name: "Konfeti" },
  { key: "flowers", name: "Çiçekler" },
  { key: "stripes", name: "Çizgili" },
];

export const FRAMES: { key: FrameKey; name: string }[] = [
  { key: "none", name: "Yok" },
  { key: "line", name: "İnce" },
  { key: "dashed", name: "Dikiş" },
  { key: "double", name: "Çift" },
  { key: "dotted", name: "Noktalı" },
];

export const EFFECTS: { key: EffectKey; name: string }[] = [
  { key: "none", name: "Yok" },
  { key: "confetti", name: "Konfeti" },
  { key: "hearts", name: "Kalp yağmuru" },
  { key: "snow", name: "Kar" },
  { key: "stars", name: "Yıldızlar" },
  { key: "petals", name: "Yapraklar" },
];

export const ARTS: { key: ArtKey; name: string }[] = [
  { key: "cake", name: "Pasta" },
  { key: "balloons", name: "Balonlar" },
  { key: "gift", name: "Hediye" },
  { key: "tree", name: "Çam" },
  { key: "star", name: "Yıldız" },
  { key: "heart", name: "Kalp" },
  { key: "bear", name: "Ayıcık" },
  { key: "tea", name: "Çay" },
  { key: "sun", name: "Güneş" },
  { key: "flower", name: "Lale" },
  { key: "envelope", name: "Mektup" },
  { key: "tie", name: "Kravat" },
  { key: "cap", name: "Kep" },
  { key: "moon", name: "Hilal" },
  { key: "baby", name: "Tulum" },
  { key: "rings", name: "Yüzük" },
  { key: "apple", name: "Elma" },
  { key: "none", name: "Yok" },
];

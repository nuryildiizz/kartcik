export type FontKey = "fredoka" | "caveat" | "pacifico" | "dancing" | "quicksand" | "playfair";

export type PatternKey =
  | "none"
  | "dots"
  | "hearts"
  | "stars"
  | "snow"
  | "confetti"
  | "flowers"
  | "stripes";

export type EffectKey = "none" | "confetti" | "hearts" | "snow" | "stars" | "petals";

export type FrameKey = "none" | "line" | "dashed" | "double" | "dotted";

export type ArtKey =
  | "none"
  | "cake"
  | "balloons"
  | "gift"
  | "tree"
  | "star"
  | "heart"
  | "bear"
  | "tea"
  | "sun"
  | "flower"
  | "envelope"
  | "tie"
  | "cap"
  | "moon"
  | "baby"
  | "rings"
  | "apple";

/** Kartın görsel tasarımı */
export interface CardDesign {
  b1: string; // arka plan rengi 1
  b2: string; // arka plan rengi 2 (b1 ile aynıysa düz renk)
  ik: string; // yazı rengi
  ac: string; // vurgu rengi (çizim ve desen)
  f: FontKey;
  p: PatternKey;
  a: ArtKey;
  fm: FrameKey;
  fx: EffectKey;
}

/** Linkle gönderilen kartın tamamı */
export interface CardData extends CardDesign {
  o: string; // özel gün id
  t: string; // başlık
  to: string; // alıcı
  fr: string; // gönderen
  m: string; // mesaj
}

export interface Template extends CardDesign {
  name: string;
}

export interface Occasion {
  id: string;
  name: string;
  hint: string;
  title: string;
  art: ArtKey;
  tint: string;
  messages: string[];
  templates: Template[];
}

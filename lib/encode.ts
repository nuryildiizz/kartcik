import type { CardData } from "./types";

/*
 * Kart, veritabanı gerektirmeden linkin içine gömülür.
 * JSON -> UTF-8 -> base64url. Alıcı linki açtığında kart aynen geri çözülür.
 */

const KEYS: (keyof CardData)[] = [
  "o", "t", "to", "fr", "m", "b1", "b2", "ik", "ac", "f", "p", "a", "fm", "fx",
];

function toB64Url(bytes: Uint8Array): string {
  let bin = "";
  bytes.forEach((b) => (bin += String.fromCharCode(b)));
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromB64Url(s: string): Uint8Array {
  const b64 = s.replace(/-/g, "+").replace(/_/g, "/");
  const bin = atob(b64 + "===".slice((b64.length + 3) % 4));
  return Uint8Array.from(bin, (c) => c.charCodeAt(0));
}

export function encodeCard(card: CardData): string {
  // Sabit sıralı dizi olarak saklanır; anahtar adları linki uzatmasın
  const arr = KEYS.map((k) => card[k]);
  return toB64Url(new TextEncoder().encode(JSON.stringify(arr)));
}

const HEX = /^#[0-9a-fA-F]{6}$/;

export function decodeCard(s: string | null | undefined): CardData | null {
  if (!s) return null;
  try {
    const arr = JSON.parse(new TextDecoder().decode(fromB64Url(s)));
    if (!Array.isArray(arr) || arr.length !== KEYS.length) return null;
    if (!arr.every((v) => typeof v === "string")) return null;
    const card = Object.fromEntries(KEYS.map((k, i) => [k, arr[i]])) as unknown as CardData;
    if (![card.b1, card.b2, card.ik, card.ac].every((c) => HEX.test(c))) return null;
    // Aşırı uzun metinleri kırp
    card.t = card.t.slice(0, 60);
    card.to = card.to.slice(0, 40);
    card.fr = card.fr.slice(0, 40);
    card.m = card.m.slice(0, 400);
    return card;
  } catch {
    return null;
  }
}

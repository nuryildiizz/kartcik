"use client";

/** Kart DOM öğesini PNG olarak indirir */
export async function downloadCard(node: HTMLElement, name: string) {
  const { toPng } = await import("html-to-image");
  await document.fonts.ready;
  const url = await toPng(node, { pixelRatio: 3, cacheBust: true });
  const a = document.createElement("a");
  a.href = url;
  a.download = `${name || "kart"}.png`;
  a.click();
}

export function slug(s: string) {
  return s
    .toLocaleLowerCase("tr")
    .replace(/ç/g, "c").replace(/ğ/g, "g").replace(/ı/g, "i").replace(/ö/g, "o").replace(/ş/g, "s").replace(/ü/g, "u")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

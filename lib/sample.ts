import type { CardData, Occasion } from "./types";
import { designOf } from "./occasions";

export function sampleCard(occ: Occasion, i = 0, extra?: Partial<CardData>): CardData {
  const t = occ.templates[i] ?? occ.templates[0];
  return {
    ...designOf(t),
    o: occ.id,
    t: occ.title,
    to: "Ayşe",
    fr: "Deniz",
    m: occ.messages[i % occ.messages.length],
    ...extra,
  };
}

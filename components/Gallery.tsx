"use client";

import Link from "next/link";
import { useState } from "react";
import { OCCASIONS } from "@/lib/occasions";
import { sampleCard } from "@/lib/sample";
import CardView from "./CardView";

export default function Gallery() {
  const [filter, setFilter] = useState<string>("hepsi");
  const [expanded, setExpanded] = useState(false);
  const all = OCCASIONS.flatMap((occ) => occ.templates.map((t, i) => ({ occ, t, i })));
  const list = all.filter(({ occ, i }) =>
    filter === "hepsi" ? expanded || i === 0 : occ.id === filter,
  );

  return (
    <>
      <div className="chips chips-scroll" role="tablist" aria-label="Özel güne göre filtrele">
        <button className={`chip ${filter === "hepsi" ? "on" : ""}`} onClick={() => setFilter("hepsi")}>
          Hepsi
        </button>
        {OCCASIONS.map((o) => (
          <button key={o.id} className={`chip ${filter === o.id ? "on" : ""}`} onClick={() => setFilter(o.id)}>
            {o.name}
          </button>
        ))}
      </div>
      <div className="gallery">
        {list.map(({ occ, t, i }) => (
          <Link key={occ.id + i} href={`/olustur?gun=${occ.id}&tasarim=${i}`} className="gallery-item">
            <div className="gallery-card">
              <CardView card={sampleCard(occ, i)} />
            </div>
            <div className="gallery-meta">
              <strong>{t.name}</strong>
              <span>{occ.name}</span>
            </div>
          </Link>
        ))}
      </div>
      {filter === "hepsi" && !expanded && (
        <div className="gallery-more">
          <button className="btn btn-ghost" onClick={() => setExpanded(true)}>
            Tüm {all.length} tasarımı göster
          </button>
        </div>
      )}
    </>
  );
}

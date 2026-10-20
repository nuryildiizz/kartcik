"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import type { CardData } from "@/lib/types";
import { darken, isDark, lighten } from "@/lib/color";
import { downloadCard, slug } from "@/lib/download";
import { getOccasion } from "@/lib/occasions";
import CardView from "./CardView";
import Art, { HEART } from "./Art";
import Effects from "./Effects";
import Icon from "./Icon";

type Stage = "closed" | "opening" | "rising" | "open";

export default function CardOpener({ card }: { card: CardData }) {
  const [stage, setStage] = useState<Stage>("closed");
  const [play, setPlay] = useState(0);
  const [busy, setBusy] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const env = isDark(card.b2) ? lighten(card.b2, 0.15) : card.b2;
  const flap = darken(env, 0.07);
  const seal = card.ac === "#FFFFFF" || card.ac.toUpperCase() === env.toUpperCase() ? darken(env, 0.35) : card.ac;
  const artAc = card.ac === "#FFFFFF" ? "#FF6F91" : card.ac;

  const open = () => {
    if (stage !== "closed") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setStage("open");
      return;
    }
    setStage("opening");
    setTimeout(() => setStage("rising"), 650);
    setTimeout(() => {
      setStage("open");
      setPlay((p) => p + 1);
    }, 1650);
  };

  const download = async () => {
    if (!cardRef.current) return;
    setBusy(true);
    try {
      await downloadCard(cardRef.current, slug(`${getOccasion(card.o).name}-${card.to}`));
    } catch {
      alert("Resim oluşturulamadı, lütfen tekrar dene.");
    }
    setBusy(false);
  };

  const reply = `/olustur?gun=tesekkur&kime=${encodeURIComponent(card.fr)}&kimden=${encodeURIComponent(card.to)}`;

  return (
    <div className={`opener stage-${stage}`}>
      <Effects kind={card.fx} play={play} />

      {stage !== "open" ? (
        <div className="opener-closed">
          <h1 className="opener-title">{card.to ? `${card.to}, sana bir kart var!` : "Sana bir kart var!"}</h1>
          {card.fr && <p className="opener-sub">{card.fr} gönderdi</p>}

          <button className="envelope" onClick={open} aria-label="Zarfı aç" style={{ "--env": env, "--flap": flap } as React.CSSProperties}>
            <span className="env-back" />
            <span className="env-letter" style={{ background: `linear-gradient(160deg, ${card.b1}, ${card.b2})` }}>
              {card.a !== "none" && (
                <span className="env-letter-art">
                  <Art kind={card.a} ac={artAc} />
                </span>
              )}
            </span>
            <span className="env-front" />
            <span className="env-flap" />
            <span className="env-seal">
              <svg viewBox="0 0 120 120" aria-hidden="true">
                <circle cx={60} cy={60} r={56} fill={seal} />
                <circle cx={60} cy={60} r={46} fill="none" stroke="#fff" strokeOpacity={0.35} strokeWidth={3} strokeDasharray="6 6" />
                <path d={HEART} fill="#fff" transform="translate(60 62) scale(0.48) translate(-60 -64)" />
              </svg>
            </span>
          </button>

          <p className={`opener-hint ${stage === "closed" ? "" : "hide"}`}>Açmak için zarfa dokun</p>
        </div>
      ) : (
        <div className="opener-open">
          <div className="opened-card">
            <CardView ref={cardRef} card={card} />
          </div>
          <div className="opened-actions">
            {card.fx !== "none" && (
              <button className="btn btn-ghost" onClick={() => setPlay((p) => p + 1)}>
                <Icon name="replay" size={18} /> Tekrar oynat
              </button>
            )}
            <button className="btn btn-ghost" onClick={download} disabled={busy}>
              <Icon name="download" size={18} /> {busy ? "Hazırlanıyor..." : "Kartı indir"}
            </button>
          </div>
          <div className="reply-box">
            <p>{card.fr ? `${card.fr} için sen de bir kart hazırlamak ister misin?` : "Sen de bir kart hazırlamak ister misin?"}</p>
            <div className="reply-actions">
              {card.fr && (
                <Link href={reply} className="btn btn-primary">
                  <Icon name="heart" size={18} /> Teşekkür kartı gönder
                </Link>
              )}
              <Link href="/olustur" className="btn btn-ghost">
                Kendi kartını oluştur
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

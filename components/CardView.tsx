import { useId, forwardRef } from "react";
import type { CardData, PatternKey } from "@/lib/types";
import { fontOf } from "@/lib/occasions";
import { withAlpha } from "@/lib/color";
import Art, { starPath } from "./Art";

const CONFETTI = ["#FFD66B", "#8FD3C1", "#C9B8FF", "#FF8FA3"];

function PatternTile({ kind, ac }: { kind: PatternKey; ac: string }) {
  switch (kind) {
    case "dots":
      return (
        <g fill={ac}>
          <circle cx={12} cy={12} r={4} />
          <circle cx={37} cy={37} r={4} />
        </g>
      );
    case "hearts":
      return (
        <g fill={ac}>
          <path d="M14 22 c-7 -5 -10 -9 -8 -13 c2 -3 6 -3 8 0 c2 -3 6 -3 8 0 c2 4 -1 8 -8 13z" />
          <path d="M38 46 c-5 -3.6 -7 -6.5 -5.8 -9.3 c1.4 -2.2 4.4 -2.2 5.8 0 c1.4 -2.2 4.4 -2.2 5.8 0 c1.4 2.8 -.8 5.7 -5.8 9.3z" transform="rotate(15 38 40)" />
        </g>
      );
    case "stars":
      return (
        <g fill={ac} stroke={ac} strokeLinejoin="round">
          <path d={starPath(14, 15, 7, 3)} strokeWidth={1.5} />
          <path d="M38 31 Q38 37 44 37 Q38 37 38 43 Q38 37 32 37 Q38 37 38 31Z" strokeWidth={0.5} />
        </g>
      );
    case "snow":
      return (
        <g stroke={ac} strokeWidth={1.8} strokeLinecap="round" fill={ac}>
          <path d="M14 7 V21 M8 10.5 L20 17.5 M8 17.5 L20 10.5" />
          <circle cx={38} cy={38} r={2.6} stroke="none" />
          <circle cx={40} cy={14} r={1.6} stroke="none" />
          <circle cx={12} cy={40} r={1.8} stroke="none" />
        </g>
      );
    case "confetti":
      return (
        <g>
          <rect x={8} y={8} width={8} height={3.5} rx={1.5} fill={ac} transform="rotate(30 12 10)" />
          <rect x={32} y={12} width={7} height={3.5} rx={1.5} fill={CONFETTI[0]} transform="rotate(-25 35 14)" />
          <rect x={18} y={34} width={7} height={3.5} rx={1.5} fill={CONFETTI[1]} transform="rotate(60 21 36)" />
          <circle cx={42} cy={40} r={2.4} fill={CONFETTI[2]} />
          <circle cx={6} cy={28} r={2} fill={CONFETTI[3]} />
        </g>
      );
    case "flowers":
      return (
        <g>
          {[0, 72, 144, 216, 288].map((r) => (
            <circle key={r} cx={14} cy={9} r={4} fill={ac} transform={`rotate(${r} 14 14)`} />
          ))}
          <circle cx={14} cy={14} r={3} fill="#FFD66B" />
          {[0, 90, 180, 270].map((r) => (
            <circle key={r} cx={38} cy={35} r={2.6} fill={ac} transform={`rotate(${r} 38 38)`} />
          ))}
        </g>
      );
    case "stripes":
      return <rect x={0} y={0} width={10} height={50} fill={ac} />;
    default:
      return null;
  }
}

function Pattern({ kind, ac }: { kind: PatternKey; ac: string }) {
  const id = "p" + useId().replace(/:/g, "");
  if (kind === "none") return null;
  const isConfetti = kind === "confetti";
  return (
    <svg className="card-pattern" viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <pattern
          id={id}
          width={kind === "stripes" ? 25 : 50}
          height={50}
          patternUnits="userSpaceOnUse"
          patternTransform={kind === "stripes" ? "rotate(35)" : undefined}
        >
          <PatternTile kind={kind} ac={ac} />
        </pattern>
      </defs>
      <rect width="400" height="500" fill={`url(#${id})`} opacity={isConfetti ? 0.55 : kind === "stripes" ? 0.12 : 0.22} />
    </svg>
  );
}

function sizeFor(len: number, steps: [number, number][], base: number) {
  for (const [max, size] of steps) if (len <= max) return size;
  return base;
}

interface Props {
  card: CardData;
  className?: string;
}

/**
 * Kartın kendisi. Tüm ölçüler kartın genişliğine göre (cqw) ayarlanır,
 * böylece küçük önizlemelerde de büyük ekranda da aynı görünür.
 */
const CardView = forwardRef<HTMLDivElement, Props>(function CardView({ card, className }, ref) {
  const font = fontOf(card.f);
  const hasArt = card.a !== "none";
  const titleSize = sizeFor(card.t.length, [[12, 10], [18, 8.6], [26, 7.2], [36, 6.2]], 5.4) * font.scale;
  const msgSize =
    sizeFor(card.m.length, [[70, 5.4], [120, 4.8], [180, 4.2], [250, 3.7], [320, 3.3]], 3) *
    (card.f === "caveat" ? 1.2 : card.f === "dancing" ? 1.1 : 1);
  const msgFont = card.f === "pacifico" ? "'Quicksand Variable', sans-serif" : font.css;

  return (
    <div
      ref={ref}
      className={`card ${className ?? ""}`}
      style={{
        background: card.b1 === card.b2 ? card.b1 : `linear-gradient(160deg, ${card.b1} 0%, ${card.b2} 100%)`,
        color: card.ik,
      }}
    >
      <Pattern kind={card.p} ac={card.ac} />
      {card.fm !== "none" && (
        <div className={`card-frame frame-${card.fm}`} style={{ borderColor: withAlpha(card.ik, 0.38) }} />
      )}
      <div className={`card-inner ${hasArt ? "" : "no-art"}`}>
        {hasArt && (
          <div className="card-art">
            <Art kind={card.a} ac={card.ac} />
          </div>
        )}
        {card.t && (
          <h2 className="card-title" style={{ fontFamily: font.css, fontSize: `${titleSize}cqw` }}>
            {card.t}
          </h2>
        )}
        <div className="card-body" style={{ fontFamily: msgFont, fontSize: `${msgSize}cqw` }}>
          {card.to && <p className="card-to">Sevgili {card.to},</p>}
          <p className="card-msg">{card.m || "Mesajın burada görünecek..."}</p>
        </div>
        {card.fr && (
          <p className="card-from" style={{ fontFamily: font.css, fontSize: `${Math.max(msgSize * 1.05, 4.2)}cqw` }}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 21 C4 15 2 11 3 8 C4.4 4.6 9 4 12 7.5 C15 4 19.6 4.6 21 8 C22 11 20 15 12 21Z" fill={card.ac === "#FFFFFF" ? card.ik : card.ac} />
            </svg>
            {card.fr}
          </p>
        )}
      </div>
    </div>
  );
});

export default CardView;

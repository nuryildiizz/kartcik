"use client";

import { useEffect, useState } from "react";
import type { EffectKey } from "@/lib/types";
import { starPath } from "./Art";

const COLORS = ["#FF8FA3", "#FFD66B", "#8FD3C1", "#C9B8FF", "#7DB8E8", "#FF8A5B"];

interface Particle {
  left: number;
  delay: number;
  dur: number;
  size: number;
  drift: number;
  spin: number;
  color: string;
  variant: number;
}

function Shape({ kind, p }: { kind: EffectKey; p: Particle }) {
  switch (kind) {
    case "confetti":
      return p.variant % 3 === 0 ? (
        <circle cx={12} cy={12} r={6} fill={p.color} />
      ) : (
        <rect x={4} y={8} width={16} height={8} rx={2} fill={p.color} />
      );
    case "hearts":
      return (
        <path d="M12 21 C4 15 2 11 3 8 C4.4 4.6 9 4 12 7.5 C15 4 19.6 4.6 21 8 C22 11 20 15 12 21Z" fill={p.variant % 2 ? "#FF6F91" : "#FF9FB4"} />
      );
    case "snow":
      return p.variant % 2 ? (
        <circle cx={12} cy={12} r={5} fill="#fff" />
      ) : (
        <path d="M12 3 V21 M4.2 7.5 L19.8 16.5 M4.2 16.5 L19.8 7.5" stroke="#fff" strokeWidth={2.2} strokeLinecap="round" />
      );
    case "stars":
      return <path d={starPath(12, 12.5, 10, 4.4)} fill={p.variant % 2 ? "#FFD66B" : "#FFE9A8"} stroke={p.variant % 2 ? "#FFD66B" : "#FFE9A8"} strokeWidth={1.5} strokeLinejoin="round" />;
    case "petals":
      return <path d="M12 2 C19 7 19 16 12 22 C5 16 5 7 12 2Z" fill={p.variant % 2 ? "#FFB3C4" : "#FFD3DD"} />;
    default:
      return null;
  }
}

/** Kart açıldığında ekrana yağan süsler. `play` her değiştiğinde yeniden oynar. */
export default function Effects({ kind, play }: { kind: EffectKey; play: number }) {
  const [parts, setParts] = useState<Particle[]>([]);

  useEffect(() => {
    if (kind === "none" || play === 0) {
      setParts([]);
      return;
    }
    const n = kind === "snow" ? 60 : 44;
    setParts(
      Array.from({ length: n }, (_, i) => ({
        left: Math.random() * 100,
        delay: Math.random() * 2.4,
        dur: 4.2 + Math.random() * 3.2,
        size: 12 + Math.random() * 14,
        drift: (Math.random() - 0.5) * 160,
        spin: (Math.random() - 0.5) * 720,
        color: COLORS[i % COLORS.length],
        variant: i,
      })),
    );
    const t = setTimeout(() => setParts([]), 10500);
    return () => clearTimeout(t);
  }, [kind, play]);

  if (!parts.length) return null;

  return (
    <div className={`effects effects-${kind}`} aria-hidden="true" key={play}>
      {parts.map((p, i) => (
        <span
          key={i}
          className="particle"
          style={
            {
              left: `${p.left}%`,
              width: p.size,
              height: p.size,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.dur}s`,
              "--drift": `${p.drift}px`,
              "--spin": `${p.spin}deg`,
            } as React.CSSProperties
          }
        >
          <svg viewBox="0 0 24 24" width="100%" height="100%">
            <Shape kind={kind} p={p} />
          </svg>
        </span>
      ))}
    </div>
  );
}

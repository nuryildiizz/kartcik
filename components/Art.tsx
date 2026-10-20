import { useId } from "react";
import type { ArtKey } from "@/lib/types";
import { darken, lighten } from "@/lib/color";

const FACE = "#3A2830";
const BLUSH = "#FF8FA3";
const SUN = "#FFD66B";
const LEAF = "#5CC08A";

function Face({
  x,
  y,
  gap = 8,
  s = 1,
  sleepy = false,
}: {
  x: number;
  y: number;
  gap?: number;
  s?: number;
  sleepy?: boolean;
}) {
  return (
    <g>
      {sleepy ? (
        <>
          <path d={`M${x - gap - 3 * s} ${y} q${3 * s} ${3 * s} ${6 * s} 0`} stroke={FACE} strokeWidth={2 * s} fill="none" strokeLinecap="round" />
          <path d={`M${x + gap - 3 * s} ${y} q${3 * s} ${3 * s} ${6 * s} 0`} stroke={FACE} strokeWidth={2 * s} fill="none" strokeLinecap="round" />
        </>
      ) : (
        <>
          <ellipse cx={x - gap} cy={y} rx={2.6 * s} ry={3.1 * s} fill={FACE} />
          <ellipse cx={x + gap} cy={y} rx={2.6 * s} ry={3.1 * s} fill={FACE} />
          <circle cx={x - gap + 0.9 * s} cy={y - 1.1 * s} r={0.9 * s} fill="#fff" />
          <circle cx={x + gap + 0.9 * s} cy={y - 1.1 * s} r={0.9 * s} fill="#fff" />
        </>
      )}
      <path
        d={`M${x - 3.5 * s} ${y + 4 * s} q${3.5 * s} ${3.8 * s} ${7 * s} 0`}
        stroke={FACE}
        strokeWidth={2 * s}
        fill="none"
        strokeLinecap="round"
      />
      <ellipse cx={x - gap - 4.5 * s} cy={y + 5 * s} rx={3.6 * s} ry={2.4 * s} fill={BLUSH} opacity={0.6} />
      <ellipse cx={x + gap + 4.5 * s} cy={y + 5 * s} rx={3.6 * s} ry={2.4 * s} fill={BLUSH} opacity={0.6} />
    </g>
  );
}

function Sparkle({ x, y, s, fill }: { x: number; y: number; s: number; fill: string }) {
  return (
    <path
      d={`M${x} ${y - s} Q${x} ${y} ${x + s} ${y} Q${x} ${y} ${x} ${y + s} Q${x} ${y} ${x - s} ${y} Q${x} ${y} ${x} ${y - s}Z`}
      fill={fill}
    />
  );
}

export function starPath(cx: number, cy: number, R: number, r: number, n = 5): string {
  const pts: string[] = [];
  for (let i = 0; i < n * 2; i++) {
    const rad = i % 2 === 0 ? R : r;
    const ang = (Math.PI / n) * i - Math.PI / 2;
    pts.push(`${(cx + rad * Math.cos(ang)).toFixed(2)} ${(cy + rad * Math.sin(ang)).toFixed(2)}`);
  }
  return `M${pts.join(" L")}Z`;
}

export const HEART = "M60 104 C20 78 14 56 18 42 C23 24 46 20 60 38 C74 20 97 24 102 42 C106 56 100 78 60 104Z";

function Tulip({ cx, cy, s, color, face }: { cx: number; cy: number; s: number; color: string; face?: boolean }) {
  return (
    <g transform={`translate(${cx} ${cy}) scale(${s}) translate(-60 -50)`}>
      <path d="M60 104 V58" stroke={LEAF} strokeWidth={5} strokeLinecap="round" />
      <path d="M60 98 C42 94 34 80 36 70 C48 72 58 82 60 98Z" fill={LEAF} />
      <path d="M60 92 C78 88 86 74 84 64 C72 66 62 76 60 92Z" fill={darken(LEAF, 0.08)} />
      <path
        d="M37 30 L47 42 L53 26 L60 40 L67 26 L73 42 L83 30 C88 50 82 66 60 66 C38 66 32 50 37 30Z"
        fill={color}
        stroke={color}
        strokeWidth={3}
        strokeLinejoin="round"
      />
      <path d="M44 46 C44 56 50 60 54 61" stroke="#fff" strokeOpacity={0.45} strokeWidth={3} fill="none" strokeLinecap="round" />
      {face && <Face x={60} y={50} gap={7} s={0.9} />}
    </g>
  );
}

export default function Art({ kind, ac }: { kind: ArtKey; ac: string }) {
  const uid = useId().replace(/:/g, "");
  const light = lighten(ac, 0.45);
  const dark = darken(ac, 0.15);

  let body: React.ReactNode = null;

  switch (kind) {
    case "cake":
      body = (
        <>
          <ellipse cx={60} cy={100} rx={46} ry={6} fill="#fff" opacity={0.85} />
          <rect x={22} y={56} width={76} height={42} rx={12} fill={ac} />
          <rect x={22} y={88} width={76} height={5} fill="#fff" opacity={0.4} />
          <path
            d="M22 64 C22 57 27 54 34 54 H86 C93 54 98 57 98 64 V66 C98 70 92 71 91 66 C90 74 82 74 81 67 C79 71 73 71 72 66 C70 76 62 76 61 66 C59 71 53 71 51 66 C49 74 41 74 40 67 C38 71 32 71 31 66 C29 71 22 70 22 66Z"
            fill="#FFFDF8"
          />
          <rect x={56} y={30} width={8} height={24} rx={3} fill={SUN} />
          <path d="M56 38 L64 34 M56 46 L64 42" stroke="#fff" strokeWidth={2} />
          <path d="M60 14 C67 22 67 28 60 30 C53 28 53 22 60 14Z" fill="#FF9F43" />
          <path d="M60 21 C63 25 63 27 60 28 C57 27 57 25 60 21Z" fill="#FFE08A" />
          <rect x={34} y={57} width={6} height={2.6} rx={1.3} fill={ac} transform="rotate(-20 37 58)" />
          <rect x={78} y={58} width={6} height={2.6} rx={1.3} fill="#8FD3C1" transform="rotate(25 81 59)" />
          <rect x={68} y={56} width={6} height={2.6} rx={1.3} fill={SUN} transform="rotate(-10 71 57)" />
          <rect x={44} y={58} width={6} height={2.6} rx={1.3} fill="#C9B8FF" transform="rotate(15 47 59)" />
          <Face x={60} y={78} gap={9} />
          <Sparkle x={24} y={30} s={6} fill={SUN} />
          <Sparkle x={96} y={36} s={4.5} fill={light} />
        </>
      );
      break;

    case "balloons":
      body = (
        <>
          <path d="M34 75 C38 88 52 96 60 108" stroke={FACE} strokeOpacity={0.35} strokeWidth={1.6} fill="none" />
          <path d="M86 73 C82 88 68 96 60 108" stroke={FACE} strokeOpacity={0.35} strokeWidth={1.6} fill="none" />
          <path d="M60 68 C56 80 64 92 60 108" stroke={FACE} strokeOpacity={0.35} strokeWidth={1.6} fill="none" />
          <ellipse cx={33} cy={54} rx={16} ry={19} fill={SUN} />
          <path d="M30 73 h6 l-3 -4z" fill={SUN} />
          <ellipse cx={27} cy={47} rx={4} ry={6} fill="#fff" opacity={0.5} transform="rotate(20 27 47)" />
          <ellipse cx={87} cy={52} rx={16} ry={19} fill="#8FD3C1" />
          <path d="M84 71 h6 l-3 -4z" fill="#8FD3C1" />
          <ellipse cx={81} cy={45} rx={4} ry={6} fill="#fff" opacity={0.5} transform="rotate(20 81 45)" />
          <ellipse cx={60} cy={42} rx={21} ry={25} fill={ac} />
          <path d="M56 68 h8 l-4 -5z" fill={ac} />
          <ellipse cx={51} cy={33} rx={5} ry={8} fill="#fff" opacity={0.45} transform="rotate(20 51 33)" />
          <Face x={60} y={45} gap={8} />
          <path d="M54 106 l6 2 l6 -2 l-2 6 l-4 -2 l-4 2z" fill={ac} />
        </>
      );
      break;

    case "gift":
      body = (
        <>
          <ellipse cx={60} cy={104} rx={42} ry={4.5} fill={FACE} opacity={0.08} />
          <rect x={24} y={60} width={72} height={42} rx={7} fill={ac} />
          <rect x={18} y={46} width={84} height={18} rx={6} fill={dark} />
          <rect x={54} y={46} width={12} height={56} fill={SUN} />
          <path d="M60 46 C48 26 30 30 36 40 C40 46 52 46 60 46Z" fill={SUN} />
          <path d="M60 46 C72 26 90 30 84 40 C80 46 68 46 60 46Z" fill={SUN} />
          <circle cx={60} cy={45} r={5} fill={darken(SUN, 0.12)} />
          <Face x={60} y={80} gap={18} />
          <Sparkle x={20} y={30} s={5} fill={light} />
          <Sparkle x={100} y={28} s={6} fill={SUN} />
        </>
      );
      break;

    case "tree": {
      const g = "#3BAA6E";
      body = (
        <>
          <rect x={54} y={92} width={12} height={14} rx={2} fill="#A9744F" />
          <path d="M60 42 L98 92 Q60 100 22 92 Z" fill={g} stroke={g} strokeWidth={6} strokeLinejoin="round" />
          <path d="M60 30 L88 68 Q60 75 32 68 Z" fill={lighten(g, 0.1)} stroke={lighten(g, 0.1)} strokeWidth={6} strokeLinejoin="round" />
          <path d="M60 20 L78 46 Q60 51 42 46 Z" fill={lighten(g, 0.2)} stroke={lighten(g, 0.2)} strokeWidth={6} strokeLinejoin="round" />
          <path d="M36 70 Q60 80 84 70" stroke="#fff" strokeOpacity={0.7} strokeWidth={2} strokeDasharray="2 4" fill="none" strokeLinecap="round" />
          <circle cx={34} cy={88} r={4.5} fill={ac} />
          <circle cx={86} cy={88} r={4.5} fill={SUN} />
          <circle cx={46} cy={58} r={3.8} fill={SUN} />
          <circle cx={74} cy={58} r={3.8} fill={ac} />
          <circle cx={60} cy={40} r={3.4} fill="#fff" />
          <path d={starPath(60, 15, 10, 4.5)} fill={SUN} stroke={SUN} strokeWidth={2} strokeLinejoin="round" />
          <Face x={60} y={79} gap={8} />
        </>
      );
      break;
    }

    case "star":
      body = (
        <>
          <path d={starPath(60, 62, 44, 21)} fill={ac} stroke={ac} strokeWidth={9} strokeLinejoin="round" />
          <path d={starPath(60, 62, 30, 14)} fill="#fff" opacity={0.18} />
          <Face x={60} y={66} gap={9} />
          <Sparkle x={18} y={22} s={7} fill={SUN} />
          <Sparkle x={102} y={26} s={5} fill={light} />
          <Sparkle x={104} y={96} s={6} fill={SUN} />
          <Sparkle x={16} y={92} s={4} fill={light} />
        </>
      );
      break;

    case "heart":
      body = (
        <>
          <path d={HEART} fill={ac} />
          <ellipse cx={36} cy={42} rx={6} ry={10} fill="#fff" opacity={0.35} transform="rotate(-35 36 42)" />
          <Face x={60} y={62} gap={10} />
          <Sparkle x={104} y={20} s={6} fill={SUN} />
          <Sparkle x={14} y={84} s={4.5} fill={SUN} />
          <path d="M98 88 c-4 -3 -6 -6 -5 -8 c1 -2 4 -2 5 0 c1 -2 4 -2 5 0 c1 2 -1 5 -5 8z" fill={BLUSH} />
        </>
      );
      break;

    case "bear": {
      const br = "#C98B5E";
      const inner = "#F2C9A5";
      body = (
        <>
          <ellipse cx={60} cy={94} rx={27} ry={18} fill={br} />
          <circle cx={36} cy={28} r={11} fill={br} />
          <circle cx={84} cy={28} r={11} fill={br} />
          <circle cx={36} cy={28} r={5.5} fill={inner} />
          <circle cx={84} cy={28} r={5.5} fill={inner} />
          <circle cx={60} cy={50} r={28} fill={br} />
          <ellipse cx={60} cy={61} rx={12} ry={9} fill={inner} />
          <ellipse cx={60} cy={57} rx={4.2} ry={3} fill={FACE} />
          <path d="M56 63 q4 3.5 8 0" stroke={FACE} strokeWidth={1.8} fill="none" strokeLinecap="round" />
          <ellipse cx={48} cy={47} rx={2.8} ry={3.2} fill={FACE} />
          <ellipse cx={72} cy={47} rx={2.8} ry={3.2} fill={FACE} />
          <circle cx={49} cy={46} r={0.9} fill="#fff" />
          <circle cx={73} cy={46} r={0.9} fill="#fff" />
          <ellipse cx={42} cy={56} rx={4} ry={2.6} fill={BLUSH} opacity={0.6} />
          <ellipse cx={78} cy={56} rx={4} ry={2.6} fill={BLUSH} opacity={0.6} />
          <path d={HEART} fill={ac} transform="translate(60 92) scale(0.36) translate(-60 -64)" />
          <ellipse cx={42} cy={90} rx={8} ry={6} fill={br} transform="rotate(-30 42 90)" />
          <ellipse cx={78} cy={90} rx={8} ry={6} fill={br} transform="rotate(30 78 90)" />
          <Sparkle x={100} y={58} s={5} fill={SUN} />
        </>
      );
      break;
    }

    case "tea":
      body = (
        <>
          <path d="M44 34 c-6 -6 6 -10 0 -18 M56 32 c-6 -6 6 -10 0 -18 M68 34 c-6 -6 6 -10 0 -18" stroke={FACE} strokeOpacity={0.3} strokeWidth={2.4} fill="none" strokeLinecap="round" />
          <ellipse cx={56} cy={100} rx={42} ry={6} fill="#fff" opacity={0.9} />
          <path d="M84 56 C102 56 102 84 84 84" stroke={ac} strokeWidth={9} fill="none" strokeLinecap="round" />
          <path d="M26 46 H86 V84 C86 94 78 100 68 100 H44 C34 100 26 94 26 84Z" fill={ac} />
          <ellipse cx={56} cy={46} rx={30} ry={6} fill={dark} />
          <ellipse cx={56} cy={46.5} rx={25} ry={4} fill="#B5703F" />
          <Face x={52} y={72} gap={9} />
          <g transform="rotate(-25 74 62)">
            <rect x={64} y={58} width={20} height={8} rx={4} fill="#F6D7B0" />
            <rect x={71} y={58} width={6} height={8} fill="#EBC394" />
          </g>
          <Sparkle x={100} y={30} s={5} fill={SUN} />
        </>
      );
      break;

    case "sun":
      body = (
        <>
          {Array.from({ length: 12 }).map((_, i) => {
            const a = (Math.PI * 2 * i) / 12;
            const x1 = 60 + Math.cos(a) * 37;
            const y1 = 60 + Math.sin(a) * 37;
            const x2 = 60 + Math.cos(a) * (i % 2 ? 46 : 50);
            const y2 = 60 + Math.sin(a) * (i % 2 ? 46 : 50);
            return (
              <line key={i} x1={x1.toFixed(2)} y1={y1.toFixed(2)} x2={x2.toFixed(2)} y2={y2.toFixed(2)} stroke={ac} strokeWidth={6} strokeLinecap="round" />
            );
          })}
          <circle cx={60} cy={60} r={30} fill={ac} />
          <circle cx={60} cy={60} r={23} fill={lighten(ac, 0.2)} />
          <Face x={60} y={60} gap={9} />
        </>
      );
      break;

    case "flower":
      body = (
        <>
          <Tulip cx={34} cy={66} s={0.55} color={lighten(ac, 0.35)} />
          <Tulip cx={86} cy={66} s={0.55} color={SUN} />
          <Tulip cx={60} cy={50} s={1} color={ac} face />
          <path d="M44 100 Q60 108 76 100 L72 112 H48Z" fill={lighten(ac, 0.55)} />
          <path d="M52 102 l8 4 l8 -4" stroke={dark} strokeWidth={2} fill="none" strokeLinecap="round" />
        </>
      );
      break;

    case "envelope":
      body = (
        <>
          <rect x={16} y={46} width={88} height={56} rx={8} fill={dark} />
          <rect x={28} y={22} width={64} height={58} rx={6} fill="#FFFDF8" />
          <Face x={60} y={40} gap={9} />
          <path d="M40 56 H80 M40 63 H72" stroke={ac} strokeOpacity={0.6} strokeWidth={2.4} strokeLinecap="round" />
          <path d="M16 54 L60 80 L104 54 V94 C104 98 100 102 96 102 H24 C20 102 16 98 16 94Z" fill={lighten(ac, 0.25)} />
          <path d="M16 102 L52 76 M104 102 L68 76" stroke={dark} strokeOpacity={0.25} strokeWidth={2} />
          <path d={HEART} fill={darken(ac, 0.2)} transform="translate(60 84) scale(0.2) translate(-60 -64)" />
          <Sparkle x={104} y={28} s={6} fill={SUN} />
          <Sparkle x={14} y={30} s={4} fill={light} />
        </>
      );
      break;

    case "tie":
      body = (
        <>
          <defs>
            <clipPath id={`tie${uid}`}>
              <path d="M54 46 H66 L78 90 L60 108 L42 90Z" />
            </clipPath>
          </defs>
          <path d="M60 32 L28 20 L36 52Z" fill="#fff" stroke={FACE} strokeOpacity={0.15} strokeWidth={2} strokeLinejoin="round" />
          <path d="M60 32 L92 20 L84 52Z" fill="#fff" stroke={FACE} strokeOpacity={0.15} strokeWidth={2} strokeLinejoin="round" />
          <path d="M54 46 H66 L78 90 L60 108 L42 90Z" fill={ac} stroke={ac} strokeWidth={3} strokeLinejoin="round" />
          <g clipPath={`url(#tie${uid})`} stroke="#fff" strokeOpacity={0.3} strokeWidth={4}>
            <path d="M30 60 L90 30 M30 96 L90 66 M30 120 L90 90" />
          </g>
          <path d="M51 32 H69 L66 47 H54Z" fill={dark} stroke={dark} strokeWidth={3} strokeLinejoin="round" />
          <Face x={60} y={74} gap={7} s={0.9} />
          <Sparkle x={100} y={70} s={5} fill={SUN} />
          <Sparkle x={20} y={76} s={4} fill={light} />
        </>
      );
      break;

    case "cap":
      body = (
        <>
          <g transform="rotate(-8 60 98)">
            <rect x={32} y={90} width={56} height={14} rx={7} fill="#FFFDF8" />
            <rect x={56} y={88} width={8} height={18} rx={2} fill={BLUSH} />
          </g>
          <path d="M34 50 V68 C34 80 86 80 86 68 V50 L60 60Z" fill={dark} />
          <path d="M60 24 L106 42 L60 60 L14 42Z" fill={ac} stroke={ac} strokeWidth={3} strokeLinejoin="round" />
          <path d="M60 42 L94 50 V70" stroke="#FF7A8A" strokeWidth={2.5} fill="none" strokeLinecap="round" />
          <path d="M90 70 h8 l-1.5 10 h-5z" fill="#FF7A8A" />
          <circle cx={60} cy={42} r={3.5} fill="#FF7A8A" />
          <Face x={60} y={68} gap={9} s={0.9} />
          <Sparkle x={18} y={24} s={6} fill={SUN} />
        </>
      );
      break;

    case "moon":
      body = (
        <>
          <defs>
            <mask id={`moon${uid}`}>
              <rect width={120} height={120} fill="#fff" />
              <circle cx={78} cy={46} r={32} fill="#000" />
            </mask>
          </defs>
          <circle cx={56} cy={60} r={40} fill={ac} mask={`url(#moon${uid})`} />
          <Face x={34} y={68} gap={6} s={0.85} sleepy />
          <path d={starPath(88, 42, 9, 4)} fill={ac} stroke={ac} strokeWidth={2} strokeLinejoin="round" />
          <path d={starPath(100, 74, 6, 2.6)} fill={lighten(ac, 0.3)} stroke={lighten(ac, 0.3)} strokeWidth={1.5} strokeLinejoin="round" />
          <Sparkle x={78} y={96} s={5} fill={lighten(ac, 0.3)} />
          <Sparkle x={96} y={18} s={4} fill="#fff" />
        </>
      );
      break;

    case "baby":
      body = (
        <>
          <path
            d="M40 24 C48 30 72 30 80 24 L102 40 L92 58 L84 54 V88 C84 96 76 104 66 104 H54 C44 104 36 96 36 88 V54 L28 58 L18 40Z"
            fill={ac}
            stroke={ac}
            strokeWidth={4}
            strokeLinejoin="round"
          />
          <path d="M46 26 C50 38 70 38 74 26" fill="#fff" opacity={0.55} />
          <circle cx={52} cy={98} r={2.2} fill="#fff" opacity={0.8} />
          <circle cx={60} cy={99} r={2.2} fill="#fff" opacity={0.8} />
          <circle cx={68} cy={98} r={2.2} fill="#fff" opacity={0.8} />
          <Face x={60} y={62} gap={9} />
          <path d={HEART} fill="#fff" opacity={0.7} transform="translate(72 82) scale(0.14) translate(-60 -64)" />
          <Sparkle x={104} y={88} s={5} fill={SUN} />
          <Sparkle x={14} y={84} s={4} fill={light} />
        </>
      );
      break;

    case "rings":
      body = (
        <>
          <circle cx={46} cy={70} r={22} stroke={ac} strokeWidth={8} fill="none" />
          <circle cx={74} cy={70} r={22} stroke={dark} strokeWidth={8} fill="none" />
          <path d="M64.6 51 A22 22 0 0 1 66 88" stroke={ac} strokeWidth={8} fill="none" />
          <circle cx={46} cy={70} r={22} stroke="#fff" strokeOpacity={0.35} strokeWidth={1.5} fill="none" strokeDasharray="20 120" />
          <path d="M38 46 L42 39 H50 L54 46 L46 55Z" fill="#CFEFFA" stroke="#fff" strokeWidth={1.5} strokeLinejoin="round" />
          <path d="M42 39 L46 46 L50 39 M38 46 H54" stroke="#9FD9EE" strokeWidth={1} fill="none" />
          <path d="M92 32 c-5 -4 -7 -7 -6 -10 c1.2 -2.4 4.6 -2.4 6 0 c1.4 -2.4 4.8 -2.4 6 0 c1 3 -1 6 -6 10z" fill={BLUSH} />
          <path d="M104 50 c-3 -2.5 -4.2 -4.4 -3.6 -6 c.8 -1.5 2.8 -1.5 3.6 0 c.8 -1.5 2.8 -1.5 3.6 0 c.6 1.8 -.6 3.6 -3.6 6z" fill={BLUSH} opacity={0.7} />
          <Sparkle x={20} y={34} s={5} fill={SUN} />
          <Sparkle x={98} y={100} s={4} fill={SUN} />
        </>
      );
      break;

    case "apple":
      body = (
        <>
          <rect x={22} y={96} width={76} height={11} rx={3} fill="#7DB8E8" />
          <rect x={26} y={86} width={68} height={11} rx={3} fill={SUN} />
          <path d="M30 91.5 H90" stroke="#fff" strokeWidth={1.5} strokeOpacity={0.8} />
          <path d="M26 101.5 H94" stroke="#fff" strokeWidth={1.5} strokeOpacity={0.8} />
          <path
            d="M60 38 C48 28 26 32 26 56 C26 76 42 86 52 84 C56 83 58 82 60 82 C62 82 64 83 68 84 C78 86 94 76 94 56 C94 32 72 28 60 38Z"
            fill={ac}
          />
          <ellipse cx={38} cy={50} rx={5} ry={8} fill="#fff" opacity={0.35} transform="rotate(20 38 50)" />
          <path d="M60 38 C60 30 62 24 66 20" stroke="#8B5A3C" strokeWidth={4} fill="none" strokeLinecap="round" />
          <path d="M64 28 C70 18 82 18 86 22 C80 30 70 32 64 28Z" fill={LEAF} />
          <Face x={60} y={60} gap={9} />
          <Sparkle x={104} y={30} s={5} fill={SUN} />
        </>
      );
      break;

    default:
      return null;
  }

  return (
    <svg viewBox="0 0 120 120" width="100%" height="100%" aria-hidden="true">
      {body}
    </svg>
  );
}


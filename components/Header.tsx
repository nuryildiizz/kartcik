import Link from "next/link";

export function Logo() {
  return (
    <svg viewBox="0 0 48 48" width={40} height={40} aria-hidden="true">
      <rect x={4} y={12} width={40} height={28} rx={7} fill="#FF6F91" />
      <path d="M4 18 L24 31 L44 18" stroke="#fff" strokeWidth={3} fill="none" strokeLinejoin="round" />
      <path d="M24 26 c-5 -3.6 -7 -6.6 -6 -9 c1.2 -2.4 4.6 -2.4 6 0 c1.4 -2.4 4.8 -2.4 6 0 c1 2.4 -1 5.4 -6 9z" fill="#FFD66B" transform="translate(0 -12)" />
    </svg>
  );
}

export default function Header() {
  return (
    <header className="site-header">
      <div className="wrap header-row">
        <Link href="/" className="brand">
          <Logo />
          <span>Kartçık</span>
        </Link>
        <nav className="nav">
          <Link href="/#gunler" className="nav-link">Özel günler</Link>
          <Link href="/#ornekler" className="nav-link">Tasarımlar</Link>
          <Link href="/olustur" className="btn btn-primary btn-sm">Kart oluştur</Link>
        </nav>
      </div>
    </header>
  );
}

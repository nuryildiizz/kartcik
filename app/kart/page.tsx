import type { Metadata } from "next";
import Link from "next/link";
import { decodeCard } from "@/lib/encode";
import CardOpener from "@/components/CardOpener";
import Art from "@/components/Art";
import { Logo } from "@/components/Header";

type SP = Promise<{ k?: string }>;

export async function generateMetadata({ searchParams }: { searchParams: SP }): Promise<Metadata> {
  const card = decodeCard((await searchParams).k);
  if (!card) return { title: "Kartçık" };
  const who = card.to ? `${card.to}, ` : "";
  return {
    title: `${who}${card.fr || "biri"} sana bir kart gönderdi | Kartçık`,
    description: "Zarfı açmak için dokun.",
    openGraph: {
      title: `${who}sana bir kart var!`,
      description: `${card.fr || "Biri"} sana bir kart gönderdi. Açmak için dokun.`,
    },
    robots: { index: false },
  };
}

export default async function Page({ searchParams }: { searchParams: SP }) {
  const card = decodeCard((await searchParams).k);

  if (!card) {
    return (
      <main className="receive receive-empty">
        <div className="empty-box">
          <div className="empty-art">
            <Art kind="envelope" ac="#C9B8FF" />
          </div>
          <h1>Bu kart açılamadı</h1>
          <p>Link eksik kopyalanmış olabilir. Gönderen kişiden linki tekrar istemeyi dene.</p>
          <Link href="/olustur" className="btn btn-primary">
            Kendi kartını oluştur
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="receive">
      <Link href="/" className="receive-brand">
        <Logo /> Kartçık
      </Link>
      <CardOpener card={card} />
    </main>
  );
}

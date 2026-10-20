import type { Metadata } from "next";
import Header from "@/components/Header";
import Editor from "@/components/Editor";

export const metadata: Metadata = {
  title: "Kart oluştur | Kartçık",
};

type SP = Promise<{ gun?: string; tasarim?: string; kime?: string; kimden?: string }>;

export default async function Page({ searchParams }: { searchParams: SP }) {
  const sp = await searchParams;
  return (
    <>
      <Header />
      <main className="editor-page">
        <Editor
          key={`${sp.gun ?? ""}-${sp.tasarim ?? ""}`}
          initialOccasion={sp.gun ?? "dogum-gunu"}
          initialTemplate={Number(sp.tasarim ?? 0) || 0}
          initialTo={sp.kime?.slice(0, 40)}
          initialFrom={sp.kimden?.slice(0, 40)}
          fresh={!sp.gun}
        />
      </main>
    </>
  );
}

import type { Metadata, Viewport } from "next";
import "@fontsource-variable/fredoka";
import "@fontsource-variable/nunito";
import "@fontsource-variable/caveat";
import "@fontsource/pacifico";
import "@fontsource-variable/dancing-script";
import "@fontsource-variable/quicksand";
import "@fontsource-variable/playfair-display";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kartçık | Özel gün kartları",
  description:
    "Doğum günü, yılbaşı, sevgililer günü ve daha fazlası için tatlı kartlar tasarla, linkle sevdiklerine gönder.",
};

export const viewport: Viewport = {
  themeColor: "#FFF7F0",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}

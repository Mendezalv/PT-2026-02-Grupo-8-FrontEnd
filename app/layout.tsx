import type { Metadata } from "next";
import { League_Spartan } from "next/font/google";
import "./globals.css";

const leagueSpartan = League_Spartan({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-spartan",
});

export const metadata: Metadata = {
  title: "Stock.io - Plataforma de Gestão e Catálogo",
  description: "Plataforma de gestão comercial e catálogo de produtos - Processo Trainee CJR 2026.2",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${leagueSpartan.variable} antialiased`}>
      <body className="min-h-screen flex flex-col bg-[#F6F3E4] text-[#171918]">
        {children}
      </body>
    </html>
  );
}

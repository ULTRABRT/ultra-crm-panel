import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, Manrope } from "next/font/google";
import { BootGate } from "../components/boot/BootGate";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Arqon | Customer Operation Intelligence",
  description:
    "Arqon musteri operasyon zekasi, talep ve satis sureci yonetim paneli.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="tr" translate="no">
      <body
        className={`${inter.variable} ${manrope.variable} min-h-dvh overflow-x-hidden antialiased`}
      >
        <BootGate>{children}</BootGate>
      </body>
    </html>
  );
}

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
  title: "Ultra CRM | Solify Panel",
  description:
    "Solify müşteri ilişkileri, talep yönetimi ve operasyon takip paneli.",
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

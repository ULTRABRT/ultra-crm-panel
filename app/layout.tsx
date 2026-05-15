import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
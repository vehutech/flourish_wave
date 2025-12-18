import type { Metadata } from "next";
import { Geist, Geist_Mono, Chicle } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const chicleFont = Chicle({
  variable: "--font-chicle",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Flourish Wave Hotel and Suite",
  description: "Luxury | Modern | Vibes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`
          ${geistSans.variable}
          ${geistMono.variable}
          ${chicleFont.variable}
          antialiased
        `}
      >
        {children}
      </body>
    </html>
  );
}

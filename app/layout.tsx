import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const test = `testing ${inter.className}`;

export const metadata: Metadata = {
  title: "Animisc",
  description:
    "Anime recommendations, affinity calculation and seasonal statistics based on your MyAnimeList profile",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body
        className={` bg-slate-50 relative inset-0 h-full ${inter.className}`}
      >
        {children}
      </body>
    </html>
  );
}

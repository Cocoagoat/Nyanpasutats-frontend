import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import backgroundImage from "@/public/nnb5.png";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Nyanpasutats",
  description:
    "Anime seasonal statistics and tier lists + recommendations based on your MyAnimeList profile",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full ">
      <body
        style={{ backgroundImage: `url(${backgroundImage.src})` }}
        className={`{${
          true && "  bg-repeat-round"
        } relative inset-0 h-[100vh]  bg-blue-990 2xl:bg-contain  ${inter.className}`}
      >
        {children}
      </body>
    </html>
  );
}

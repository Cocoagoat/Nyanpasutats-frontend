import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import backgroundImage from "@/public/nnb5.png";
import Image from "next/image";

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
    <html lang="en" className=" relative">
      <body
        className={`${inter.className} h-full  overflow-y-auto bg-blue-990`}
      >
        <div className="absolute inset-0 -z-50  w-full">
          <Image
            src={backgroundImage}
            placeholder="blur"
            fill
            alt="Background"
            quality={95}
            className="h-full object-cover object-top"
          />
        </div>
        <div className="relative z-10 h-full min-h-screen">{children}</div>
      </body>
    </html>
  );
}

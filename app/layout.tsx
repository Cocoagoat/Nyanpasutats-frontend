import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import backgroundImage from "@/public/nnb5.png";
import Image from "next/image";
import styles from "@/app/globals.module.css";
import ToasterWithX from "@/components/general/ToasterWithX";
import { Toaster } from "react-hot-toast";

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
      <body className={`${inter.className} overflow-y-auto bg-blue-990`}>
        <div className="absolute inset-0 -z-50 ">
          <Image
            src={backgroundImage}
            placeholder="blur"
            fill
            alt="Background"
            quality={95}
            className=" object-cover "
          />
        </div>
        <div className="relative  min-h-screen">{children}</div>
      </body>
    </html>
  );
}

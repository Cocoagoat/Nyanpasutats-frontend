import backgroundImage from "@/public/nnb5.jpg";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Image from "next/image";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Nyanpasutats",
  description:
    "Anime seasonal statistics and tier lists + recommendations based on your MyAnimeList profile",
  icons: {
    icon: "/nyanpasu.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="relative">
      {/* <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head> */}
      <body
        className={`${inter.className} mx-auto max-w-screen-ultrahd overflow-y-hidden bg-blue-990 bg-cover`}
      >
        <div className="absolute inset-0 -z-50 bg-repeat ">
          <Image
            src={backgroundImage}
            placeholder="blur"
            fill
            alt="Background"
            quality={95}
            className=" -z-[70] max-h-[100vh] object-cover"
          />
        </div>
        {/* <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 1) 100%)`,
          }}
        ></div> */}
        <div className="relative min-h-screen ">{children}</div>
      </body>
    </html>
  );
}

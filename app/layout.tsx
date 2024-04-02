import type { Metadata } from "next";
import {
  Inter,
  Merriweather,
  Merriweather_Sans,
  Single_Day,
  Roboto,
  Lato,
} from "next/font/google";
import "./globals.css";
import ToasterWithX from "@/components/general/ToasterWithX";
import test from "@/public/nnb5.png";

const inter = Inter({ subsets: ["latin"] });
const merriweather = Merriweather({ weight: "400", subsets: ["latin"] });
const merriweather_sans = Merriweather_Sans({
  weight: "600",
  subsets: ["latin"],
});
const roboto = Roboto({ weight: "500", subsets: ["latin"] });
const lato = Lato({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nyanpasutats",
  description:
    "Anime recommendations, affinity calculation and seasonal statistics based on your MyAnimeList profile",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full ">
      <body
        style={{ backgroundImage: `url(${test.src})` }}
        className={`{${
          true && "  bg-repeat-round"
        } relative inset-0 h-[100vh]  overflow-hidden bg-blue-990 2xl:bg-contain  ${inter.className}`}
        // style={{
        //   background:
        //     "repeating-linear-gradient(90deg, #3f3f46, #5495ff, #3f3f46 200px)",
        // }}
      >
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import Providers from "components/providers";
import { Inter } from "next/font/google";
import { EB_Garamond } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const eb_garamond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: "PandaPulse",
  description: "Designed and Created By Irshad khan",
  icons: [{ rel: "icon", url: "/icons/panda.png" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(inter.variable, eb_garamond.variable)}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

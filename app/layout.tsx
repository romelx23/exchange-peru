import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LayoutHome } from "@/features/home/components/layout-home";
import { AdSense } from "@/features/home/components/adsense";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Cambio Mejorado',
  description:
    'Cambio Mejorado es una plataforma que obtiene los tipos de cambio de las principales casas de cambio del Perú.',
  icons: {
    icon: 'favicon.ico',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <AdSense
          pid="ca-pub-1635010729840024"
        />
      </head>
      <body
        className={""} >
        <LayoutHome>
          {/* <LayoutBussiness> */}
          {children}
          {/* </LayoutBussiness> */}
        </LayoutHome>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Cormorant_Garamond, Poppins, Pinyon_Script, Archivo_Black } from "next/font/google";
import "./globals.css";

// Elegant serif font for headings - traditional Indian jewelry feel
const cormorant = Cormorant_Garamond({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

// Clean sans-serif for body text
const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

// Script font for elegant headings
const pinyonScript = Pinyon_Script({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-script",
  display: "swap",
});

// Modern bold font for specific headings
const archivo = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

import { getSiteConfig } from "@/lib/supabaseUtils";

export async function generateMetadata(): Promise<Metadata> {
  const siteTitle = await getSiteConfig('site_title');
  const title = siteTitle || "CMJ Gold & Diamond Jewellers";

  return {
    title: title,
    description: "Traditional Indian Gold & Diamond Jewellery - Temple Jewellery, Bangles, Chains, Necklaces & More",
    icons: {
      icon: "/logo.png",
      apple: "/logo.png",
    },
    verification: {
      google: "mpmwPxWq-gP9Em4slJZ9XXFaFfXptdcb4MjvykNhSbo",
    },
  };
}

import { RatesProvider } from "@/context/RatesContext";

import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${cormorant.variable} ${poppins.variable} ${pinyonScript.variable} ${archivo.variable} font-body`}>
        <RatesProvider>
          {children}
          <Footer />
        </RatesProvider>
      </body>
    </html>
  );
}

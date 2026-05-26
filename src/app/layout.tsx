import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "../styles.css";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "TechFort Insight Series — Building Africa's AI Future",
  description:
    "A continental AI literacy ecosystem democratizing access to artificial intelligence, emerging technologies, research, and responsible innovation across Africa.",
  authors: [{ name: "TechFort Foundation" }],
  openGraph: {
    title: "TechFort Insight Series",
    description:
      "Building Africa's future through AI literacy and emerging technology education.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}

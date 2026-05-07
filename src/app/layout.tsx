import type { Metadata } from "next";
import { Manrope, Source_Code_Pro } from "next/font/google";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const primaryFont = Manrope({
  variable: "--font-main",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const monoFont = Source_Code_Pro({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://yourdomain.com"),
  title: "Akshat Rai Laddha - Software Engineer",
  description:
    "Portfolio of Akshat Rai Laddha - Software Engineer, AI Engineer, Forward Deployed Engineer.",
  openGraph: {
    title: "Akshat Rai Laddha - Software Engineer",
    description: "Portfolio of Akshat Rai Laddha",
    url: "https://yourdomain.com",
    siteName: "Akshat Rai Laddha",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Akshat Rai Laddha",
    description: "Software Engineer - AI Engineer",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${primaryFont.variable} ${monoFont.variable} h-full antialiased`}>
      <body className="min-h-full bg-[var(--canvas)] text-[var(--ink)]">
        <a
          href="#main-content"
          className="sr-only z-[60] rounded-full border border-[var(--hairline-strong)] bg-[var(--canvas)] px-4 py-2 text-sm focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
        <Toaster richColors />
      </body>
    </html>
  );
}

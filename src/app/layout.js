import { Suspense } from "react";
import { Outfit } from "next/font/google";
import { Geist_Mono } from "next/font/google";
import NavigationProgressBar from "@/components/layout/NavigationProgressBar";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Compare Degree — Smart Decisions, Brighter Futures",
  description:
    "Compare colleges, courses, fees, placements, rankings, and reviews side by side. India's most comprehensive higher education comparison platform.",
  keywords: [
    "college comparison",
    "compare colleges India",
    "engineering college ranking",
    "placement data",
    "college fees comparison",
    "NIRF ranking",
    "IIT",
    "NIT",
    "BITS",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${geistMono.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full flex flex-col font-sans">
        <Suspense fallback={null}>
          <NavigationProgressBar />
        </Suspense>
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "expiry-guard — Temporary User Lifecycle Manager",
  description: "A production-grade CLI for creating and auditing temporary Linux user accounts with automatic expiry. Zero dependencies. Works on any Linux distro.",
  keywords: ["Linux", "DevOps", "user management", "temporary accounts", "security", "compliance", "SOC2", "open source"],
  authors: [{ name: "Saharsh Pamecha" }],
  openGraph: {
    title: "expiry-guard — Temporary User Lifecycle Manager",
    description: "Create, audit, and alert on temporary Linux user accounts. Interactive web demo.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0c0a09] text-[#fafaf9]`}
      >
        <div className="noise-overlay" />
        {children}
      </body>
    </html>
  );
}

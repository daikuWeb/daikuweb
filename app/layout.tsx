// app/layout.tsx
import type { Metadata } from "next";
import type { ReactNode } from "react";
import localFont from "next/font/local";
import { LayoutContent } from "../components/LayoutContent";
import { Footer } from "../components/Footer";
import TawkToChat from "../components/TawkToChat";
import Navbar from "../components/Navbar";
import { AuthProvider } from "../contexts/AuthContext";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: 'Daiku Interior Design',
  description: 'Interior design services for home, office, and business',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} overflow-x-hidden`}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="overflow-x-hidden">
        <AuthProvider>
          <div className="relative w-full overflow-x-hidden">
            <Navbar />
            <LayoutContent>
              <main className="overflow-x-hidden">
                {children}
              </main>
              <Footer />
            </LayoutContent>
            <TawkToChat />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
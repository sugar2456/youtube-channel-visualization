import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SideBar from "./components/SideBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Youtube Channel Search",
  description: "search youtube channels",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <div className="flex flex-1 overflow-hidden w-full">
          <div className="w-64 flex-shrink-0">
            <SideBar />
          </div>
          <main className="flex-1 overflow-auto max-w-full">
            <div className="w-full max-w-full">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}

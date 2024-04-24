import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "QA Flashcard",
  description: "Generated question and answer flashcards",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="navigation">
          <div className="w-full h-32  "></div>
        </header>

        <div className="flex flex-col md:flex-row justify-around items-center md:items-start mt-[2%]">
          {children}
          <div className="w-60 h-96 "></div>
        </div>

        <footer className="w-full h-32">
          </footer>
      </body>
    </html>
  );
}

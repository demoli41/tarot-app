import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Оновив шляхи до перейменованих файлів
const magneta = localFont({
  src: "./fonts/magneta-mediumitalic.ttf", 
  variable: "--font-magneta",         
  display: "swap",
});

const magneta_medium = localFont({
  src: "./fonts/magneta-medium.ttf", 
  variable: "--font-magneta-medium",         
  display: "swap",
});

const minion = localFont({
  src: "./fonts/minion-regular.otf",
  variable: "--font-minion",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Wisdom of Birth Tarot",
  description: "Tarot card pull for insight and direction",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${magneta.variable} ${minion.variable} ${magneta_medium.variable}`}>
      
      {/* 2. Стилі залишаємо тут */}
      <body className="antialiased bg-background text-primary font-body">
        {children}
      </body>
    </html>
  );
}
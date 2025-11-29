import "./globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { inter } from "./fonts";
import Navigation from "../src/components/Navigation";

export const metadata: Metadata = {
  title: "ProPokerTV",
  description:
    "Entertainment, professionalism and passion for poker — in one universe.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body className="bg-slate-950 text-white">
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  );
}

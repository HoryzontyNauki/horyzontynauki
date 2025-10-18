// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Horyzonty Nauki",
  description: "Platforma łącząca uczniów z nauczycielami",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl">
      <body>{children}</body>
    </html>
  );
}

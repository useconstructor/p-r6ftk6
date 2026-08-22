import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Orion X | The Future on Your Wrist",
  description: "Introducing Orion X — the flagship smartwatch engineered for those who demand precision, elegance, and limitless capability.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}

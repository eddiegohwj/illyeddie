import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Illy & Eddie | Cat Court",
  description: "The fairest cat judge in the land",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

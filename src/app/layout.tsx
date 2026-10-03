import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TypeRush — Find your flow",
  description: "A focused 30-second typing challenge. Find your pace with TypeRush.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

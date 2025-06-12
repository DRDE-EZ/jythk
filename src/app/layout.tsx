import type { Metadata } from "next";
import { Lora } from "next/font/google";
import "./globals.css";

const lora = Lora({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Shop",
    default: "Shop",
  },
  description: "PC Builds, Gaming PCs, and Custom Builds",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lora.className} ${lora.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}

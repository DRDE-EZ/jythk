import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import NavBar from "./NavBar";
import Footer from "./Footer";
import AnimatedSection from "@/components/AnimatedSection";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
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
      <body className={`${dmSans.className}  antialiased`}>
        <NavBar />
        {children}
        <AnimatedSection duration={1.2}>
          <Footer />
        </AnimatedSection>
      </body>
    </html>
  );
}

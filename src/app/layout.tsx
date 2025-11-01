import type { Metadata } from "next";
import { Roboto, Poppins } from "next/font/google";
import "./globals.css";
import NavBar from "./NavBar";
import Footer from "./Footer";
import AnimatedSection from "@/components/AnimatedSection";
import StickyScrollReveal from "@/components/StickyScrollReveal";
import ReactQueryProvider from "./ReactQueryProvider";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["500", "600", "700"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Formex Construction & Wholesale",
    default: "Formex Construction & Wholesale",
  },
  description: "Trusted imports. On-time supply for tomorrow’s builds.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className} ${poppins.className} antialiased`}>
        <Analytics />
        <SpeedInsights />
        <ReactQueryProvider>
          <StickyScrollReveal>
            <NavBar />
          </StickyScrollReveal>

          <div className="flex min-h-screen flex-col pt-20">
            <main className="flex-1 w-full">{children}</main>

            <AnimatedSection duration={1.2}>
              <Footer />
            </AnimatedSection>
          </div>
        </ReactQueryProvider>
        <Toaster />
      </body>
    </html>
  );
}

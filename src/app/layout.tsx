import ClientLayout from "./ClientLayout";
import type { Metadata } from "next";
import { Roboto, Poppins } from "next/font/google";
import "./globals.css";
import NavBar from "./NavBar";
import Footer from "./Footer";
import StickyScrollReveal from "@/components/StickyScrollReveal";
import AnimatedSection from "@/components/AnimatedSection";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
// Removed ErrorBoundary to resolve system error

const roboto = Roboto({ 
  subsets: ["latin"], 
  weight: ["400", "500", "700"],
  display: 'swap',
  preload: true,
});

const poppins = Poppins({ 
  subsets: ["latin"], 
  weight: ["500", "600", "700"],
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  title: {
    template: "%s | Formex Construction & Wholesale",
    default: "Formex Construction & Wholesale",
  },
  description: "Trusted imports. On-time supply for tomorrow's builds.",
  keywords: ["construction", "wholesale", "building materials", "formex"],
  authors: [{ name: "Formex Construction & Wholesale" }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3001'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect to external domains for faster loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.wix.com" />
        <link rel="dns-prefetch" href="https://static.wixstatic.com" />
      </head>
      <body className={`${roboto.className} ${poppins.className} antialiased`}>
        <Analytics />
        <SpeedInsights />
        <ClientLayout>
          {/* Server components with React Query context available */}
          <StickyScrollReveal>
            <NavBar />
          </StickyScrollReveal>
          
          <div className="flex min-h-screen flex-col pt-20">
            <main className="flex-1 w-full">{children}</main>
            <AnimatedSection duration={1.2}>
              <Footer />
            </AnimatedSection>
          </div>
        </ClientLayout>
      </body>
    </html>
  );
}

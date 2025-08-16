import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import NavBar from "./NavBar";
import Footer from "./Footer";
import AnimatedSection from "@/components/AnimatedSection";
import StickyScrollReveal from "@/components/StickyScrollReveal";
import ReactQueryProvider from "./ReactQueryProvider";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "next-themes";
import ThemeManager from "@/components/ThemeManager";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Mycro PC",
    default: "Mycro PC",
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
      <body className={`${dmSans.className} antialiased`}>
        <Analytics />
        <SpeedInsights />
        <ThemeProvider
          attribute={"class"}
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <ThemeManager />
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
        </ThemeProvider>
      </body>
    </html>
  );
}

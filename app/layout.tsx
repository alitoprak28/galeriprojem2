import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "@/app/globals.css";
import { GalleryAdvisorLoader } from "@/components/assistant/gallery-advisor-loader";
import { MobileActionBar } from "@/components/layout/mobile-action-bar";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { StickyWhatsapp } from "@/components/layout/sticky-whatsapp";

export const metadata: Metadata = {
  metadataBase: new URL("https://velocitamotors.example"),
  title: {
    default: "Velocita Motors | Premium Araç Galerisi",
    template: "%s | Velocita Motors",
  },
  description:
    "Mercedes-Benz, Audi, BMW, Tesla, Porsche ve Volkswagen modellerini premium dijital vitrin deneyimiyle keşfedin.",
  keywords: [
    "premium araç galerisi",
    "istanbul oto galeri",
    "ikinci el premium araç",
    "mercedes audi bmw porsche tesla",
  ],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="tr">
      <body>
        <div className="relative min-h-screen w-full overflow-x-clip">
          <Navbar />
          <main className="mobile-safe-offset">{children}</main>
          <Footer />
          <StickyWhatsapp />
          <GalleryAdvisorLoader />
          <MobileActionBar />
        </div>
      </body>
    </html>
  );
}

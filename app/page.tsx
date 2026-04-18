import { BrandStrip } from "@/components/home/brand-strip";
import { CtaBanner } from "@/components/home/cta-banner";
import { DeliverySection } from "@/components/home/delivery-section";
import { FeaturedSection } from "@/components/home/featured-section";
import { HeroSection } from "@/components/home/hero-section";
import { ProofSection } from "@/components/home/proof-section";
import { SocialSection } from "@/components/home/social-section";
import { TestimonialSection } from "@/components/home/testimonial-section";
import { TradeFinanceSection } from "@/components/home/trade-finance-section";
import { TrustSection } from "@/components/home/trust-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <BrandStrip />
      <FeaturedSection />
      <ProofSection />
      <TrustSection />
      <TradeFinanceSection />
      <TestimonialSection />
      <DeliverySection />
      <SocialSection />
      <CtaBanner />
    </>
  );
}

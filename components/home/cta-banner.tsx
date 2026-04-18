import { ButtonLink } from "@/components/ui/button-link";
import { contactInfo } from "@/lib/data";

export function CtaBanner() {
  return (
    <section className="container-shell pb-24">
      <div className="overflow-hidden rounded-[36px] border border-accent/20 bg-gradient-to-r from-[#151007] via-[#0f1218] to-[#0b1017] px-7 py-10 sm:px-10 sm:py-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="max-w-2xl">
            <span className="eyebrow">Hızlı dönüşüm alanı</span>
            <h2 className="mt-5 text-3xl font-semibold text-white md:text-5xl">
              Satın alma sürecini erteletmeyin. Doğru aracı birlikte seçelim.
            </h2>
            <p className="mt-4 text-base leading-7 text-white/70">
              WhatsApp, telefon veya hızlı form üzerinden bize ulaşın. Aradığınız marka ve bütçeye uygun araçları aynı
              gün size özel paylaşalım.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <ButtonLink href="/contact">İletişime Geç</ButtonLink>
            <ButtonLink href={`https://wa.me/${contactInfo.whatsapp.replace(/\D/g, "")}`} variant="secondary">
              WhatsApp
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}

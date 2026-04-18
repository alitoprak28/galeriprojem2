import { ButtonLink } from "@/components/ui/button-link";
import { contactInfo } from "@/lib/data";

export function CtaBanner() {
  return (
    <section className="container-shell pb-16 sm:pb-24">
      <div className="overflow-hidden rounded-[30px] border border-accent/20 bg-gradient-to-r from-[#151007] via-[#0f1218] to-[#0b1017] px-5 py-8 sm:rounded-[36px] sm:px-10 sm:py-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="max-w-2xl">
            <span className="eyebrow">Hızlı dönüşüm alanı</span>
            <h2 className="mt-5 text-[2rem] font-semibold leading-[1.05] text-white md:text-5xl">
              Satın alma sürecini erteletmeyin. Doğru aracı birlikte seçelim.
            </h2>
            <p className="mt-4 text-[15px] leading-7 text-white/70 sm:text-base">
              WhatsApp, telefon veya hızlı form üzerinden bize ulaşın. Aradığınız marka ve bütçeye uygun araçları aynı
              gün size özel paylaşalım.
            </p>
          </div>

          <div className="grid gap-3 sm:flex sm:flex-row lg:flex-col">
            <ButtonLink href="/contact" className="w-full sm:w-auto">
              İletişime Geç
            </ButtonLink>
            <ButtonLink
              href={`https://wa.me/${contactInfo.whatsapp.replace(/\D/g, "")}`}
              variant="secondary"
              className="w-full sm:w-auto"
            >
              WhatsApp
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import { ButtonLink } from "@/components/ui/button-link";
import { stats } from "@/lib/data";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="container-shell grid min-h-[calc(100vh-84px)] items-center gap-10 py-8 sm:py-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:py-16">
        <div className="relative order-2 z-10 max-w-2xl lg:order-1">
          <span className="eyebrow">İstanbul&apos;da Premium İkinci El Araçlar</span>
          <h1 className="headline-display text-balance mt-6 text-[2.9rem] font-semibold leading-[0.94] text-white sm:mt-8 sm:text-6xl xl:text-7xl">
            Seçili araçlarımızı güvenle inceleyin, size en uygun aracı birlikte bulalım.
          </h1>
          <p className="mt-5 max-w-xl text-[15px] leading-7 text-white/72 md:mt-6 md:text-lg md:leading-8">
            Mercedes-Benz, Audi, BMW, Tesla, Porsche ve Volkswagen modellerimizi detaylı olarak inceleyebilir,
            ekspertiz, takas ve finansman desteği için ekibimizle hemen iletişime geçebilirsiniz.
          </p>

          <div className="mt-8 grid gap-3 sm:mt-10 sm:flex sm:flex-wrap sm:gap-4">
            <ButtonLink href="/vehicles" className="w-full sm:w-auto">
              Araçları İncele
            </ButtonLink>
            <ButtonLink href="/contact" variant="secondary" className="w-full sm:w-auto">
              İletişime Geç
            </ButtonLink>
            <ButtonLink href="/brands" variant="ghost" className="justify-start px-2 sm:justify-center">
              Markaları Gör
            </ButtonLink>
          </div>

          <div className="mt-8 grid gap-3 sm:mt-12 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="mobile-panel p-4 sm:rounded-[24px] sm:p-5">
                <p className="text-xl font-semibold text-white sm:text-2xl">{stat.value}</p>
                <p className="mt-2 text-sm leading-6 text-muted">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative order-1 lg:order-2">
          <div className="absolute -left-6 top-10 h-32 w-32 rounded-full bg-accent/25 blur-3xl sm:-left-8 sm:top-12 sm:h-48 sm:w-48" />
          <div className="absolute -right-4 bottom-8 h-36 w-36 rounded-full bg-[#748290]/20 blur-3xl sm:-right-5 sm:bottom-10 sm:h-52 sm:w-52" />
          <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.03] shadow-2xl shadow-black/40 sm:rounded-[36px]">
            <div className="relative h-[380px] sm:h-[460px] lg:h-[520px]">
              <Image
                src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1600&q=80"
                alt="Premium showroom vehicle"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/20 to-transparent" />
            </div>

            <div className="absolute left-4 right-4 top-4 flex flex-wrap items-center gap-2 sm:left-6 sm:right-6 sm:top-6 sm:justify-between">
              <div className="rounded-full border border-white/15 bg-black/35 px-3 py-2 text-[10px] uppercase tracking-[0.22em] text-white sm:px-4 sm:text-xs sm:tracking-[0.24em]">
                Ekspertiz Destekli Satış
              </div>
              <div className="rounded-full border border-white/15 bg-black/35 px-3 py-2 text-[10px] uppercase tracking-[0.22em] text-accent sm:px-4 sm:text-xs sm:tracking-[0.24em]">
                Takas ve Finansman
              </div>
            </div>

            <div className="absolute bottom-4 left-4 right-4 grid gap-3 sm:bottom-6 sm:left-6 sm:right-6 sm:gap-4 md:grid-cols-2">
              <div className="rounded-[22px] border border-white/10 bg-black/35 p-4 backdrop-blur-xl sm:rounded-[24px] sm:p-5">
                <p className="text-xs uppercase tracking-[0.25em] text-white/60">Güvenli alışveriş</p>
                <p className="mt-3 text-lg font-semibold text-white sm:text-xl">
                  Ekspertiz ve araç geçmişi şeffaf şekilde paylaşılır
                </p>
              </div>
              <div className="rounded-[22px] border border-white/10 bg-black/35 p-4 backdrop-blur-xl sm:rounded-[24px] sm:p-5">
                <p className="text-xs uppercase tracking-[0.25em] text-white/60">Hızlı iletişim</p>
                <p className="mt-3 text-lg font-semibold text-white sm:text-xl">
                  WhatsApp üzerinden aynı gün bilgi ve randevu alın
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

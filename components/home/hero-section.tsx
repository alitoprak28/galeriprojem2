import Image from "next/image";
import { ButtonLink } from "@/components/ui/button-link";
import { featuredVehicles, stats } from "@/lib/data";

const heroPreviewVehicles = featuredVehicles.slice(0, 3);

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="container-shell grid min-h-[calc(100vh-84px)] items-center gap-10 py-8 sm:py-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:py-16">
        <div className="relative order-2 z-10 max-w-2xl lg:order-1">
          <span className="eyebrow">Istanbul&apos;da Premium Ikinci El Araclar</span>
          <h1 className="headline-display text-balance mt-6 text-[2.85rem] font-semibold leading-[0.92] text-white sm:mt-8 sm:text-6xl xl:text-7xl">
            Showroom hissini mobilde de guclu veren premium arac vitrini.
          </h1>
          <p className="mt-5 max-w-lg text-[15px] leading-7 text-white/72 md:mt-6 md:text-lg md:leading-8">
            Secili modeller, buyuk gorseller, net fiyat ve hizli ulasim. Araciniza bakarken metin yerine vitrin
            deneyimi hissedin.
          </p>

          <div className="mt-8 grid gap-3 sm:mt-10 sm:flex sm:flex-wrap sm:gap-4">
            <ButtonLink href="/vehicles" className="w-full sm:w-auto">
              Araclari Incele
            </ButtonLink>
            <ButtonLink href="/contact" variant="secondary" className="w-full sm:w-auto">
              Hemen Ulas
            </ButtonLink>
          </div>

          <div className="hide-scrollbar mt-8 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1 sm:mt-12 sm:grid sm:grid-cols-2 sm:gap-4 xl:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="mobile-panel min-w-[13rem] snap-start p-4 sm:min-w-0 sm:rounded-[24px] sm:p-5">
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
            <div className="relative h-[440px] sm:h-[520px] lg:h-[620px]">
              <Image
                src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1600&q=80"
                alt="Premium showroom vehicle"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080b10] via-black/10 to-transparent" />
            </div>

            <div className="absolute left-4 right-4 top-4 flex flex-wrap items-center gap-2 sm:left-6 sm:right-6 sm:top-6 sm:justify-between">
              <div className="rounded-full border border-white/15 bg-black/35 px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-white sm:px-4 sm:text-xs">
                Ekspertiz Destekli
              </div>
              <div className="rounded-full border border-white/15 bg-black/35 px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-accent sm:px-4 sm:text-xs">
                Takas ve Finansman
              </div>
            </div>

            <div className="absolute bottom-4 left-4 right-4 space-y-3 sm:bottom-6 sm:left-6 sm:right-6 sm:space-y-4">
              <div className="grid gap-3 md:grid-cols-[1.1fr_0.9fr]">
                <div className="rounded-[24px] border border-white/10 bg-black/40 p-4 backdrop-blur-xl sm:p-5">
                  <p className="text-xs uppercase tracking-[0.22em] text-white/60">Bugun vitrine cikan secki</p>
                  <p className="mt-3 text-2xl font-semibold text-white sm:text-3xl">8 premium model</p>
                  <p className="mt-2 max-w-xs text-sm leading-6 text-white/70">
                    Buyuk gorsel alanlar, net fiyatlar ve tek dokunusla iletisim.
                  </p>
                </div>

                <div className="hide-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain">
                  {heroPreviewVehicles.map((vehicle) => (
                    <div
                      key={vehicle.slug}
                      className="relative h-28 min-w-[8.8rem] snap-start overflow-hidden rounded-[22px] border border-white/10 bg-black/20 sm:h-auto sm:min-w-0 sm:flex-1"
                    >
                      <Image src={vehicle.coverImage} alt={vehicle.model} fill sizes="160px" className="object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                      <div className="absolute inset-x-3 bottom-3">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-white/60">{vehicle.brand}</p>
                        <p className="mt-1 text-sm font-semibold text-white">{vehicle.model}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-[22px] border border-white/10 bg-black/35 p-4 backdrop-blur-xl sm:rounded-[24px] sm:p-5">
                  <p className="text-xs uppercase tracking-[0.22em] text-white/60">Guvenli alisveris</p>
                  <p className="mt-3 text-lg font-semibold text-white sm:text-xl">
                    Ekspertiz ve arac gecmisi seffaf sekilde paylasilir
                  </p>
                </div>
                <div className="rounded-[22px] border border-white/10 bg-black/35 p-4 backdrop-blur-xl sm:rounded-[24px] sm:p-5">
                  <p className="text-xs uppercase tracking-[0.22em] text-white/60">Hizli iletisim</p>
                  <p className="mt-3 text-lg font-semibold text-white sm:text-xl">
                    WhatsApp uzerinden ayni gun bilgi ve randevu alin
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

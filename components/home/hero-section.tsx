import Image from "next/image";
import { ButtonLink } from "@/components/ui/button-link";
import { featuredVehicles } from "@/lib/data";

const heroStats = [
  { value: "14+", label: "Seçili premium araç" },
  { value: "%100", label: "Ekspertiz paylaşımı" },
  { value: "Var", label: "Takas kabul" },
  { value: "15 dk", label: "WhatsApp dönüşü" },
];

const previewVehicles = featuredVehicles.slice(0, 3);

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="container-shell grid min-w-0 items-center gap-8 py-8 sm:gap-10 sm:py-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12 lg:py-16">
        <div className="order-1 min-w-0 max-w-2xl">
          <span className="eyebrow">İstanbul&apos;da ekspertiz destekli premium ikinci el araçlar</span>
          <h1 className="headline-display text-balance mt-6 text-[2.2rem] font-semibold leading-[0.96] text-white sm:mt-8 sm:text-6xl xl:text-7xl">
            Stoktaki premium araçları inceleyin, size uygun aracı birlikte seçelim.
          </h1>
          <p className="mt-5 max-w-xl text-[15px] leading-7 text-white/72 md:mt-6 md:text-lg md:leading-8">
            Galerimizdeki seçili Mercedes-Benz, BMW, Audi, Porsche ve Tesla modellerini fiyat, ekspertiz, takas ve
            kredi detaylarıyla inceleyin. WhatsApp&apos;tan bilgi alın, showroom randevunuzu planlayın.
          </p>

          <div className="mt-8 grid gap-3 sm:mt-10 sm:flex sm:flex-wrap sm:gap-4">
            <ButtonLink href="/vehicles" className="w-full sm:w-auto">
              Stoktaki Araçlar
            </ButtonLink>
            <ButtonLink
              href="https://wa.me/905488893894?text=Merhaba,%20stoktaki%20araçlar%20ve%20fiyatlar%20hakkında%20bilgi%20almak%20istiyorum."
              variant="secondary"
              className="w-full sm:w-auto"
            >
              WhatsApp Bilgi
            </ButtonLink>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-4">
            {heroStats.map((stat) => (
              <div key={stat.label} className="mobile-panel p-4 sm:rounded-[24px] sm:p-5">
                <p className="text-xl font-semibold text-white sm:text-2xl">{stat.value}</p>
                <p className="mt-2 text-sm leading-6 text-muted">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="order-2 min-w-0">
          <div className="overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.03] shadow-2xl shadow-black/40 sm:rounded-[36px]">
            <div className="relative h-[280px] sm:h-[460px] lg:h-[580px]">
              <Image
                src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1600&q=80"
                alt="Showroomda sergilenen premium araç"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090d13] via-black/15 to-transparent" />

              <div className="absolute left-4 right-4 top-4 hidden flex-wrap items-center gap-2 sm:left-6 sm:right-6 sm:top-6 md:flex md:justify-between">
                <div className="rounded-full border border-white/15 bg-black/35 px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-white sm:px-4 sm:text-xs">
                  Ekspertiz Destekli Satış
                </div>
                <div className="rounded-full border border-white/15 bg-black/35 px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-accent sm:px-4 sm:text-xs">
                  Takas ve Finansman
                </div>
              </div>

              <div className="absolute inset-x-4 bottom-4 hidden space-y-3 sm:inset-x-6 sm:bottom-6 sm:space-y-4 md:block">
                <div className="rounded-[24px] border border-white/10 bg-black/40 p-4 backdrop-blur-xl sm:p-5">
                  <p className="text-xs uppercase tracking-[0.22em] text-white/60">Bugün vitrinde</p>
                  <p className="mt-3 text-2xl font-semibold text-white sm:text-3xl">Fiyatı net, geçmişi şeffaf premium araçlar</p>
                  <p className="mt-2 max-w-md text-sm leading-6 text-white/70">
                    Her araç için detaylı bilgi, hızlı geri dönüş ve yerinde showroom deneyimi.
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  {previewVehicles.map((vehicle) => (
                    <div
                      key={vehicle.slug}
                      className="relative h-24 overflow-hidden rounded-[20px] border border-white/10 bg-black/20 sm:h-32 sm:rounded-[22px]"
                    >
                      <Image src={vehicle.coverImage} alt={vehicle.model} fill sizes="33vw" className="object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
                      <div className="absolute inset-x-2 bottom-2 sm:inset-x-3 sm:bottom-3">
                        <p className="text-[9px] uppercase tracking-[0.16em] text-white/60 sm:text-[10px]">{vehicle.brand}</p>
                        <p className="mt-1 text-sm font-semibold leading-none text-white sm:text-base">{vehicle.model}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-[22px] border border-white/10 bg-black/35 p-4 backdrop-blur-xl sm:rounded-[24px] sm:p-5">
                    <p className="text-xs uppercase tracking-[0.2em] text-white/60">Güvenli alışveriş</p>
                    <p className="mt-3 text-lg font-semibold text-white sm:text-xl">
                      Ekspertiz, servis geçmişi ve fiyat bilgisi net şekilde paylaşılır.
                    </p>
                  </div>
                  <div className="rounded-[22px] border border-white/10 bg-black/35 p-4 backdrop-blur-xl sm:rounded-[24px] sm:p-5">
                    <p className="text-xs uppercase tracking-[0.2em] text-white/60">Hızlı dönüş</p>
                    <p className="mt-3 text-lg font-semibold text-white sm:text-xl">
                      WhatsApp üzerinden aynı gün bilgi alın, randevunuzu hemen oluşturun.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3 p-4 md:hidden">
              <div className="flex flex-wrap gap-2">
                <div className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-white">
                  Ekspertiz Destekli Satış
                </div>
                <div className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-accent">
                  Takas ve Finansman
                </div>
              </div>

              <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-4">
                <p className="text-xs uppercase tracking-[0.22em] text-white/60">Bugün vitrinde</p>
                <p className="mt-3 text-2xl font-semibold text-white">Fiyatı net, geçmişi şeffaf premium araçlar</p>
                <p className="mt-2 text-sm leading-6 text-white/70">
                  Her araç için detaylı bilgi, hızlı geri dönüş ve yerinde showroom deneyimi.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {previewVehicles.map((vehicle) => (
                  <div key={vehicle.slug} className="overflow-hidden rounded-[18px] border border-white/10 bg-white/[0.03]">
                    <div className="relative h-20">
                      <Image src={vehicle.coverImage} alt={vehicle.model} fill sizes="33vw" className="object-cover" />
                    </div>
                    <div className="space-y-1 p-2">
                      <p className="truncate text-[9px] uppercase tracking-[0.14em] text-white/55">{vehicle.brand}</p>
                      <p className="truncate text-sm font-semibold text-white">{vehicle.model}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid gap-3">
                <div className="rounded-[22px] border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-white/60">Güvenli alışveriş</p>
                  <p className="mt-3 text-lg font-semibold text-white">
                    Ekspertiz, servis geçmişi ve fiyat bilgisi net şekilde paylaşılır.
                  </p>
                </div>
                <div className="rounded-[22px] border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-white/60">Hızlı dönüş</p>
                  <p className="mt-3 text-lg font-semibold text-white">
                    WhatsApp üzerinden aynı gün bilgi alın, randevunuzu hemen oluşturun.
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

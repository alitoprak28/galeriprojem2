import Image from "next/image";
import { ButtonLink } from "@/components/ui/button-link";
import { stats } from "@/lib/data";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="container-shell grid min-h-[calc(100vh-84px)] items-center gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="relative z-10 max-w-2xl">
          <span className="eyebrow">İstanbul&apos;da Premium İkinci El Araçlar</span>
          <h1 className="headline-display text-balance mt-8 text-5xl font-semibold leading-[0.95] text-white sm:text-6xl xl:text-7xl">
            Seçili araçlarımızı güvenle inceleyin, size en uygun aracı birlikte bulalım.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-8 text-white/72 md:text-lg">
            Mercedes-Benz, Audi, BMW, Tesla, Porsche ve Volkswagen modellerimizi detaylı olarak inceleyebilir,
            ekspertiz, takas ve finansman desteği için ekibimizle hemen iletişime geçebilirsiniz.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <ButtonLink href="/vehicles">Araçları İncele</ButtonLink>
            <ButtonLink href="/contact" variant="secondary">
              İletişime Geç
            </ButtonLink>
            <ButtonLink href="/brands" variant="ghost" className="px-2">
              Markaları Gör
            </ButtonLink>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
                <p className="text-2xl font-semibold text-white">{stat.value}</p>
                <p className="mt-2 text-sm leading-6 text-muted">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute -left-8 top-12 h-48 w-48 rounded-full bg-accent/25 blur-3xl" />
          <div className="absolute -right-5 bottom-10 h-52 w-52 rounded-full bg-[#748290]/20 blur-3xl" />
          <div className="relative h-[520px] overflow-hidden rounded-[36px] border border-white/10 bg-white/[0.03] shadow-2xl shadow-black/40">
            <Image
              src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1600&q=80"
              alt="Premium showroom vehicle"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/20 to-transparent" />

            <div className="absolute left-6 right-6 top-6 flex items-center justify-between">
              <div className="rounded-full border border-white/15 bg-black/35 px-4 py-2 text-xs uppercase tracking-[0.24em] text-white">
                Ekspertiz Destekli Satış
              </div>
              <div className="rounded-full border border-white/15 bg-black/35 px-4 py-2 text-xs uppercase tracking-[0.24em] text-accent">
                Takas ve Finansman
              </div>
            </div>

            <div className="absolute bottom-6 left-6 right-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-[24px] border border-white/10 bg-black/35 p-5 backdrop-blur-xl">
                <p className="text-xs uppercase tracking-[0.25em] text-white/60">Güvenli alışveriş</p>
                <p className="mt-3 text-xl font-semibold text-white">Ekspertiz ve araç geçmişi şeffaf şekilde paylaşılır</p>
              </div>
              <div className="rounded-[24px] border border-white/10 bg-black/35 p-5 backdrop-blur-xl">
                <p className="text-xs uppercase tracking-[0.25em] text-white/60">Hızlı iletişim</p>
                <p className="mt-3 text-xl font-semibold text-white">WhatsApp üzerinden aynı gün bilgi ve randevu alın</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

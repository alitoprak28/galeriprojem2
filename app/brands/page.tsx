import { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/section-heading";
import { brands } from "@/lib/data";

export const metadata: Metadata = {
  title: "Markalar",
  description: "Premium markalara göre filtrelenmiş araç akışına tek tıkla ulaşın.",
};

export default function BrandsPage() {
  return (
    <div className="container-shell py-16 md:py-24">
      <SectionHeading
        eyebrow="Marka seçimi"
        title="Her markaya ayrı karakter, tek bir premium deneyim."
        description="Mercedes-Benz, Audi, BMW, Tesla, Porsche ve Volkswagen için güçlü marka algısını koruyan sade ama etkili bir keşif akışı."
      />

      <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {brands.map((brand, index) => (
          <Link
            key={brand.name}
            href={`/vehicles?brand=${encodeURIComponent(brand.name)}`}
            className="group rounded-[32px] border border-white/10 bg-white/[0.03] p-8 transition duration-300 hover:-translate-y-1 hover:border-accent"
          >
            <div className="flex items-center justify-between gap-4">
              <span className="text-xs uppercase tracking-[0.3em] text-muted">0{index + 1}</span>
              <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.24em] text-accent">
                Premium Brand
              </span>
            </div>
            <h2 className="mt-10 text-4xl font-semibold text-white transition group-hover:text-accent">{brand.name}</h2>
            <p className="mt-4 text-sm uppercase tracking-[0.18em] text-white/60">{brand.tagline}</p>
            <p className="mt-5 text-sm leading-7 text-muted">{brand.description}</p>
            <div className="mt-10 inline-flex rounded-full border border-white/10 px-4 py-2 text-sm text-white transition group-hover:border-accent group-hover:text-accent">
              Filtrelenmiş araçları gör
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

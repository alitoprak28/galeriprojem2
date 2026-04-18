import Link from "next/link";
import { brands } from "@/lib/data";

export function BrandStrip() {
  return (
    <section className="container-shell py-6 sm:py-8">
      <div className="grid gap-3 rounded-[28px] border border-white/10 bg-white/[0.03] p-4 sm:gap-4 sm:rounded-[32px] sm:p-6 md:grid-cols-3 xl:grid-cols-6">
        {brands.map((brand) => (
          <Link
            key={brand.name}
            href={`/vehicles?brand=${encodeURIComponent(brand.name)}`}
            className="group rounded-[22px] border border-white/10 bg-black/20 px-4 py-5 text-center transition hover:border-accent hover:bg-white/[0.04] sm:rounded-[24px] sm:px-5 sm:py-6"
          >
            <p className="text-[11px] uppercase tracking-[0.3em] text-muted">Brand</p>
            <p className="mt-3 text-lg font-semibold text-white transition group-hover:text-accent">{brand.name}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

import Image from "next/image";
import { featuredVehicles, googleReviewSummary } from "@/lib/data";

const proofItems = [
  { label: "Aynı gün görüntülü tanıtım", value: "Var" },
  { label: "Ekspertiz dosyası paylaşımı", value: "%100" },
  { label: "Takas ve kredi desteği", value: "Mevcut" },
  { label: "Showroom randevusu", value: "Planlı" },
];

export function ProofSection() {
  const focusVehicle = featuredVehicles[1];
  const previewVehicles = featuredVehicles.slice(0, 3);

  return (
    <section className="container-shell py-16 sm:py-24">
      <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
        <article className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[#12171d]">
          <div className="relative h-56 sm:h-[30rem]">
            <Image src={focusVehicle.coverImage} alt={focusVehicle.model} fill sizes="100vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d12] via-black/10 to-transparent" />
          </div>

          <div className="absolute inset-x-4 bottom-4 hidden space-y-3 sm:inset-x-6 sm:bottom-6 sm:space-y-4 lg:block">
            <div className="rounded-[24px] border border-white/10 bg-black/40 p-4 backdrop-blur-xl sm:p-6">
              <p className="text-xs uppercase tracking-[0.2em] text-accent">Galeri Güveni</p>
              <h2 className="mt-3 max-w-md text-3xl font-semibold leading-tight text-white sm:text-4xl">
                Aracı görmeden önce bilgiye, karar vermeden önce güvene odaklanın.
              </h2>
            </div>

            <div className="grid grid-cols-[0.9fr_1.1fr] gap-3">
              <div className="rounded-[24px] border border-white/10 bg-black/40 p-4 backdrop-blur-xl sm:p-5">
                <p className="text-[10px] uppercase tracking-[0.18em] text-white/55">{googleReviewSummary.label}</p>
                <p className="mt-2 text-4xl font-semibold leading-none text-accent">{googleReviewSummary.rating}</p>
                <p className="mt-2 text-sm text-white/75">{googleReviewSummary.count}</p>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {previewVehicles.map((vehicle) => (
                  <div key={vehicle.slug} className="relative h-28 overflow-hidden rounded-[20px] border border-white/10">
                    <Image src={vehicle.coverImage} alt={vehicle.model} fill sizes="33vw" className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 to-transparent" />
                    <div className="absolute inset-x-2 bottom-2">
                      <p className="truncate text-[9px] uppercase tracking-[0.14em] text-white/55">{vehicle.brand}</p>
                      <p className="mt-1 truncate text-sm font-semibold text-white">{vehicle.model}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 lg:hidden">
            <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-accent">Galeri Güveni</p>
              <h2 className="mt-3 text-2xl font-semibold leading-tight text-white">
                Aracı görmeden önce bilgiye, karar vermeden önce güvene odaklanın.
              </h2>
            </div>

            <div className="grid grid-cols-[0.9fr_1.1fr] gap-3">
              <div className="rounded-[22px] border border-white/10 bg-white/[0.03] p-4">
                <p className="text-[10px] uppercase tracking-[0.18em] text-white/55">{googleReviewSummary.label}</p>
                <p className="mt-2 text-4xl font-semibold leading-none text-accent">{googleReviewSummary.rating}</p>
                <p className="mt-2 text-sm text-white/75">{googleReviewSummary.count}</p>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {previewVehicles.slice(0, 2).map((vehicle) => (
                  <div key={vehicle.slug} className="flex items-center gap-3 rounded-[20px] border border-white/10 bg-white/[0.03] p-3">
                    <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-[14px]">
                      <Image src={vehicle.coverImage} alt={vehicle.model} fill sizes="80px" className="object-cover" />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-[9px] uppercase tracking-[0.14em] text-white/55">{vehicle.brand}</p>
                      <p className="mt-1 truncate text-sm font-semibold text-white">{vehicle.model}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </article>

        <div className="grid gap-4 sm:grid-cols-2">
          {proofItems.map((item, index) => {
            const vehicle = featuredVehicles[index % featuredVehicles.length];

            return (
              <article key={item.label} className="overflow-hidden rounded-[28px] border border-white/10 bg-[#141921]">
                <div className="relative h-44 sm:h-56">
                  <Image src={vehicle.coverImage} alt={vehicle.model} fill sizes="50vw" className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b0e13] via-black/20 to-transparent" />
                  <div className="absolute inset-x-4 bottom-4 hidden rounded-[22px] border border-white/10 bg-black/40 p-4 backdrop-blur-xl sm:block">
                    <p className="text-[10px] uppercase tracking-[0.16em] text-white/55">{item.label}</p>
                    <p className="mt-2 text-2xl font-semibold text-white">{item.value}</p>
                  </div>
                </div>
                <div className="space-y-2 p-4 sm:hidden">
                  <p className="text-[10px] uppercase tracking-[0.16em] text-white/55">{item.label}</p>
                  <p className="text-2xl font-semibold text-white">{item.value}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

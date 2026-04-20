import Image from "next/image";
import { recentDeliveries, vehicles } from "@/lib/data";
import { SectionHeading } from "@/components/ui/section-heading";

const deliveryVisuals = [vehicles[2], vehicles[3], vehicles[4]];

export function DeliverySection() {
  return (
    <section className="container-shell py-16 sm:py-24">
      <SectionHeading
        eyebrow="Teslimatlar"
        title="Mutlu teslimatlari da sadece metinle degil, sahne hissiyle gosterelim"
        description="Teslimat surecini daha sinematik ve premium yansitan gorsel kartlar."
      />

      <div className="hide-scrollbar mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-1 lg:grid lg:grid-cols-3 lg:gap-6">
        {recentDeliveries.map((story, index) => {
          const vehicle = deliveryVisuals[index];

          return (
            <article
              key={`${story.customer}-${story.vehicle}`}
              className="relative min-w-[88%] snap-start overflow-hidden rounded-[30px] border border-white/10 bg-[#12171d] lg:min-w-0"
            >
              <div className="relative h-[25rem]">
                <Image src={vehicle.coverImage} alt={story.vehicle} fill sizes="(max-width: 1024px) 88vw, 33vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080b10] via-black/20 to-transparent" />
              </div>

              <div className="absolute inset-x-4 bottom-4 rounded-[24px] border border-white/10 bg-black/40 p-5 backdrop-blur-xl">
                <p className="text-[10px] uppercase tracking-[0.2em] text-accent">{story.city}</p>
                <h3 className="mt-2 text-2xl font-semibold text-white">{story.vehicle}</h3>
                <p className="mt-1 text-sm text-white/65">{story.customer}</p>
                <p className="mt-3 text-sm leading-6 text-white/80">{story.note}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

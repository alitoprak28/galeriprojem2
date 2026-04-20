import { featuredVehicles } from "@/lib/data";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { VehicleCard } from "@/components/vehicle/vehicle-card";

export function FeaturedSection() {
  return (
    <section className="container-shell py-16 sm:py-24">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          eyebrow="One Cikan Araclar"
          title="Poster gibi sunulan secili araclar"
          description="Mobilde kart degil vitrin hissi veren, buyuk gorsel odakli secki."
        />
      </div>

      <div className="hide-scrollbar mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 lg:hidden">
        {featuredVehicles.map((vehicle, index) => (
          <Reveal key={vehicle.slug} delay={index * 0.08} className="min-w-[88%] snap-start">
            <VehicleCard vehicle={vehicle} />
          </Reveal>
        ))}
      </div>

      <div className="mt-12 hidden gap-6 lg:grid lg:grid-cols-2">
        {featuredVehicles.map((vehicle, index) => (
          <Reveal key={vehicle.slug} delay={index * 0.08}>
            <VehicleCard vehicle={vehicle} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

import { featuredVehicles } from "@/lib/data";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { VehicleCard } from "@/components/vehicle/vehicle-card";

export function FeaturedSection() {
  return (
    <section className="container-shell py-24">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          eyebrow="Öne Çıkan Araçlar"
          title="Vitrindeki seçili araçlarımız"
          description="Düşük kilometreli, güçlü donanımlı ve özenle seçilmiş araçlarımızı detaylarıyla inceleyin."
        />
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        {featuredVehicles.map((vehicle, index) => (
          <Reveal key={vehicle.slug} delay={index * 0.08}>
            <VehicleCard vehicle={vehicle} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

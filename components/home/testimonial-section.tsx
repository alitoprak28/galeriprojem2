import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { testimonials, vehicles } from "@/lib/data";

const testimonialVehicles = [vehicles[4], vehicles[3], vehicles[2]];

export function TestimonialSection() {
  return (
    <section className="container-shell py-16 sm:py-24">
      <SectionHeading
        eyebrow="Musteri Yorumu"
        title="Yuksek fiyatli kararlarda guven gorselle desteklenmeli"
        description="Kisa alinti, guclu arka plan, daha premium bir mobil hissiyat."
      />

      <div className="hide-scrollbar mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-1 lg:grid lg:grid-cols-3 lg:gap-6">
        {testimonials.map((testimonial, index) => {
          const vehicle = testimonialVehicles[index];

          return (
            <Reveal key={testimonial.name} delay={index * 0.08} className="min-w-[88%] snap-start lg:min-w-0">
              <article className="relative overflow-hidden rounded-[30px] border border-white/10 bg-[#12171d]">
                <div className="relative h-[26rem]">
                  <Image src={vehicle.coverImage} alt={vehicle.model} fill sizes="(max-width: 1024px) 88vw, 33vw" className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080b10] via-black/15 to-transparent" />
                </div>
                <div className="absolute inset-x-4 bottom-4 rounded-[24px] border border-white/10 bg-black/40 p-5 backdrop-blur-xl">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-white">{testimonial.name}</p>
                      <p className="mt-1 text-sm text-white/65">{testimonial.role}</p>
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-sm font-semibold text-accent">
                      0{index + 1}
                    </div>
                  </div>
                  <p className="mt-4 text-base leading-7 text-white/88">&quot;{testimonial.quote}&quot;</p>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

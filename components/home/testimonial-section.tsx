import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { vehicles } from "@/lib/data";

const testimonialVehicles = [vehicles[4], vehicles[3], vehicles[2]];

const testimonials = [
  {
    name: "Emre T.",
    role: "Porsche Macan Alıcısı",
    quote: "Araç anlatımı, ekspertiz şeffaflığı ve teslimat süreci gerçekten güven vericiydi.",
  },
  {
    name: "Zeynep A.",
    role: "Tesla Model Y Alıcısı",
    quote: "Instagram üzerinden ulaştım, aynı gün görüntülü tanıtım aldım ve süreci rahat ilerlettim.",
  },
  {
    name: "Murat K.",
    role: "Kurumsal Müşteri",
    quote: "İkinci alımımızda da iletişim hızları ve kurumsal duruşları sayesinde gönül rahatlığıyla ilerledik.",
  },
];

export function TestimonialSection() {
  return (
    <section className="container-shell py-16 sm:py-24">
      <SectionHeading
        eyebrow="Müşteri Yorumu"
        title="Araç satışında en güçlü referans, memnun müşterinin verdiği güvendir."
        description="Satış sonrası memnuniyet, hızlı iletişim ve net süreç anlatımı galerici markasını güçlendirir."
      />

      <div className="mt-10 grid gap-4 lg:grid-cols-3 lg:gap-6">
        {testimonials.map((testimonial, index) => {
          const vehicle = testimonialVehicles[index];

          return (
            <Reveal key={testimonial.name} delay={index * 0.08}>
              <article className="relative overflow-hidden rounded-[30px] border border-white/10 bg-[#12171d]">
                <div className="relative h-[24rem]">
                  <Image src={vehicle.coverImage} alt={vehicle.model} fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover" />
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

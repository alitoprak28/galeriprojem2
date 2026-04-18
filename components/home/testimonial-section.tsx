import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { testimonials } from "@/lib/data";

export function TestimonialSection() {
  return (
    <section className="container-shell py-24">
      <SectionHeading
        eyebrow="Müşteri yorumu"
        title="Kurumsal algıyı güçlendiren gerçek müşteri güveni."
        description="Yüksek fiyatlı satın alma kararlarında dijital güven, kullanıcı yorumları ve net iletişim kalitesiyle desteklenir."
      />

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <Reveal key={testimonial.name} delay={index * 0.08}>
            <article className="rounded-[28px] border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.02] p-8">
              <p className="text-base leading-8 text-white/80">“{testimonial.quote}”</p>
              <div className="mt-8 border-t border-white/10 pt-5">
                <p className="font-semibold text-white">{testimonial.name}</p>
                <p className="mt-1 text-sm text-muted">{testimonial.role}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

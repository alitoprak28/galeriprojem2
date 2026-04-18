import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { trustHighlights } from "@/lib/data";

export function TrustSection() {
  return (
    <section className="container-shell py-16 sm:py-24">
      <SectionHeading
        eyebrow="Neden Bizi Tercih Etmelisiniz?"
        title="Doğru aracı güvenle almanız için yanınızdayız."
        description="Ekspertiz desteği, servis geçmişi, takas ve finansman çözümleriyle süreci sizin için kolaylaştırıyoruz."
      />

      <div className="mt-10 grid gap-4 sm:mt-12 sm:gap-6 lg:grid-cols-3">
        {trustHighlights.map((item, index) => (
          <Reveal key={item.title} delay={index * 0.08}>
            <article className="rounded-[24px] border border-white/10 bg-white/[0.03] p-6 sm:rounded-[28px] sm:p-8">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-accent/30 bg-accent/10 text-sm text-accent sm:h-12 sm:w-12">
                0{index + 1}
              </div>
              <h3 className="mt-5 text-xl font-semibold text-white sm:mt-6 sm:text-2xl">{item.title}</h3>
              <p className="mt-4 text-sm leading-7 text-muted">{item.description}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

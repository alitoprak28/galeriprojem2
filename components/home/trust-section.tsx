import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { trustHighlights } from "@/lib/data";

export function TrustSection() {
  return (
    <section className="container-shell py-24">
      <SectionHeading
        eyebrow="Neden Bizi Tercih Etmelisiniz?"
        title="Doğru aracı güvenle almanız için yanınızdayız."
        description="Ekspertiz desteği, servis geçmişi, takas ve finansman çözümleriyle süreci sizin için kolaylaştırıyoruz."
      />

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {trustHighlights.map((item, index) => (
          <Reveal key={item.title} delay={index * 0.08}>
            <article className="rounded-[28px] border border-white/10 bg-white/[0.03] p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-accent/30 bg-accent/10 text-accent">
                0{index + 1}
              </div>
              <h3 className="mt-6 text-2xl font-semibold text-white">{item.title}</h3>
              <p className="mt-4 text-sm leading-7 text-muted">{item.description}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

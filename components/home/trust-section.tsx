import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

const trustItems = [
  {
    title: "Ekspertiz ve şeffaf geçmiş",
    description: "Her araç için ekspertiz, bakım geçmişi ve kritik detaylar açık şekilde paylaşılır.",
  },
  {
    title: "Takas ve kredi desteği",
    description: "Mevcut aracınızı değerlendirebilir, bütçenize uygun ödeme planını birlikte netleştiririz.",
  },
  {
    title: "Hızlı bilgi ve randevu",
    description: "WhatsApp üzerinden fiyat, ekspertiz ve showroom randevu sürecini aynı gün başlatabilirsiniz.",
  },
];

export function TrustSection() {
  return (
    <section className="container-shell py-16 sm:py-24">
      <SectionHeading
        eyebrow="Galeri Güvencesi"
        title="Araç satarken de alırken de güven veren net bir süreç sunuyoruz."
        description="Galerici mantığıyla hızlı, açık ve satış odaklı ilerliyor; müşteriye karar vermesi için gereken bilgiyi eksiksiz veriyoruz."
      />

      <div className="mt-10 grid gap-4 sm:mt-12 sm:gap-6 lg:grid-cols-3">
        {trustItems.map((item, index) => (
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

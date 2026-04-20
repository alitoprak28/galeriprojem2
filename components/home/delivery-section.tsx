import Image from "next/image";
import { vehicles } from "@/lib/data";
import { SectionHeading } from "@/components/ui/section-heading";

const deliveryVisuals = [vehicles[2], vehicles[3], vehicles[4]];

const deliveries = [
  {
    customer: "Berke C.",
    vehicle: "BMW 520i M Sport",
    city: "İstanbul",
    note: "Instagram üzerinden başlayan süreç aynı hafta noter teslimiyle tamamlandı.",
  },
  {
    customer: "Selin O.",
    vehicle: "Tesla Model Y Long Range",
    city: "Bursa",
    note: "Görüntülü tanıtım, ekspertiz dosyası ve uzaktan kapora süreci sorunsuz ilerledi.",
  },
  {
    customer: "Onur D.",
    vehicle: "Porsche Macan",
    city: "Ankara",
    note: "Takas destekli işlem tek gün içinde planlandı ve premium teslimat akışıyla tamamlandı.",
  },
];

export function DeliverySection() {
  return (
    <section className="container-shell py-16 sm:py-24">
      <SectionHeading
        eyebrow="Teslimatlar"
        title="Mutlu müşterilere teslim edilen araçlar satış güvenini görünür hale getirir."
        description="Teslimat anı sadece sonuç değil; galerinin güven, hız ve süreç kalitesini gösteren en güçlü vitrindir."
      />

      <div className="mt-10 grid gap-4 lg:grid-cols-3 lg:gap-6">
        {deliveries.map((story, index) => {
          const vehicle = deliveryVisuals[index];

          return (
            <article
              key={`${story.customer}-${story.vehicle}`}
              className="overflow-hidden rounded-[30px] border border-white/10 bg-[#12171d]"
            >
              <div className="relative h-56 md:h-[24rem]">
                <Image src={vehicle.coverImage} alt={story.vehicle} fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080b10] via-black/20 to-transparent" />
                <div className="absolute inset-x-4 bottom-4 hidden rounded-[24px] border border-white/10 bg-black/40 p-5 backdrop-blur-xl md:block">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-accent">{story.city}</p>
                  <h3 className="mt-2 text-2xl font-semibold text-white">{story.vehicle}</h3>
                  <p className="mt-1 text-sm text-white/65">{story.customer}</p>
                  <p className="mt-3 text-sm leading-6 text-white/80">{story.note}</p>
                </div>
              </div>

              <div className="space-y-2 p-4 md:hidden">
                <p className="text-[10px] uppercase tracking-[0.18em] text-accent">{story.city}</p>
                <h3 className="text-2xl font-semibold text-white">{story.vehicle}</h3>
                <p className="text-sm text-white/65">{story.customer}</p>
                <p className="text-sm leading-6 text-white/80">{story.note}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

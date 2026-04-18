import { recentDeliveries } from "@/lib/data";
import { SectionHeading } from "@/components/ui/section-heading";

export function DeliverySection() {
  return (
    <section className="container-shell py-24">
      <SectionHeading
        eyebrow="Teslimatlar"
        title="Mutlu müşterilerimize teslim ettiğimiz araçlardan bazıları"
        description="Teslimat sürecini hızlı, güvenli ve şeffaf şekilde yönetiyor; müşterilerimizi araçlarına sorunsuz şekilde kavuşturuyoruz."
      />

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {recentDeliveries.map((story) => (
          <article key={`${story.customer}-${story.vehicle}`} className="rounded-[28px] border border-white/10 bg-white/[0.03] p-8">
            <p className="text-xs uppercase tracking-[0.24em] text-accent">{story.city}</p>
            <h3 className="mt-4 text-2xl font-semibold text-white">{story.vehicle}</h3>
            <p className="mt-2 text-sm text-white/70">{story.customer}</p>
            <p className="mt-5 text-sm leading-7 text-muted">{story.note}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

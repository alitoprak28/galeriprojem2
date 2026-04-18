import { googleReviewSummary } from "@/lib/data";

const proofItems = [
  { label: "Aynı gün görüntülü tanıtım", value: "Var" },
  { label: "Ekspertiz dosyası paylaşımı", value: "%100" },
  { label: "Takas ve kredi desteği", value: "Mevcut" },
  { label: "Showroom randevusu", value: "Planlı" },
];

export function ProofSection() {
  return (
    <section className="container-shell py-24">
      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-[32px] border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-8">
          <p className="text-xs uppercase tracking-[0.3em] text-accent">Müşteri Memnuniyeti</p>
          <h2 className="mt-4 text-4xl font-semibold text-white">Güven veren hizmet anlayışımızla yanınızdayız.</h2>
          <div className="mt-8 rounded-[24px] border border-white/10 bg-black/20 p-6">
            <p className="text-xs uppercase tracking-[0.24em] text-muted">{googleReviewSummary.label}</p>
            <p className="mt-3 text-5xl font-semibold text-accent">{googleReviewSummary.rating}</p>
            <p className="mt-2 text-sm text-white/75">{googleReviewSummary.count} müşteri yorumu ve güçlü teslimat memnuniyeti</p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {proofItems.map((item) => (
            <article key={item.label} className="rounded-[28px] border border-white/10 bg-white/[0.03] p-7">
              <p className="text-xs uppercase tracking-[0.22em] text-muted">{item.label}</p>
              <p className="mt-4 text-3xl font-semibold text-white">{item.value}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

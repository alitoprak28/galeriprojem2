import { TrustItem } from "@/lib/types";

export function TrustPanel({ items }: { items: TrustItem[] }) {
  return (
    <section className="rounded-[32px] border border-white/10 bg-white/[0.03] p-7">
      <p className="text-xs uppercase tracking-[0.3em] text-accent">Güven alanı</p>
      <h2 className="mt-4 text-3xl font-semibold text-white">Ekspertiz, servis ve teslim süreci açık şekilde görünsün.</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {items.map((item) => (
          <article key={item.title} className="rounded-[24px] border border-white/10 bg-black/20 p-5">
            {item.value ? <p className="text-2xl font-semibold text-accent">{item.value}</p> : null}
            <h3 className="mt-2 text-lg font-semibold text-white">{item.title}</h3>
            <p className="mt-3 text-sm leading-7 text-muted">{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

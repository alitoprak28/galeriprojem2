import { TransparencyItem } from "@/lib/types";

export function TransparencyPanel({ items }: { items: TransparencyItem[] }) {
  return (
    <section className="rounded-[32px] border border-white/10 bg-white/[0.03] p-7">
      <p className="text-xs uppercase tracking-[0.3em] text-accent">Ekspertiz ve hasar şeffaflığı</p>
      <h2 className="mt-4 text-3xl font-semibold text-white">Alıcının ilk sorduğu güven soruları burada cevap bulsun.</h2>
      <p className="mt-4 max-w-3xl text-sm leading-7 text-muted">
        Bu alan, ekspertiz, tramer, boya-değişen ve servis geçmişi gibi kritik bilgileri özetler. Amaç kullanıcıyı
        belirsizlikte bırakmadan güvenle iletişime taşımaktır.
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {items.map((item) => (
          <article key={item.label} className="rounded-[24px] border border-white/10 bg-black/20 p-5">
            <p className="text-xs uppercase tracking-[0.22em] text-accent">{item.label}</p>
            <p className="mt-3 text-sm leading-7 text-white/80">{item.value}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

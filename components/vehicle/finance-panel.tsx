import { FinancePlan } from "@/lib/types";

export function FinancePanel({ plans }: { plans: FinancePlan[] }) {
  return (
    <section className="rounded-[32px] border border-white/10 bg-white/[0.03] p-7">
      <p className="text-xs uppercase tracking-[0.3em] text-accent">Finansman seçenekleri</p>
      <h2 className="mt-4 text-3xl font-semibold text-white">Tahmini ödeme planları ile psikolojik bariyeri düşürün.</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {plans.map((plan) => (
          <article key={plan.title} className="rounded-[24px] border border-white/10 bg-black/20 p-6">
            <p className="text-xs uppercase tracking-[0.24em] text-muted">{plan.title}</p>
            <p className="mt-4 text-sm text-white/70">Peşinat</p>
            <p className="mt-1 text-2xl font-semibold text-white">{plan.downPayment}</p>
            <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted">Vade</p>
                <p className="mt-1 font-medium text-white">{plan.term}</p>
              </div>
              <div>
                <p className="text-muted">Aylık</p>
                <p className="mt-1 font-medium text-accent">{plan.monthly}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

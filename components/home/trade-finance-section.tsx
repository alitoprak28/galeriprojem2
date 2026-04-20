import { LeadForm } from "@/components/forms/lead-form";
import { SectionHeading } from "@/components/ui/section-heading";

const financeItems = [
  "Takas kabul edilir ve aynı gün değerleme yapılır.",
  "Peşinat ve kredi seçenekleri araç bütçesine göre netleştirilir.",
  "Noter, kapora ve teslimat süreci tek danışmanla yönetilir.",
];

export function TradeFinanceSection() {
  return (
    <section className="container-shell py-16 sm:py-24">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionHeading
            eyebrow="Takas ve Finansman"
            title="Mevcut aracınızı takasa bırakın, bütçenize uygun aracı birlikte çıkaralım."
            description="Galerimizde araç seçimi kadar ödeme planı da net ilerler. Takas, peşinat ve kredi seçeneklerini tek görüşmede konuşalım."
          />
          <div className="mt-8 grid gap-4">
            {financeItems.map((item) => (
              <div key={item} className="rounded-[24px] border border-white/10 bg-white/[0.03] px-5 py-4 text-sm text-white/80">
                {item}
              </div>
            ))}
          </div>
        </div>

        <LeadForm
          title="Takas ve finansman talebi bırakın."
          description="Aracınızı, bütçenizi ve düşündüğünüz modeli iletin; size uygun seçenekleri hızlıca paylaşalım."
          source="Takas / Finansman"
          showTradeIn
          showFinance
          showAppointment
          submitLabel="Talep Gönder"
        />
      </div>
    </section>
  );
}

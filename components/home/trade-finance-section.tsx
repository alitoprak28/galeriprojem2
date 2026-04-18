import { financeHighlights } from "@/lib/data";
import { LeadForm } from "@/components/forms/lead-form";
import { SectionHeading } from "@/components/ui/section-heading";

export function TradeFinanceSection() {
  return (
    <section className="container-shell py-24">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionHeading
            eyebrow="Takas ve Finansman"
            title="Mevcut aracınızı takasa verebilir, finansman seçeneklerini öğrenebilirsiniz."
            description="Bütçenize uygun çözüm bulabilmeniz için takas, peşinat ve kredi seçeneklerinde size destek oluyoruz."
          />
          <div className="mt-8 grid gap-4">
            {financeHighlights.map((item) => (
              <div key={item} className="rounded-[24px] border border-white/10 bg-white/[0.03] px-5 py-4 text-sm text-white/80">
                {item}
              </div>
            ))}
          </div>
        </div>

        <LeadForm
          title="Takas ve finansman talebi oluşturun."
          description="Araç bilgilerinizi ve bütçenizi iletin, ekibimiz size en uygun seçeneklerle hızlıca dönüş yapsın."
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

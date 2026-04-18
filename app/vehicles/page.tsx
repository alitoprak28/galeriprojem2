import { Metadata } from "next";
import { VehicleBrowser } from "@/components/vehicle/vehicle-browser";
import { ButtonLink } from "@/components/ui/button-link";
import { SectionHeading } from "@/components/ui/section-heading";
import { vehicles } from "@/lib/data";

export const metadata: Metadata = {
  title: "Araçlar",
  description: "Premium araç stoğunu filtreleyin, büyük kartlarla inceleyin ve hızlıca iletişime geçin.",
};

export default async function VehiclesPage({
  searchParams,
}: {
  searchParams: Promise<{ brand?: string }>;
}) {
  const params = await searchParams;

  return (
    <div className="container-shell py-16 md:py-24">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
        <SectionHeading
          eyebrow="Araç stoğu"
          title="Ferah filtreleme deneyimi ile doğru aracı en fazla iki adımda bulun."
          description="Listeleme yapısı, sosyal medyadan gelen mobil kullanıcıdan kurumsal alıcıya kadar herkes için hızlı karar verme akışı sunar."
        />

        <div className="rounded-[32px] border border-white/10 bg-white/[0.03] p-7">
          <p className="text-sm leading-7 text-white/75">
            Tüm araçlar ekspertiz şeffaflığı, servis geçmişi ve danışman desteğiyle sunulur. İstediğiniz aracı hemen
            inceleyin ya da kriterlerinizi iletip size özel eşleştirme talep edin.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <ButtonLink href="/contact">Bilgi Talep Et</ButtonLink>
            <ButtonLink href="/brands" variant="secondary">
              Markalara Git
            </ButtonLink>
          </div>
        </div>
      </div>

      <div className="mt-14">
        <VehicleBrowser vehicles={vehicles} initialBrand={params.brand} />
      </div>
    </div>
  );
}

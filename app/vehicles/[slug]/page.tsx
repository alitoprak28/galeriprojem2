import { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LeadForm } from "@/components/forms/lead-form";
import { FinancePanel } from "@/components/vehicle/finance-panel";
import { StatusBadge } from "@/components/vehicle/status-badge";
import { TransparencyPanel } from "@/components/vehicle/transparency-panel";
import { TrustPanel } from "@/components/vehicle/trust-panel";
import { VehicleGallery } from "@/components/vehicle/vehicle-gallery";
import { VehicleCard } from "@/components/vehicle/vehicle-card";
import { VideoPanel } from "@/components/vehicle/video-panel";
import { ButtonLink } from "@/components/ui/button-link";
import {
  contactInfo,
  getRelatedVehicles,
  getVehicleBySlug,
  getVehicleFinancePlans,
  getVehicleStatus,
  getVehicleTransparencyItems,
  getVehicleTrustItems,
  getVehicleVideo,
  vehicles,
} from "@/lib/data";
import { formatKm, formatPrice } from "@/lib/utils";

const BASE_URL = "https://velocitamotors.example";

export async function generateStaticParams() {
  return vehicles.map((vehicle) => ({ slug: vehicle.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const vehicle = getVehicleBySlug(slug);

  if (!vehicle) {
    return { title: "Araç Bulunamadı" };
  }

  const title = `${vehicle.brand} ${vehicle.model} ${vehicle.series} ${vehicle.year}`;
  const description = `${title} | ${vehicle.shortDescription} Ekspertiz, servis geçmişi, fiyat ve randevu bilgisi için sayfayı inceleyin.`;
  const url = `${BASE_URL}/vehicles/${vehicle.slug}`;

  return {
    title,
    description,
    keywords: [
      `${vehicle.brand} ${vehicle.model}`,
      `${vehicle.year} ${vehicle.brand}`,
      "ikinci el premium araç",
      "istanbul premium galeri",
      `${vehicle.brand.toLowerCase()} ikinci el`,
    ],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      images: [{ url: vehicle.coverImage, width: 1400, height: 900, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [vehicle.coverImage],
    },
  };
}

export default async function VehicleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const vehicle = getVehicleBySlug(slug);

  if (!vehicle) {
    notFound();
  }

  const relatedVehicles = getRelatedVehicles(vehicle.slug, vehicle.brand);
  const status = vehicle.status ?? getVehicleStatus(vehicle.slug);
  const financePlans = vehicle.financePlans ?? getVehicleFinancePlans(vehicle.slug);
  const trustItems = vehicle.trustItems ?? getVehicleTrustItems(vehicle.slug);
  const transparencyItems = vehicle.transparencyItems ?? getVehicleTransparencyItems(vehicle.slug);
  const videoUrl = vehicle.videoUrl ?? getVehicleVideo(vehicle.slug);
  const pageUrl = `${BASE_URL}/vehicles/${vehicle.slug}`;

  const specs = [
    { label: "Yıl", value: String(vehicle.year) },
    { label: "Kilometre", value: `${formatKm(vehicle.km)} km` },
    { label: "Yakıt", value: vehicle.fuel },
    { label: "Vites", value: vehicle.transmission },
    { label: "Güç", value: `${vehicle.horsepower} hp` },
    { label: "Çekiş", value: vehicle.drivetrain },
    { label: "Renk", value: vehicle.color },
    { label: "Lokasyon", value: vehicle.location },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${vehicle.brand} ${vehicle.model} ${vehicle.series} ${vehicle.year}`,
    description: vehicle.description,
    image: vehicle.gallery,
    brand: { "@type": "Brand", name: vehicle.brand },
    category: "Automobile",
    offers: {
      "@type": "Offer",
      priceCurrency: "TRY",
      price: vehicle.price,
      availability: "https://schema.org/InStock",
      url: pageUrl,
    },
  };

  return (
    <div className="container-shell overflow-x-clip py-10 sm:py-16 md:py-24">
      <Script id={`vehicle-jsonld-${vehicle.slug}`} type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </Script>

      <div className="grid min-w-0 gap-8 sm:gap-10 xl:grid-cols-[1.15fr_0.85fr]">
        <VehicleGallery images={vehicle.gallery} alt={`${vehicle.brand} ${vehicle.model}`} />

        <div className="min-w-0 space-y-5 sm:space-y-6">
          <div className="overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] p-5 sm:rounded-[32px] sm:p-7">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <p className="text-[11px] uppercase tracking-[0.24em] text-accent sm:text-xs sm:tracking-[0.3em]">
                {vehicle.brand}
              </p>
              <StatusBadge status={status} />
            </div>

            <h1 className="mt-4 break-words text-[2.55rem] font-semibold leading-[0.94] text-white sm:text-4xl md:text-5xl">
              {vehicle.model} <span className="text-white/60">{vehicle.series}</span>
            </h1>

            <p className="mt-4 text-[15px] leading-8 text-muted sm:text-base">{vehicle.description}</p>

            <div className="mt-7 rounded-[24px] border border-white/10 bg-black/20 p-4 sm:mt-8 sm:rounded-[28px] sm:p-5">
              <p className="text-[11px] uppercase tracking-[0.2em] text-muted sm:text-xs sm:tracking-[0.24em]">
                Satış fiyatı
              </p>
              <p className="mt-3 break-words text-[2rem] font-semibold leading-none text-accent sm:text-4xl">
                {formatPrice(vehicle.price)}
              </p>
            </div>

            <div className="mt-6 grid gap-3 sm:flex sm:flex-wrap">
              <ButtonLink
                href={`https://wa.me/${contactInfo.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(
                  `${vehicle.brand} ${vehicle.model} ${vehicle.series} hakkında bilgi almak, takas ve finansman seçeneklerini öğrenmek istiyorum.`,
                )}`}
                className="w-full sm:w-auto"
              >
                WhatsApp ile Sor
              </ButtonLink>
              <ButtonLink href={`tel:${contactInfo.phone.replace(/\s/g, "")}`} variant="secondary" className="w-full sm:w-auto">
                Telefonla Ara
              </ButtonLink>
            </div>
          </div>

          <div className="overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] p-5 sm:rounded-[32px] sm:p-7">
            <p className="text-[11px] uppercase tracking-[0.24em] text-accent sm:text-xs sm:tracking-[0.3em]">
              Teknik bilgiler
            </p>
            <div className="mt-5 grid gap-3 sm:mt-6 sm:gap-4 sm:grid-cols-2">
              {specs.map((spec) => (
                <div key={spec.label} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-muted sm:text-xs sm:tracking-[0.2em]">
                    {spec.label}
                  </p>
                  <p className="mt-2 text-base font-medium text-white">{spec.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] p-5 sm:rounded-[32px] sm:p-7">
            <p className="text-[11px] uppercase tracking-[0.24em] text-accent sm:text-xs sm:tracking-[0.3em]">
              Donanım listesi
            </p>
            <div className="mt-5 grid gap-3 sm:mt-6 sm:grid-cols-2">
              {vehicle.equipment.map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/80">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <LeadForm
            title="Showroom randevusu ve hızlı teklif alın."
            description="Aracı yerinde görmek, test sürüşü planlamak veya teklif istemek için formu doldurun."
            vehicleLabel={`${vehicle.brand} ${vehicle.model} ${vehicle.series}`}
            source="Showroom Randevu"
            showTradeIn
            showFinance
            showAppointment
            submitLabel="Randevu ve Teklif Oluştur"
          />

          <div className="grid gap-3 sm:flex sm:flex-wrap">
            <Link
              href={`https://wa.me/${contactInfo.whatsapp.replace(/\D/g, "")}`}
              className="inline-flex w-full items-center justify-center rounded-full border border-white/10 px-4 py-3 text-sm text-white transition hover:border-accent hover:text-accent sm:w-auto sm:py-2"
            >
              WhatsApp Paylaş
            </Link>
            <Link
              href={`https://instagram.com/${contactInfo.instagram}`}
              className="inline-flex w-full items-center justify-center rounded-full border border-white/10 px-4 py-3 text-sm text-white transition hover:border-accent hover:text-accent sm:w-auto sm:py-2"
            >
              Instagram&apos;da Gör
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-16 grid gap-8">
        <TransparencyPanel items={transparencyItems} />
        <TrustPanel items={trustItems} />
        <VideoPanel title={`${vehicle.brand} ${vehicle.model}`} videoUrl={videoUrl} />
        <FinancePanel plans={financePlans} />
      </div>

      <section className="mt-20 sm:mt-24">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.24em] text-accent sm:text-xs sm:tracking-[0.3em]">
              Benzer araçlar
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">
              İlginizi çekebilecek diğer seçenekler
            </h2>
          </div>
          <ButtonLink href="/vehicles" variant="secondary" className="w-full sm:w-auto">
            Tüm Stoğu Gör
          </ButtonLink>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {relatedVehicles.map((item) => (
            <VehicleCard key={item.slug} vehicle={item} />
          ))}
        </div>
      </section>
    </div>
  );
}

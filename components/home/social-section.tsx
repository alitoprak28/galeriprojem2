import Image from "next/image";
import Link from "next/link";
import { contactInfo, featuredVehicles, instagramFeed, vehicles } from "@/lib/data";
import { SectionHeading } from "@/components/ui/section-heading";

const socialVehicles = [vehicles[3], vehicles[4], vehicles[6]];

export function SocialSection() {
  return (
    <section className="container-shell py-16 sm:py-24">
      <div className="grid gap-8 rounded-[36px] border border-white/10 bg-white/[0.03] p-5 sm:p-7 lg:grid-cols-[0.9fr_1.1fr] lg:p-10">
        <div>
          <SectionHeading
            eyebrow="Sosyal Medya"
            title="Araclari sosyal akista da premium gosteren bir vitrin"
            description="Kisa metin, buyuk gorsel, hizli dokunus. Instagram hissi veren mobil sunum."
          />
          <div className="mt-8 grid gap-3 sm:flex sm:flex-wrap">
            <Link
              href={`https://instagram.com/${contactInfo.instagram}`}
              className="inline-flex w-full items-center justify-center rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-white transition hover:border-accent hover:text-accent sm:w-auto"
            >
              Instagram Profili
            </Link>
            <Link
              href={`https://facebook.com/${contactInfo.facebook}`}
              className="inline-flex w-full items-center justify-center rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-white transition hover:border-accent hover:text-accent sm:w-auto"
            >
              Facebook Sayfasi
            </Link>
          </div>

          <div className="mt-8 hide-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1 lg:hidden">
            {featuredVehicles.slice(0, 3).map((vehicle) => (
              <div
                key={vehicle.slug}
                className="relative h-48 min-w-[12rem] snap-start overflow-hidden rounded-[24px] border border-white/10"
              >
                <Image src={vehicle.coverImage} alt={vehicle.model} fill sizes="200px" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 to-transparent" />
                <div className="absolute inset-x-4 bottom-4">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-white/60">{vehicle.brand}</p>
                  <p className="mt-1 text-lg font-semibold text-white">{vehicle.model}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 sm:grid-rows-[1.2fr_1fr]">
          <article className="relative overflow-hidden rounded-[28px] border border-white/10 sm:col-span-2">
            <div className="relative h-64 sm:h-72">
              <Image src={socialVehicles[0].coverImage} alt={socialVehicles[0].model} fill sizes="100vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0e13] via-black/10 to-transparent" />
            </div>
            <div className="absolute inset-x-4 bottom-4 rounded-[22px] border border-white/10 bg-black/40 p-4 backdrop-blur-xl">
              <p className="text-xs uppercase tracking-[0.24em] text-accent">Instagram 01</p>
              <h3 className="mt-2 text-2xl font-semibold text-white">{instagramFeed[0].title}</h3>
              <p className="mt-2 text-sm leading-6 text-white/72">{instagramFeed[0].caption}</p>
            </div>
          </article>

          {instagramFeed.slice(1).map((post, index) => {
            const vehicle = socialVehicles[index + 1];

            return (
              <article key={post.title} className="relative overflow-hidden rounded-[28px] border border-white/10">
                <div className="relative h-56 sm:h-full">
                  <Image src={vehicle.coverImage} alt={vehicle.model} fill sizes="50vw" className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b0e13] via-black/10 to-transparent" />
                </div>
                <div className="absolute inset-x-4 bottom-4 rounded-[22px] border border-white/10 bg-black/40 p-4 backdrop-blur-xl">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-accent">Instagram 0{index + 2}</p>
                  <h3 className="mt-2 text-xl font-semibold text-white">{post.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/72">{post.caption}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import { instagramFeed, contactInfo } from "@/lib/data";
import { SectionHeading } from "@/components/ui/section-heading";

export function SocialSection() {
  return (
    <section className="container-shell py-24">
      <div className="grid gap-10 rounded-[36px] border border-white/10 bg-white/[0.03] p-7 lg:grid-cols-[0.95fr_1.05fr] lg:p-10">
        <div>
          <SectionHeading
            eyebrow="Sosyal Medya"
            title="Instagram'da son araçlarımızı takip edin"
            description="Yeni gelen araçlarımızı, teslimatlarımızı ve güncel paylaşımlarımızı sosyal medya hesaplarımızdan anlık olarak inceleyebilirsiniz."
          />
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href={`https://instagram.com/${contactInfo.instagram}`}
              className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-white transition hover:border-accent hover:text-accent"
            >
              Instagram Profili
            </Link>
            <Link
              href={`https://facebook.com/${contactInfo.facebook}`}
              className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-white transition hover:border-accent hover:text-accent"
            >
              Facebook Sayfası
            </Link>
          </div>
        </div>

        <div className="grid gap-4">
          {instagramFeed.map((post, index) => (
            <article
              key={post.title}
              className="rounded-[28px] border border-white/10 bg-black/20 p-6 transition hover:border-white/20"
            >
              <p className="text-xs uppercase tracking-[0.26em] text-accent">Instagram 0{index + 1}</p>
              <h3 className="mt-3 text-2xl font-semibold text-white">{post.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted">{post.caption}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import Link from "next/link";
import { AdvisorSuggestion } from "@/lib/gallery-advisor-shared";

interface GalleryAdvisorSuggestionCardProps {
  suggestion: AdvisorSuggestion;
}

export function GalleryAdvisorSuggestionCard({ suggestion }: GalleryAdvisorSuggestionCardProps) {
  return (
    <article className="overflow-hidden rounded-[24px] border border-white/10 bg-black/20">
      <div className="flex gap-3 p-3">
        <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-[18px] border border-white/10">
          <Image src={suggestion.image} alt={suggestion.title} fill sizes="96px" className="object-cover" />
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-white">{suggestion.title}</p>
          <p className="mt-1 text-xs text-white/55">{suggestion.subtitle}</p>
          <p className="mt-2 text-sm font-semibold text-accent">{suggestion.price}</p>
          <p className="mt-2 text-xs leading-5 text-white/72">{suggestion.reason}</p>
        </div>
      </div>

      <div className="flex gap-2 border-t border-white/10 p-3">
        <Link
          href={suggestion.href}
          className="inline-flex flex-1 items-center justify-center rounded-full bg-accent px-4 py-2.5 text-sm font-semibold text-black transition hover:brightness-110"
        >
          Detayı Aç
        </Link>
        <a
          href={suggestion.whatsappHref}
          target="_blank"
          rel="noreferrer"
          className="inline-flex flex-1 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-white transition hover:border-white/20 hover:bg-white/[0.08]"
        >
          WhatsApp
        </a>
      </div>
    </article>
  );
}

import Link from "next/link";
import { ButtonLink } from "@/components/ui/button-link";

const navigation = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/vehicles", label: "Araçlar" },
  { href: "/brands", label: "Markalar" },
  { href: "/contact", label: "İletişim" },
];

export function Navbar() {
  return (
    <header className="sticky inset-x-0 top-0 z-50 w-full border-b border-white/10 bg-[#090d13]/90 backdrop-blur-2xl">
      <div className="container-shell py-3 sm:py-4">
        <div className="grid min-h-[56px] grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 sm:gap-6">
          <Link href="/" className="group flex min-w-0 items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-sm tracking-[0.35em] text-accent">
              VM
            </div>
            <div className="min-w-0">
              <p className="truncate text-[10px] uppercase tracking-[0.14em] text-muted sm:text-[11px] sm:tracking-[0.28em]">
                Premium Araç Galerisi
              </p>
              <p className="truncate text-base font-semibold text-white transition group-hover:text-accent sm:text-lg">
                Velocita Motors
              </p>
            </div>
          </Link>

          <nav className="hidden items-center justify-center gap-7 lg:flex">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href} className="text-sm text-white/75 transition hover:text-white">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex shrink-0 items-center justify-end">
            <ButtonLink href="/contact" className="hidden sm:inline-flex">
              Bilgi Al
            </ButtonLink>
            <ButtonLink href="/contact" className="px-3 py-2.5 text-xs sm:hidden">
              Bilgi
            </ButtonLink>
          </div>
        </div>

        <nav className="mt-3 grid grid-cols-2 gap-2 lg:hidden">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="min-w-0 truncate rounded-full border border-white/10 bg-white/5 px-3 py-2.5 text-center text-[13px] text-white/80 transition hover:border-white/20 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

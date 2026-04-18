import Link from "next/link";
import { ButtonLink } from "@/components/ui/button-link";
import { contactInfo } from "@/lib/data";

const navigation = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/vehicles", label: "Araçlar" },
  { href: "/brands", label: "Markalar" },
  { href: "/contact", label: "İletişim" },
];

const socialLinks = [
  { href: `https://instagram.com/${contactInfo.instagram}`, label: "Instagram" },
  { href: `https://facebook.com/${contactInfo.facebook}`, label: "Facebook" },
  { href: `https://wa.me/${contactInfo.whatsapp.replace(/\D/g, "")}`, label: "WhatsApp" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#090d13]/80 backdrop-blur-2xl">
      <div className="container-shell py-4">
        <div className="flex min-h-[56px] items-center justify-between gap-6">
          <Link href="/" className="group flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-sm tracking-[0.35em] text-accent">
              VM
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.38em] text-muted">Premium Araç Galerisi</p>
              <p className="text-lg font-semibold text-white transition group-hover:text-accent">Velocita Motors</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href} className="text-sm text-white/75 transition hover:text-white">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 xl:flex">
              {socialLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="rounded-full border border-white/10 px-3 py-2 text-xs uppercase tracking-[0.18em] text-white/70 transition hover:border-white/25 hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <ButtonLink href="/contact" className="hidden sm:inline-flex">
              Uzman Danışmana Ulaş
            </ButtonLink>
          </div>
        </div>

        <nav className="hide-scrollbar flex gap-2 overflow-x-auto pt-4 lg:hidden">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 transition hover:border-white/20 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

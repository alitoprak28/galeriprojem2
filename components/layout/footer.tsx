import Link from "next/link";
import { contactInfo } from "@/lib/data";

const links = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/vehicles", label: "Araçlar" },
  { href: "/brands", label: "Markalar" },
  { href: "/contact", label: "İletişim" },
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/20">
      <div className="container-shell grid gap-12 py-16 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div className="max-w-md">
          <span className="eyebrow">Kurumsal vitrin</span>
          <h3 className="mt-5 text-2xl font-semibold text-white">Güven veren bir ilk izlenim, hızlı dönüşen bir satış akışı.</h3>
          <p className="mt-4 text-sm leading-7 text-muted">
            {contactInfo.company}, premium segmentte araç arayan kullanıcıyı etkileyen, bilgilendiren ve iletişime taşıyan
            dijital showroom deneyimi sunar.
          </p>
        </div>

        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-muted">Navigasyon</p>
          <div className="mt-5 flex flex-col gap-3">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm text-white/80 transition hover:text-white">
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-muted">İletişim</p>
          <div className="mt-5 space-y-3 text-sm text-white/80">
            <p>{contactInfo.phone}</p>
            <p>{contactInfo.email}</p>
            <p>{contactInfo.address}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

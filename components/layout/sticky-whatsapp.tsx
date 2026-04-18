import Link from "next/link";
import { contactInfo } from "@/lib/data";

export function StickyWhatsapp() {
  return (
    <Link
      href={`https://wa.me/${contactInfo.whatsapp.replace(/\D/g, "")}?text=Merhaba%2C%20bir%20araç%20hakkında%20bilgi%20ve%20randevu%20almak%20istiyorum.`}
      className="fixed bottom-5 right-5 z-50 hidden items-center gap-3 rounded-full border border-emerald-400/30 bg-emerald-500 px-5 py-3 text-sm font-semibold text-white shadow-2xl shadow-emerald-500/30 transition hover:-translate-y-1 hover:bg-emerald-400 md:inline-flex"
    >
      <span className="flex h-2.5 w-2.5 rounded-full bg-white" />
      WhatsApp ile Hızlı Bilgi Al
    </Link>
  );
}

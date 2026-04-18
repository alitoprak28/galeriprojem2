import Link from "next/link";
import { contactInfo } from "@/lib/data";

export function MobileActionBar() {
  return (
    <div className="fixed inset-x-4 bottom-4 z-50 md:hidden">
      <div className="grid grid-cols-3 overflow-hidden rounded-[22px] border border-white/10 bg-[#11161d]/95 shadow-2xl shadow-black/30 backdrop-blur-2xl">
        <Link
          href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
          className="flex flex-col items-center justify-center gap-1 border-r border-white/10 px-3 py-3 text-center text-xs text-white/80"
        >
          <span className="font-semibold text-white">Ara</span>
          <span>{contactInfo.phone}</span>
        </Link>
        <Link
          href={`https://wa.me/${contactInfo.whatsapp.replace(/\D/g, "")}?text=Merhaba,%20araç%20için%20fiyat,%20ekspertiz%20ve%20randevu%20bilgisi%20almak%20istiyorum.`}
          className="flex flex-col items-center justify-center gap-1 border-r border-white/10 bg-accent px-3 py-3 text-center text-xs font-semibold text-black"
        >
          <span>WhatsApp</span>
          <span>Teklif Al</span>
        </Link>
        <Link
          href="/contact#appointment"
          className="flex flex-col items-center justify-center gap-1 px-3 py-3 text-center text-xs text-white/80"
        >
          <span className="font-semibold text-white">Randevu</span>
          <span>Test Sürüşü</span>
        </Link>
      </div>
    </div>
  );
}

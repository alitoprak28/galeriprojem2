import Link from "next/link";
import { contactInfo } from "@/lib/data";

export function MobileActionBar() {
  return (
    <div className="fixed inset-x-3 bottom-3 z-50 md:hidden">
      <div
        className="grid grid-cols-3 overflow-hidden rounded-[24px] border border-white/10 bg-[#11161d]/95 shadow-2xl shadow-black/35 backdrop-blur-2xl"
        style={{ paddingBottom: "max(0px, env(safe-area-inset-bottom))" }}
      >
        <Link
          href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
          className="flex min-h-[68px] flex-col items-center justify-center gap-1 border-r border-white/10 px-2 py-3 text-center text-[11px] text-white/75"
        >
          <span className="font-semibold text-white">Hemen Ara</span>
          <span className="truncate">{contactInfo.phone}</span>
        </Link>
        <Link
          href={`https://wa.me/${contactInfo.whatsapp.replace(/\D/g, "")}?text=Merhaba,%20araç%20için%20fiyat,%20ekspertiz%20ve%20randevu%20bilgisi%20almak%20istiyorum.`}
          className="flex min-h-[68px] flex-col items-center justify-center gap-1 border-r border-white/10 bg-accent px-2 py-3 text-center text-[11px] font-semibold text-black"
        >
          <span>WhatsApp</span>
          <span>Hızlı Teklif</span>
        </Link>
        <Link
          href="/contact#appointment"
          className="flex min-h-[68px] flex-col items-center justify-center gap-1 px-2 py-3 text-center text-[11px] text-white/75"
        >
          <span className="font-semibold text-white">Randevu</span>
          <span>Test Sürüşü</span>
        </Link>
      </div>
    </div>
  );
}

import Link from "next/link";
import { LeadForm } from "@/components/forms/lead-form";
import { contactInfo } from "@/lib/data";

export function ContactGrid() {
  return (
    <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="space-y-6">
        <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-7">
          <p className="text-xs uppercase tracking-[0.3em] text-accent">İletişim kanalları</p>
          <div className="mt-5 space-y-4 text-sm leading-7 text-white/80">
            <p>Telefon: {contactInfo.phone}</p>
            <p>WhatsApp: {contactInfo.whatsapp}</p>
            <p>E-posta: {contactInfo.email}</p>
            <p>Adres: {contactInfo.address}</p>
          </div>
        </div>

        <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-7">
          <p className="text-xs uppercase tracking-[0.3em] text-accent">Çalışma saatleri</p>
          <div className="mt-5 space-y-2 text-sm leading-7 text-white/80">
            {contactInfo.hours.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-7">
          <p className="text-xs uppercase tracking-[0.3em] text-accent">Sosyal medya</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href={`https://instagram.com/${contactInfo.instagram}`}
              className="rounded-full border border-white/10 px-4 py-2 text-sm text-white transition hover:border-accent hover:text-accent"
            >
              Instagram
            </Link>
            <Link
              href={`https://facebook.com/${contactInfo.facebook}`}
              className="rounded-full border border-white/10 px-4 py-2 text-sm text-white transition hover:border-accent hover:text-accent"
            >
              Facebook
            </Link>
            <Link
              href={`https://wa.me/${contactInfo.whatsapp.replace(/\D/g, "")}`}
              className="rounded-full border border-white/10 px-4 py-2 text-sm text-white transition hover:border-accent hover:text-accent"
            >
              WhatsApp
            </Link>
          </div>
        </div>
      </div>

      <div className="space-y-6" id="appointment">
        <LeadForm
          title="Size uygun araçları aynı gün önerelim."
          description="Formu doldurduğunuzda talebiniz lead paneline kaydolur ve WhatsApp hattına hazır formatta gider."
          source="İletişim Formu"
          showTradeIn
          showFinance
          showAppointment
          submitLabel="Talep ve Randevu Gönder"
        />

        <div className="overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.03]">
          <iframe
            title="Velocita Motors Konum"
            src="https://www.google.com/maps?q=Maslak%20Atat%C3%BCrk%20Oto%20Sanayi&z=14&output=embed"
            className="h-[340px] w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
}

import { Metadata } from "next";
import { ContactGrid } from "@/components/contact/contact-grid";
import { SectionHeading } from "@/components/ui/section-heading";

export const metadata: Metadata = {
  title: "İletişim",
  description: "Telefon, WhatsApp, e-posta, harita ve hızlı form ile premium iletişim deneyimi.",
};

export default function ContactPage() {
  return (
    <div className="container-shell py-16 md:py-24">
      <SectionHeading
        eyebrow="İletişim"
        title="Ziyaretçiyi bekletmeyen, güven veren doğrudan temas."
        description="Premium araç alım süreci hız ve güven ister. Bu yüzden tüm iletişim kanalları net, görünür ve mobil öncelikli kurgulandı."
      />

      <div className="mt-14">
        <ContactGrid />
      </div>
    </div>
  );
}

import { Metadata } from "next";
import { AdminDashboard } from "@/components/admin/admin-dashboard";

export const metadata: Metadata = {
  title: "Velocita Backoffice",
  description: "Lead takibi, araç durumları ve taslak yönetimi için gizli yönetim girişi.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function BackofficePage() {
  return <AdminDashboard />;
}

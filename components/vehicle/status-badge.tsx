import { VehicleStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

const styles: Record<VehicleStatus, string> = {
  Stokta: "border-emerald-400/30 bg-emerald-500/15 text-emerald-200",
  "Yeni Giriş": "border-accent/30 bg-accent/15 text-accent",
  "Kapora Alındı": "border-amber-300/30 bg-amber-300/15 text-amber-100",
  Satıldı: "border-white/20 bg-white/10 text-white/70",
};

export function StatusBadge({ status }: { status: VehicleStatus }) {
  return (
    <span className={cn("rounded-full border px-3 py-1 text-[11px] uppercase tracking-[0.24em]", styles[status])}>
      {status}
    </span>
  );
}

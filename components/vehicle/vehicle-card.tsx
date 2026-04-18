import Image from "next/image";
import Link from "next/link";
import { StatusBadge } from "@/components/vehicle/status-badge";
import { getVehicleStatus } from "@/lib/data";
import { Vehicle } from "@/lib/types";
import { formatKm, formatPrice } from "@/lib/utils";

interface VehicleCardProps {
  vehicle: Vehicle;
}

export function VehicleCard({ vehicle }: VehicleCardProps) {
  const status = vehicle.status ?? getVehicleStatus(vehicle.slug);

  return (
    <article className="group overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] transition duration-500 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.05]">
      <div className="relative h-72 overflow-hidden">
        <Image
          src={vehicle.coverImage}
          alt={`${vehicle.brand} ${vehicle.model}`}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
        <div className="absolute left-5 top-5 flex flex-wrap gap-2">
          <div className="rounded-full border border-white/15 bg-black/35 px-3 py-1 text-xs uppercase tracking-[0.25em] text-white">
            {vehicle.badge}
          </div>
          <StatusBadge status={status} />
        </div>
        <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-white/70">{vehicle.brand}</p>
            <h3 className="mt-1 text-2xl font-semibold text-white">
              {vehicle.model} <span className="text-white/60">{vehicle.series}</span>
            </h3>
          </div>
          <p className="rounded-full border border-white/15 bg-black/35 px-4 py-2 text-sm font-medium text-white">
            {vehicle.year}
          </p>
        </div>
      </div>

      <div className="space-y-5 p-6">
        <div className="grid grid-cols-2 gap-3 text-sm text-white/75">
          <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
            <p className="text-xs uppercase tracking-[0.2em] text-muted">Kilometre</p>
            <p className="mt-2 font-medium text-white">{formatKm(vehicle.km)} km</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
            <p className="text-xs uppercase tracking-[0.2em] text-muted">Yakıt / Vites</p>
            <p className="mt-2 font-medium text-white">
              {vehicle.fuel} / {vehicle.transmission}
            </p>
          </div>
        </div>

        <p className="text-sm leading-7 text-muted">{vehicle.shortDescription}</p>

        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted">Fiyat</p>
            <p className="mt-1 text-2xl font-semibold text-accent">{formatPrice(vehicle.price)}</p>
          </div>
          <Link
            href={`/vehicles/${vehicle.slug}`}
            className="rounded-full border border-white/15 px-5 py-3 text-sm text-white transition hover:border-accent hover:bg-accent hover:text-black"
          >
            Aracı İncele
          </Link>
        </div>
      </div>
    </article>
  );
}

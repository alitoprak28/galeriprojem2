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
      <div className="relative h-64 overflow-hidden sm:h-72">
        <Image
          src={vehicle.coverImage}
          alt={`${vehicle.brand} ${vehicle.model}`}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
        <div className="absolute left-4 top-4 flex flex-wrap gap-2 sm:left-5 sm:top-5">
          <div className="rounded-full border border-white/15 bg-black/35 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-white sm:text-xs sm:tracking-[0.25em]">
            {vehicle.badge}
          </div>
          <StatusBadge status={status} />
        </div>
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3 sm:bottom-5 sm:left-5 sm:right-5">
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-[0.22em] text-white/70 sm:text-xs sm:tracking-[0.24em]">
              {vehicle.brand}
            </p>
            <h3 className="mt-1 text-xl font-semibold text-white sm:text-2xl">
              {vehicle.model} <span className="text-white/60">{vehicle.series}</span>
            </h3>
          </div>
          <p className="shrink-0 rounded-full border border-white/15 bg-black/35 px-3 py-2 text-xs font-medium text-white sm:px-4 sm:text-sm">
            {vehicle.year}
          </p>
        </div>
      </div>

      <div className="space-y-5 p-5 sm:p-6">
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

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted">Fiyat</p>
            <p className="mt-1 text-2xl font-semibold text-accent">{formatPrice(vehicle.price)}</p>
          </div>
          <Link
            href={`/vehicles/${vehicle.slug}`}
            className="inline-flex w-full items-center justify-center rounded-full border border-white/15 px-5 py-3 text-sm text-white transition hover:border-accent hover:bg-accent hover:text-black sm:w-auto"
          >
            Aracı İncele
          </Link>
        </div>
      </div>
    </article>
  );
}

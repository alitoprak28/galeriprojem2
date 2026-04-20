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
    <article className="group overflow-hidden rounded-[30px] border border-white/10 bg-[#13181f] transition duration-500 hover:-translate-y-1 hover:border-white/20">
      <div className="relative h-[29rem] overflow-hidden sm:h-[32rem]">
        <Image
          src={vehicle.coverImage}
          alt={`${vehicle.brand} ${vehicle.model}`}
          fill
          sizes="(max-width: 1024px) 88vw, 50vw"
          className="object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d12] via-black/15 to-transparent" />

        <div className="absolute left-4 right-4 top-4 flex flex-wrap items-start justify-between gap-2 sm:left-5 sm:right-5 sm:top-5">
          <div className="flex flex-wrap gap-2">
            <div className="rounded-full border border-white/15 bg-black/35 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-white sm:text-xs sm:tracking-[0.25em]">
              {vehicle.badge}
            </div>
            <StatusBadge status={status} />
          </div>
          <p className="shrink-0 rounded-full border border-white/15 bg-black/35 px-3 py-2 text-xs font-medium text-white sm:px-4 sm:text-sm">
            {vehicle.year}
          </p>
        </div>

        <div className="absolute inset-x-4 bottom-4 space-y-4 sm:inset-x-5 sm:bottom-5">
          <div className="rounded-[24px] border border-white/10 bg-black/35 p-4 backdrop-blur-xl sm:p-5">
            <p className="text-[10px] uppercase tracking-[0.22em] text-white/65 sm:text-xs sm:tracking-[0.24em]">
              {vehicle.brand}
            </p>
            <h3 className="mt-2 text-[1.9rem] font-semibold leading-[0.95] text-white sm:text-[2.2rem]">
              {vehicle.model}
            </h3>
            <p className="mt-1 text-base text-white/60 sm:text-lg">{vehicle.series}</p>
            <p className="mt-3 overflow-hidden text-sm leading-6 text-white/78 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]">
              {vehicle.shortDescription}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            <div className="rounded-[20px] border border-white/10 bg-black/30 p-3 text-center backdrop-blur-xl">
              <p className="text-[10px] uppercase tracking-[0.18em] text-white/45">KM</p>
              <p className="mt-2 text-sm font-semibold text-white">{formatKm(vehicle.km)}</p>
            </div>
            <div className="rounded-[20px] border border-white/10 bg-black/30 p-3 text-center backdrop-blur-xl">
              <p className="text-[10px] uppercase tracking-[0.18em] text-white/45">Yakit</p>
              <p className="mt-2 text-sm font-semibold text-white">{vehicle.fuel}</p>
            </div>
            <div className="rounded-[20px] border border-white/10 bg-black/30 p-3 text-center backdrop-blur-xl">
              <p className="text-[10px] uppercase tracking-[0.18em] text-white/45">Vites</p>
              <p className="mt-2 text-sm font-semibold text-white">{vehicle.transmission}</p>
            </div>
          </div>

          <div className="flex items-end justify-between gap-4 rounded-[24px] border border-white/10 bg-black/40 p-4 backdrop-blur-xl sm:p-5">
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-[0.18em] text-white/45">Fiyat</p>
              <p className="mt-2 break-words text-2xl font-semibold leading-none text-accent sm:text-[2rem]">
                {formatPrice(vehicle.price)}
              </p>
            </div>
            <Link
              href={`/vehicles/${vehicle.slug}`}
              className="inline-flex shrink-0 items-center justify-center rounded-full bg-accent px-5 py-3 text-sm font-semibold text-black transition hover:brightness-110"
            >
              Incele
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

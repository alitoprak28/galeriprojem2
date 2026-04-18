"use client";

import { useMemo, useState } from "react";
import { VehicleCard } from "@/components/vehicle/vehicle-card";
import { Vehicle } from "@/lib/types";

interface VehicleBrowserProps {
  vehicles: Vehicle[];
  initialBrand?: string;
}

export function VehicleBrowser({ vehicles, initialBrand = "" }: VehicleBrowserProps) {
  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState(initialBrand);
  const [fuel, setFuel] = useState("");
  const [transmission, setTransmission] = useState("");
  const [year, setYear] = useState("");
  const [price, setPrice] = useState("");

  const filteredVehicles = useMemo(() => {
    return vehicles.filter((vehicle) => {
      const matchesSearch =
        !search ||
        `${vehicle.brand} ${vehicle.model} ${vehicle.series}`.toLowerCase().includes(search.toLowerCase());
      const matchesBrand = !brand || vehicle.brand === brand;
      const matchesFuel = !fuel || vehicle.fuel === fuel;
      const matchesTransmission = !transmission || vehicle.transmission === transmission;
      const matchesYear = !year || String(vehicle.year) === year;
      const matchesPrice =
        !price ||
        (price === "0-3000000" && vehicle.price <= 3000000) ||
        (price === "3000000-5000000" && vehicle.price > 3000000 && vehicle.price <= 5000000) ||
        (price === "5000000+" && vehicle.price > 5000000);

      return (
        matchesSearch &&
        matchesBrand &&
        matchesFuel &&
        matchesTransmission &&
        matchesYear &&
        matchesPrice
      );
    });
  }, [vehicles, search, brand, fuel, transmission, year, price]);

  const selectClassName =
    "rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition focus:border-accent";

  return (
    <div className="space-y-10">
      <div className="rounded-[32px] border border-white/10 bg-white/[0.03] p-5 md:p-7">
        <div className="grid gap-4 xl:grid-cols-[1.4fr_repeat(5,1fr)]">
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Marka, model veya seri ara"
            className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition placeholder:text-muted focus:border-accent"
          />
          <select value={brand} onChange={(event) => setBrand(event.target.value)} className={selectClassName}>
            <option value="">Marka</option>
            {[...new Set(vehicles.map((vehicle) => vehicle.brand))].map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <select value={fuel} onChange={(event) => setFuel(event.target.value)} className={selectClassName}>
            <option value="">Yakıt</option>
            {[...new Set(vehicles.map((vehicle) => vehicle.fuel))].map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <select
            value={transmission}
            onChange={(event) => setTransmission(event.target.value)}
            className={selectClassName}
          >
            <option value="">Vites</option>
            {[...new Set(vehicles.map((vehicle) => vehicle.transmission))].map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <select value={price} onChange={(event) => setPrice(event.target.value)} className={selectClassName}>
            <option value="">Fiyat</option>
            <option value="0-3000000">0 - 3.000.000 TL</option>
            <option value="3000000-5000000">3.000.000 - 5.000.000 TL</option>
            <option value="5000000+">5.000.000 TL+</option>
          </select>
          <select value={year} onChange={(event) => setYear(event.target.value)} className={selectClassName}>
            <option value="">Yıl</option>
            {[...new Set(vehicles.map((vehicle) => vehicle.year))]
              .sort((a, b) => b - a)
              .map((item) => (
                <option key={item} value={String(item)}>
                  {item}
                </option>
              ))}
          </select>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-muted">
          <span className="font-semibold text-white">{filteredVehicles.length}</span> araç listeleniyor
        </p>
        <button
          type="button"
          onClick={() => {
            setSearch("");
            setBrand(initialBrand);
            setFuel("");
            setTransmission("");
            setPrice("");
            setYear("");
          }}
          className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/75 transition hover:border-white/20 hover:text-white"
        >
          Filtreleri temizle
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {filteredVehicles.map((vehicle) => (
          <VehicleCard key={vehicle.slug} vehicle={vehicle} />
        ))}
      </div>

      {filteredVehicles.length === 0 ? (
        <div className="rounded-[32px] border border-dashed border-white/15 bg-white/[0.02] p-10 text-center">
          <p className="text-2xl font-semibold text-white">Bu filtrelerle eşleşen araç bulunamadı.</p>
          <p className="mt-3 text-sm text-muted">
            WhatsApp üzerinden kriterlerinizi iletin, size uygun araçları doğrudan önerelim.
          </p>
        </div>
      ) : null}
    </div>
  );
}

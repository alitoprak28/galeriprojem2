import type { MetadataRoute } from "next";
import { vehicles } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://velocitamotors.example";

  return [
    { url: `${baseUrl}/`, priority: 1 },
    { url: `${baseUrl}/vehicles`, priority: 0.9 },
    { url: `${baseUrl}/brands`, priority: 0.8 },
    { url: `${baseUrl}/contact`, priority: 0.8 },
    ...vehicles.map((vehicle) => ({
      url: `${baseUrl}/vehicles/${vehicle.slug}`,
      priority: 0.7,
    })),
  ];
}

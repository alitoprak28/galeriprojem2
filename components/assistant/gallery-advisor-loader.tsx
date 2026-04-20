"use client";

import dynamic from "next/dynamic";

const GalleryAdvisor = dynamic(
  () => import("@/components/assistant/gallery-advisor").then((module) => module.GalleryAdvisor),
  { ssr: false },
);

export function GalleryAdvisorLoader() {
  return <GalleryAdvisor />;
}

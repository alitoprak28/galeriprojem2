"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface VehicleGalleryProps {
  images: string[];
  alt: string;
}

export function VehicleGallery({ images, alt }: VehicleGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="space-y-4">
      <div className="relative h-[430px] overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.03] sm:h-[520px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={images[activeIndex]}
            initial={{ opacity: 0.2, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0.15, scale: 0.98 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <Image src={images[activeIndex]} alt={alt} fill sizes="100vw" className="object-cover" />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/5" />
      </div>

      <div className="hide-scrollbar flex gap-3 overflow-x-auto">
        {images.map((image, index) => (
          <button
            key={image}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={`relative h-24 min-w-36 overflow-hidden rounded-2xl border transition ${
              activeIndex === index ? "border-accent" : "border-white/10"
            }`}
          >
            <Image src={image} alt={`${alt} ${index + 1}`} fill sizes="144px" className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}

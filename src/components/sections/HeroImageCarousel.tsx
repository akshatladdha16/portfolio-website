"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useMemo, useState } from "react";

import type { HeroImage } from "@/types";

interface HeroImageCarouselProps {
  images: HeroImage[];
}

function toRelativeOffset(index: number, activeIndex: number, total: number) {
  if (total <= 1) {
    return 0;
  }

  const raw = (index - activeIndex + total) % total;
  if (raw <= total / 2) {
    return raw;
  }

  return raw - total;
}

export function HeroImageCarousel({ images }: HeroImageCarouselProps) {
  const shouldReduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const total = images.length;

  const cards = useMemo(() => {
    return images.map((image, index) => ({
      ...image,
      index,
      offset: toRelativeOffset(index, activeIndex, total),
    }));
  }, [activeIndex, images, total]);

  const move = (direction: 1 | -1) => {
    if (isTransitioning || total <= 1) {
      return;
    }

    setIsTransitioning(true);
    setActiveIndex((current) => {
      if (direction === 1) {
        return (current + 1) % total;
      }
      return (current - 1 + total) % total;
    });

    window.setTimeout(() => {
      setIsTransitioning(false);
    }, 380);
  };

  const transition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.36, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <div className="relative w-full">
      <div className="relative mx-auto h-[28rem] w-full max-w-[36rem] overflow-hidden rounded-3xl border border-[var(--hairline)] bg-[var(--canvas-deep)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(62,207,142,0.08),transparent_60%)]" />

        {cards.map((card) => {
          const isCenter = card.offset === 0;
          const isLeft = card.offset === -1;
          const isRight = card.offset === 1;
          const isVisible = isCenter || isLeft || isRight;

          return (
            <motion.figure
              key={card.src}
              initial={false}
              animate={{
                x: isCenter ? "0%" : isLeft ? "-40%" : isRight ? "40%" : card.offset < 0 ? "-58%" : "58%",
                scale: isCenter ? 1 : isVisible ? 0.84 : 0.7,
                rotate: isCenter ? 0 : isLeft ? -9 : isRight ? 9 : 0,
                opacity: isCenter ? 1 : isVisible ? 0.68 : 0,
                zIndex: isCenter ? 30 : isVisible ? 20 : 10,
              }}
              transition={transition}
              className="absolute left-1/2 top-1/2 h-[78%] w-[62%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-[var(--hairline-emphasis)] bg-black"
            >
              <Image src={card.src} alt={card.alt} fill sizes="(min-width: 1024px) 30vw, 80vw" className="object-cover" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white/95 via-white/70 to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 p-4 text-sm text-[#181818]">
                {card.caption}
              </figcaption>
            </motion.figure>
          );
        })}

        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center pb-4">
          <div className="pointer-events-auto flex items-center gap-2 rounded-full border border-[var(--hairline-strong)] bg-[rgba(15,15,15,0.75)] p-1 backdrop-blur">
            <button
              type="button"
              aria-label="Previous image"
              onClick={() => move(-1)}
              disabled={isTransitioning || total <= 1}
              className="inline-flex size-8 items-center justify-center rounded-full border border-[var(--hairline)] text-[var(--ink)] transition-colors hover:border-[var(--hairline-strong)] hover:bg-[var(--surface-soft)] disabled:cursor-not-allowed disabled:opacity-45"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              type="button"
              aria-label="Next image"
              onClick={() => move(1)}
              disabled={isTransitioning || total <= 1}
              className="inline-flex size-8 items-center justify-center rounded-full border border-[var(--hairline)] text-[var(--ink)] transition-colors hover:border-[var(--hairline-strong)] hover:bg-[var(--surface-soft)] disabled:cursor-not-allowed disabled:opacity-45"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

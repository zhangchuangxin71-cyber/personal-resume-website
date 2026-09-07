"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { motionTokens } from "@/lib/motion";

export type RevealVariant = "up" | "row" | "media" | "mask";

const revealVariants = {
  up: {
    initial: { opacity: 0, y: motionTokens.reveal.y },
    animate: { opacity: 1, y: 0 },
    duration: motionTokens.reveal.duration,
  },
  row: {
    initial: { opacity: 0, x: 36 },
    animate: { opacity: 1, x: 0 },
    duration: 0.68,
  },
  media: {
    initial: { opacity: 0, y: 34, scale: 1.025 },
    animate: { opacity: 1, y: 0, scale: 1 },
    duration: motionTokens.media.duration,
  },
  mask: {
    initial: { opacity: 0.35, clipPath: "inset(0 100% 0 0 round 0px)", scale: 1.015 },
    animate: { opacity: 1, clipPath: "inset(0 0% 0 0 round 0px)", scale: 1 },
    duration: motionTokens.media.duration,
  },
} as const;

export function Reveal({
  children,
  className,
  delay = 0,
  variant = "up",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  variant?: RevealVariant;
}) {
  const reduce = useReducedMotion();
  const selected = revealVariants[variant];
  const maskRef = useRef<HTMLDivElement>(null);
  const maskInView = useInView(maskRef, { once: true, amount: motionTokens.reveal.amount });

  if (variant === "mask") {
    return (
      <div className={className} ref={maskRef}>
        <motion.div
          className="motion-mask-content"
          initial={reduce ? false : selected.initial}
          animate={reduce || maskInView ? selected.animate : selected.initial}
          transition={{ duration: selected.duration, delay, ease: motionTokens.easeOut }}
        >
          {children}
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      initial={reduce ? false : selected.initial}
      whileInView={selected.animate}
      viewport={{ once: true, amount: motionTokens.reveal.amount }}
      transition={{ duration: selected.duration, delay, ease: motionTokens.easeOut }}
    >
      {children}
    </motion.div>
  );
}

export function HeroReveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: motionTokens.hero.y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: motionTokens.hero.duration, delay, ease: motionTokens.easeOut }}
    >
      {children}
    </motion.div>
  );
}

export function MaskedTextReveal({
  lines,
  className,
  delay = 0,
}: {
  lines: React.ReactNode[];
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.h1
      className={className}
      initial={reduce ? false : "hidden"}
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            delayChildren: delay,
            staggerChildren: motionTokens.hero.lineStagger,
          },
        },
      }}
    >
      {lines.map((line, index) => (
        <span className="motion-line-clip" key={index}>
          <motion.span
            className="motion-line"
            variants={{
              hidden: { opacity: 0, y: "104%" },
              visible: { opacity: 1, y: "0%" },
            }}
            transition={{ duration: motionTokens.hero.duration, ease: motionTokens.easeOut }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </motion.h1>
  );
}

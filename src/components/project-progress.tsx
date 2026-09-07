"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { motionTokens } from "@/lib/motion";

export function ProjectProgress() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, motionTokens.progressSpring);

  if (reduce) return null;

  return (
    <motion.div
      className="project-reading-progress"
      style={{ scaleX: progress }}
      aria-hidden="true"
    />
  );
}

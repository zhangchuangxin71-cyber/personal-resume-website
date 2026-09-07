"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { motionTokens } from "@/lib/motion";

const expertiseAreas = [
  "Agent 原生应用",
  "多模态视频理解",
  "结构化文档检索",
  "AI 视频工程",
] as const;

export function HeroSystemField() {
  const reduce = useReducedMotion();
  const offsetX = useMotionValue(0);
  const offsetY = useMotionValue(0);
  const x = useSpring(offsetX, motionTokens.spatialSpring);
  const y = useSpring(offsetY, motionTokens.spatialSpring);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (reduce || event.pointerType === "touch") return;
    const rect = event.currentTarget.getBoundingClientRect();
    offsetX.set(((event.clientX - rect.left) / rect.width - 0.5) * 22);
    offsetY.set(((event.clientY - rect.top) / rect.height - 0.5) * 16);
  };

  const reset = () => {
    offsetX.set(0);
    offsetY.set(0);
  };

  return (
    <div
      className="hero-system-field"
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
    >
      <span className="expertise-field-label" id="expertise-field-label">工作方向</span>
      <motion.ol
        className="expertise-field-list"
        style={reduce ? undefined : { x, y }}
        aria-labelledby="expertise-field-label"
      >
          {expertiseAreas.map((area, index) => (
            <motion.li
              className="expertise-field-item"
              key={area}
              initial={reduce ? false : { opacity: 0, x: 38 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.72,
                delay: 0.18 + index * 0.1,
                ease: motionTokens.easeOut,
              }}
            >
              <span className="expertise-field-index">{String(index + 1).padStart(2, "0")}</span>
              <strong>{area}</strong>
              <span className="expertise-field-track" aria-hidden="true"><i /></span>
            </motion.li>
          ))}
      </motion.ol>
    </div>
  );
}

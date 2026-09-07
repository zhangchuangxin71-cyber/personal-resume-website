"use client";

import { ArrowRight } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";
import { motionTokens, staggerDelay } from "@/lib/motion";

export function FlowDiagram({ items }: { items: string[] }) {
  const reduce = useReducedMotion();

  return (
    <div className="flow-diagram" aria-label={`系统流程：${items.join("，")}`}>
      {items.map((item, index) => (
        <motion.div
          className="flow-item-group"
          key={item}
          initial={reduce ? false : { opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{
            duration: 0.4,
            delay: staggerDelay(index),
            ease: motionTokens.easeOut,
          }}
        >
          <div className="flow-item">{item}</div>
          {index < items.length - 1 ? (
            <motion.span
              className="flow-arrow-wrap"
              initial={reduce ? false : { opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{
                duration: 0.28,
                delay: staggerDelay(index) + 0.05,
                ease: motionTokens.easeOut,
              }}
            >
              <ArrowRight className="flow-arrow" size={18} aria-hidden="true" />
            </motion.span>
          ) : null}
        </motion.div>
      ))}
    </div>
  );
}

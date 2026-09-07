"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import type { PortfolioProject } from "@/lib/projects";
import { motionTokens } from "@/lib/motion";

export function DecisionAccordion({
  decisions,
}: {
  decisions: PortfolioProject["decisions"];
}) {
  const reduce = useReducedMotion();
  const [openItems, setOpenItems] = useState<Set<number>>(() => new Set());

  const toggle = (index: number) => {
    setOpenItems((current) => {
      const next = new Set(current);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  return (
    <div className="decision-list">
      {decisions.map((decision, index) => {
        const open = openItems.has(index);
        const contentId = `decision-content-${index}`;

        return (
          <div className={`decision-item ${open ? "is-open" : ""}`} key={decision.title}>
            <button
              className="decision-summary"
              type="button"
              aria-expanded={open}
              aria-controls={contentId}
              onClick={() => toggle(index)}
            >
              <span>{decision.title}</span>
              <span aria-hidden="true">+</span>
            </button>
            <AnimatePresence initial={false}>
              {open ? (
                <motion.div
                  id={contentId}
                  className="decision-content"
                  role="region"
                  initial={reduce ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  transition={{
                    duration: reduce ? 0 : 0.22,
                    ease: motionTokens.easeOut,
                  }}
                >
                  <div className="decision-body">
                    <p><strong>背景：</strong>{decision.context}</p>
                    <p><strong>选择：</strong>{decision.choice}</p>
                    <p><strong>原因：</strong>{decision.reasoning}</p>
                    {decision.alternatives?.length ? (
                      <div>
                        <strong>考虑过的替代方案：</strong>
                        <ul>
                          {decision.alternatives.map((alternative) => (
                            <li key={alternative}>{alternative}</li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

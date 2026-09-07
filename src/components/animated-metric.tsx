"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { motionTokens } from "@/lib/motion";

type ParsedMetric = {
  prefix: string;
  target: number;
  suffix: string;
  decimals: number;
  useGrouping: boolean;
};

function parseMetric(value: string): ParsedMetric | null {
  const match = value.trim().match(/^([^0-9-]*)(-?[\d,]+(?:\.\d+)?)(.*)$/);
  if (!match) return null;

  const numeric = match[2].replaceAll(",", "");
  const target = Number(numeric);
  if (!Number.isFinite(target)) return null;

  return {
    prefix: match[1],
    target,
    suffix: match[3],
    decimals: numeric.includes(".") ? numeric.split(".")[1].length : 0,
    useGrouping: match[2].includes(","),
  };
}

function formatMetric(metric: ParsedMetric, current: number) {
  const formatted = current.toLocaleString("en-US", {
    minimumFractionDigits: metric.decimals,
    maximumFractionDigits: metric.decimals,
    useGrouping: metric.useGrouping,
  });

  return `${metric.prefix}${formatted}${metric.suffix}`;
}

export function AnimatedMetric({ value, duration = motionTokens.metric.duration }: { value: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const metric = useMemo(() => parseMetric(value), [value]);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [display, setDisplay] = useState(value);
  const visibleValue = !metric || reduce ? value : display;

  useEffect(() => {
    if (!metric || reduce || !inView) return;

    const controls = animate(0, metric.target, {
      duration,
      ease: motionTokens.easeOut,
      onUpdate: (current) => setDisplay(formatMetric(metric, current)),
    });

    return () => controls.stop();
  }, [duration, inView, metric, reduce, value]);

  return (
    <span ref={ref} className="animated-metric" aria-label={value}>
      <span aria-hidden="true">{visibleValue}</span>
    </span>
  );
}

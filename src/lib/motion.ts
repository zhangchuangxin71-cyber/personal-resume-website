export const motionTokens = {
  easeOut: [0.22, 1, 0.36, 1] as const,
  reveal: {
    y: 24,
    duration: 0.62,
    amount: 0.12,
  },
  hero: {
    y: 18,
    duration: 0.78,
    lineStagger: 0.11,
    sequenceStagger: 0.05,
  },
  media: {
    duration: 0.86,
  },
  metric: {
    duration: 0.72,
  },
  micro: {
    duration: 0.22,
  },
  stagger: {
    step: 0.06,
    maxDelay: 0.18,
  },
  spatialSpring: {
    stiffness: 90,
    damping: 20,
    mass: 0.8,
  },
  progressSpring: {
    stiffness: 120,
    damping: 28,
    mass: 0.25,
  },
} as const;

export function staggerDelay(index: number) {
  return Math.min(index * motionTokens.stagger.step, motionTokens.stagger.maxDelay);
}

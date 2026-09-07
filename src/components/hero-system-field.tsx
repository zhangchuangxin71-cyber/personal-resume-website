"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { motionTokens } from "@/lib/motion";

export function HeroSystemField() {
  const reduce = useReducedMotion();
  const offsetX = useMotionValue(0);
  const offsetY = useMotionValue(0);
  const x = useSpring(offsetX, motionTokens.spatialSpring);
  const y = useSpring(offsetY, motionTokens.spatialSpring);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (reduce || event.pointerType === "touch") return;
    const rect = event.currentTarget.getBoundingClientRect();
    offsetX.set(((event.clientX - rect.left) / rect.width - 0.5) * 18);
    offsetY.set(((event.clientY - rect.top) / rect.height - 0.5) * 14);
  };

  const reset = () => {
    offsetX.set(0);
    offsetY.set(0);
  };

  return (
    <div className="hero-system-field hero-studio" onPointerMove={handlePointerMove} onPointerLeave={reset}>
      <motion.div className="hero-studio-stage" style={reduce ? undefined : { x, y }}>
        <span className="hero-studio-glow hero-studio-glow-a" aria-hidden="true" />
        <span className="hero-studio-glow hero-studio-glow-b" aria-hidden="true" />
        <span className="hero-studio-spark hero-studio-spark-a" aria-hidden="true" />
        <span className="hero-studio-spark hero-studio-spark-b" aria-hidden="true" />
        <span className="hero-studio-spark hero-studio-spark-c" aria-hidden="true" />

        <div className="hero-studio-board">
          <div className="hero-studio-header">
            <span>AI Desk</span>
            <span>model · evidence · delivery</span>
          </div>

          <div className="hero-studio-layout">
            <div className="hero-studio-character" aria-hidden="true">
              <span className="character-shadow" />
              <span className="character-head">
                <span className="character-hair" />
                <span className="character-glasses" />
                <span className="character-eyes" />
                <span className="character-mouth" />
                <span className="character-blush character-blush-left" />
                <span className="character-blush character-blush-right" />
              </span>
              <span className="character-neck" />
              <span className="character-body" />
              <span className="character-arm character-arm-left" />
              <span className="character-arm character-arm-right" />
              <span className="character-leg character-leg-left" />
              <span className="character-leg character-leg-right" />
              <span className="character-laptop">
                <span className="laptop-screen">
                  <i />
                  <i />
                  <i />
                  <i />
                </span>
              </span>
            </div>

            <div className="hero-studio-console">
              <div className="hero-studio-screen">
                <div className="hero-studio-screen-top">
                  <span>ClipTalk</span>
                  <span>agent ready</span>
                </div>

                <div className="hero-studio-chat">
                  <div className="studio-bubble studio-bubble-user">
                    剪出 45 秒高光
                  </div>
                  <div className="studio-bubble studio-bubble-agent">
                    先找证据，再做镜头切片
                  </div>
                </div>

                <div className="hero-studio-timeline" aria-hidden="true">
                  <span className="timeline-track">
                    <i />
                    <i />
                    <i />
                  </span>
                  <span className="timeline-marker timeline-marker-a" />
                  <span className="timeline-marker timeline-marker-b" />
                  <span className="timeline-marker timeline-marker-c" />
                </div>
              </div>

              <div className="hero-studio-notes" aria-hidden="true">
                <div className="sticky-note sticky-note-a">RAG</div>
                <div className="sticky-note sticky-note-b">Video</div>
                <div className="sticky-note sticky-note-c">Evidence</div>
              </div>

              <div className="hero-studio-foot">
                <span>Readable systems</span>
                <span>clear outputs</span>
              </div>
            </div>
          </div>

          <div className="hero-studio-tags" aria-hidden="true">
            <span>Agent 原生应用</span>
            <span>多模态检索</span>
            <span>可验证输出</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

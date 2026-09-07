"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

export function ProjectDemoVideo({
  src,
  poster,
  title,
}: {
  src: string;
  poster: string;
  title: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (reduceMotion) {
      video.pause();
      video.currentTime = 0;
      return;
    }

    void video.play().catch(() => undefined);
  }, [reduceMotion]);

  return (
    <div className="project-demo-video-shell">
      <video
        ref={videoRef}
        className="project-demo-video"
        src={src}
        poster={poster}
        aria-label={`${title} 产品演示`}
        muted
        loop
        playsInline
        controls
        preload="metadata"
      />
      <span className="project-demo-video-label" aria-hidden="true">
        REAL PRODUCT DEMO · 25S
      </span>
    </div>
  );
}

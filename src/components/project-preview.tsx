"use client";

import { ArrowUpRight } from "@phosphor-icons/react";
import { motion, useInView, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { AnimatedMetric } from "@/components/animated-metric";
import type { PortfolioProject } from "@/lib/projects";
import { getVerifiedMetrics, statusLabels } from "@/lib/projects";
import { motionTokens } from "@/lib/motion";

export type ProjectPreviewVariant = "lead" | "poster" | "wide";

export function ProjectPreview({
  project,
  priority = false,
  variant = "poster",
  showMetrics = true,
  href,
}: {
  project: PortfolioProject;
  priority?: boolean;
  variant?: ProjectPreviewVariant;
  showMetrics?: boolean;
  href?: string;
}) {
  const reduce = useReducedMotion();
  const mediaRef = useRef<HTMLDivElement>(null);
  const inView = useInView(mediaRef, { once: true, amount: 0.18 });
  const imageX = useMotionValue(0);
  const imageY = useMotionValue(0);
  const springX = useSpring(imageX, motionTokens.spatialSpring);
  const springY = useSpring(imageY, motionTokens.spatialSpring);
  const metrics = showMetrics ? getVerifiedMetrics(project).slice(0, variant === "lead" ? 3 : 2) : [];

  const moveImage = (event: React.PointerEvent<HTMLElement>) => {
    if (reduce || event.pointerType === "touch") return;
    const rect = event.currentTarget.getBoundingClientRect();
    imageX.set(((event.clientX - rect.left) / rect.width - 0.5) * -16);
    imageY.set(((event.clientY - rect.top) / rect.height - 0.5) * -12);
  };

  const resetImage = () => {
    imageX.set(0);
    imageY.set(0);
  };

  return (
    <motion.article
      className={`project-preview project-preview-${variant}`}
      onPointerMove={moveImage}
      onPointerLeave={resetImage}
      whileTap={reduce ? undefined : { scale: 0.993 }}
      transition={{ duration: motionTokens.micro.duration, ease: motionTokens.easeOut }}
    >
      <Link href={href ?? `/projects/${project.slug}`} className="project-preview-link">
        <div className="project-preview-media" ref={mediaRef}>
          <motion.div
            className="project-preview-image-wrap"
            style={reduce ? undefined : { x: springX, y: springY }}
            initial={reduce ? false : { clipPath: "inset(0 100% 0 0)" }}
            animate={reduce || inView ? { clipPath: "inset(0 0% 0 0)" } : { clipPath: "inset(0 100% 0 0)" }}
            transition={{ duration: motionTokens.media.duration, ease: motionTokens.easeOut }}
          >
            <Image
              src={project.cover}
              alt={project.coverAlt}
              fill
              priority={priority}
              sizes={variant === "lead"
                ? "(max-width: 767px) 100vw, 920px"
                : "(max-width: 767px) 100vw, 700px"}
              className="project-preview-image"
            />
            <span className="project-preview-ink" aria-hidden="true" />
          </motion.div>
          <span className="media-scanline" aria-hidden="true" />
        </div>
        <div className="project-preview-copy">
          <p className="project-preview-status">
            {statusLabels[project.status]}{project.openSource ? " · 开源" : ""}
          </p>
          <div className="project-preview-heading">
            <h3>{project.title}</h3>
            <span aria-hidden="true"><ArrowUpRight size={22} /></span>
          </div>
          <p className="project-preview-subtitle">{project.subtitle}</p>
          {metrics.length ? (
            <div className="project-preview-metrics" aria-label="项目成果">
              {metrics.map((metric) => (
                <span key={metric.label}>
                  <strong><AnimatedMetric value={metric.value} /></strong>
                  <small>{metric.label}</small>
                </span>
              ))}
            </div>
          ) : null}
          <p className="project-preview-tech" aria-label="技术栈">
            {project.technologies.slice(0, variant === "lead" ? 5 : 4).join(" / ")}
          </p>
        </div>
      </Link>
    </motion.article>
  );
}

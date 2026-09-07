"use client";

import { useCallback, useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./cubes.css";

type CellGap = number | string | { row?: number; col?: number };

type CubesProps = {
  className?: string;
  gridSize?: number;
  cubeSize?: number;
  maxAngle?: number;
  radius?: number;
  easing?: string;
  duration?: { enter: number; leave: number };
  cellGap?: CellGap;
  borderStyle?: string;
  faceColor?: string;
  shadow?: boolean | string;
  autoAnimate?: boolean;
  rippleOnClick?: boolean;
  rippleColor?: string;
  rippleSpeed?: number;
  ariaLabel?: string;
};

type QuickRotation = {
  x: (value: number) => void;
  y: (value: number) => void;
};

function toGap(value: CellGap, axis: "row" | "col") {
  if (typeof value === "number") return `${value}px`;
  if (typeof value === "string") return value;
  const axisValue = value?.[axis];
  return axisValue === undefined ? "5%" : `${axisValue}px`;
}

export function Cubes({
  className = "",
  gridSize = 7,
  cubeSize,
  maxAngle = 22,
  radius = 2.4,
  easing = "power3.out",
  duration = { enter: 0.25, leave: 0.55 },
  cellGap = 5,
  borderStyle = "1px solid rgb(168 70 50 / 0.32)",
  faceColor = "var(--cube-face-color)",
  shadow = "0 6px 12px rgb(0 0 0 / 0.22)",
  autoAnimate = true,
  rippleOnClick = true,
  rippleColor = "#a84632",
  rippleSpeed = 2.6,
  ariaLabel = "响应局部输入的模块化系统网格",
}: CubesProps) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const pointerFrameRef = useRef<number | null>(null);
  const simulationFrameRef = useRef<number | null>(null);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const quickRotationsRef = useRef<QuickRotation[]>([]);
  const userActiveRef = useRef(false);
  const visibleRef = useRef(true);
  const reducedMotionRef = useRef(false);
  const lastSimulationFrameRef = useRef(0);
  const simulationPositionRef = useRef({ x: 0, y: 0 });
  const simulationTargetRef = useRef({ x: 0, y: 0 });

  const resetAll = useCallback(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    const cubes = gsap.utils.toArray<HTMLElement>(".cube", scene);
    gsap.to(cubes, {
      duration: reducedMotionRef.current ? 0 : duration.leave,
      rotateX: 0,
      rotateY: 0,
      ease: "power3.out",
      overwrite: true,
    });
  }, [duration.leave]);

  const tiltAt = useCallback((rowCenter: number, colCenter: number) => {
    const scene = sceneRef.current;
    if (!scene || reducedMotionRef.current) return;

    const cubes = scene.querySelectorAll<HTMLElement>(".cube");
    cubes.forEach((cube, index) => {
      const row = Number(cube.dataset.row);
      const col = Number(cube.dataset.col);
      const distance = Math.hypot(row - rowCenter, col - colCenter);
      const influence = distance <= radius ? 1 - distance / radius : 0;
      const angle = influence * maxAngle;
      const rotation = quickRotationsRef.current[index];

      rotation?.x(-angle);
      rotation?.y(angle);
    });
  }, [maxAngle, radius]);

  const markUserActive = useCallback(() => {
    userActiveRef.current = true;
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    idleTimerRef.current = setTimeout(() => {
      userActiveRef.current = false;
    }, 1600);
  }, []);

  const handlePointerMove = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    const scene = sceneRef.current;
    if (
      !scene ||
      event.pointerType === "touch" ||
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches
    ) {
      return;
    }

    markUserActive();
    const rect = scene.getBoundingClientRect();
    const colCenter = ((event.clientX - rect.left) / rect.width) * gridSize;
    const rowCenter = ((event.clientY - rect.top) / rect.height) * gridSize;

    if (pointerFrameRef.current !== null) cancelAnimationFrame(pointerFrameRef.current);
    pointerFrameRef.current = requestAnimationFrame(() => tiltAt(rowCenter, colCenter));
  }, [gridSize, markUserActive, tiltAt]);

  const handlePointerLeave = useCallback(() => {
    userActiveRef.current = false;
    resetAll();
  }, [resetAll]);

  const handleClick = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    const scene = sceneRef.current;
    if (!rippleOnClick || !scene || reducedMotionRef.current) return;

    const rect = scene.getBoundingClientRect();
    const colHit = Math.floor(((event.clientX - rect.left) / rect.width) * gridSize);
    const rowHit = Math.floor(((event.clientY - rect.top) / rect.height) * gridSize);
    const rings = new Map<number, HTMLElement[]>();

    scene.querySelectorAll<HTMLElement>(".cube").forEach((cube) => {
      const row = Number(cube.dataset.row);
      const col = Number(cube.dataset.col);
      const ring = Math.round(Math.hypot(row - rowHit, col - colHit));
      const faces = Array.from(cube.querySelectorAll<HTMLElement>(".cube-face"));
      rings.set(ring, [...(rings.get(ring) ?? []), ...faces]);
    });

    const firstFace = scene.querySelector<HTMLElement>(".cube-face");
    const baseColor = firstFace ? getComputedStyle(firstFace).backgroundColor : faceColor;
    const spreadDelay = 0.15 / rippleSpeed;
    const animationDuration = 0.3 / rippleSpeed;
    const holdTime = 0.6 / rippleSpeed;

    [...rings.entries()]
      .sort(([a], [b]) => a - b)
      .forEach(([ring, faces]) => {
        const delay = ring * spreadDelay;
        gsap.to(faces, {
          backgroundColor: rippleColor,
          duration: animationDuration,
          delay,
          ease: "power3.out",
          overwrite: true,
        });
        gsap.to(faces, {
          backgroundColor: baseColor,
          duration: animationDuration,
          delay: delay + animationDuration + holdTime,
          ease: "power3.out",
          overwrite: false,
          onComplete: () => gsap.set(faces, { clearProps: "backgroundColor" }),
        });
      });
  }, [faceColor, gridSize, rippleColor, rippleOnClick, rippleSpeed]);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointerQuery = window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 768px)");
    const cubes = gsap.utils.toArray<HTMLElement>(".cube", scene);
    reducedMotionRef.current = reducedMotionQuery.matches;

    quickRotationsRef.current = cubes.map((cube) => ({
      x: gsap.quickTo(cube, "rotateX", {
        duration: duration.enter,
        ease: easing,
        overwrite: true,
      }),
      y: gsap.quickTo(cube, "rotateY", {
        duration: duration.enter,
        ease: easing,
        overwrite: true,
      }),
    }));

    const observer = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
        if (!entry.isIntersecting) resetAll();
      },
      { threshold: 0.08 },
    );
    observer.observe(scene);

    const handleMotionChange = () => {
      reducedMotionRef.current = reducedMotionQuery.matches;
      if (reducedMotionQuery.matches) resetAll();
    };
    reducedMotionQuery.addEventListener("change", handleMotionChange);

    simulationPositionRef.current = {
      x: Math.random() * gridSize,
      y: Math.random() * gridSize,
    };
    simulationTargetRef.current = {
      x: Math.random() * gridSize,
      y: Math.random() * gridSize,
    };

    const simulate = (timestamp: number) => {
      if (
        autoAnimate &&
        finePointerQuery.matches &&
        visibleRef.current &&
        !reducedMotionRef.current &&
        !userActiveRef.current &&
        timestamp - lastSimulationFrameRef.current >= 50
      ) {
        lastSimulationFrameRef.current = timestamp;
        const position = simulationPositionRef.current;
        const target = simulationTargetRef.current;
        position.x += (target.x - position.x) * 0.035;
        position.y += (target.y - position.y) * 0.035;
        tiltAt(position.y, position.x);

        if (Math.hypot(position.x - target.x, position.y - target.y) < 0.1) {
          simulationTargetRef.current = {
            x: Math.random() * gridSize,
            y: Math.random() * gridSize,
          };
        }
      }

      simulationFrameRef.current = requestAnimationFrame(simulate);
    };
    simulationFrameRef.current = requestAnimationFrame(simulate);

    return () => {
      observer.disconnect();
      reducedMotionQuery.removeEventListener("change", handleMotionChange);
      if (pointerFrameRef.current !== null) cancelAnimationFrame(pointerFrameRef.current);
      if (simulationFrameRef.current !== null) cancelAnimationFrame(simulationFrameRef.current);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      gsap.killTweensOf(cubes);
      gsap.killTweensOf(scene.querySelectorAll(".cube-face"));
      quickRotationsRef.current = [];
    };
  }, [autoAnimate, duration.enter, easing, gridSize, resetAll, tiltAt]);

  const cells = Array.from({ length: gridSize });
  const sceneStyle = {
    gridTemplateColumns: cubeSize ? `repeat(${gridSize}, ${cubeSize}px)` : `repeat(${gridSize}, 1fr)`,
    gridTemplateRows: cubeSize ? `repeat(${gridSize}, ${cubeSize}px)` : `repeat(${gridSize}, 1fr)`,
    columnGap: toGap(cellGap, "col"),
    rowGap: toGap(cellGap, "row"),
  };
  const wrapperStyle = {
    "--cube-face-border": borderStyle,
    "--cube-face-bg": faceColor,
    "--cube-face-shadow": shadow === true ? "0 0 6px rgb(0 0 0 / 0.5)" : shadow || "none",
    ...(cubeSize
      ? {
          width: `${gridSize * cubeSize}px`,
          height: `${gridSize * cubeSize}px`,
        }
      : {}),
  } as React.CSSProperties;

  return (
    <div
      className={`cubes-shell ${className}`}
      style={wrapperStyle}
      role="img"
      aria-label={ariaLabel}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onClick={handleClick}
    >
      <div ref={sceneRef} className="cubes-scene" style={sceneStyle}>
        {cells.map((_, row) =>
          cells.map((__, col) => (
            <span key={`${row}-${col}`} className="cube" data-row={row} data-col={col}>
              <span className="cube-face cube-face-top" />
              <span className="cube-face cube-face-bottom" />
              <span className="cube-face cube-face-left" />
              <span className="cube-face cube-face-right" />
              <span className="cube-face cube-face-front" />
              <span className="cube-face cube-face-back" />
            </span>
          )),
        )}
      </div>
    </div>
  );
}

export default Cubes;

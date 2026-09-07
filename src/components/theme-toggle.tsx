"use client";

import { CircleHalf } from "@phosphor-icons/react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

const subscribe = () => () => undefined;

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);

  if (!mounted) {
    return <span className="theme-toggle theme-toggle-placeholder" aria-hidden="true" />;
  }

  const dark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      className={`theme-toggle ${dark ? "is-dark" : "is-light"}`}
      onClick={() => setTheme(dark ? "light" : "dark")}
      aria-label={dark ? "切换到浅色主题" : "切换到深色主题"}
    >
      <CircleHalf size={19} weight="fill" aria-hidden="true" />
    </button>
  );
}

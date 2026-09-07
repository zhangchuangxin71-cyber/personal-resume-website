"use client";

import { useEffect, useState } from "react";

export type ProjectTocItem = {
  id: string;
  label: string;
};

export function ProjectToc({ items }: { items: ProjectTocItem[] }) {
  const [active, setActive] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => section !== null);
    const visible = new Map<string, IntersectionObserverEntry>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visible.set(entry.target.id, entry);
          else visible.delete(entry.target.id);
        });
        const next = [...visible.values()]
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
          ?.target.id;
        if (next) setActive(next);
      },
      { rootMargin: "-18% 0px -62%", threshold: [0, 0.1] },
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
    };
  }, [items]);

  return (
    <aside className="project-toc" aria-label="项目目录">
      {items.map((item) => (
        <a
          href={`#${item.id}`}
          key={item.id}
          className={active === item.id ? "is-active" : undefined}
          aria-current={active === item.id ? "location" : undefined}
          onClick={() => setActive(item.id)}
        >
          <span aria-hidden="true" />
          {item.label}
        </a>
      ))}
    </aside>
  );
}

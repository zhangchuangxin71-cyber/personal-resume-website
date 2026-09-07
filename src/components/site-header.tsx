"use client";

import { List, X } from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { motionTokens } from "@/lib/motion";
import { ThemeToggle } from "@/components/theme-toggle";

export function SiteHeader() {
  const reduce = useReducedMotion();
  const [activeSection, setActiveSection] = useState<string>(siteConfig.nav[0]?.id ?? "");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const initialHash = window.location.hash.slice(1);
    if (initialHash) {
      setActiveSection(initialHash);
    }

    const sections = siteConfig.nav
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => section !== null);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          setActiveSection(visible.target.id);
        }
      },
      {
        rootMargin: "-16% 0px -64%",
        threshold: [0.12, 0.24, 0.4, 0.55],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <header className="site-header is-scrolled">
      <div className="container-shell header-inner">
        <Link href="#top" className="brand-link" aria-label="返回页面顶部">
          <span className="brand-mark" aria-hidden="true">{siteConfig.initials}</span>
          <span className="brand-name">{siteConfig.name}</span>
          <span className="brand-role">{siteConfig.role}</span>
        </Link>

        <nav className="desktop-nav" aria-label="主导航">
          {siteConfig.nav.map((item) => {
            const active = activeSection === item.id;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={active ? "is-active" : ""}
                aria-current={active ? "location" : undefined}
                onClick={() => setActiveSection(item.id)}
              >
                {item.label}
                {active ? (
                  <motion.span
                    className="nav-active-indicator"
                    layoutId="desktop-nav-active"
                    transition={{ duration: motionTokens.micro.duration, ease: motionTokens.easeOut }}
                  />
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="header-actions">
          <ThemeToggle />
          <button
            className="icon-button mobile-menu-button"
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "关闭菜单" : "打开菜单"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={19} /> : <List size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.nav
            id="mobile-menu"
            className="mobile-nav"
            aria-label="移动端导航"
            initial={reduce ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: motionTokens.easeOut }}
          >
            <div className="container-shell mobile-nav-inner">
              {siteConfig.nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={activeSection === item.id ? "is-active" : ""}
                  aria-current={activeSection === item.id ? "location" : undefined}
                  onClick={() => {
                    setActiveSection(item.id);
                    setOpen(false);
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

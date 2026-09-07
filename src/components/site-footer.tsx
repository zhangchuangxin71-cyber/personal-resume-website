import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container-shell footer-grid">
        <div>
          <p className="footer-name">{siteConfig.name}</p>
          <p className="footer-note">复杂系统需要清楚的边界，也需要清楚的表达。</p>
        </div>
        <div className="footer-links">
          <Link href="#projects">项目</Link>
          <Link href="#resume">简历</Link>
          <Link href="#contact">联系</Link>
          {siteConfig.githubUrl ? (
            <a href={siteConfig.githubUrl} target="_blank" rel="noreferrer">
              GitHub <ArrowUpRight size={13} />
            </a>
          ) : null}
          {siteConfig.contactEmail ? (
            <a href={`mailto:${siteConfig.contactEmail}`}>邮件</a>
          ) : null}
        </div>
        <p className="footer-meta">© {new Date().getFullYear()} {siteConfig.name}</p>
      </div>
    </footer>
  );
}

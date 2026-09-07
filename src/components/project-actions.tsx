import { ArrowUpRight, FileText, GithubLogo, Play } from "@phosphor-icons/react/dist/ssr";
import type { PortfolioProject } from "@/lib/projects";

export function ProjectActions({ links }: { links: PortfolioProject["links"] }) {
  if (!links) return null;

  const actions = [
    links.demo ? { href: links.demo, label: "查看演示", icon: Play } : null,
    links.source ? { href: links.source, label: "查看源码", icon: GithubLogo } : null,
    links.paper ? { href: links.paper, label: "阅读论文", icon: FileText } : null,
    links.documentation
      ? { href: links.documentation, label: "项目文档", icon: ArrowUpRight }
      : null,
  ].filter(Boolean) as Array<{
    href: string;
    label: string;
    icon: typeof ArrowUpRight;
  }>;

  if (!actions.length) return null;

  return (
    <div className="project-actions">
      {actions.map(({ href, label, icon: Icon }) => (
        <a key={label} className="button button-secondary" href={href} target="_blank" rel="noreferrer">
          {label}
          <Icon size={16} />
        </a>
      ))}
    </div>
  );
}

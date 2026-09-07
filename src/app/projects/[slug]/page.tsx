import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { ProjectCaseStudy } from "@/components/project-case-study";
import { ProjectProgress } from "@/components/project-progress";
import { ProjectToc, type ProjectTocItem } from "@/components/project-toc";
import { getProject, getVerifiedMetrics, projects } from "@/lib/projects";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) return {};

  return {
    title: project.title,
    description: project.summary,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  const tocItems: ProjectTocItem[] = [
    { id: `project-${slug}-overview`, label: "项目概览" },
    { id: `project-${slug}-architecture`, label: "系统架构" },
    { id: `project-${slug}-decisions`, label: "技术决策" },
    ...(getVerifiedMetrics(project).length ? [{ id: `project-${slug}-results`, label: "已验证结果" }] : []),
    { id: `project-${slug}-deep-dive`, label: "完整案例" },
  ];

  return (
    <div className="page-shell project-page">
      <ProjectProgress />
      <div className="container-shell">
        <Link className="back-link" href="/#projects">
          <ArrowLeft size={15} />
          返回精选项目
        </Link>
      </div>

      <div className="container-shell project-layout">
        <ProjectToc items={tocItems} />
        <div className="project-content">
          <ProjectCaseStudy project={project} priority />
        </div>
      </div>
    </div>
  );
}

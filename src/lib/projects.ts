import { allProjects } from "content-collections";

export type PortfolioProject = (typeof allProjects)[number];

export const projects = [...allProjects].sort((a, b) => a.order - b.order);
export const featuredProjects = projects.filter((project) => project.featured);

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getVerifiedMetrics(project: PortfolioProject) {
  return project.metrics?.filter((metric) => metric.verified) ?? [];
}

export const statusLabels: Record<PortfolioProject["status"], string> = {
  ongoing: "进行中",
  completed: "已完成",
  research: "研究中",
};

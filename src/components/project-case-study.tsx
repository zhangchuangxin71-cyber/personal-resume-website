import Image from "next/image";
import { MDXContent } from "@content-collections/mdx/react";
import { AnimatedMetric } from "@/components/animated-metric";
import { DecisionAccordion } from "@/components/decision-accordion";
import { FlowDiagram } from "@/components/flow-diagram";
import { ProjectActions } from "@/components/project-actions";
import { ProjectDemoVideo } from "@/components/project-demo-video";
import { Reveal } from "@/components/reveal";
import { mdxComponents } from "@/mdx-components";
import type { PortfolioProject } from "@/lib/projects";
import { getVerifiedMetrics, statusLabels } from "@/lib/projects";

export function ProjectCaseStudy({ project, priority = false }: { project: PortfolioProject; priority?: boolean }) {
  const verifiedMetrics = getVerifiedMetrics(project);
  const sectionBase = `project-${project.slug}`;

  return (
    <article id={sectionBase} className="project-case-study">
      <header className="container-shell project-hero project-case-hero">
        <div className="project-hero-copy">
          <div>
            <div className="project-kicker-row">
              <p className="project-kicker">{statusLabels[project.status]}</p>
              {project.openSource && project.links?.source ? (
                <a
                  className="project-open-source-link"
                  href={project.links.source}
                  target="_blank"
                  rel="noreferrer"
                >
                  OPEN SOURCE · {project.openSource.owner}
                </a>
              ) : null}
            </div>
            <h2>{project.title}</h2>
          </div>
          <div className="project-hero-summary">
            <p>{project.subtitle}</p>
            <ProjectActions links={project.links} />
          </div>
        </div>

        <Reveal className="project-cover-reveal" variant="mask">
          <div className={`project-cover-large ${project.demoVideo ? "project-cover-video" : ""}`}>
            {project.demoVideo ? (
              <ProjectDemoVideo src={project.demoVideo} poster={project.cover} title={project.title} />
            ) : (
              <Image
                src={project.cover}
                alt={project.coverAlt}
                fill
                priority={priority}
                sizes="(max-width: 768px) 100vw, 1280px"
                className="object-cover"
              />
            )}
          </div>
        </Reveal>

        <div className={`project-meta-grid ${project.openSource ? "project-meta-grid-four" : ""}`}>
          <div>
            <span>我的角色</span>
            <strong>{project.role}</strong>
          </div>
          <div>
            <span>项目阶段</span>
            <strong>{project.period ?? statusLabels[project.status]}</strong>
          </div>
          <div>
            <span>交付形态</span>
            <strong>{project.deliverable}</strong>
          </div>
          {project.openSource ? (
            <div>
              <span>开源许可</span>
              <strong>{project.openSource.license}</strong>
            </div>
          ) : null}
        </div>
      </header>

      <div className="container-shell project-case-body">
        <Reveal>
          <section id={`${sectionBase}-overview`} className="case-section case-overview">
            <h2>项目概览</h2>
            <p className="lead-copy">{project.summary}</p>
            <div className="case-split">
              <div>
                <h3>问题</h3>
                <p>{project.problem}</p>
              </div>
              <div>
                <h3>约束</h3>
                <ul>
                  {project.constraints.map((constraint) => (
                    <li key={constraint}>{constraint}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </Reveal>

        <details className="project-case-details" open={priority}>
          <summary className="project-case-summary">
            <span>展开完整案例</span>
            <span aria-hidden="true">+</span>
          </summary>
          <div className="project-case-detail-body">
            <Reveal>
              <section id={`${sectionBase}-architecture`} className="case-section">
                <h2>系统架构</h2>
                <p>{project.approach}</p>
                <FlowDiagram items={project.flow} />
              </section>
            </Reveal>

            <Reveal>
              <section id={`${sectionBase}-decisions`} className="case-section">
                <h2>关键技术决策</h2>
                <DecisionAccordion decisions={project.decisions} />
              </section>
            </Reveal>

            {verifiedMetrics.length ? (
              <Reveal>
                <section id={`${sectionBase}-results`} className="case-section">
                  <h2>已验证结果</h2>
                  <div className="metrics-grid">
                    {verifiedMetrics.map((metric) => (
                      <div key={metric.label}>
                        <strong>
                          <AnimatedMetric value={metric.value} />
                        </strong>
                        <span>{metric.label}</span>
                      </div>
                    ))}
                  </div>
                </section>
              </Reveal>
            ) : null}

            <Reveal>
              <section id={`${sectionBase}-deep-dive`} className="case-section mdx-content">
                <MDXContent code={project.mdx} components={mdxComponents} />
              </section>
            </Reveal>

            <section className="case-section technology-section">
              <h2>技术组成</h2>
              <div className="technology-list">
                {project.technologies.map((technology) => (
                  <span key={technology}>{technology}</span>
                ))}
              </div>
            </section>
          </div>
        </details>
      </div>
    </article>
  );
}

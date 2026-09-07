import Link from "next/link";
import { ArrowDown, ArrowRight, EnvelopeSimple, Phone } from "@phosphor-icons/react/dist/ssr";
import { Cubes } from "@/components/cubes";
import { HeroSystemField } from "@/components/hero-system-field";
import { ProjectCaseStudy } from "@/components/project-case-study";
import { ProjectPreview } from "@/components/project-preview";
import { GlitchLabel, HeroAtmosphere } from "@/components/reactbits-effects";
import { HeroReveal, MaskedTextReveal, Reveal } from "@/components/reveal";
import { PrintButton } from "@/components/print-button";
import { staggerDelay } from "@/lib/motion";
import { featuredProjects, projects } from "@/lib/projects";
import { awards, education, focusAreas, internships, resumeProjects, siteConfig, skillGroups, workingPrinciples } from "@/lib/site";

export default function HomePage() {
  return (
    <div className="home-page">
      <section className="home-hero" id="top">
        <HeroAtmosphere />
        <div className="container-shell home-hero-grid">
          <div className="home-hero-copy">
            <HeroReveal delay={0.02}>
              <p className="home-role">
                <GlitchLabel text={siteConfig.role} />
              </p>
            </HeroReveal>
            <MaskedTextReveal
              delay={0.07}
              lines={[
                "把模型、数据与交互，",
                <span key="product-line">连成<span className="home-hero-accent">可交付的产品。</span></span>,
              ]}
            />
            <HeroReveal delay={0.2}>
              <p className="home-hero-description">{siteConfig.description}</p>
            </HeroReveal>
            <HeroReveal className="home-hero-actions" delay={0.27}>
              <a className="button button-primary" href="#projects">
                查看项目
                <ArrowRight size={17} />
              </a>
            </HeroReveal>
          </div>

          <Reveal className="home-system-visual" variant="media">
            <HeroSystemField />
          </Reveal>
        </div>
      </section>

      <section id="about" className="home-about">
        <div className="container-shell about-intro">
          <div className="about-intro-copy">
            <h2>我关心的不只是模型能做什么，还包括它如何稳定进入产品。</h2>
            <p>
              我专注于 Agent 原生应用、多模态视频理解、结构化文档检索与 AI 视频工程。面对复杂系统，我习惯先找出决策边界，再设计协议、验证链路和用户控制。
            </p>
          </div>
          <div className="about-cubes-stage">
            <Cubes />
          </div>
        </div>

        <div className="container-shell about-grid">
          <Reveal className="about-section-title">
            <h2>当前方向</h2>
          </Reveal>
          <div className="about-rows">
            {focusAreas.map((area, index) => (
              <Reveal key={area.title} className="about-row" delay={staggerDelay(index)} variant="row">
                <h3>{area.title}</h3>
                <p>{area.description}</p>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="container-shell about-grid">
          <Reveal className="about-section-title">
            <h2>工作方式</h2>
          </Reveal>
          <div className="about-rows">
            {workingPrinciples.map((item, index) => (
              <Reveal key={item.title} className="about-row" delay={staggerDelay(index)} variant="row">
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </Reveal>
            ))}
          </div>
        </div>

        <section className="container-shell about-note">
          <Reveal>
            <h2>当前重点</h2>
            <p>
              正在持续完善 ClipTalk（原 VideoPilot）的对话式剪辑能力与开源文档，并整理 PageIndex RAG 与多模态检索服务的工程复盘。
            </p>
            <Link className="text-link" href="#resume">
              查看简历
              <ArrowRight size={18} />
            </Link>
          </Reveal>
        </section>
      </section>

      <section id="projects" className="home-projects">
        <div className="container-shell">
          <Reveal className="home-section-heading">
            <h2>项目案例</h2>
            <Link className="text-link" href="#contact">
              联系我 <ArrowRight size={15} />
            </Link>
          </Reveal>
          <p className="home-project-intro">
            这一页直接放下完整案例。先看精选项目，再往下可以继续看每个项目的详细拆解、结果与技术决策。
          </p>
          <div className="home-project-list">
            {featuredProjects.map((project, index) => (
              <Reveal key={project.slug} delay={staggerDelay(index)} variant={index === 0 ? "media" : "row"}>
                <ProjectPreview
                  project={project}
                  href={`#project-${project.slug}`}
                  variant={index === 0 ? "wide" : "poster"}
                  showMetrics
                />
              </Reveal>
            ))}
          </div>
        </div>

        <div className="home-project-cases">
          {projects.map((project, index) => (
            <ProjectCaseStudy key={project.slug} project={project} priority={index === 0} />
          ))}
        </div>
      </section>

      <section id="resume" className="home-resume">
        <div className="container-shell resume-header">
          <div>
            <h2>{siteConfig.name}</h2>
            <p>{siteConfig.role}</p>
            <div className="resume-contact">
              <a href={`mailto:${siteConfig.contactEmail}`}>
                <EnvelopeSimple size={14} /> {siteConfig.contactEmail}
              </a>
              <a href={`tel:${siteConfig.phone}`}>
                <Phone size={14} /> {siteConfig.phone}
              </a>
            </div>
          </div>
          <div className="resume-actions print-hidden">
            {siteConfig.resumePdf ? (
              <a className="button button-primary" href={siteConfig.resumePdf} download>
                下载 PDF
                <ArrowDown size={17} />
              </a>
            ) : null}
            <PrintButton />
          </div>
        </div>

        <div className="container-shell resume-body">
          <section className="resume-section resume-summary">
            <h2>简介</h2>
            <p>{siteConfig.description}求职方向为 AI Agent 应用开发与智能检索系统工程。</p>
          </section>

          <section className="resume-section">
            <h2>实习经历</h2>
            <div className="resume-projects">
              {internships.map((internship) => (
                <article key={internship.company}>
                  <div className="resume-project-heading">
                    <div>
                      <h4>{internship.company}</h4>
                      <p>{internship.role}</p>
                    </div>
                    <span>{internship.period}</span>
                  </div>
                  <div className="resume-internship-projects">
                    {internship.projects.map((project) => (
                      <div key={project.title} className="resume-internship-project">
                        <h4>{project.title}</h4>
                        <p>{project.body}</p>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="resume-section">
            <h2>教育经历</h2>
            <div className="resume-education">
              {education.map((item) => (
                <article key={item.school} className="resume-project-heading">
                  <div>
                    <h4>{item.school}</h4>
                    <p>{item.degree}</p>
                  </div>
                  <span>{item.period}</span>
                </article>
              ))}
            </div>
          </section>

          <section className="resume-section">
            <h2>项目实践</h2>
            <div className="resume-projects">
              {resumeProjects.map((project) => (
                <article key={project.slug}>
                  <div className="resume-project-heading">
                    <div>
                      <h4>{project.title}</h4>
                    </div>
                    <span>{project.period}</span>
                  </div>
                  <p>{project.summary}</p>
                  <ul className="resume-achievements">
                    {project.achievements.map((achievement) => (
                      <li key={achievement}>{achievement}</li>
                    ))}
                  </ul>
                  <div className="resume-tech">{project.technologies.join(" / ")}</div>
                </article>
              ))}
            </div>
          </section>

          <section className="resume-section">
            <h2>技术能力</h2>
            <div className="resume-skills">
              {skillGroups.map((group) => (
                <div key={group.title}>
                  <h4>{group.title}</h4>
                  <p>{group.items}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="resume-section">
            <h2>奖项与荣誉</h2>
            <ul className="resume-awards">
              {awards.map((award) => (
                <li key={award}>{award}</li>
              ))}
            </ul>
          </section>
        </div>
      </section>

      <section id="contact" className="home-contact">
        <div className="container-shell contact-grid">
          <div>
            <h2>联系</h2>
            <p>
              如果你在找能把 AI 模型、检索系统和产品交互串起来的人，可以直接联系我。
            </p>
          </div>
          <div className="contact-links">
            <a href={`mailto:${siteConfig.contactEmail}`}>
              <EnvelopeSimple size={16} /> {siteConfig.contactEmail}
            </a>
            <a href={`tel:${siteConfig.phone}`}>
              <Phone size={16} /> {siteConfig.phone}
            </a>
            {siteConfig.githubUrl ? (
              <a href={siteConfig.githubUrl} target="_blank" rel="noreferrer">
                GitHub <ArrowRight size={16} />
              </a>
            ) : null}
          </div>
        </div>
      </section>
    </div>
  );
}

import Link from "next/link";
import { ArrowDown, ArrowRight, EnvelopeSimple, GithubLogo } from "@phosphor-icons/react/dist/ssr";
import { HeroSystemField } from "@/components/hero-system-field";
import { ProjectPreview } from "@/components/project-preview";
import { HeroAtmosphere } from "@/components/reactbits-effects";
import { HeroReveal, Reveal } from "@/components/reveal";
import { PrintButton } from "@/components/print-button";
import { staggerDelay } from "@/lib/motion";
import { projects } from "@/lib/projects";
import { awards, education, internships, resumeProjects, siteConfig, skillGroups, workingPrinciples } from "@/lib/site";

const spotlightProjects = projects.slice(0, 3);
const supportingProjects = projects.slice(3);
const githubDisplay = siteConfig.githubUrl?.replace(/^https?:\/\//, "") ?? "github.com/zhangchuangxin71-cyber";

export default function HomePage() {
  return (
    <div className="home-page">
      <section className="home-hero" id="top">
        <HeroAtmosphere />
        <div className="container-shell home-hero-grid">
          <div className="home-hero-copy">
            <HeroReveal delay={0.02}>
              <p className="home-role">{siteConfig.role}</p>
            </HeroReveal>
            <HeroReveal delay={0.08}>
              <h1 className="home-hero-name">{siteConfig.name}</h1>
            </HeroReveal>
            <HeroReveal delay={0.14}>
              <p className="home-hero-title">{siteConfig.role}</p>
            </HeroReveal>
            <HeroReveal delay={0.2}>
              <p className="home-hero-description">
                我做的是能上线、能验证、能持续交付的 AI 产品，而不是只能演示的{" "}
                <span className="home-hero-accent">Demo。</span>
                专注 Agent 原生应用、多模态视频理解与结构化文档检索，把模型能力真正接入产品流程，
                打通从调用、证据、状态到恢复与交付的完整闭环。
              </p>
            </HeroReveal>
            <HeroReveal className="home-hero-actions" delay={0.27}>
              <a className="button button-primary" href="#projects">
                查看精选项目
                <ArrowRight size={17} />
              </a>
              <a className="button button-secondary" href="#resume">
                下载简历
                <ArrowDown size={17} />
              </a>
            </HeroReveal>
            <HeroReveal className="home-hero-contact" delay={0.33}>
              <div className="home-hero-contact-label-row">
                <span className="home-hero-contact-caption">联系信息</span>
              </div>
              <div className="home-hero-contact-links">
                <a className="home-hero-contact-link" href={`mailto:${siteConfig.contactEmail}`}>
                  <EnvelopeSimple size={14} />
                  <span className="home-hero-contact-copy">
                    <span className="home-hero-contact-label">邮箱</span>
                    <span className="home-hero-contact-value">{siteConfig.contactEmail}</span>
                  </span>
                </a>
                {siteConfig.githubUrl ? (
                  <a className="home-hero-contact-link" href={siteConfig.githubUrl} target="_blank" rel="noreferrer">
                    <GithubLogo size={14} />
                    <span className="home-hero-contact-copy">
                      <span className="home-hero-contact-label">GitHub</span>
                      <span className="home-hero-contact-value">{githubDisplay}</span>
                    </span>
                  </a>
                ) : null}
              </div>
            </HeroReveal>
          </div>

          <Reveal className="home-system-visual" variant="media">
            <HeroSystemField />
          </Reveal>
        </div>
      </section>

      <section className="home-proof">
        <div className="container-shell home-proof-grid">
          <Reveal className="home-section-heading">
            <h2>核心证据</h2>
          </Reveal>
          <div className="proof-metrics">
            <div>
              <strong>42.0% → 84.9%</strong>
              <span>PageIndex RAG 准确率</span>
            </div>
            <div>
              <strong>14% → 38%</strong>
              <span>视频检索 Top-1</span>
            </div>
            <div>
              <strong>119</strong>
              <span>人工标注评测集</span>
            </div>
            <div>
              <strong>3</strong>
              <span>旗舰项目</span>
            </div>
          </div>
        </div>
      </section>

      <section id="experience" className="home-experience">
        <div className="container-shell experience-grid">
          <Reveal className="home-section-heading">
            <h2>实习经历</h2>
          </Reveal>
          {internships.map((internship) => (
            <Reveal key={internship.company} className="experience-card">
              <div className="experience-heading">
                <div>
                  <h3>{internship.company}</h3>
                  <p>{internship.role}</p>
                </div>
                <span>{internship.period}</span>
              </div>
              <div className="experience-projects">
                {internship.projects.map((project) => (
                  <article key={project.title}>
                    <h4>{project.title}</h4>
                    <p>{project.body}</p>
                  </article>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="projects" className="home-projects">
        <div className="container-shell">
          <Reveal className="home-section-heading">
            <h2>精选项目</h2>
            <Link className="text-link" href="#contact">
              联系我 <ArrowRight size={15} />
            </Link>
          </Reveal>
          <div className="home-project-list">
            {spotlightProjects.map((project, index) => (
              <Reveal key={project.slug} delay={staggerDelay(index)} variant={index === 0 ? "media" : "row"}>
                <ProjectPreview
                  project={project}
                  variant={index === 0 ? "lead" : "poster"}
                  showMetrics
                />
              </Reveal>
            ))}
          </div>
          {supportingProjects.length ? (
            <div className="home-other-work">
              <Reveal className="home-other-work-heading">
                <h3>其他项目</h3>
              </Reveal>
              <div className="home-other-work-grid">
                {supportingProjects.map((project, index) => (
                  <Reveal key={project.slug} delay={staggerDelay(index)} variant="row">
                    <Link className="home-other-work-item" href={`/projects/${project.slug}`}>
                      <span className="home-other-work-index">0{index + 4}</span>
                      <strong>{project.title}</strong>
                      <p>{project.subtitle}</p>
                      <small>{project.technologies.slice(0, 4).join(" / ")}</small>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <section id="about" className="home-about">
        <div className="container-shell about-grid">
          <Reveal className="about-section-title">
            <h2>工作原则</h2>
          </Reveal>
          <div className="about-rows about-principles">
            {workingPrinciples.map((item, index) => (
              <Reveal key={item.title} className="about-row" delay={staggerDelay(index)} variant="row">
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </Reveal>
            ))}
          </div>
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
              {siteConfig.githubUrl ? (
                <a href={siteConfig.githubUrl} target="_blank" rel="noreferrer">
                  <GithubLogo size={14} /> {githubDisplay}
                </a>
              ) : null}
            </div>
          </div>
          <div className="resume-actions print-hidden">
            {siteConfig.resumePdf ? (
              <a className="button button-primary" href={siteConfig.resumePdf} download>
                打开简历 PDF
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
            <p>GitHub / 邮箱 / PDF</p>
          </div>
          <div className="contact-links">
            {siteConfig.githubUrl ? (
              <a href={siteConfig.githubUrl} target="_blank" rel="noreferrer">
                <span className="contact-link-copy">
                  <span className="contact-link-title">GitHub</span>
                  <span className="contact-link-meta">{githubDisplay}</span>
                </span>
                <ArrowRight size={16} />
              </a>
            ) : null}
            <a href={`mailto:${siteConfig.contactEmail}`}>
              <span className="contact-link-copy">
                <span className="contact-link-title">邮箱</span>
                <span className="contact-link-meta">{siteConfig.contactEmail}</span>
              </span>
              <EnvelopeSimple size={16} />
            </a>
            {siteConfig.resumePdf ? (
              <a href={siteConfig.resumePdf} download>
                <span className="contact-link-copy">
                  <span className="contact-link-title">简历 PDF</span>
                  <span className="contact-link-meta">PDF</span>
                </span>
                <ArrowDown size={16} />
              </a>
            ) : null}
          </div>
        </div>
      </section>
    </div>
  );
}

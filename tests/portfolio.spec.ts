import { expect, test } from "@playwright/test";

test("homepage presents a poster-led hero and selected case studies", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("可交付的产品");
  await expect(page.getByRole("list", { name: "工作方向" })).toBeVisible();
  await expect(page.getByText("结构化文档检索", { exact: true }).first()).toBeVisible();
  await expect(page.locator(".home-hero a[href^='/projects/']")).toHaveCount(0);
  await expect(page.locator(".home-project-list .project-preview")).toHaveCount(2);
  await expect(page.getByRole("heading", { name: "PageIndex RAG" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "多模态向量检索" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "关于我" })).toBeVisible();
  await expect(page.locator(".bounce-cards-container, .bounce-card")).toHaveCount(0);
  await expect(page.locator('a[download][href="/resume.pdf"]')).toHaveCount(0);
  await expect(page.locator(".home-hero-actions .button")).toHaveCount(1);
});

test("typography keeps primary content comfortably readable", async ({ page }, testInfo) => {
  await page.goto("/");
  const heroSize = await page.getByRole("heading", { level: 1 }).evaluate((el) => Number.parseFloat(getComputedStyle(el).fontSize));
  const descriptionSize = await page.locator(".home-hero-description").evaluate((el) => Number.parseFloat(getComputedStyle(el).fontSize));
  expect(heroSize).toBeGreaterThanOrEqual(testInfo.project.name === "mobile" ? 45 : 58);
  expect(descriptionSize).toBeGreaterThanOrEqual(15);
  await page.locator("#selected-projects").scrollIntoViewIfNeeded();
  const bodySize = await page.locator(".project-preview-subtitle").first().evaluate((el) => Number.parseFloat(getComputedStyle(el).fontSize));
  expect(bodySize).toBeGreaterThanOrEqual(14);
});

test("homepage selected project opens its case study", async ({ page }) => {
  await page.goto("/");
  await page.locator(".home-project-list .project-preview-link").first().click();
  await expect(page).toHaveURL(/\/projects\/pageindex-rag$/);
  await expect(page.getByRole("heading", { level: 1, name: "PageIndex RAG" })).toBeVisible();
});

test("projects index exposes all five cases in an asymmetric grid", async ({ page }) => {
  await page.goto("/projects");
  await expect(page.locator(".project-index-grid .project-preview")).toHaveCount(5);
  await expect(page.getByRole("heading", { name: "ClipTalk" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "多模态向量检索" })).toBeVisible();
});

test("resume uses the provided education and project source", async ({ page }) => {
  await page.goto("/resume");
  await expect(page.getByRole("heading", { name: "西安理工大学" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "文案驱动的 AI 短视频自动化生成平台" })).toBeVisible();
  await expect(page.getByText("98.9%", { exact: false }).first()).toBeVisible();
  await expect(page.getByRole("link", { name: /下载 PDF/ })).toHaveAttribute("href", "/resume.pdf");
});

test("about page uses the industrial system grid without repeating education", async ({ page }) => {
  await page.goto("/about");
  await expect(page.getByRole("img", { name: "响应局部输入的模块化系统网格" })).toBeVisible();
  await expect(page.locator(".cubes-scene .cube")).toHaveCount(49);
  await expect(page.getByRole("heading", { name: "当前方向" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "工作方式" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "教育经历" })).toHaveCount(0);
});

test("project navigation and case content work", async ({ page }) => {
  await page.goto("/projects/videopilot");
  await expect(page.getByRole("heading", { level: 1, name: "ClipTalk" })).toBeVisible();
  await page.getByText("用命令模式管理时间线状态", { exact: true }).click();
  await expect(page.getByText("每次时间线操作封装为可执行", { exact: false })).toBeVisible();
});

test("project detail separates deliverable and technologies", async ({ page }) => {
  await page.goto("/projects/pageindex-rag");
  await expect(page.getByText("交付形态", { exact: true })).toBeVisible();
  await expect(page.getByText("知识库问答服务 / API", { exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "交付与影响" })).toBeVisible();
});

test("theme toggle applies the paper light theme", async ({ page }) => {
  await page.goto("/");
  const toggle = page.getByRole("button", { name: "切换到浅色主题" });
  await toggle.click();
  await expect(page.locator("html")).toHaveClass(/light/);
  const pageColor = await page.locator("body").evaluate((el) => getComputedStyle(el).backgroundColor);
  expect(pageColor).toBe("rgb(228, 226, 218)");
  await expect(page.getByRole("button", { name: "切换到深色主题" }).locator("svg")).toBeVisible();
});

test("mobile navigation opens and routes", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "mobile-only interaction");
  await page.goto("/");
  await page.getByRole("button", { name: "打开菜单" }).click();
  await page.getByRole("navigation", { name: "移动端导航" }).getByRole("link", { name: "关于" }).click();
  await expect(page).toHaveURL(/\/about$/);
});

test("unknown project returns the not found page", async ({ page }) => {
  await page.goto("/projects/not-a-project");
  await page.reload();
  await expect(page.getByRole("heading", { name: "没有找到这个页面" })).toBeVisible();
});

test("layout has no horizontal page overflow", async ({ page }) => {
  for (const route of ["/", "/projects", "/projects/videopilot", "/about", "/resume"]) {
    await page.goto(route);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(1);
  }
});

test("reduced motion keeps homepage content visible", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.evaluate(() => document.querySelector("#selected-projects")?.scrollIntoView());
  await expect(page.getByRole("heading", { name: "精选项目" })).toBeVisible();
  await expect(page.locator(".project-preview").first()).toBeVisible();
});

test("reduced motion keeps the about system grid static", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/about");
  const firstCube = page.locator(".cubes-scene .cube").first();
  await expect(firstCube).toBeVisible();
  await expect.poll(() => firstCube.evaluate((el) => getComputedStyle(el).transform)).toBe("none");
});

test("header enters its scrolled state without losing identity", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => window.scrollTo(0, 180));
  await expect(page.locator(".site-header")).toHaveClass(/is-scrolled/);
  await expect(page.getByRole("link", { name: "张创新首页" })).toBeVisible();
});

test("project table of contents follows a clicked section", async ({ page }) => {
  await page.goto("/projects/videopilot");
  const architectureLink = page.getByRole("link", { name: "系统架构" });
  await architectureLink.click();
  await expect(architectureLink).toHaveAttribute("aria-current", "location");
  await expect(page).toHaveURL(/#architecture$/);
});

test("technical decisions support keyboard and multiple expanded items", async ({ page }) => {
  await page.goto("/projects/videopilot");
  const first = page.getByRole("button", { name: /用命令模式管理时间线状态/ });
  const second = page.getByRole("button", { name: /AI 结果先进入独立草稿/ });
  await first.focus();
  await page.keyboard.press("Enter");
  await second.click();
  await expect(first).toHaveAttribute("aria-expanded", "true");
  await expect(second).toHaveAttribute("aria-expanded", "true");
});

test("mobile project previews stack vertically", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "mobile-only responsive layout");
  await page.goto("/projects");
  const [firstBox, secondBox] = await Promise.all([
    page.locator(".project-index-item-1").boundingBox(),
    page.locator(".project-index-item-2").boundingBox(),
  ]);
  expect(firstBox).not.toBeNull();
  expect(secondBox).not.toBeNull();
  expect(secondBox!.y).toBeGreaterThan(firstBox!.y + firstBox!.height);
});

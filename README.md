# 张创新 · AI 工程作品集

面向 AI Agent 应用开发与 AI 产品工程岗位的项目型个人作品集。网站已改为单页结构，以案例研究而不是技术标签堆叠来呈现项目，包含问题背景、约束、架构、关键决策、量化结果与反思。

视觉采用深蓝黑技术界面与单一青绿色强调，首屏产品面板、验证成果条和项目卡片均以真实 HTML/CSS 实现；设计过程参考稿保存在 `design-references`。

## 页面

- `/`：单页主页，包含个人定位、项目案例、简历和联系信息
- `/about`、`/projects`、`/projects/[slug]`、`/resume`：保留兼容入口，自动跳转到主页锚点

网页项目数据以根目录的 `信息.md` 为来源；PDF 中的旧项目经历没有写入网页。

## 部署到 Vercel

这个项目可以直接部署到 Vercel，不需要额外改框架配置。

1. 把整个仓库推到 GitHub。
2. 打开 [Vercel](https://vercel.com)，用 GitHub 登录。
3. 选择 `Add New Project`，导入这个仓库。
4. 保持默认设置，直接 Deploy。
5. 如需固定 Node 版本，使用项目里的 `.nvmrc`，当前是 `22`。

部署后，`public/resume.pdf` 会作为 `/resume.pdf` 直接提供下载，页面里的“下载 PDF”按钮会自动指向最新简历。

## 本地运行

需要 Node.js 22 与 pnpm 9。

```bash
corepack enable
pnpm install
pnpm dev
```

打开 `http://localhost:3000`。

## 配置

复制 `.env.example` 为 `.env.local`，可设置正式域名、GitHub 地址、联系邮箱和 PDF 路径。项目内容位于 `content/projects`，由 Content Collections 校验并编译为 MDX。

## 验证

```bash
pnpm typecheck
pnpm lint
pnpm build
pnpm exec playwright test
```

浏览器测试覆盖桌面与移动端导航、主题切换、案例展开、简历数据、404 和横向溢出。

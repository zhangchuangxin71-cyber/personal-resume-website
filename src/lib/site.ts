const defaultSiteUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000";

export const siteConfig = {
  name: "张创新",
  initials: "ZCX",
  role: "AI Agent 应用开发工程师",
  description:
    "专注 Agent 原生应用、多模态视频理解与结构化文档检索，把模型能力做成可验证、可交付的产品。",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL?.trim() || defaultSiteUrl,
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "3382005503@qq.com",
  githubUrl: process.env.NEXT_PUBLIC_GITHUB_URL ?? "https://github.com/zhangchuangxin71-cyber",
  resumePdf: process.env.NEXT_PUBLIC_RESUME_PDF ?? "/resume.pdf",
  nav: [
    { href: "#experience", id: "experience", label: "Experience" },
    { href: "#projects", id: "projects", label: "Work" },
    { href: "#resume", id: "resume", label: "CV" },
    { href: "#contact", id: "contact", label: "Contact" },
  ],
} as const;

export const focusAreas = [
  {
    title: "Agent 系统",
    description: "构建具备规划、工具调用与记忆能力，并能被审核和回退的 Agent 系统。",
  },
  {
    title: "文档 RAG",
    description: "面向企业文档的高精度问答、结构索引、重排优化与引用溯源。",
  },
  {
    title: "多模态检索",
    description: "融合文本、图像与视频表征，构建统一向量检索与混合排序服务。",
  },
  {
    title: "AI 视频工程",
    description: "把理解、检索、配音、字幕与剪辑组织为可用、可控、可恢复的处理链路。",
  },
] as const;

export const education = [
  {
    school: "西安理工大学",
    degree: "电子信息 · 硕士在读",
    period: "2024.09 - 2027.06",
  },
  {
    school: "平顶山学院",
    degree: "电子信息工程 · 工学学士",
    period: "2020.09 - 2024.06",
  },
] as const;

export const internships = [
  {
    company: "人工智能与数字经济广东省实验室（深圳）｜光明实验室",
    role: "Agent 应用开发实习生",
    period: "2026.03 - 至今",
    projects: [
      {
        title: "企业文档 RAG 智能问答平台",
        body:
          "把多格式文档问答做成可追溯的服务，支持页码定位、多文档验证和原文回看。",
      },
      {
        title: "图文与视频多模态检索服务",
        body:
          "把图文和视频素材统一进一个检索服务，用分段抽帧、稀疏+稠密融合把视频 Top-1 从 14% 提升到 38%。",
      },
      {
        title: "AI 辅助视频生产与智能切片",
        body:
          "把文案成片和视频切片做成可预览、可回退的流水线，统一字幕、音频和画面时序。",
      },
    ],
  },
] as const;

export const resumeProjects = [
  {
    title: "ClipTalk｜对话式视频剪辑 AI Agent",
    period: "2026.07 - 2026.08",
    summary: "把长视频剪辑拆成可审核、可回退的 Agent 流程，支持自然语言驱动的高光定位、时间线编辑和成片导出。",
    achievements: [
      "构建镜头—事件—成片（Shot-Event-Reel）三级模型，用 Evidence Graph 把 VLM、语音、OCR 和声音事件串起来",
      "支持用自然语言查找高光、对白、人物、动作和场景",
      "独立实现 Web、FastAPI 与 FFmpeg 全链路，做出状态化多轨时间线和持久化任务系统",
    ],
    technologies: ["Python", "FastAPI", "FFmpeg", "VLM / LLM", "SenseVoice"],
    slug: "videopilot",
  },
  {
    title: "基于 PageIndex 的智能文档问答 RAG 系统",
    period: "2026.03 - 2026.04",
    summary: "基于 PageIndex、Docling 和 PostgreSQL 构建多格式文档问答系统，保留页码证据、层级结构和稳定入库能力。",
    achievements: [
      "在 119 条人工标注评测集上优化检索策略、Top-K、Prompt 和基座模型，准确率从 42.0% 提升到 84.9%",
      "50 页 PDF 解析与索引构建控制在 40 秒以内",
      "支持多文档路由、节点树导航和页级证据定位",
    ],
    technologies: ["PageIndex", "Docling", "PostgreSQL", "FastAPI", "ReAct"],
    slug: "pageindex-rag",
  },
  {
    title: "多模态向量检索与 Embedding 服务平台",
    period: "2026.05",
    summary: "把图文和视频素材统一成一个可检索、可排序的 Embedding 服务，支持分段抽帧、混合排序和异步任务管理。",
    achievements: [
      "视频 Top-1 从 14% 提升到 38%",
      "文搜视频 P95 延迟低于 200 ms",
      "把 FAISS 迁移到 Milvus，支持万级素材批量入库",
    ],
    technologies: ["Chinese-CLIP", "BGE", "BM25", "Milvus", "FastAPI"],
    slug: "multimodal-retrieval",
  },
  {
    title: "文案驱动的 AI 短视频自动化生成平台",
    period: "2026.06 - 2026.07",
    summary: "把文案、音频、字幕和画面锁在同一条时间轴上，解决错位、漏字和语义切分问题。",
    achievements: [
      "通过原文内联标记式 Prompt、文本保真校验和规则降级，解决字幕错位和文本遗漏",
      "支持横屏与竖屏两种成片规格",
      "沉淀可预览、可回退的工作区流水线",
    ],
    technologies: ["LLM", "Minimax T2A", "ASS", "FastAPI", "jieba"],
    slug: "ai-video-generator",
  },
  {
    title: "在线视频切片与智能分镜工具",
    period: "2026.07",
    summary: "把手动打点和自动分镜接到同一条时间线里，支持画面检测、抗闪切镜和语义分镜。",
    achievements: [
      "支持画面检测、抗闪切镜、语义分镜和 Range 预览",
      "实现并行处理和资源回收",
      "完成切割、预览和云端导出闭环",
    ],
    technologies: ["FastAPI", "豆包视觉模型", "OSS", "Web Timeline"],
    slug: "smart-storyboard",
  },
] as const;

export const skillGroups = [
  {
    title: "Agent 与检索",
    items: "LangChain / LangGraph / ReAct / RAG / PageIndex / BGE / Chroma / FAISS / Milvus",
  },
  {
    title: "工程与模型",
    items: "Python / PyTorch / FastAPI / PostgreSQL / FFmpeg / 多模态模型 / 向量检索",
  },
  {
    title: "AI 辅助研发",
    items: "Codex CLI / Claude Code / 代码审查 / 提示词工程 / 协作调试",
  },
] as const;

export const awards = [
  "西安理工大学 2025 年人工智能竞赛选拔赛一等奖",
  "中国研究生电子设计竞赛西北赛区二等奖",
  "全国大学生数学建模竞赛省级一等奖",
  "全国大学生数学竞赛省级二等奖",
  "大唐杯全国大学生新一代信息通信技术大赛全国三等奖",
  "河南省第八届物联网设计大赛省级特等奖",
  "2024、2025 年研究生国家学业奖学金",
] as const;

export const workingPrinciples = [
  {
    title: "Control",
    body: "先划清模型、代码和用户各自负责的边界，再让 Agent 进入流程。",
  },
  {
    title: "Evidence",
    body: "保留证据、来源和中间状态，不把推测包装成结论。",
  },
  {
    title: "Delivery",
    body: "原型之外补齐协议、测试、性能和恢复，让能力能持续交付。",
  },
] as const;

import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import remarkGfm from "remark-gfm";
import { z } from "zod";

const projects = defineCollection({
  name: "projects",
  directory: "content/projects",
  include: "**/*.mdx",
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    role: z.string(),
    deliverable: z.string(),
    period: z.string().optional(),
    status: z.enum(["ongoing", "completed", "research"]),
    featured: z.boolean().default(false),
    order: z.number(),
    summary: z.string(),
    problem: z.string(),
    constraints: z.array(z.string()),
    approach: z.string(),
    flow: z.array(z.string()),
    decisions: z.array(
      z.object({
        title: z.string(),
        context: z.string(),
        choice: z.string(),
        reasoning: z.string(),
        alternatives: z.array(z.string()).optional(),
      }),
    ),
    metrics: z
      .array(
        z.object({
          value: z.string(),
          label: z.string(),
          verified: z.boolean(),
        }),
      )
      .optional(),
    technologies: z.array(z.string()),
    cover: z.string(),
    coverAlt: z.string(),
    demoVideo: z.string().optional(),
    openSource: z
      .object({
        owner: z.string(),
        license: z.string(),
      })
      .optional(),
    links: z
      .object({
        demo: z.string().url().optional(),
        source: z.string().url().optional(),
        paper: z.string().url().optional(),
        documentation: z.string().url().optional(),
      })
      .optional(),
    content: z.string(),
  }),
  transform: async (document, context) => ({
    ...document,
    slug: document._meta.path.replace(/\.mdx$/, ""),
    mdx: await compileMDX(context, document, { remarkPlugins: [remarkGfm] }),
  }),
});

export default defineConfig({ collections: [projects] });

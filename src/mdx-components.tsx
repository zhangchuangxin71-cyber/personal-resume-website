import type { MDXComponents } from "mdx/types";

export const mdxComponents: MDXComponents = {
  h2: ({ children }) => <h2 className="mdx-h2">{children}</h2>,
  h3: ({ children }) => <h3 className="mdx-h3">{children}</h3>,
  p: ({ children }) => <p className="mdx-p">{children}</p>,
  ul: ({ children }) => <ul className="mdx-list">{children}</ul>,
  li: ({ children }) => <li>{children}</li>,
  strong: ({ children }) => <strong className="mdx-strong">{children}</strong>,
};

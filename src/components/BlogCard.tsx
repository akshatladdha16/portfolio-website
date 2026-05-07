import { ArrowUpRight } from "lucide-react";

import type { Blog } from "@/types";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

interface BlogCardProps {
  blog: Blog;
}

export function BlogCard({ blog }: BlogCardProps) {
  const dateLabel = formatDate(blog.publishedDate);

  return (
    <a
      href={blog.mediumUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full flex-col gap-4 rounded-xl border border-[var(--hairline)] bg-[var(--surface-card)] p-5 transition-all duration-150 hover:-translate-y-0.5 hover:border-[var(--hairline-strong)]"
    >
      <h3 className="text-lg font-medium text-[var(--ink)]">{blog.title}</h3>
      <p className="line-clamp-3 text-sm text-[var(--body)]">{blog.excerpt}</p>

      <div className="flex flex-wrap gap-2">
        {blog.tags.map((tag) => (
          <Badge
            key={tag}
            variant="outline"
            className="rounded-full px-3 py-1 font-mono text-xs"
          >
            {tag}
          </Badge>
        ))}
      </div>

      <div className="mt-auto flex items-center justify-between text-sm text-[var(--charcoal)]">
        <span className="font-mono">{dateLabel}</span>
        <span className="inline-flex items-center gap-1">
          Read on Medium <ArrowUpRight className="size-4" />
        </span>
      </div>
    </a>
  );
}

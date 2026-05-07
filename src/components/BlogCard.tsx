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
      className="group flex h-full flex-col gap-4 rounded-2xl border border-[var(--hairline)] bg-[var(--surface-soft)] p-5 transition-all duration-200 hover:border-[var(--brand-border)]"
    >
      <h3 className="text-2xl leading-[1.33] tracking-[-0.16px] text-[var(--ink)]">{blog.title}</h3>
      <p className="line-clamp-4 min-h-20 text-sm text-[var(--body)]">{blog.excerpt}</p>

      <div className="mt-auto flex flex-wrap gap-2">
        {blog.tags.map((tag) => (
          <Badge key={tag} variant="outline" className="font-mono">
            {tag}
          </Badge>
        ))}
      </div>

      <div className="flex items-center justify-between text-sm text-[var(--charcoal)]">
        <span className="font-mono text-[11px] tracking-[1.2px] uppercase">{dateLabel}</span>
        <span className="inline-flex items-center gap-1 text-[var(--brand-link)]">
          Read on Medium <ArrowUpRight className="size-4" />
        </span>
      </div>
    </a>
  );
}

"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

import { BlogCard } from "@/components/BlogCard";
import { siteConfig } from "@/config/site";

export function Blogs() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const shouldReduceMotion = useReducedMotion();

  if (siteConfig.blogs.length === 0) {
    return (
      <section
        id="blogs"
        className="scroll-mt-24 border-t border-[var(--hairline-subtle)] px-4 py-12 min-[600px]:px-6 min-[600px]:py-16 lg:px-8 lg:py-[96px]"
      >
        <div className="mx-auto w-full max-w-6xl">
          <p className="font-mono text-[11px] tracking-[1.2px] text-[var(--body)] uppercase">Writing</p>
          <h2 className="mt-3 text-4xl leading-[1.1] tracking-tight text-[var(--ink)]">Blogs</h2>
          <p className="mt-4 text-[var(--body)]">Blog posts will appear here soon.</p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="blogs"
      ref={ref}
      className="scroll-mt-24 border-t border-[var(--hairline-subtle)] px-4 py-12 min-[600px]:px-6 min-[600px]:py-16 lg:px-8 lg:py-[96px]"
    >
      <div className="mx-auto w-full max-w-6xl">
        <p className="font-mono text-[11px] tracking-[1.2px] text-[var(--body)] uppercase">Blogs</p>
        <motion.h2
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
          animate={
            shouldReduceMotion
              ? undefined
              : { opacity: inView ? 1 : 0, y: inView ? 0 : 20 }
          }
          transition={{ duration: 0.4 }}
          className="mt-3 text-4xl leading-[1.1] tracking-tight text-[var(--ink)]"
        >
          I love to write and share my learnings, have a look at it maybe?
        </motion.h2>

        <div className="mt-8 grid grid-cols-1 gap-4 min-[600px]:grid-cols-2 lg:grid-cols-3">
          {siteConfig.blogs.map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
              animate={
                shouldReduceMotion
                  ? undefined
                  : { opacity: inView ? 1 : 0, y: inView ? 0 : 20 }
              }
              transition={{ duration: 0.3, delay: shouldReduceMotion ? 0 : index * 0.06 }}
            >
              <BlogCard blog={blog} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { BookOpenText, Link2, Mail, MessageCircle, UserRound } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { toMailto } from "@/lib/utils";

const socials = [
  { key: "github", label: "GitHub profile", icon: Link2 },
  { key: "linkedin", label: "LinkedIn profile", icon: UserRound },
  { key: "twitter", label: "Twitter profile", icon: MessageCircle },
  { key: "medium", label: "Medium profile", icon: BookOpenText },
  { key: "email", label: "Email", icon: Mail },
] as const;

const socialWordByKey: Partial<Record<(typeof socials)[number]["key"], string>> = {
  linkedin: "LinkedIn",
  twitter: "Twitter",
  medium: "Medium",
  email: "Mail",
};

export function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const [roleIndex, setRoleIndex] = useState(0);
  const roles = siteConfig.roles;

  useEffect(() => {
    if (shouldReduceMotion || roles.length <= 1) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setRoleIndex((current) => (current + 1) % roles.length);
    }, 2200);

    return () => window.clearInterval(intervalId);
  }, [roles.length, shouldReduceMotion]);

  const currentRole = useMemo(() => roles[roleIndex] ?? "", [roles, roleIndex]);

  const baseMotion = shouldReduceMotion
    ? {}
    : { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 } };

  return (
    <section
      id="home"
      className="scroll-mt-24 relative flex min-h-screen items-center justify-center px-4 pb-16 pt-28 min-[600px]:pb-20 min-[600px]:pt-32 lg:px-8"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(62,207,142,0.32),transparent)]" />
      <div className="mx-auto flex w-full max-w-6xl flex-col items-start text-left">
        <motion.p
          {...baseMotion}
          transition={{ duration: 0.45 }}
          className="font-mono text-[11px] tracking-[1.2px] text-[var(--body)] uppercase"
        >
          Developer Portfolio
        </motion.p>

        <motion.h1
          {...baseMotion}
          transition={{ duration: 0.45 }}
          className="mt-4 max-w-5xl text-[2.65rem] leading-[1] tracking-[-0.04em] text-[var(--ink)] min-[600px]:text-[4.5rem]"
        >
          {siteConfig.name}
        </motion.h1>

        <motion.div
          {...baseMotion}
          transition={{ duration: 0.45, delay: shouldReduceMotion ? 0 : 0.12 }}
          className="mt-5 min-h-7 text-base text-[var(--charcoal)] min-[600px]:text-lg"
        >
          {shouldReduceMotion ? (
            <span>{roles.join(" · ")}</span>
          ) : (
            <AnimatePresence mode="wait">
              <motion.span
                key={currentRole}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="inline-flex items-center gap-1 font-mono text-[0.78rem] tracking-[1.2px] uppercase"
              >
                {currentRole}
                <span className="animate-pulse">▌</span>
              </motion.span>
            </AnimatePresence>
          )}
        </motion.div>

        {siteConfig.tagline ? (
          <motion.p
            {...baseMotion}
            transition={{ duration: 0.45, delay: shouldReduceMotion ? 0 : 0.2 }}
            className="mt-5 max-w-2xl text-[var(--charcoal)]"
          >
            {siteConfig.tagline}
          </motion.p>
        ) : null}

        <motion.div
          {...baseMotion}
          transition={{ duration: 0.45, delay: shouldReduceMotion ? 0 : 0.28 }}
          className="mt-8 flex w-full flex-col items-start gap-4 min-[600px]:flex-row min-[600px]:items-center"
        >
          <div className="flex flex-wrap items-center gap-3">
            <Button asChild>
              <a href="#projects">Start your project</a>
            </Button>
            <Button asChild variant="outline">
              <a href="#contact">Contact me</a>
            </Button>
          </div>
          <div className="h-px w-full bg-[var(--hairline-subtle)] min-[600px]:ml-2 min-[600px]:max-w-40" />
          <div className="flex items-center gap-4">
            {socials.map(({ key, label, icon: Icon }) => {
              const value = siteConfig.socials[key];
              if (!value.trim()) {
                return null;
              }

              const href = key === "email" ? toMailto(value) : value;

              return (
                <a
                  key={key}
                  href={href}
                  target={key === "email" ? "_self" : "_blank"}
                  rel={key === "email" ? undefined : "noopener noreferrer"}
                  aria-label={label}
                  className="text-[var(--body)] transition-colors hover:text-[var(--brand-link)]"
                >
                  {socialWordByKey[key] ? (
                    <span className="text-sm">{socialWordByKey[key]}</span>
                  ) : (
                    <Icon className="size-5" />
                  )}
                </a>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          {...baseMotion}
          transition={{ duration: 0.45, delay: shouldReduceMotion ? 0 : 0.35 }}
          className="mt-14 grid w-full grid-cols-1 gap-4 min-[600px]:mt-20 min-[600px]:grid-cols-3"
        >
          <div className="rounded-2xl border border-[var(--hairline)] bg-[var(--surface-soft)] px-5 py-4">
            <p className="font-mono text-[11px] tracking-[1.2px] text-[var(--body)] uppercase">Focus</p>
            <p className="mt-2 text-[var(--ink)]">AI systems, full-stack engineering, developer tooling.</p>
          </div>
          <div className="rounded-2xl border border-[var(--hairline)] bg-[var(--surface-soft)] px-5 py-4">
            <p className="font-mono text-[11px] tracking-[1.2px] text-[var(--body)] uppercase">Approach</p>
            <p className="mt-2 text-[var(--ink)]">Ship practical products with strong UX and measurable outcomes.</p>
          </div>
          <div className="rounded-2xl border border-[var(--brand-border)] bg-[hsl(148_40%_17%_/_0.18)] px-5 py-4">
            <p className="font-mono text-[11px] tracking-[1.2px] text-[var(--brand)] uppercase">Open to work</p>
            <p className="mt-2 text-[var(--ink)]">Available for engineering roles and project collaborations.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

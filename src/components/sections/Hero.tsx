"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { BookOpenText, Link2, Mail, MessageCircle, UserRound } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { siteConfig } from "@/config/site";
import { toMailto } from "@/lib/utils";

const socials = [
  { key: "github", label: "GitHub profile", icon: Link2 },
  { key: "linkedin", label: "LinkedIn profile", icon: UserRound },
  { key: "twitter", label: "Twitter profile", icon: MessageCircle },
  { key: "medium", label: "Medium profile", icon: BookOpenText },
  { key: "email", label: "Email", icon: Mail },
] as const;

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
      className="scroll-mt-24 flex min-h-screen items-center justify-center px-4 pb-12 pt-24 sm:px-6 lg:px-8"
    >
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center text-center">
        <motion.h1
          {...baseMotion}
          transition={{ duration: 0.45 }}
          className="font-heading text-4xl font-semibold leading-[1.1] tracking-tight text-[var(--ink)] sm:text-5xl"
        >
          {siteConfig.name}
        </motion.h1>

        <motion.div
          {...baseMotion}
          transition={{ duration: 0.45, delay: shouldReduceMotion ? 0 : 0.12 }}
          className="mt-4 min-h-7 text-base text-[var(--charcoal)] sm:text-lg"
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
                className="inline-flex items-center gap-1 font-mono"
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
            className="mt-4 max-w-2xl text-[var(--body)]"
          >
            {siteConfig.tagline}
          </motion.p>
        ) : null}

        <motion.div
          {...baseMotion}
          transition={{ duration: 0.45, delay: shouldReduceMotion ? 0 : 0.28 }}
          className="mt-8 flex items-center gap-4"
        >
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
                className="text-[var(--body)] transition-colors hover:text-[var(--ink)]"
              >
                <Icon className="size-5" />
              </a>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

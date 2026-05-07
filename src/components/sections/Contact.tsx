"use client";

import { BookOpenText, Link2, Mail, MessageCircle, UserRound } from "lucide-react";
import { FormEvent, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { motion, useInView, useReducedMotion } from "framer-motion";

import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toMailto } from "@/lib/utils";

const socials = [
  { key: "github", label: "GitHub profile", icon: Link2 },
  { key: "linkedin", label: "LinkedIn profile", icon: UserRound },
  { key: "twitter", label: "Twitter profile", icon: MessageCircle },
  { key: "medium", label: "Medium profile", icon: BookOpenText },
  { key: "email", label: "Email", icon: Mail },
] as const;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const shouldReduceMotion = useReducedMotion();

  const canSubmit = useMemo(() => {
    return Boolean(name.trim() && email.trim() && message.trim());
  }, [email, message, name]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error("Please complete all required fields.");
      return;
    }

    if (!emailRegex.test(email.trim())) {
      toast.error("Please enter a valid email address.");
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      toast.success("Message sent!");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="scroll-mt-24 px-4 py-12 sm:px-6 md:py-16 lg:px-8 lg:py-[88px]"
    >
      <div className="mx-auto w-full max-w-6xl">
        <motion.h2
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
          animate={
            shouldReduceMotion
              ? undefined
              : { opacity: inView ? 1 : 0, y: inView ? 0 : 20 }
          }
          transition={{ duration: 0.4 }}
          className="font-heading text-3xl font-semibold text-[var(--ink)]"
        >
          Get in Touch
        </motion.h2>

        <div className="mt-8 grid grid-cols-1 gap-10 md:grid-cols-2">
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm text-[var(--charcoal)]">
                Name
              </label>
              <Input
                id="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
                className="rounded-full"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm text-[var(--charcoal)]">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                className="rounded-full"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm text-[var(--charcoal)]">
                Message
              </label>
              <Textarea
                id="message"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                required
                rows={5}
                className="rounded-2xl"
              />
            </div>

            <Button type="submit" className="rounded-full" disabled={isSubmitting || !canSubmit}>
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </form>

          <div className="space-y-4">
            <p className="text-[var(--body)]">
              I am always open to discussing engineering opportunities, collaboration ideas,
              and product problems worth solving.
            </p>
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
                    className="text-[var(--body)] transition-colors hover:text-[var(--ink)]"
                  >
                    <Icon className="size-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { BookOpenText, Link2, Mail, MessageCircle, UserRound } from "lucide-react";

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

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--hairline-subtle)] pb-10 pt-12 min-[600px]:pt-16">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-6 px-4 text-sm text-[var(--body)] min-[600px]:px-6 lg:px-8">
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
                  <Icon className="size-4" />
                )}
              </a>
            );
          })}
        </div>
        <p className="font-mono text-[11px] tracking-[1.2px] uppercase">© {year} {siteConfig.name}</p>
      </div>
    </footer>
  );
}

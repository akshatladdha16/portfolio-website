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

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--hairline)] pb-10 pt-16">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-6 px-4 text-sm text-[var(--body)] sm:px-6 lg:px-8">
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
                <Icon className="size-4" />
              </a>
            );
          })}
        </div>
        <p>© {year} {siteConfig.name}</p>
      </div>
    </footer>
  );
}

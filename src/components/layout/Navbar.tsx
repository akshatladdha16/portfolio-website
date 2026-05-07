"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";

import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Projects", href: "#projects" },
  { label: "Blogs", href: "#blogs" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 8);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const resumeUrl = siteConfig.resumeUrl.trim();

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-all duration-200",
        hasScrolled
          ? "border-[var(--hairline)] bg-[var(--canvas)]/90 backdrop-blur"
          : "border-transparent bg-transparent",
      )}
    >
      <nav className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="#home" className="text-sm font-medium tracking-tight">
          ARL
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-[var(--body)] transition-colors hover:text-[var(--ink)]"
            >
              {link.label}
            </a>
          ))}
          {resumeUrl ? (
            <Button asChild variant="outline" size="sm" className="rounded-full">
              <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
                Resume
              </a>
            </Button>
          ) : (
            <Button variant="outline" size="sm" className="rounded-full" disabled>
              Resume
            </Button>
          )}
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label="Open navigation menu"
            >
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[280px]">
            <SheetHeader>
              <SheetTitle>{siteConfig.name}</SheetTitle>
            </SheetHeader>
            <div className="mt-8 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-base"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              {resumeUrl ? (
                <Button asChild variant="outline" className="mt-2 w-fit rounded-full">
                  <a
                    href={resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpen(false)}
                  >
                    Resume
                  </a>
                </Button>
              ) : (
                <Button variant="outline" className="mt-2 w-fit rounded-full" disabled>
                  Resume
                </Button>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}

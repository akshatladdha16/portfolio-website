# Portfolio Website — Akshat Rai Laddha

## Overview

A minimal, single-page portfolio website with an Ollama-inspired design aesthetic (terminal-first, monochrome simplicity). Built with Next.js 15 (App Router), TypeScript, Tailwind CSS, shadcn/ui, and Framer Motion (restrained). Deployed on Vercel. Contact form powered by Resend.

**IMPORTANT**: A `DESIGN.md` file exists in the project root. It contains the Ollama-inspired design system tokens (colors, typography, spacing, components, motion). **Read and follow DESIGN.md for all visual decisions** — colors, fonts, spacing, border radius, hover states, and component styles. The instructions below define structure and behavior; DESIGN.md defines appearance. If DESIGN.md is not present, run `npx getdesign@latest add ollama` from the project root before starting.

---

## 1. Tech Stack

| Layer            | Technology                                  |
| ---------------- | ------------------------------------------- |
| Framework        | Next.js 15 (App Router)                     |
| Language         | TypeScript (strict mode)                    |
| Styling          | Tailwind CSS v4                             |
| Component lib    | shadcn/ui                                   |
| Icons            | Lucide React                                |
| Animation        | Framer Motion (minimal — fades, slides only)|
| Email            | Resend (free tier: 3,000 emails/month)      |
| Deployment       | Vercel                                      |
| Font             | Use whatever DESIGN.md specifies (likely a monospace + sans-serif pair) |

---

## 2. Project Structure

```
akshat-portfolio/
├── DESIGN.md                          # Ollama design system — READ FIRST
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
├── .env.local                         # RESEND_API_KEY, CONTACT_EMAIL
├── public/
│   ├── og-image.png                   # Open Graph image (1200x630)
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── layout.tsx                 # Root layout — fonts, metadata, analytics
│   │   ├── page.tsx                   # Single page — assembles all sections
│   │   ├── api/
│   │   │   └── contact/
│   │   │       └── route.ts           # POST handler → Resend
│   │   └── globals.css                # Tailwind directives + DESIGN.md tokens as CSS vars
│   ├── components/
│   │   ├── ui/                        # shadcn/ui primitives (Button, Dialog, Input, etc.)
│   │   ├── layout/
│   │   │   ├── Navbar.tsx             # Sticky nav with section links + resume CTA
│   │   │   └── Footer.tsx             # Social links row + copyright
│   │   ├── sections/
│   │   │   ├── Hero.tsx               # Name, roles, one-liner, social icons
│   │   │   ├── Projects.tsx           # Grid of ProjectCard components
│   │   │   ├── Blogs.tsx              # Grid of BlogCard components
│   │   │   ├── Achievements.tsx       # "Life in General" — flexes, on hold initially
│   │   │   └── Contact.tsx            # Contact form (name, email, message)
│   │   ├── ProjectCard.tsx            # Card → opens ProjectModal on click
│   │   ├── ProjectModal.tsx           # Full modal with YouTube embed + description
│   │   └── BlogCard.tsx              # Preview card with link to Medium
│   ├── config/
│   │   └── site.ts                    # ALL configurable content lives here
│   ├── lib/
│   │   ├── resend.ts                  # Resend client initialization
│   │   └── utils.ts                   # cn() helper, any shared utilities
│   └── types/
│       └── index.ts                   # Shared TypeScript interfaces
```

---

## 3. Configuration — `src/config/site.ts`

All content is managed from a single config file. The owner should never need to edit component files to update content.

```typescript
// src/config/site.ts

export const siteConfig = {
  name: "Akshat Rai Laddha",
  roles: [
    "Software Engineer",
    "AI Engineer",
    "Forward Deployed Engineer",
    "Solutions Engineer",
  ],
  tagline: "", // One-liner below name — owner fills in
  resumeUrl: "", // Google Drive link — owner fills in
  email: "", // Contact form recipient — also set in .env.local as CONTACT_EMAIL

  socials: {
    github: "",       // Owner fills in
    linkedin: "",     // Owner fills in
    twitter: "",      // Owner fills in
    medium: "https://medium.com/@laddhaakshatrai",
    email: "",        // mailto: link — owner fills in
  },

  projects: [
    {
      id: "project-1",
      title: "",
      shortDescription: "", // Shown on card (1-2 lines)
      fullDescription: "",  // Shown in modal (can be multi-paragraph)
      youtubeUrl: "",       // Full YouTube URL (e.g. https://www.youtube.com/watch?v=XXXX)
      tags: [],             // e.g. ["Python", "LLM", "RAG"]
      links: {
        github: "",         // Optional
        live: "",           // Optional
      },
    },
    // ... repeat for 6-8 projects
  ],

  blogs: [
    {
      id: "blog-1",
      title: "",
      excerpt: "",          // 2-3 sentence preview
      mediumUrl: "",        // Full Medium article URL
      tags: [],             // e.g. ["AI", "System Design"]
      publishedDate: "",    // ISO date string
    },
    // ... repeat for each blog
  ],

  // ON HOLD — uncomment when ready
  // achievements: [
  //   {
  //     id: "achievement-1",
  //     title: "",
  //     description: "",
  //     date: "",
  //   },
  // ],
};
```

---

## 4. Section Specifications

### 4.1 Navbar

- **Behavior**: Sticky at top. Transparent on hero, gains background on scroll (use `IntersectionObserver` or scroll listener).
- **Left**: Name or logo text ("ARL" monogram or full name — keep it small).
- **Center/Right**: Section links — Projects, Blogs, Contact. Smooth scroll on click using `scrollIntoView({ behavior: 'smooth' })`.
- **Far right**: "Resume" button (opens `siteConfig.resumeUrl` in new tab). Use a subtle outlined button style per DESIGN.md.
- **Mobile**: Hamburger menu using shadcn `Sheet` component. Same links + Resume.

### 4.2 Hero Section

- **Layout**: Full viewport height (`min-h-screen`). Vertically and horizontally centered content.
- **Content**:
  - Name: `Akshat Rai Laddha` — large display heading per DESIGN.md typography.
  - Roles: Show as a typing/cycling animation (one role at a time, cycles through the array). Use Framer Motion `AnimatePresence` for smooth text swap. Alternatively, show all roles separated by ` · ` as static text if the typing effect feels too busy — owner's call.
  - Tagline: One-liner below roles (optional, from config).
  - Social icons row: GitHub, LinkedIn, Twitter, Medium, Email. Use Lucide icons. Each opens in new tab. Monochrome, subtle hover highlight.
- **Animation**: Staggered fade-up on load (name → roles → tagline → socials). Keep total animation under 1.2s.

### 4.3 Projects Section

- **Section heading**: "Projects" — left-aligned, large.
- **Grid**: 3 columns on desktop (`grid-cols-3`), 2 on tablet (`md:grid-cols-2`), 1 on mobile (`grid-cols-1`).
- **ProjectCard** (each card):
  - Title
  - Short description (2 lines max, truncated with `line-clamp-2`)
  - Tags as small pills/badges
  - Entire card is clickable → opens `ProjectModal`
  - Hover: subtle scale or border highlight per DESIGN.md
- **ProjectModal** (overlay):
  - Trigger: Click on any ProjectCard.
  - Overlay: Covers the page with a blurred backdrop (`backdrop-blur-md` + semi-transparent black overlay). The modal itself covers **60-70% of the viewport** (width and height).
  - Implementation: Use **shadcn `Dialog`** component. Customize its content panel size:
    ```
    max-w-4xl w-[90vw] md:w-[70vw] max-h-[80vh]
    ```
  - **Close behavior**: ESC key closes. Click outside (on backdrop) closes. X button in top-right corner. Scroll lock on body when modal is open (shadcn Dialog handles this).
  - **Modal content** (scrollable inside modal):
    - **YouTube embed** at the top: Use an `<iframe>` with `youtube-nocookie.com` for privacy. Aspect ratio 16:9. **Manual play only** — do NOT set `autoplay=1`.
      ```html
      <iframe
        src="https://www.youtube-nocookie.com/embed/{VIDEO_ID}"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        class="w-full aspect-video rounded-lg"
      />
      ```
      Extract `VIDEO_ID` from the YouTube URL in config. Write a utility function:
      ```typescript
      function getYouTubeId(url: string): string | null {
        const match = url.match(/(?:v=|\/embed\/|\.be\/)([a-zA-Z0-9_-]{11})/);
        return match ? match[1] : null;
      }
      ```
    - **Project title** below the video.
    - **Full description** — rendered as paragraphs. Support basic markdown if desired (use `react-markdown` or just split by `\n\n`).
    - **Tags** row.
    - **Links** row: GitHub repo button, Live demo button (if available). Open in new tabs.
  - **Animation**: Modal fades in + scales up slightly from 95% to 100%. Backdrop fades in. Use Framer Motion or shadcn Dialog's built-in animation.

### 4.4 Blogs Section

- **Section heading**: "Blogs" — left-aligned, large.
- **Grid**: Same responsive grid as projects (3 / 2 / 1 columns).
- **BlogCard** (each card):
  - Title
  - Excerpt (2-3 lines, truncated)
  - Tags as pills
  - Published date (formatted: "Mar 15, 2025")
  - "Read on Medium →" link at the bottom
  - Entire card is clickable → opens the `mediumUrl` in a new tab (`target="_blank" rel="noopener noreferrer"`)
  - Hover: same subtle effect as ProjectCard
- **No modal needed** — blogs redirect to Medium directly.
- **No RSS fetching** — all blog data comes from `siteConfig.blogs` in the config file.

### 4.5 Achievements / Life in General (ON HOLD)

- **Keep the section component file created** (`Achievements.tsx`) but **do not render it** in `page.tsx` yet.
- Comment it out in the page with a `{/* <Achievements /> */}` and a TODO note.
- Structure: Simple list or card grid of achievement items (title, description, optional date).
- The owner will uncomment and populate when ready.

### 4.6 Contact Section

- **Section heading**: "Get in Touch" — left-aligned, large.
- **Layout**: Form on one side, brief text + social links on the other (on desktop). Single column on mobile.
- **Form fields** (use shadcn `Input` and `Textarea`):
  - Name (required)
  - Email (required, validate format client-side)
  - Message (required, `Textarea` with 4-5 rows)
  - Submit button: "Send Message"
- **Subject**: Hardcoded as `"Message from Website Visitor"` — not shown to the user.
- **Behavior**:
  - Client-side validation before submit.
  - POST to `/api/contact` with JSON body `{ name, email, message }`.
  - Show loading state on button during request.
  - On success: Show a success toast/message ("Message sent!"). Clear the form.
  - On error: Show an error toast ("Something went wrong. Please try again.").
  - Use shadcn `toast` (Sonner) for notifications.
- **Rate limiting**: Add basic protection in the API route — e.g., simple in-memory rate limit (5 requests per IP per minute). Not critical for MVP but good practice.

### 4.7 Footer

- **Content**:
  - Social icons row (same as hero — GitHub, LinkedIn, Twitter, Medium, Email)
  - "© {currentYear} Akshat Rai Laddha" — auto-generate year.
- **Style**: Minimal, small text, muted colors. Generous top padding to separate from Contact section.

---

## 5. API Route — `/api/contact/route.ts`

```typescript
// src/app/api/contact/route.ts

import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>", // Use verified domain later
      to: process.env.CONTACT_EMAIL!,
      subject: "Message from Website Visitor",
      replyTo: email,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      // Optionally create a React email template for nicer formatting
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
```

**Environment variables** (`.env.local`):
```
RESEND_API_KEY=re_xxxxxxxxxxxx
CONTACT_EMAIL=owner-email@example.com
```

> **Note on `from` address**: On Resend free tier without a verified domain, use `onboarding@resend.dev` as the `from` address. Once a custom domain is verified, switch to `hello@yourdomain.com`. The `replyTo` field ensures the owner can reply directly to the sender.

---

## 6. SEO & Metadata

Implement in `src/app/layout.tsx` using Next.js Metadata API:

```typescript
export const metadata: Metadata = {
  title: "Akshat Rai Laddha — Software Engineer",
  description: "Portfolio of Akshat Rai Laddha — Software Engineer, AI Engineer, Forward Deployed Engineer.",
  openGraph: {
    title: "Akshat Rai Laddha — Software Engineer",
    description: "Portfolio of Akshat Rai Laddha",
    url: "https://yourdomain.com", // Update after deployment
    siteName: "Akshat Rai Laddha",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Akshat Rai Laddha",
    description: "Software Engineer · AI Engineer",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
};
```

Also generate:
- `robots.txt` (via `src/app/robots.ts`)
- `sitemap.xml` (via `src/app/sitemap.ts`)

---

## 7. Animation Guidelines

Keep motion restrained. The Ollama aesthetic is quiet and functional.

| Element                 | Animation                              | Duration |
| ----------------------- | -------------------------------------- | -------- |
| Hero content            | Staggered fade-up on load              | 0.6-1.2s |
| Section headings        | Fade-up on scroll into view            | 0.4s     |
| Project/Blog cards      | Fade-up staggered on scroll into view  | 0.3s each|
| Project modal           | Fade in + scale from 0.95 → 1.0       | 0.2s     |
| Modal backdrop          | Fade in                                | 0.2s     |
| Hover effects on cards  | Subtle border/shadow shift             | 0.15s    |
| Navbar background       | Opacity transition on scroll           | 0.2s     |

Use `framer-motion`'s `useInView` hook for scroll-triggered animations. Wrap each section in a motion container with `initial={{ opacity: 0, y: 20 }}` and `whileInView={{ opacity: 1, y: 0 }}` with `viewport={{ once: true }}`.

**Do NOT use**: parallax, cursor effects, page transitions, bouncy springs, or any animation that draws attention to itself.

---

## 8. Responsive Breakpoints

Follow Tailwind defaults:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

**Key responsive rules**:
- Max content width: `max-w-6xl mx-auto` (or `max-w-7xl` — check DESIGN.md).
- Project/blog grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`.
- Hero: centered on all sizes. Reduce font size on mobile.
- Contact: two-column on `md+`, single column below.
- Navbar: full links on `md+`, hamburger on mobile.
- Modal: `w-[95vw] md:w-[70vw]` — fuller on mobile, 70% on desktop.

---

## 9. Accessibility Checklist

- [ ] All images have `alt` text.
- [ ] Interactive elements are keyboard-navigable (Tab, Enter, Escape).
- [ ] Modal traps focus when open; returns focus to trigger on close.
- [ ] Color contrast meets WCAG AA (especially important with monochrome palette).
- [ ] Form inputs have associated `<label>` elements (or `aria-label`).
- [ ] Skip-to-content link at the top of the page.
- [ ] YouTube iframes have `title` attribute ("Project demo video").
- [ ] Social links have `aria-label` (e.g., "GitHub profile").
- [ ] Reduced motion: respect `prefers-reduced-motion` media query — disable Framer Motion animations when set.

---

## 10. Performance Checklist

- [ ] Use `next/font` for font loading (no FOUT/FOIT).
- [ ] YouTube iframes: use `loading="lazy"` and only load inside the modal (not on initial page render). Since modals are only rendered on interaction, this is handled naturally.
- [ ] Use `next/image` for any images (project thumbnails, if added later).
- [ ] Minimize client-side JS: use `"use client"` only on components that need interactivity (modals, contact form, scroll animations). Keep section wrappers as server components where possible.
- [ ] shadcn/ui components are tree-shakeable — only import what you use.
- [ ] No analytics scripts (per owner's decision).

---

## 11. shadcn/ui Components to Install

Run these during setup:

```bash
npx shadcn@latest init
npx shadcn@latest add button
npx shadcn@latest add dialog
npx shadcn@latest add input
npx shadcn@latest add textarea
npx shadcn@latest add badge
npx shadcn@latest add sheet          # Mobile nav
npx shadcn@latest add sonner         # Toast notifications
npx shadcn@latest add separator      # Visual dividers (optional)
```

---

## 12. Implementation Task Sequence

Follow this order. Each task should be a commit.

### Phase 1 — Scaffolding

1. **Initialize project**
   ```bash
   npx create-next-app@latest akshat-portfolio --typescript --tailwind --eslint --app --src-dir
   ```
2. **Install dependencies**
   ```bash
   npm install framer-motion resend lucide-react
   ```
3. **Add DESIGN.md** — Run `npx getdesign@latest add ollama` or place the file manually.
4. **Initialize shadcn/ui** — Run `npx shadcn@latest init`. Choose the style that closest matches DESIGN.md (likely "default" with custom colors).
5. **Install shadcn components** — Run all the `add` commands from section 11.
6. **Set up Tailwind config** — Map DESIGN.md tokens to Tailwind theme extensions (colors, fonts, spacing) in `tailwind.config.ts`.
7. **Set up `globals.css`** — Import Tailwind. Define CSS custom properties from DESIGN.md tokens. Configure shadcn theme variables to match.
8. **Set up fonts** — Import fonts specified in DESIGN.md via `next/font`. Apply in `layout.tsx`.
9. **Create `src/config/site.ts`** — Stub out with placeholder data. Owner fills in real content later.
10. **Create `src/types/index.ts`** — Define `Project`, `Blog`, `Achievement`, `SocialLinks` interfaces.
11. **Create `src/lib/utils.ts`** — Add `cn()` helper, `getYouTubeId()` utility.
12. **Set up `.env.local`** — Add `RESEND_API_KEY` and `CONTACT_EMAIL` placeholders.

### Phase 2 — Layout Shell

13. **Build `layout.tsx`** — Root layout with fonts, metadata, `<Toaster />` from Sonner.
14. **Build `Navbar.tsx`** — Sticky nav, section links, resume button, mobile hamburger via `Sheet`.
15. **Build `Footer.tsx`** — Social icons + copyright.
16. **Build `page.tsx`** — Import and stack all section components with proper `id` attributes for scroll targeting.

### Phase 3 — Sections

17. **Build `Hero.tsx`** — Name, animated roles, tagline, social icons. Full viewport height.
18. **Build `ProjectCard.tsx`** — Card component reading from config. Clickable.
19. **Build `ProjectModal.tsx`** — Dialog with YouTube iframe + description. Wire up open/close state.
20. **Build `Projects.tsx`** — Section wrapper. Maps over `siteConfig.projects`, renders grid of `ProjectCard`. Manages which modal is open via state.
21. **Build `BlogCard.tsx`** — Card with title, excerpt, tags, date, link to Medium.
22. **Build `Blogs.tsx`** — Section wrapper. Maps over `siteConfig.blogs`, renders grid.
23. **Build `Contact.tsx`** — Form with validation, submit handler, loading/success/error states.
24. **Build `/api/contact/route.ts`** — Resend integration.
25. **Create `Achievements.tsx`** — Stubbed out, commented out in page.tsx with TODO.

### Phase 4 — Animation & Polish

26. **Add scroll animations** — Wrap sections and cards with Framer Motion `useInView` fade-up.
27. **Add hero entrance animation** — Staggered fade-up.
28. **Add modal animation** — Fade + scale.
29. **Add navbar scroll effect** — Background opacity transition.
30. **Add `prefers-reduced-motion`** — Disable all animations when set.
31. **Cross-browser test** — Chrome, Firefox, Safari, mobile Safari, mobile Chrome.
32. **Lighthouse audit** — Target 90+ on all four metrics.

### Phase 5 — SEO & Deploy

33. **Add metadata** — OG tags, Twitter card, description.
34. **Add `robots.ts`** and **`sitemap.ts`**.
35. **Create OG image** — Simple 1200x630 image with name and title. Can be a static PNG or generated with `@vercel/og`.
36. **Deploy to Vercel** — Connect repo, add env vars (`RESEND_API_KEY`, `CONTACT_EMAIL`), deploy.
37. **Verify Resend** — Test contact form on production. Check email delivery.
38. **Custom domain** — If available, add in Vercel dashboard and update Resend sender domain.

---

## 13. Environment Variables

| Variable         | Description                                | Where to set       |
| ---------------- | ------------------------------------------ | ------------------- |
| `RESEND_API_KEY`  | API key from resend.com dashboard          | `.env.local` + Vercel |
| `CONTACT_EMAIL`   | Email address to receive contact messages  | `.env.local` + Vercel |

---

## 14. Design Enhancement Notes (Beyond DESIGN.md)

These are suggestions to elevate the design while staying within the Ollama aesthetic:

1. **Terminal cursor blink** on the hero role text — a blinking `_` or `▌` after the cycling role text. Subtle nod to terminal-first identity.
2. **Monospace for metadata** — tags, dates, and technical labels should use the monospace font from DESIGN.md. Body text uses the sans-serif.
3. **Card hover state** — rather than a color change, use a subtle `translateY(-2px)` + slightly stronger border. No shadows (Ollama doesn't use shadows).
4. **Section dividers** — use generous whitespace between sections (120-160px padding) rather than visible lines. If DESIGN.md specifies dividers, follow that instead.
5. **Link style** — underline on hover, no underline at rest. Matches terminal hyperlink convention.
6. **YouTube thumbnail as card background** — Optionally show the YouTube thumbnail as the project card's background image (with a dark overlay). This adds visual interest to the project grid without additional image uploads. Use `https://img.youtube.com/vi/{VIDEO_ID}/maxresdefault.jpg`. This is optional — plain cards with just text are also fine per the minimal aesthetic.
7. **Smooth scroll behavior** — add `scroll-behavior: smooth` to `html` in CSS, or use `scrollIntoView` in JS for more control.
8. **Selection color** — style `::selection` with a muted accent color from DESIGN.md.

---

## 15. Edge Cases to Handle

- **YouTube URL without valid ID** → Show a placeholder message ("Video unavailable") instead of a broken iframe.
- **Missing optional fields in config** (e.g., `links.github` is empty) → Don't render the button. Use conditional rendering.
- **Empty projects/blogs array** → Don't render the section at all, or show a "Coming soon" message.
- **Contact form spam** → The in-memory rate limit helps. For production, consider adding a honeypot field (hidden input that bots fill out — reject submissions where it's populated).
- **Long project descriptions in modal** → The modal content area should be scrollable (`overflow-y-auto`) with the YouTube video sticky at top or scrolling with content.
- **Resend free tier `from` restriction** → Until a custom domain is verified, you can only send from `onboarding@resend.dev`. This is fine for MVP. The `replyTo` field preserves the visitor's email for replies.

---

## 16. Future Extensibility (Do Not Build Now)

These are noted for future reference. Do not implement unless the owner requests:

- **Achievements section** — Already stubbed. Owner will activate.
- **Blog RSS auto-sync** — Fetch from `https://medium.com/feed/@laddhaakshatrai` and parse with an RSS library.
- **Dark/light theme toggle** — Currently dark-only per Ollama aesthetic.
- **CMS integration** — If content updates become frequent, migrate `site.ts` to Sanity or Notion API.
- **Analytics** — Plausible or PostHog if the owner wants visitor insights later.
- **Custom email template** — Use `@react-email/components` to create a styled HTML email for contact form submissions instead of plain text.
- **Project filtering** — Filter projects by tag. Only useful if project count grows significantly.

---

## 17. Coding Standards for the Agent

1. **Read DESIGN.md first** — before writing any component, check DESIGN.md for the relevant tokens and patterns.
2. **TypeScript strict mode** — no `any` types. Define interfaces for all data structures.
3. **Server components by default** — only add `"use client"` when the component needs browser APIs, state, or event handlers.
4. **Component files** — one component per file. Named exports for components, default export for pages.
5. **Tailwind only** — no inline styles, no CSS modules, no styled-components. Exception: CSS custom properties in `globals.css`.
6. **shadcn/ui patterns** — use shadcn primitives wherever possible instead of building custom. Customize via Tailwind classes, not by forking shadcn source.
7. **Semantic HTML** — use `<section>`, `<nav>`, `<main>`, `<footer>`, `<article>` appropriately.
8. **No console.log in production** — use only in development. The API route can use `console.error` for error logging.
9. **Config-driven** — all display content comes from `site.ts`. Components should never hardcode content strings.
10. **Commit after each completed task** — follow the task sequence in section 12.
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "group/badge inline-flex h-6 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border border-transparent px-3 py-1 text-[11px] font-normal tracking-[1.1px] uppercase whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 aria-invalid:border-destructive aria-invalid:ring-destructive/20 [&>svg]:pointer-events-none [&>svg]:size-3!",
  {
    variants: {
      variant: {
        default: "border-[var(--brand-border)] bg-[hsl(146_45%_22%_/_0.18)] text-[var(--brand)]",
        secondary: "border-[var(--hairline)] bg-[var(--canvas-deep)] text-[var(--charcoal)]",
        destructive:
          "border-[#f87171]/40 bg-[#7f1d1d]/15 text-[#fca5a5] focus-visible:ring-destructive/20",
        outline:
          "border-border bg-transparent text-[var(--charcoal)] [a]:hover:border-[var(--hairline-strong)] [a]:hover:text-[var(--ink)]",
        ghost: "border-transparent text-[var(--body)] hover:bg-[var(--surface-soft)] hover:text-[var(--charcoal)]",
        link: "border-transparent text-[var(--brand-link)] underline-offset-4 hover:underline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "span"

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }

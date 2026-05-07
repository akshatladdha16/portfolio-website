import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-md border border-transparent bg-clip-padding text-[0.88rem] leading-tight font-medium whitespace-nowrap transition-colors outline-none select-none focus-visible:border-[var(--brand-border)] focus-visible:ring-2 focus-visible:ring-ring active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "rounded-full border-[#fafafa] bg-[var(--canvas-deep)] px-8 text-[#fafafa] hover:bg-[#141414]",
        outline:
          "rounded-full border-[var(--hairline)] bg-[var(--canvas-deep)] text-[#fafafa] hover:border-[var(--hairline-strong)] hover:bg-[var(--surface-soft)]",
        secondary:
          "rounded-full border-[var(--hairline)] bg-[var(--canvas-deep)] text-[#fafafa] opacity-80 hover:opacity-100",
        ghost:
          "rounded-sm border-transparent bg-transparent text-[var(--ink)] hover:border-[var(--hairline)] hover:bg-[var(--surface-soft)]",
        destructive: "rounded-full border-[#f87171]/30 bg-[#7f1d1d]/20 text-[#fca5a5] hover:bg-[#7f1d1d]/35",
        link: "border-transparent p-0 text-[var(--brand-link)] underline-offset-4 hover:underline",
      },
      size: {
        default:
          "h-9 gap-2 px-6 has-data-[icon=inline-end]:pr-5 has-data-[icon=inline-start]:pl-5",
        xs: "h-7 gap-1 rounded-sm px-2 text-xs",
        sm: "h-8 gap-1.5 rounded-full px-4 text-[0.85rem]",
        lg: "h-10 gap-2 px-8",
        icon: "size-8",
        "icon-xs": "size-7 rounded-sm [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8 rounded-sm",
        "icon-lg": "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }

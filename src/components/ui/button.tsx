import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-neu-accent text-primary-foreground shadow-neu-flat hover:shadow-neu-raised hover:-translate-y-0.5 active:shadow-neu-inset active:translate-y-0 hover:bg-neu-accent-hover",
        destructive:
          "bg-destructive text-destructive-foreground shadow-neu-flat hover:shadow-neu-raised hover:-translate-y-0.5 active:shadow-neu-inset active:translate-y-0 hover:bg-destructive/90",
        outline:
          "border border-border bg-neu-primary shadow-neu-flat hover:shadow-neu-raised hover:-translate-y-0.5 active:shadow-neu-inset active:translate-y-0",
        secondary:
          "bg-neu-secondary text-secondary-foreground shadow-neu-flat hover:shadow-neu-raised hover:-translate-y-0.5 active:shadow-neu-inset active:translate-y-0",
        ghost: "hover:bg-accent hover:text-accent-foreground shadow-none hover:shadow-neu-flat",
        link: "text-neu-accent underline-offset-4 hover:underline shadow-none",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }

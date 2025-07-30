import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-semibold transition-all hover:scale-[1.03] active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-300",
  {
    variants: {
      variant: {
        default: "bg-[hsl(var(--accent))] text-white shadow hover:bg-blue-800",
        outline: "border border-gray-300 dark:border-gray-700 bg-white/50 dark:bg-card text-gray-800 dark:text-gray-100 hover:bg-blue-50 dark:hover:bg-blue-900 transition",
        ghost: "bg-transparent hover:bg-blue-50 dark:hover:bg-blue-900 text-gray-700 dark:text-gray-100",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
)
const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
  )
})
Button.displayName = "Button"
export { Button }

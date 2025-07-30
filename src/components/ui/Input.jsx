import * as React from "react"
import { cn } from "@/lib/utils"
const Input = React.forwardRef(({ className, type, ...props }, ref) => (
  <input
    type={type}
    className={cn(
      "flex h-10 w-full rounded-md border border-gray-200 dark:border-gray-700 bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-60",
      className
    )}
    ref={ref}
    {...props}
  />
))
Input.displayName = "Input"
export { Input }

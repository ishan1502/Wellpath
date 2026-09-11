import * as React from "react"
import { cn } from "@/utils/cn"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline" | "destructive"
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2",
        {
          "border-transparent bg-emerald-600 text-white hover:bg-emerald-700": variant === "default",
          "border-transparent bg-emerald-100 text-emerald-900 hover:bg-emerald-200": variant === "secondary",
          "text-slate-950": variant === "outline",
          "border-transparent bg-red-500 text-white hover:bg-red-600": variant === "destructive",
        },
        className
      )}
      {...props}
    />
  )
}

export { Badge }

import * as React from "react"
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"

const Select = React.forwardRef(({ className, options, placeholder, ...props }, ref) => {
    return (
        <div className="relative w-full group">
            <select
                ref={ref}
                className={cn(
                    "flex h-10 w-full appearance-none rounded-sm border border-input dark:bg-input/10 bg-transparent px-3 py-1 pr-8 text-sm shadow-sm transition-colors outline-none",
                    "focus-visible:border-primary focus-visible:ring-primary/20 focus-visible:ring-[3px]",
                    "disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                    className
                )}
                {...props}
            >
                {placeholder && (
                    <option value="" disabled selected hidden>
                        {placeholder}
                    </option>
                )}
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 size-4 pointer-events-none text-muted-foreground transition-transform group-focus-within:rotate-180" />
        </div>
    )
})
Select.displayName = "Select"

export { Select }

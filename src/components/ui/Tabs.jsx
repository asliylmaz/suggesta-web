import * as React from "react"
import { cn } from "@/lib/utils"

const Tabs = React.forwardRef(({ className, tabs, activeTab, onTabChange, ...props }, ref) => {
    return (
        <div
            ref={ref}
            className={cn(
                "flex w-full items-center gap-1 border-b border-input/30",
                className
            )}
            {...props}
        >
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    className={cn(
                        "relative px-4 py-3 text-sm font-medium transition-all hover:text-primary",
                        activeTab === tab.id
                            ? "text-primary border-b-2 border-primary"
                            : "text-muted-foreground"
                    )}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    )
})
Tabs.displayName = "Tabs"

export { Tabs }

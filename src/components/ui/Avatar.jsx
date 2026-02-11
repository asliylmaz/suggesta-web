import * as React from "react"
import { cn } from "@/lib/utils"
import { Camera } from "lucide-react"

const Avatar = React.forwardRef(({ className, src, alt, fallback, editable, onEdit, ...props }, ref) => {
    const [error, setError] = React.useState(false)

    return (
        <div
            ref={ref}
            className={cn(
                "relative flex shrink-0 overflow-hidden rounded-full transition-all group",
                "ring-offset-background border-4 border-background shadow-lg",
                className
            )}
            {...props}
        >
            {src && !error ? (
                <img
                    src={src}
                    alt={alt}
                    onError={() => setError(true)}
                    className="aspect-square h-full w-full object-cover"
                />
            ) : (
                <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground font-semibold uppercase">
                    {fallback || alt?.charAt(0) || "?"}
                </div>
            )}

            {editable && (
                <div
                    onClick={onEdit}
                    className="absolute inset-0 z-10 hidden group-hover:flex flex-col items-center justify-center bg-black/50 text-white cursor-pointer transition-opacity"
                >
                    <Camera className="size-6 mb-1" />
                    <span className="text-[10px] font-medium uppercase tracking-wider">Change</span>
                </div>
            )}
        </div>
    )
})
Avatar.displayName = "Avatar"

export { Avatar }

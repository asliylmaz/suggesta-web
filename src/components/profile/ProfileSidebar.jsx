import * as React from "react"
import { cn } from "@/lib/utils"
import {
    PlusCircle,
    LayoutGrid,
    Star,
    MessageSquare,
    Settings
} from "lucide-react"

const menuItems = [
    { id: "add-content", label: "İçerik Ekle", icon: PlusCircle },
    { id: "my-contents", label: "İçeriklerim", icon: LayoutGrid },
    { id: "settings", label: "Ayarlar", icon: Settings },
]

const ProfileSidebar = ({ activeTab, onTabChange, className }) => {
    return (
        <nav className={cn("flex flex-col gap-1", className)}>
            {menuItems.map((item) => {
                const Icon = item.icon
                const isActive = activeTab === item.id

                return (
                    <button
                        key={item.id}
                        onClick={() => onTabChange(item.id)}
                        className={cn(
                            "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-none transition-all border border-transparent",
                            isActive
                                ? "bg-primary text-primary-foreground shadow-lg border-primary"
                                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                        )}
                    >
                        <Icon className={cn("size-5", isActive ? "text-primary-foreground" : "text-muted-foreground")} />
                        {item.label}
                    </button>
                )
            })}
        </nav>
    )
}

export { ProfileSidebar }

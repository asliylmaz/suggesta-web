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
                            "flex items-center gap-3 px-5 py-3.5 text-sm font-bold tracking-wide rounded-full transition-all duration-300",
                            isActive
                                ? "bg-white/10 text-white shadow-lg border border-white/10"
                                : "text-zinc-500 hover:bg-white/5 hover:text-white/80 border border-transparent"
                        )}
                    >
                        <Icon className={cn("size-5", isActive ? "text-white" : "text-zinc-500")} />
                        {item.label}
                    </button>
                )
            })}
        </nav>
    )
}

export { ProfileSidebar }

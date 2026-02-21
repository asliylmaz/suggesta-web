import * as React from "react"
import { Avatar } from "@/components/ui/Avatar"
import { Button } from "@/components/ui/button"
import { LogOut, UserRoundPen } from "lucide-react"

const ProfileHeader = ({ user, onEditProfile, onLogout }) => {
    return (
        <div
            className="flex flex-col md:flex-row items-center md:items-center gap-8 p-8 relative overflow-hidden"
            style={{
                borderRadius: 22,
                background: 'rgba(255,255,255,0.02)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.05)',
                boxShadow: '0 16px 48px rgba(0,0,0,0.50), inset 0 1px 0 rgba(255,255,255,0.05)'
            }}
        >
            {/* Subtle top gradient */}
            <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 120,
                background: 'radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.05) 0%, transparent 70%)',
                pointerEvents: 'none',
            }} />

            <Avatar
                src={user?.avatar}
                alt={user?.name}
                fallback={user?.name?.charAt(0)}
                editable
                onEdit={() => console.log("Edit photo requested")}
                className="size-32 md:size-40 border-4 border-white/10 shadow-xl relative z-10"
            />

            <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left relative z-10">
                <h1 className="text-3xl md:text-5xl font-black text-white italic tracking-tighter uppercase mb-2">
                    {user?.name || "User Name"}
                </h1>
                <p className="text-zinc-500 font-medium tracking-widest uppercase text-sm mb-6">
                    {user?.email || "user@example.com"}
                </p>

                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                    <Button
                        size="sm"
                        className="rounded-full px-6 text-black font-bold tracking-wide uppercase transition-all duration-300 transform hover:scale-105"
                        style={{
                            background: 'linear-gradient(90deg, #fff, #e5e5e5)',
                            boxShadow: '0 4px 14px rgba(255,255,255,0.25)'
                        }}
                        onClick={onEditProfile}
                    >
                        <UserRoundPen className="size-4 mr-2" />
                        Profili Düzenle
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon-sm"
                        className="rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300 transform hover:scale-105"
                        onClick={onLogout}
                        title="Çıkış Yap"
                    >
                        <LogOut className="size-4" />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export { ProfileHeader }

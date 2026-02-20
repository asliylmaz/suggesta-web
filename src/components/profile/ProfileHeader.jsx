import * as React from "react"
import { Avatar } from "@/components/ui/Avatar"
import { Button } from "@/components/ui/button"
import { LogOut, UserRoundPen } from "lucide-react"

const ProfileHeader = ({ user, onEditProfile, onLogout }) => {
    return (
        <div className="flex flex-col md:flex-row items-center md:items-end gap-6 pb-8 border-b border-input/30">
            <Avatar
                src={user?.avatar}
                alt={user?.name}
                fallback={user?.name?.charAt(0)}
                editable
                onEdit={() => console.log("Edit photo requested")}
                className="size-32 md:size-40 border-4"
            />

            <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">
                    {user?.name || "User Name"}
                </h1>
                <p className="text-muted-foreground font-medium mb-4">
                    {user?.email || "user@example.com"}
                </p>

                <div className="flex items-center gap-3">
                    <Button
                        variant="outline"
                        size="sm"
                        className="rounded-none"
                        onClick={onEditProfile}
                    >
                        <UserRoundPen className="size-4" />
                        Profili Düzenle
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon-sm"
                        className="text-destructive hover:text-destructive hover:bg-destructive/10 rounded-none"
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

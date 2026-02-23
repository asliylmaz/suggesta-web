import * as React from "react"
import Head from "next/head"
import { ProfileHeader } from "@/components/profile/ProfileHeader"
import { ProfileSidebar } from "@/components/profile/ProfileSidebar"
import { AddContentForm } from "@/components/profile/sections/AddContentForm"
import { MyContentsList } from "@/components/profile/sections/MyContentsList"
import { ProfileSettings } from "@/components/profile/sections/ProfileSettings"
import { Skeleton } from "@/components/ui/Skeleton"
import Header from "@/components/Header"
import { useAuth } from "@/context/AuthContext"


// Mock user data
const mockUser = {
    name: "Aslıhan Yılmaz",
    email: "aslihan@example.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aslihan",
}

export default function ProfilePage() {
    const { user, logout } = useAuth()
    const [activeTab, setActiveTab] = React.useState("my-contents")
    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {
        // Simulate initial loading
        const timer = setTimeout(() => setLoading(false), 1200)
        return () => clearTimeout(timer)
    }, [])

    const renderSection = () => {
        if (loading) {
            return (
                <div className="space-y-8 animate-pulse p-2">
                    <div className="space-y-4">
                        <Skeleton className="h-10 w-1/3 rounded-[14px]" />
                        <Skeleton className="h-4 w-1/2 rounded-[14px]" />
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map(i => (
                            <Skeleton key={i} className="aspect-[3/4] h-auto w-full rounded-[22px]" />
                        ))}
                    </div>
                </div>
            )
        }

        switch (activeTab) {
            case "add-content":
                return <AddContentForm />
            case "my-contents":
                return <MyContentsList />
            case "settings":
                return <ProfileSettings />
            default:
                return (
                    <div className="py-20 text-center">
                        <h3 className="text-xl font-medium text-muted-foreground">Bu bölüm henüz hazır değil.</h3>
                        <p className="text-muted-foreground/60 mt-2">Daha fazla özellik yolda!</p>
                    </div>
                )
        }
    }

    return (
        <div className="min-h-screen bg-background">
            <Head>
                <title>Profilim | Suggesta</title>
            </Head>

            <Header />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
                {loading ? (
                    <div className="flex flex-col md:flex-row items-center md:items-end gap-6 mb-12">
                        <Skeleton className="size-32 md:size-40 rounded-full" />
                        <div className="space-y-4 flex-1">
                            <Skeleton className="h-10 w-48" />
                            <Skeleton className="h-4 w-64" />
                            <Skeleton className="h-9 w-32 rounded-full" />
                        </div>
                    </div>
                ) : (
                    <ProfileHeader
                        user={user || mockUser}
                        onEditProfile={() => setActiveTab("settings")}
                        onLogout={logout}
                    />
                )}

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12">
                    {/* Sidebar - Desktop */}
                    <aside className="hidden lg:block lg:col-span-3">
                        <div className="sticky top-24">
                            <ProfileSidebar
                                activeTab={activeTab}
                                onTabChange={setActiveTab}
                            />
                        </div>
                    </aside>

                    {/* Navigation - Mobile/Tablet */}
                    <div className="lg:hidden">
                        <div className="flex overflow-x-auto pb-4 gap-2 no-scrollbar">
                            <ProfileSidebar
                                activeTab={activeTab}
                                onTabChange={setActiveTab}
                                className="flex-row whitespace-nowrap"
                            />
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <section className="lg:col-span-9 min-h-[500px]">
                        <div
                            className="p-6 md:p-8 relative overflow-hidden w-full min-h-full"
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
                                zIndex: 0
                            }} />

                            {/* Shine line */}
                            <div style={{
                                position: 'absolute', top: 0, left: 0, right: 0, height: 1,
                                background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.08),transparent)',
                                pointerEvents: 'none',
                                zIndex: 0
                            }} />

                            <div className="relative z-10">
                                {renderSection()}
                            </div>
                        </div>
                    </section>
                </div>
            </main>

            <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
        </div>
    )
}

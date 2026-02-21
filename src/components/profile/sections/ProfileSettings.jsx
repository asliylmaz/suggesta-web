import * as React from "react"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/Select"
import { Button } from "@/components/ui/button"
import { User, Lock, Palette, Save } from "lucide-react"

const ProfileSettings = () => {
    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
            {/* Kişisel Bilgiler */}
            <section className="space-y-6">
                <div className="mb-8 flex flex-col items-start">
                    <h2 className="text-3xl md:text-4xl font-black text-white italic tracking-tighter uppercase mb-2 flex items-center gap-3">
                        <User className="size-8 text-white/80" />
                        Kişisel <span className="text-zinc-500">Bilgiler</span>
                    </h2>
                    <div className="h-1 w-12 bg-zinc-700/50 rounded-full mb-2"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white/80">Ad</label>
                        <Input defaultValue="Aslıhan" className="bg-black/40 border-white/10 rounded-[14px] px-4 text-white/90 placeholder-white/20 focus:ring-1 focus:ring-white/20 focus:border-white/30" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white/80">Soyad</label>
                        <Input defaultValue="Yılmaz" className="bg-black/40 border-white/10 rounded-[14px] px-4 text-white/90 placeholder-white/20 focus:ring-1 focus:ring-white/20 focus:border-white/30" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white/80">Kullanıcı Adı</label>
                        <Input defaultValue="asliylmaz" className="bg-black/40 border-white/10 rounded-[14px] px-4 text-white/90 placeholder-white/20 focus:ring-1 focus:ring-white/20 focus:border-white/30" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white/80">E-posta</label>
                        <Input defaultValue="aslihan@example.com" type="email" className="bg-black/40 border-white/10 rounded-[14px] px-4 text-white/90 placeholder-white/20 focus:ring-1 focus:ring-white/20 focus:border-white/30" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white/80">Doğum Tarihi</label>
                        <Input type="date" className="bg-black/40 border-white/10 rounded-[14px] px-4 text-white/90 focus:ring-1 focus:ring-white/20 focus:border-white/30" />
                    </div>
                </div>
            </section>

            {/* Güvenlik */}
            <section className="space-y-6 pt-6">
                <div className="mb-8 flex flex-col items-start">
                    <h2 className="text-3xl md:text-4xl font-black text-white italic tracking-tighter uppercase mb-2 flex items-center gap-3">
                        <Lock className="size-8 text-white/80" />
                        Güvenlik
                    </h2>
                    <div className="h-1 w-12 bg-zinc-700/50 rounded-full mb-2"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-1 group">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white/80">Mevcut Şifre</label>
                        <Input type="password" placeholder="••••••••" className="bg-black/40 border-white/10 rounded-[14px] px-4 text-white/90 placeholder-white/20 focus:ring-1 focus:ring-white/20 focus:border-white/30 font-mono text-xl" />
                    </div>
                    <div className="hidden md:block"></div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white/80">Yeni Şifre</label>
                        <Input type="password" placeholder="••••••••" className="bg-black/40 border-white/10 rounded-[14px] px-4 text-white/90 placeholder-white/20 focus:ring-1 focus:ring-white/20 focus:border-white/30 font-mono text-xl" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white/80">Yeni Şifre Tekrar</label>
                        <Input type="password" placeholder="••••••••" className="bg-black/40 border-white/10 rounded-[14px] px-4 text-white/90 placeholder-white/20 focus:ring-1 focus:ring-white/20 focus:border-white/30 font-mono text-xl" />
                    </div>
                </div>
            </section>

            <div className="pt-8 border-t border-white/10 flex justify-end">
                <Button
                    className="rounded-full px-8 gap-2 text-black font-bold tracking-wide uppercase transition-all duration-300 transform hover:scale-105"
                    style={{
                        background: 'linear-gradient(90deg, #fff, #e5e5e5)',
                        boxShadow: '0 4px 14px rgba(255,255,255,0.25)'
                    }}
                >
                    <Save className="size-5" />
                    Değişiklikleri Kaydet
                </Button>
            </div>

            {/* TODO:
          - Auth control
          - Form submit handling & API
          - Validation
      */}
        </div>
    )
}

export { ProfileSettings }

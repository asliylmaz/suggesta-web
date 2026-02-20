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
                <div className="flex items-center gap-3 border-b border-input/30 pb-3">
                    <User className="size-5 text-primary" />
                    <h2 className="text-xl font-semibold">Kişisel Bilgiler</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Ad</label>
                        <Input defaultValue="Aslıhan" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Soyad</label>
                        <Input defaultValue="Yılmaz" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Kullanıcı Adı</label>
                        <Input defaultValue="asliylmaz" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">E-posta</label>
                        <Input defaultValue="aslihan@example.com" type="email" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Doğum Tarihi</label>
                        <Input type="date" />
                    </div>
                </div>
            </section>

            {/* Güvenlik */}
            <section className="space-y-6">
                <div className="flex items-center gap-3 border-b border-input/30 pb-3">
                    <Lock className="size-5 text-primary" />
                    <h2 className="text-xl font-semibold">Güvenlik</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-2xl font-semibold mb-1 group">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Mevcut Şifre</label>
                        <Input type="password" placeholder="••••••••" />
                    </div>
                    <div className="hidden md:block"></div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Yeni Şifre</label>
                        <Input type="password" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Yeni Şifre Tekrar</label>
                        <Input type="password" />
                    </div>
                </div>
            </section>

            <div className="pt-8 border-t border-border flex justify-end">
                <Button className="gap-2 px-8 rounded-none shadow-xl">
                    <Save className="size-4" />
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

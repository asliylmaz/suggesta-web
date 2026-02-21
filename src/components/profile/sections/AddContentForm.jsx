import * as React from "react"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/Select"
import { Textarea } from "@/components/ui/Textarea"
import { Button } from "@/components/ui/button"
import { Upload, X, Film } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../ui/card"

const contentTypes = [
    { value: "movie", label: "Film" },
    { value: "series", label: "Dizi" },
    { value: "book", label: "Kitap" },
]

const categories = [
    { value: "action", label: "Aksiyon" },
    { value: "drama", label: "Dram" },
    { value: "sci-fi", label: "Bilim Kurgu" },
    { value: "horror", label: "Korku" },
    { value: "classic", label: "Klasik" },
]

const AddContentForm = ({ hideHeaderFooter = false }) => {
    const [preview, setPreview] = React.useState(null)

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => setPreview(reader.result)
            reader.readAsDataURL(file)
        }
    }

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {!hideHeaderFooter && (
                <div className="mb-8 flex flex-col items-start">
                    <h2 className="text-3xl md:text-4xl font-black text-white italic tracking-tighter uppercase mb-2 flex items-center gap-3">
                        İçerik <span className="text-zinc-500">Ekle</span>
                    </h2>
                    <div className="h-1 w-12 bg-zinc-700/50 rounded-full mb-2"></div>
                    <p className="text-zinc-500 font-medium tracking-widest uppercase text-sm">Kütüphanene yeni bir film, dizi veya kitap ekle.</p>
                </div>
            )}

            <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white/80">İçerik Tipi</label>
                        <Select options={contentTypes} placeholder="Seçiniz..." className="bg-black/40 border-white/10 rounded-[14px] px-4 text-white/90 focus:ring-1 focus:ring-white/20 focus:border-white/30" />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white/80">Başlık</label>
                        <Input placeholder="İçerik başlığını girin..." className="bg-black/40 border-white/10 rounded-[14px] px-4 text-white/90 placeholder-white/20 focus:ring-1 focus:ring-white/20 focus:border-white/30" />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white/80">Kategori</label>
                        <Select options={categories} placeholder="Kategori seçiniz..." className="bg-black/40 border-white/10 rounded-[14px] px-4 text-white/90 focus:ring-1 focus:ring-white/20 focus:border-white/30" />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white/80">Yayın Tarihi</label>
                        <Input type="date" className="bg-black/40 border-white/10 rounded-[14px] px-4 text-white/90 focus:ring-1 focus:ring-white/20 focus:border-white/30" />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                        <label className="text-sm font-medium text-white/80">Açıklama</label>
                        <Textarea
                            placeholder="İçerik hakkında kısa bir açıklama yazın..."
                            className="min-h-[120px] bg-black/40 border-white/10 rounded-[14px] p-4 text-white/90 placeholder-white/20 focus:ring-1 focus:ring-white/20 focus:border-white/30 resize-none"
                        />
                    </div>
                </div>

                <Card className="bg-black/20 border-white/5 rounded-[22px]">
                    <CardHeader>
                        <CardTitle className="text-white/90 font-bold">Medya</CardTitle>
                        <CardDescription className="text-zinc-500 font-medium">Afiş, fragman ve görselleri yükleyin.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex flex-col items-center justify-center border border-dashed border-white/20 rounded-[14px] p-10 bg-black/40 hover:bg-black/60 transition-colors cursor-pointer group">
                            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white/70 mb-4 group-hover:scale-110 transition-transform">
                                <Upload size={24} />
                            </div>
                            <p className="text-sm font-medium text-white/80">Görsel yüklemek için tıklayın veya sürükleyin</p>
                            <p className="text-xs text-zinc-500 mt-1">PNG, JPG (Max. 5MB. Önerilen: 1200x1600)</p>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium flex items-center gap-2 text-white/80">
                                <Film size={14} /> Fragman Linki (YouTube / Vimeo)
                            </label>
                            <Input placeholder="https://youtube.com/watch?v=..." className="bg-black/40 border-white/10 rounded-[14px] px-4 text-white/90 placeholder-white/20 focus:ring-1 focus:ring-white/20 focus:border-white/30" />
                        </div>
                    </CardContent>
                </Card>



                {!hideHeaderFooter && (
                    <div className="md:col-span-2 pt-4 border-t border-white/10 flex justify-end">
                        <Button
                            className="rounded-full px-8 text-black font-bold tracking-wide uppercase transition-all duration-300 transform hover:scale-105"
                            style={{
                                background: 'linear-gradient(90deg, #fff, #e5e5e5)',
                                boxShadow: '0 4px 14px rgba(255,255,255,0.25)'
                            }}
                        >
                            İçeriği Ekle
                        </Button>

                        {/* TODO: 
                  - Form submit handling
                  - Validation
                  - API integration
              */}
                    </div>
                )}
            </form>
        </div>
    )
}

export { AddContentForm }

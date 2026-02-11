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
                <div>
                    <h2 className="text-2xl font-semibold mb-2">Yeni İçerik Ekle</h2>
                    <p className="text-muted-foreground">Kütüphanene yeni bir film, dizi veya kitap ekle.</p>
                </div>
            )}

            <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">İçerik Tipi</label>
                        <Select options={contentTypes} placeholder="Seçiniz..." />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Başlık</label>
                        <Input placeholder="İçerik başlığını girin..." />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Kategori</label>
                        <Select options={categories} placeholder="Kategori seçiniz..." />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Yayın Tarihi</label>
                        <Input type="date" />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                        <label className="text-sm font-medium">Açıklama</label>
                        <Textarea
                            placeholder="İçerik hakkında kısa bir açıklama yazın..."
                            className="min-h-[120px]"
                        />
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Medya</CardTitle>
                        <CardDescription>Afiş, fragman ve görselleri yükleyin.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex flex-col items-center justify-center border-2 border-dashed border-border rounded-xl p-10 bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer group">
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                                <Upload size={24} />
                            </div>
                            <p className="text-sm font-medium">Görsel yüklemek için tıklayın veya sürükleyin</p>
                            <p className="text-xs text-muted-foreground mt-1">PNG, JPG (Max. 5MB. Önerilen: 1200x1600)</p>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium flex items-center gap-2">
                                <Film size={14} /> Fragman Linki (YouTube / Vimeo)
                            </label>
                            <Input placeholder="https://youtube.com/watch?v=..." />
                        </div>
                    </CardContent>
                </Card>



                {!hideHeaderFooter && (
                    <div className="md:col-span-2 pt-4 border-t border-input/30">
                        <Button className="w-full md:w-auto px-12">
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

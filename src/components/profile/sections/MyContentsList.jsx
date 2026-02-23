import * as React from "react"
import { Select } from "@/components/ui/Select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/Badge"
import { MoreHorizontal, Edit2, Trash2, Filter } from "lucide-react"

const mockContents = [
    { id: 1, title: "Inception", type: "Film", category: "Sci-Fi", rating: 9.2, image: "https://picsum.photos/seed/inception/300/400" },
    { id: 2, title: "Breaking Bad", type: "Dizi", category: "Drama", rating: 9.5, image: "https://picsum.photos/seed/breaking/300/400" },
    { id: 3, title: "1984", type: "Kitap", category: "Classic", rating: 8.9, image: "https://picsum.photos/seed/1984/300/400" },
    { id: 4, title: "Interstellar", type: "Film", category: "Sci-Fi", rating: 9.0, image: "https://picsum.photos/seed/inter/300/400" },
]

const MyContentsList = () => {
    const [filter, setFilter] = React.useState("all")
    const [sort, setSort] = React.useState("newest")

    const filteredContents = mockContents.filter(content => {
        if (filter === "all") return true
        return content.type.toLowerCase() === filter
    })

    const groupedContents = filteredContents.reduce((acc, content) => {
        const type = content.type;
        if (!acc[type]) acc[type] = [];
        acc[type].push(content);
        return acc;
    }, {});

    const typeOrder = ["Film", "Dizi", "Kitap"];
    const typeLabels = {
        "Film": "Filmler",
        "Dizi": "Diziler",
        "Kitap": "Kitaplar"
    };

    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-2">
                <div className="flex flex-col items-start">
                    <h2 className="text-3xl md:text-4xl font-black text-white italic tracking-tighter uppercase mb-2 flex items-center gap-3">
                        İçeriklerim
                    </h2>
                    <div className="h-1 w-12 bg-zinc-700/50 rounded-full mb-2"></div>
                    <p className="text-zinc-500 font-medium tracking-widest uppercase text-sm">{mockContents.length} toplam içerik</p>
                </div>

                <div className="flex items-center gap-3">
                    <Select
                        className="w-[140px] bg-black/40 border-[1.5px] border-white/10 rounded-full px-4 font-semibold text-white/90 focus:ring-1 focus:ring-white/20"
                        placeholder="Tüm Tipler"
                        options={[
                            { value: "all", label: "Tümü" },
                            { value: "film", label: "Filmler" },
                            { value: "dizi", label: "Diziler" },
                            { value: "kitap", label: "Kitaplar" },
                        ]}
                        onChange={(e) => setFilter(e.target.value)}
                    />
                    <Select
                        className="w-[140px] bg-black/40 border-[1.5px] border-white/10 rounded-full px-4 font-semibold text-white/90 focus:ring-1 focus:ring-white/20"
                        placeholder="Sırala"
                        options={[
                            { value: "newest", label: "En Yeni" },
                            { value: "rating", label: "Puan" },
                        ]}
                    />
                </div>
            </div>

            {filteredContents.length > 0 ? (
                <div className="space-y-12">
                    {typeOrder.map(type => {
                        const contents = groupedContents[type];
                        if (!contents?.length) return null;

                        const isBooks = type === "Kitap";

                        return (
                            <div key={type} className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <h3 className="text-xl md:text-2xl font-black text-white italic tracking-tighter uppercase">{typeLabels[type]}</h3>
                                    <div className="h-px flex-1 bg-white/10" />
                                    <Badge variant="outline" className="text-zinc-400 border-white/20 font-bold bg-white/5">{contents.length}</Badge>
                                </div>

                                <div className={`grid gap-4 md:gap-6 ${isBooks
                                    ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 select-none"
                                    : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                                    }`}>
                                    {contents.map((content) => (
                                        <div key={content.id} className="group relative bg-black/40 border border-white/10 rounded-[14px] overflow-hidden shadow-sm hover:shadow-xl hover:shadow-white/5 transition-all">
                                            <div className={`relative overflow-hidden ${isBooks ? 'aspect-[2/3]' : 'aspect-[16/9]'}`}>
                                                <img
                                                    src={content.image}
                                                    alt={content.title}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                                                />
                                                <div className="absolute inset-0 rounded-[12px] bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-sm">
                                                    <Button size="icon-sm" className="rounded-full bg-white/10 hover:bg-white text-white hover:text-black border border-white/20 shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                                                        <Edit2 className="size-4" />
                                                    </Button>
                                                    <Button size="icon-sm" className="rounded-full bg-red-500/20 hover:bg-red-500 text-red-50 border border-red-500/30 shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75">
                                                        <Trash2 className="size-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 bg-black/20 rounded-[22px] border border-dashed border-white/20">
                    <Filter className="size-12 text-white/20 mb-4" />
                    <h3 className="text-lg font-bold text-white/80">Henüz içerik eklemedin</h3>
                    <p className="text-sm text-zinc-500 mt-1">Eklediğin içerikler burada görünecek.</p>
                    <Button
                        className="mt-8 rounded-full px-8 text-black font-bold tracking-wide uppercase transition-all duration-300 transform hover:scale-105"
                        style={{
                            background: 'linear-gradient(90deg, #fff, #e5e5e5)',
                            boxShadow: '0 4px 14px rgba(255,255,255,0.25)'
                        }}
                    >
                        İçerik Ekle
                    </Button>
                </div>
            )}
        </div>
    )
}

export { MyContentsList }

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
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-semibold mb-1">İçeriklerim</h2>
                    <p className="text-sm text-muted-foreground">{mockContents.length} toplam içerik</p>
                </div>

                <div className="flex items-center gap-2">
                    <Select
                        className="w-[140px]"
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
                        className="w-[140px]"
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
                                    <h3 className="text-xl font-bold border-l-4 border-primary pl-4">{typeLabels[type]}</h3>
                                    <div className="h-px flex-1 bg-border/50" />
                                    <Badge variant="outline" className="text-muted-foreground">{contents.length}</Badge>
                                </div>

                                <div className={`grid gap-4 md:gap-6 ${isBooks
                                    ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 select-none"
                                    : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                                    }`}>
                                    {contents.map((content) => (
                                        <div key={content.id} className="group relative bg-card border overflow-hidden shadow-sm hover:shadow-md transition-all">
                                            <div className={`relative overflow-hidden ${isBooks ? 'aspect-[2/3]' : 'aspect-[16/9]'}`}>
                                                <img
                                                    src={content.image}
                                                    alt={content.title}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                />
                                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                                    <Button size="icon-sm" variant="secondary" className="rounded-full">
                                                        <Edit2 className="size-4" />
                                                    </Button>
                                                    <Button size="icon-sm" variant="destructive" className="rounded-full">
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
                <div className="flex flex-col items-center justify-center py-20 bg-muted/30 rounded-2xl border-2 border-dashed">
                    <Filter className="size-12 text-muted-foreground/30 mb-4" />
                    <h3 className="text-lg font-medium text-muted-foreground">Henüz içerik eklemedin</h3>
                    <p className="text-sm text-muted-foreground/60 mt-1">Eklediğin içerikler burada görünecek.</p>
                    <Button variant="outline" className="mt-6 rounded-full">
                        İçerik Ekle
                    </Button>
                </div>
            )}
        </div>
    )
}

export { MyContentsList }

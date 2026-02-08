import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/admin/ui/Card';
import { Button } from '@/components/admin/ui/Button';
import { Input } from '@/components/admin/ui/Input';
import {
    Save,
    Trash2,
    Upload,
    ArrowLeft,
    Film,
    Star,
    Eye,
    Plus
} from 'lucide-react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const ContentCreatePage = () => {
    const router = useRouter();

    return (
        <AdminLayout>
            <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/admin/contents/movies">
                            <Button variant="ghost" size="icon" className="rounded-full">
                                <ArrowLeft size={20} />
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">Yeni İçerik Ekle</h1>
                            <p className="text-muted-foreground">Platforma yeni bir film, dizi veya kitap ekleyin.</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button variant="outline">Taslak Olarak Kaydet</Button>
                        <Button>İçeriği Yayınla</Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Main Form */}
                    <div className="md:col-span-2 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Genel Bilgiler</CardTitle>
                                <CardDescription>İçeriğin temel detaylarını belirleyin.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium italic">İçerik Başlığı</label>
                                    <Input placeholder="Örn: Inception, Breaking Bad..." className="text-lg font-semibold py-6" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Açıklama / Özet</label>
                                    <textarea
                                        className="flex min-h-[160px] w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50 transition-all resize-none"
                                        placeholder="İçerik hakkında kısa bilgi veya özet yazın..."
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Sınıflandırma</CardTitle>
                                <CardDescription>Tür, kategori ve etiketleri yönetin.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">İçerik Türü</label>
                                        <select className="bg-background border border-input h-10 px-3 rounded-md text-sm outline-none focus:ring-2 focus:ring-primary/20 w-full">
                                            <option>Film</option>
                                            <option>Dizi</option>
                                            <option>Kitap</option>
                                            <option>Mekan</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Kategori</label>
                                        <select className="bg-background border border-input h-10 px-3 rounded-md text-sm outline-none focus:ring-2 focus:ring-primary/20 w-full">
                                            <option>Bilim Kurgu</option>
                                            <option>Fantastik</option>
                                            <option>Dram</option>
                                            <option>Klasik</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Etiketler</label>
                                    <Input placeholder="Etiketleri virgül ile ayırın (örn: aksiyon, macera, ödüllü)" />
                                    <p className="text-[10px] text-muted-foreground italic">En fazla 5 etiket ekleyebilirisiniz.</p>
                                </div>
                            </CardContent>
                        </Card>

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
                    </div>

                    {/* Sidebar Info */}
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Yayınlama Ayarları</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">Platformda Yayınla</span>
                                    <div className="w-10 h-6 bg-primary rounded-full relative p-1 cursor-pointer">
                                        <div className="w-4 h-4 bg-white rounded-full translate-x-4 transition-transform" />
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">Öne Çıkarılan</span>
                                    <div className="w-10 h-6 bg-muted rounded-full relative p-1 cursor-pointer">
                                        <div className="w-4 h-4 bg-white rounded-full transition-transform" />
                                    </div>
                                </div>
                                <div className="space-y-2 pt-2">
                                    <label className="text-xs font-semibold text-muted-foreground uppercase">Yayın Tarihi</label>
                                    <Input type="date" defaultValue="2024-02-08" />
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>İstatistikler</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground flex items-center gap-2"><Eye size={14} /> Görüntülenme</span>
                                    <span className="font-bold">0</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground flex items-center gap-2"><Star size={14} /> Puan</span>
                                    <span className="font-bold">-</span>
                                </div>
                            </CardContent>
                        </Card>

                        <Button variant="danger" className="w-full gap-2 opacity-50 hover:opacity-100 transition-opacity">
                            <Trash2 size={16} />
                            İçeriği Sil
                        </Button>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default ContentCreatePage;

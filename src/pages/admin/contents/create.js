import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/admin/ui/Card';
import { Button } from '@/components/admin/ui/Button';
import { Input } from '@/components/admin/ui/Input';
import { AddContentForm } from "@/components/profile/sections/AddContentForm"
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


                {/* Main Form */}
                <AddContentForm hideHeaderFooter={true} />

                <Button variant="danger" className="w-full gap-2 md:w-auto px-12 hover:opacity-100 transition-opacity">
                    <Trash2 size={16} />
                    İçeriği Sil
                </Button>

            </div>
        </AdminLayout>
    );
};

export default ContentCreatePage;

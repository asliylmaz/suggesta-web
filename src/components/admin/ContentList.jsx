import React, { useState } from 'react';
import { DataTable } from './ui/DataTable';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Badge } from './ui/Badge';
import {
    Search,
    Filter,
    Plus,
    Eye,
    Edit2,
    Trash2,
    CheckCircle,
    XCircle,
    Clock,
    LayoutGrid,
    List as ListIcon
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const ContentList = ({ type, data, title, description }) => {
    const [viewMode, setViewMode] = useState('table');

    const columns = [
        {
            key: 'title',
            title: 'Başlık',
            render: (val, row) => (
                <div className="flex items-center gap-3">
                    <div className="w-12 h-16 rounded overflow-hidden bg-muted flex-shrink-0">
                        {row.image ? (
                            <img src={row.image} alt={val} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-muted-foreground bg-primary/10">
                                <Plus size={16} />
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col">
                        <span className="font-medium">{val}</span>
                        <span className="text-xs text-muted-foreground">{row.category}</span>
                    </div>
                </div>
            )
        },
        {
            key: 'rating',
            title: 'Ort. Puan',
            render: (val) => (
                <div className="flex items-center gap-1">
                    <span className="font-semibold">{val}</span>
                    <span className="text-muted-foreground">/ 10</span>
                </div>
            )
        },
        { key: 'createdBy', title: 'Ekleyen', render: (val) => <span className="text-xs">{val}</span> },
        { key: 'date', title: 'Eklenme Tarihi' },
        {
            key: 'status',
            title: 'Durum',
            render: (status) => (
                <Badge
                    variant={status === 'Published' ? 'success' : status === 'Pending' ? 'warning' : 'destructive'}
                    className="gap-1 px-2"
                >
                    {status === 'Published' ? <CheckCircle size={10} /> : status === 'Pending' ? <Clock size={10} /> : <XCircle size={10} />}
                    {status === 'Published' ? 'Yayında' : status === 'Pending' ? 'Bekliyor' : 'Reddedildi'}
                </Badge>
            )
        },
    ];

    const actions = (row) => (
        <>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary" title="Detaylı Gör">
                <Eye size={16} />
            </Button>
            <Link href="/admin/contents/create">
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary" title="Düzenle">
                    <Edit2 size={16} />
                </Button>
            </Link>
            {row.status === 'Pending' && (
                <Button variant="ghost" size="icon" className="h-8 w-8 text-emerald-500 hover:bg-emerald-500/10" title="Onayla">
                    <CheckCircle size={16} />
                </Button>
            )}
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" title="Sil">
                <Trash2 size={16} />
            </Button>
        </>
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-col gap-1">
                    <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
                    <p className="text-muted-foreground">{description}</p>
                </div>
                <Link href="/admin/contents/create">
                    <Button className="gap-2">
                        <Plus size={18} />
                        <span>Yeni {type} Ekle</span>
                    </Button>
                </Link>
            </div>

            <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-card p-4 rounded-xl border border-border/50 shadow-sm">
                <div className="relative w-full md:max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input placeholder={`${title.toLowerCase()} ara...`} className="pl-9" />
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="flex border border-border rounded-md overflow-hidden bg-background h-10 p-1">
                        <button
                            onClick={() => setViewMode('table')}
                            className={cn("px-2 flex items-center justify-center rounded transition-colors", viewMode === 'table' ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted")}
                        >
                            <ListIcon size={18} />
                        </button>
                        <button
                            onClick={() => setViewMode('grid')}
                            className={cn("px-2 flex items-center justify-center rounded transition-colors", viewMode === 'grid' ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted")}
                        >
                            <LayoutGrid size={18} />
                        </button>
                    </div>

                    <div className="h-8 w-[1px] bg-border mx-1 hidden sm:block"></div>

                    <select className="bg-background border border-input h-10 px-3 rounded-md text-sm outline-none focus:ring-2 focus:ring-primary/20 min-w-[120px]">
                        <option>Tüm Kategoriler</option>
                        <option>Bilim Kurgu</option>
                        <option>Klasik</option>
                        <option>Polisiye</option>
                    </select>

                    <select className="bg-background border border-input h-10 px-3 rounded-md text-sm outline-none focus:ring-2 focus:ring-primary/20 min-w-[120px]">
                        <option>Tüm Durumlar</option>
                        <option>Yayında</option>
                        <option>Beklemede</option>
                        <option>Reddedildi</option>
                    </select>
                </div>
            </div>

            {viewMode === 'table' ? (
                <DataTable data={data} columns={columns} actions={actions} pagination={true} />
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {data.map((item) => (
                        <div key={item.id} className="relative group bg-card border border-border/50 rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:border-sidebar-border transition-all duration-300">
                            <div className="aspect-[2/3] relative">
                                <div className="absolute inset-0 bg-primary/10 flex items-center justify-center text-muted-foreground">
                                    {item.image ? (
                                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                    ) : (
                                        <Plus size={32} />
                                    )}
                                </div>
                                <div className="absolute top-2 right-2">
                                    <Badge variant={item.status === 'Published' ? 'success' : item.status === 'Pending' ? 'warning' : 'destructive'} className="shadow-sm">
                                        {item.status}
                                    </Badge>
                                </div>
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                    <Button size="icon" variant="primary" className="h-9 w-9 rounded-full"><Eye size={18} /></Button>
                                    <Button size="icon" variant="primary" className="h-9 w-9 rounded-full"><Edit2 size={18} /></Button>
                                    <Button size="icon" variant="danger" className="h-9 w-9 rounded-full"><Trash2 size={18} /></Button>
                                </div>
                            </div>
                            <div className="p-4">
                                <h3 className="font-semibold text-sm truncate">{item.title}</h3>
                                <div className="flex items-center justify-between mt-2">
                                    <span className="text-xs text-muted-foreground">{item.category}</span>
                                    <div className="flex items-center gap-1">
                                        <span className="text-xs font-bold">{item.rating}</span>
                                        <span className="text-[10px] text-muted-foreground">/10</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ContentList;

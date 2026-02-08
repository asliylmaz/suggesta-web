'use client';
import React, { useState } from 'react';
import { Share2, Clock, Globe, Calendar, Tag, BookOpen, Play } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ContentInfo({ item }) {
    const [isExpanded, setIsExpanded] = useState(false);

    const infoItems = [
        { label: 'Yayın Tarihi', value: item.year, icon: Calendar },
        { label: 'Kategori', value: item.categories?.join(', '), icon: Tag },
        { label: item.type === 'books' ? 'Sayfa Sayısı' : 'Süre', value: item.duration || item.pageCount, icon: item.type === 'books' ? BookOpen : Clock },
        { label: 'Dil', value: item.language, icon: Globe },
    ].filter(i => i.value);

    return (
        <section className="container mx-auto px-4 md:px-6 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Description Column */}
                <div className="lg:col-span-2 space-y-6">
                    <div>
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <div className="h-1 w-4 bg-primary rounded-sm" />
                            <span>Açıklama</span>
                        </h2>
                        <div className="relative group">
                            <p className={cn(
                                "text-muted-foreground leading-relaxed transition-all duration-500",
                                !isExpanded && "line-clamp-6"
                            )}>
                                {item.description || "Bu içerik için henüz bir açıklama girilmemiş."}
                            </p>
                            {!isExpanded && item.description?.length > 400 && (
                                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none" />
                            )}
                        </div>
                        {item.description?.length > 400 && (
                            <button
                                onClick={() => setIsExpanded(!isExpanded)}
                                className="mt-4 text-primary font-semibold hover:underline flex items-center gap-1 transition-all duration-300"
                            >
                                {isExpanded ? 'Daha az göster' : 'Devamını oku'}
                            </button>
                        )}
                    </div>

                    {/* Trailer Placeholder UI */}
                    {item.hasTrailer && (
                        <div className="mt-8 p-8 rounded-sm bg-gradient-to-br from-accent/50 to-background border border-border group cursor-pointer overflow-hidden relative">
                            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="relative z-10 flex items-center justify-between">
                                <div>
                                    <h3 className="text-xl font-bold mb-2">Resmi Fragman</h3>
                                    <p className="text-sm text-muted-foreground">Bu içeriğin fragmanını şimdi izleyebilirsiniz.</p>
                                </div>
                                <div className="h-14 w-14 rounded-sm bg-primary flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/30 group-hover:scale-110 transition-transform duration-300">
                                    <Play fill="currentColor" size={24} />
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Info Column */}
                <div className="lg:col-span-1">
                    <div className="bg-card/50 backdrop-blur-sm border border-border p-6 rounded-sm sticky top-24">
                        <h3 className="text-xl font-bold mb-6 border-b border-border pb-4">Detaylı Bilgi</h3>
                        <ul className="space-y-6">
                            {infoItems.map((info, idx) => (
                                <li key={idx} className="flex items-start gap-4">
                                    <div className="p-2 rounded-sm bg-accent/50 text-primary">
                                        <info.icon size={20} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-0.5">{info.label}</p>
                                        <p className="text-foreground font-medium">{info.value}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}

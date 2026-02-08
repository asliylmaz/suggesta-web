'use client';

import React from 'react';
import { Star, Heart, Plus, Share2, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/Badge';
import RatingStars from '@/components/ui/RatingStars';

export default function ContentHeader({ item }) {
    return (
        <section className="relative w-full min-h-[60vh] flex items-end pb-12 overflow-hidden">
            {/* Background Image / Cover */}
            <div className="absolute inset-0 z-0">
                <img
                    src={item.coverImage || item.image}
                    alt={item.title}
                    className="w-full h-full object-cover animate-pulse-slow"
                />
                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent" />
            </div>

            <div className="container relative z-10 mx-auto px-4 md:px-6">
                <div className="flex flex-col md:flex-row gap-8 items-end md:items-center">

                    {/* Content Info */}
                    <div className="flex-1 space-y-4 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                        <div className="flex flex-wrap gap-2">
                            {item.categories?.map((cat) => (
                                <Badge key={cat} variant="default" className="bg-primary/20 text-primary border-primary/30">
                                    {cat}
                                </Badge>
                            ))}
                            <Badge variant="outline" className="text-muted-foreground border-white/10">
                                {item.year}
                            </Badge>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white drop-shadow-md leading-tight">
                            {item.title}
                        </h1>

                        <div className="flex items-center gap-4 py-2">
                            <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-sm border border-white/10">
                                <Star className="text-yellow-500 fill-yellow-500" size={18} />
                                <span className="text-lg font-bold text-white">{item.rating}</span>
                                <span className="text-sm text-muted-foreground ml-1">/ 10.0</span>
                            </div>
                            <RatingStars rating={item.rating} size={16} className="hidden sm:flex" />
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-3 pt-4">
                            <Button size="lg" className="rounded-sm px-8 bg-primary hover:bg-primary/90 hover:scale-105 transition-all duration-300">
                                <Plus className="mr-2 h-5 w-5" /> Favorilerime Ekle
                            </Button>

                            <Button size="lg" variant="outline" className="rounded-sm px-8 border-white/20 bg-white/5 backdrop-blur-md hover:bg-white/10 hover:scale-105 transition-all duration-300">
                                <Star className="mr-2 h-5 w-5" /> Puan Ver
                            </Button>

                            <Button size="lg" variant="outline" className="rounded-sm px-8 border-white/20 bg-white/5 backdrop-blur-md hover:bg-white/10 hover:scale-105 transition-all duration-300">
                                <Share2 className="mr-2 h-5 w-5" /> Paylaş
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

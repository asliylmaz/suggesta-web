'use client';

import React from 'react';
import { Star, Heart, Plus, Share2, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/Badge';
import RatingStars from '@/components/ui/RatingStars';

export default function ContentHeader({ item }) {
    return (
        <section className="relative h-[65vh] md:h-[75vh] min-h-[500px] overflow-hidden">
            {/* Background Image with Cinematic Overlay */}
            <div className="absolute inset-0">
                <img
                    src={item.coverImage}
                    alt={item.title}
                    className="w-full h-full object-cover"
                />
                {/* Multi-layered cinematic gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                <div className="absolute inset-0 bg-black/40" />
            </div>

            <div className="relative h-full container mx-auto px-4 md:px-6 flex flex-col justify-end pb-12">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-end">

                    {/* Content Info */}
                    <div className="lg:col-span-3 space-y-6">


                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-none drop-shadow-2xl">
                            {item.title}
                        </h1>


                        <div className="flex flex-wrap gap-4 pt-4">
                            <Button size="lg" className="px-8 rounded-none font-bold shadow-2xl">
                                Puan Ver
                            </Button>
                            <Button variant="outline" size="lg" className="px-8 rounded-none bg-black/20 backdrop-blur-md border border-white/10 hover:bg-white/10 text-white">
                                Listeme Ekle
                            </Button>
                        </div>


                        <div className="flex flex-wrap items-center gap-6 text-white/90 font-medium">
                            <div className="flex items-center gap-2 bg-primary/80 backdrop-blur-md px-3 py-1.5 rounded-none shadow-xl">
                                <Star className="text-white fill-white" size={18} />
                                <span className="text-xl font-bold">{item.rating}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

'use client';

import { useState } from 'react';
import { Star, Heart, Plus, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ListingCard({ item, type }) {
    const [isHovered, setIsHovered] = useState(false);
    const isHorizontal = type === 'movies' || type === 'series' || type === 'places';
    const router = useRouter();

    if (isHorizontal) {
        // Horizontal layout for movies and series - compact vertical design
        return (
            <div
                className="group relative cursor-pointer"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="relative overflow-hidden bg-card border border-border transition-all duration-500 hover:border-primary/50 flex flex-col rounded-sm">
                    {/* Image */}
                    <div className="relative aspect-[16/9] overflow-hidden bg-muted">
                        <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />

                        {/* Hover Overlay */}
                        <div
                            className={`absolute inset-0 bg-background/60 backdrop-blur-[2px] transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'
                                }`}
                            onClick={() => router.push(`/detail-template`)}
                        >
                            {/* Quick Actions */}
                            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 px-4">
                                <button className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 hover:scale-110">
                                    <Star size={18} className="text-white" />
                                </button>
                                <button className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 hover:scale-110">
                                    <Heart size={18} className="text-white" />
                                </button>
                                <button className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 hover:scale-110">
                                    <Plus size={18} className="text-white" />
                                </button>
                            </div>
                        </div>

                        {/* Rating Badge */}
                        <div className="absolute top-2 left-2 flex items-center gap-1.5 bg-background shadow-lg border border-border/50 px-2 py-1 rounded-none">
                            <Star className="text-slate-400 fill-slate-400" size={12} />
                            <span className="text-foreground text-xs font-bold leading-none">{item.rating}</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Vertical layout for books
    return (
        <div
            className="group relative cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="relative overflow-hidden bg-card border border-border transition-all duration-500 hover:border-primary/50 rounded-none">
                {/* Image */}
                <div className="relative aspect-[2/3] overflow-hidden bg-muted">
                    <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Hover Overlay */}
                    <div
                        className={`absolute inset-0 bg-background/60 backdrop-blur-[2px] transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'
                            }`}
                        onClick={() => router.push(`/detail-template`)}
                    >
                        {/* Quick Actions */}
                        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 px-4">
                            <button className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 hover:scale-110">
                                <Star size={18} className="text-white" />
                            </button>
                            <button className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 hover:scale-110">
                                <Heart size={18} className="text-white" />
                            </button>
                            <button className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 hover:scale-110">
                                <Plus size={18} className="text-white" />
                            </button>
                        </div>
                    </div>

                    {/* Rating Badge */}
                    <div className="absolute top-2 left-2 flex items-center gap-1.5 bg-background shadow-lg border border-border/50 px-2 py-1 rounded-none">
                        <Star className="text-slate-400 fill-slate-400" size={12} />
                        <span className="text-foreground text-xs font-bold leading-none">{item.rating}</span>
                    </div>
                </div>

            </div>
        </div>
    );
}

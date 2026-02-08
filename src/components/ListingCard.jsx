'use client';

import { useState } from 'react';
import { Star, Heart, Plus, ArrowRight } from 'lucide-react';

export default function ListingCard({ item, type }) {
    const [isHovered, setIsHovered] = useState(false);
    const isHorizontal = type === 'movies' || type === 'series';

    if (isHorizontal) {
        // Horizontal layout for movies and series - compact vertical design
        return (
            <div
                className="group relative cursor-pointer"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="relative overflow-hidden bg-card border border-border transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20 hover:border-primary/50 flex flex-col">
                    {/* Image */}
                    <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20">
                        <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />

                        {/* Hover Overlay */}
                        <div
                            className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'
                                }`}
                        >
                            {/* Quick Actions */}
                            <div className="absolute bottom-3 left-0 right-0 flex justify-center space-x-2 px-2">
                                <button className="p-2 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 transition-all duration-300 hover:scale-110 active:scale-95">
                                    <Star size={14} className="text-white" />
                                </button>
                                <button className="p-2 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 transition-all duration-300 hover:scale-110 active:scale-95">
                                    <Heart size={14} className="text-white" />
                                </button>
                                <button className="p-2 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 transition-all duration-300 hover:scale-110 active:scale-95">
                                    <Plus size={14} className="text-white" />
                                </button>
                            </div>
                        </div>

                        {/* Rating Badge */}
                        <div className="absolute bottom-2 right-2 flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2 py-1 rounded-sm border border-white/10 group-hover:bg-blue-500 transition-colors duration-300">
                            <Star className="text-yellow-500 fill-yellow-500" size={12} />
                            <span className="text-white text-xs font-bold leading-none">{item.rating}</span>
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
            <div className="relative overflow-hidden bg-card border border-border transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20 hover:border-primary/50">
                {/* Image */}
                <div className="relative aspect-[2/3] overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20">
                    <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Hover Overlay */}
                    <div
                        className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'
                            }`}
                    >
                        {/* Quick Actions */}
                        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 px-3">
                            <button className="p-2.5 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 transition-all duration-300 hover:scale-110 active:scale-95">
                                <Star size={16} className="text-white" />
                            </button>
                            <button className="p-2.5 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 transition-all duration-300 hover:scale-110 active:scale-95">
                                <Heart size={16} className="text-white" />
                            </button>
                            <button className="p-2.5 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 transition-all duration-300 hover:scale-110 active:scale-95">
                                <Plus size={16} className="text-white" />
                            </button>
                        </div>

                        {/* Detail Button */}
                        <div className="absolute top-4 right-4">
                            <button className="p-2 rounded-full bg-primary/80 backdrop-blur-md hover:bg-primary transition-all duration-300 hover:scale-110 active:scale-95">
                                <ArrowRight size={16} className="text-primary-foreground" />
                            </button>
                        </div>
                    </div>

                    {/* Rating Badge */}
                    <div className="absolute bottom-2 right-2 flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2 py-1 rounded-sm border border-white/10 group-hover:bg-blue-500 transition-colors duration-300">
                        <Star className="text-yellow-500 fill-yellow-500" size={12} />
                        <span className="text-white text-xs font-bold leading-none">{item.rating}</span>
                    </div>
                </div>

                {/* Info */}
                <div className="p-3">
                    <h3 className="font-semibold text-sm truncate group-hover:text-primary transition-colors duration-300">
                        {item.title}
                    </h3>
                    <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-muted-foreground">{item.year}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

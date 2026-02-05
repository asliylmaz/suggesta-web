'use client';

import { useState } from 'react';
import { Star, Heart, Plus } from 'lucide-react';

export default function ContentCard({ item, type }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="group relative flex-shrink-0 w-48 cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="relative overflow-hidden rounded-xl bg-card border border-border transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-blue-500/20 group-hover:z-10">
                {/* Image */}
                <div className="relative aspect-[2/3] overflow-hidden bg-gradient-to-br from-blue-600/20 to-cyan-500/20">
                    <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                    {/* Overlay on Hover */}
                    <div
                        className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'
                            }`}
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
                </div>

                {/* Info */}
                <div className="p-3">
                    <h3 className="font-semibold text-sm truncate mb-1">{item.title}</h3>
                    <div className="flex items-center space-x-1">
                        <Star size={14} className="text-yellow-500 fill-yellow-500" />
                        <span className="text-sm font-medium">{item.rating}</span>
                        <span className="text-xs text-muted-foreground ml-1">
                            ({item.votes})
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

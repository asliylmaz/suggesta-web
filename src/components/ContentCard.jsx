'use client';

import { useState } from 'react';
import { Star, Heart, Plus } from 'lucide-react';

export default function ContentCard({ item, type }) {
    const [isHovered, setIsHovered] = useState(false);
    const isHorizontal = type === 'movies' || type === 'series' || type === 'places';

    return (
        <div
            className={`group relative flex-shrink-0 ${isHorizontal ? 'w-56 md:w-64' : 'w-36 md:w-40'} cursor-pointer`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="relative overflow-hidden bg-card border border-border transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl group-hover:z-10">
                {/* Image */}
                <div className={`relative ${isHorizontal ? 'aspect-[16/9]' : 'aspect-[2/3]'} overflow-hidden bg-gradient-to-br from-blue-600/20 to-cyan-500/20`}>
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

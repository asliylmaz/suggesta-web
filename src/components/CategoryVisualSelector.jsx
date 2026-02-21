'use client';

import { useRef, useEffect } from 'react';
import {
    Zap, Compass, Wand2, Smile, Fingerprint, Video, Clapperboard,
    Users, Castle, Landmark, Ghost, Music, Search, Heart, Rocket,
    Tv, Eye, Shield, Sun, Gamepad, Newspaper, Radio, Coffee,
    MessageCircle, Globe, Film, PlayCircle, Hash, Star
} from 'lucide-react';

const genreIcons = {
    // Movies
    28: Zap, // Action
    12: Compass, // Adventure
    16: Wand2, // Animation
    35: Smile, // Comedy
    80: Fingerprint, // Crime
    99: Video, // Documentary
    18: Clapperboard, // Drama
    10751: Users, // Family
    14: Castle, // Fantasy
    36: Landmark, // History
    27: Ghost, // Horror
    10402: Music, // Music
    9648: Search, // Mystery
    10749: Heart, // Romance
    878: Rocket, // Science Fiction
    10770: Tv, // TV Movie
    53: Eye, // Thriller
    10752: Shield, // War
    37: Sun, // Western

    // Series Specific
    10759: Zap, // Action & Adventure
    10762: Gamepad, // Kids
    10763: Newspaper, // News
    10764: Radio, // Reality
    10765: Rocket, // Sci-Fi & Fantasy
    10766: Coffee, // Soap
    10767: MessageCircle, // Talk
    10768: Globe, // War & Politics

    // Special
    'all': Hash,
    'popular': Star,
    'now-playing': PlayCircle
};

export default function CategoryVisualSelector({ genres, selectedCategory, onCategoryChange }) {
    const scrollContainerRef = useRef(null);
    const containerRef = useRef(null);

    // Center the selected category on mount or when it changes
    useEffect(() => {
        if (scrollContainerRef.current) {
            // Need a slight timeout to ensure DOM is ready and painted
            setTimeout(() => {
                if (!scrollContainerRef.current) return;
                const selectedElement = scrollContainerRef.current.querySelector(`[data-selected="true"]`);
                if (selectedElement) {
                    const container = scrollContainerRef.current;
                    // Calculate exact center relative to the container, applying offset
                    const targetScroll = selectedElement.offsetLeft - (container.offsetWidth / 2) + (selectedElement.offsetWidth / 2);

                    // Prevent scrolling below zero to keep the left side anchored perfectly
                    container.scrollTo({
                        left: Math.max(0, targetScroll),
                        behavior: 'smooth'
                    });
                }
            }, 100);
        }
    }, [selectedCategory, genres]);

    return (
        <div className="w-full relative py-8 mb-8 border-b border-zinc-800/50" ref={containerRef}>
            <div
                ref={scrollContainerRef}
                className="flex items-end overflow-x-auto hide-scrollbar scroll-smooth w-full px-4 border-none outline-none pb-8 pt-16"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                <div className="flex items-end">
                    {genres.map((genre, index) => {
                        const isSelected = genre.id.toString() === selectedCategory?.toString();
                        const selectedIndex = genres.findIndex(g => g.id.toString() === selectedCategory?.toString());
                        const isBefore = index < selectedIndex;
                        const isAfter = index > selectedIndex;
                        const Icon = genreIcons[genre.id] || Film;

                        // Z-index calculation: highest for selected, decreasing as we move away
                        const zIndex = isSelected ? 30 : 20 - Math.abs(index - selectedIndex);

                        // Margins for pulling towards center
                        // Items before selected should pull right (negative mr), items after pull left (negative ml)
                        let spacingClass = '';
                        if (selectedIndex !== -1) {
                            if (isSelected) {
                                spacingClass = 'z-30 mx-2 md:mx-4';
                            } else if (isBefore) {
                                spacingClass = `group-hover:z-20 -mr-10 md:-mr-16 ${index === 0 && selectedIndex !== 0 ? '' : 'first:ml-0'}`;
                            } else if (isAfter) {
                                spacingClass = 'group-hover:z-20 -ml-10 md:-ml-16';
                            }
                        } else {
                            spacingClass = 'z-10 -ml-16 first:ml-0 hover:z-20';
                        }

                        return (
                            <div
                                key={genre.id}
                                data-selected={isSelected}
                                onClick={() => onCategoryChange(genre.id.toString())}
                                style={{ zIndex: isSelected ? 30 : zIndex }}
                                className={`group flex flex-col items-center justify-end cursor-pointer transition-all duration-500 ease-out flex-shrink-0 relative ${spacingClass}`}
                            >
                                {/* Selected Text (Above) */}
                                <div className={`h-12 flex items-end justify-center transition-all duration-500 mb-4 
                                    ${isSelected ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 hidden'}`}>
                                    {isSelected && <span className="font-bold italic text-xl md:text-2xl tracking-[0.2em] text-white uppercase" style={{ textShadow: '0 4px 20px rgba(0,0,0,0.8)' }}>{genre.name}</span>}
                                </div>

                                {/* Image Card */}
                                <div className={`relative rounded-[2xl] md:rounded-[2.5rem] overflow-hidden transition-all duration-500 ease-out bg-zinc-900 border border-zinc-800 flex items-center justify-center
                                    ${isSelected
                                        ? 'w-56 h-72 md:w-64 md:h-80 shadow-[0_20px_50px_rgba(0,0,0,0.8)] border-zinc-600 scale-105'
                                        : 'w-40 h-56 md:w-48 md:h-64 opacity-60 group-hover:opacity-100 scale-90 group-hover:scale-95 shadow-xl'}`}
                                >
                                    <Icon
                                        size={isSelected ? 80 : 48}
                                        strokeWidth={1.2}
                                        className={`transition-all duration-700 ${isSelected ? 'text-white' : 'text-zinc-500 group-hover:text-zinc-300 group-hover:scale-110'}`}
                                    />
                                    {/* Overlay to darken unselected */}
                                    {!isSelected && <div className="absolute inset-0 bg-black/60 transition-opacity duration-300 group-hover:bg-black/20 pointer-events-none"></div>}
                                    {isSelected && <div className="absolute inset-0 bg-gradient-to-t from-zinc-800/40 via-transparent to-transparent pointer-events-none"></div>}
                                </div>

                                {/* Unselected Text (Below) */}
                                <div className={`h-12 flex items-start justify-center transition-all duration-500 mt-6 md:mt-8
                                    ${!isSelected ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 hidden'}`}>
                                    {!isSelected && <span className="font-bold italic text-sm md:text-lg text-zinc-500 uppercase tracking-wider group-hover:text-zinc-300 transition-colors">{genre.name}</span>}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

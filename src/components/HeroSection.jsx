'use client';

import { useState, useEffect, useRef } from 'react';
import { Play, Info, Plus } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getMovieImages, getSeriesImages } from '../lib/tmdbService';

export default function HeroSection({ items, type }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [logoUrl, setLogoUrl] = useState(null);
    const [isAnimating, setIsAnimating] = useState(false);

    const activeItem = items[activeIndex];

    // Auto-rotate hero every 10 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            handleNext();
        }, 10000);
        return () => clearInterval(interval);
    }, [activeIndex, items.length]);

    // Fetch Logo for active item
    useEffect(() => {
        const fetchLogo = async () => {
            if (!activeItem) return;
            setLogoUrl(null);

            try {
                const data = type === 'movies'
                    ? await getMovieImages(activeItem.id || activeItem.externalId)
                    : await getSeriesImages(activeItem.id || activeItem.externalId);

                if (data?.logos?.length > 0) {
                    // Try getting a Turkish logo first, then English, then any
                    const trLogo = data.logos.find(l => l.iso_639_1 === 'tr');
                    const enLogo = data.logos.find(l => l.iso_639_1 === 'en');
                    const bestLogo = trLogo || enLogo || data.logos[0];
                    if (bestLogo) setLogoUrl(bestLogo.filePath);
                }
            } catch (error) {
                console.error("Hero logo fetch error:", error);
            }
        };

        fetchLogo();
    }, [activeItem, type]);

    const handleNext = () => {
        if (items.length <= 1) return;
        setIsAnimating(true);
        setTimeout(() => {
            setActiveIndex((prev) => (prev + 1) % items.length);
            setIsAnimating(false);
        }, 500);
    };

    if (!activeItem) return null;

    return (
        <div className="relative w-full h-[85vh] mb-10 group flex">
            {/* Left Main Hero Area */}
            <div className="relative w-full lg:w-[80%] h-full overflow-hidden">
                {/* Background Image - Fading Transition */}
                <div className={`absolute inset-0 transition-opacity duration-700 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
                    <img
                        src={activeItem.backdropUrl || activeItem.backdrop || activeItem.image}
                        alt={activeItem.title}
                        className="w-full h-full object-cover object-center"
                    />

                    {/* Gradient Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent" />
                </div>

                {/* Content Area */}
                <div className={`absolute bottom-0 left-0 w-full p-6 md:p-12 lg:p-20 z-20 flex flex-col justify-end h-full transition-all duration-700 ${isAnimating ? 'translate-y-10 opacity-0' : 'translate-y-0 opacity-100'}`}>
                    <div className="max-w-3xl">
                        {/* Logo or Title */}
                        {logoUrl ? (
                            <img
                                src={logoUrl}
                                alt={activeItem.title}
                                className="h-32 md:h-48 lg:h-64 object-contain mb-6 origin-left"
                            />
                        ) : (
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-4 leading-tight drop-shadow-2xl">
                                {activeItem.title}
                            </h1>
                        )}

                        {/* Metadata */}
                        <div className="flex items-center gap-4 text-white/90 font-medium text-sm md:text-base mb-6">
                            <span className="text-green-400 font-bold">{activeItem.rating || activeItem.tmdbVoteAverage?.toFixed(1) || 'Yeni'} Puan</span>
                            <span>{activeItem.year || activeItem.releaseDate?.split('-')[0] || '2025'}</span>
                            {activeItem.genres && <span className="hidden md:inline border-l border-white/30 pl-4">{activeItem.genres.slice(0, 3).join(', ')}</span>}
                        </div>

                        {/* Overview */}
                        <p className="text-zinc-300 text-sm md:text-lg line-clamp-3 md:line-clamp-4 mb-8 max-w-2xl drop-shadow-md">
                            {activeItem.overview}
                        </p>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-3 md:gap-4">
                            <Link href={`/detail/${type}/${activeItem.id || activeItem.externalId}`}>
                                <Button className="bg-white text-black hover:bg-white/90 h-10 md:h-14 px-6 md:px-8 text-base md:text-lg font-bold rounded-none flex items-center gap-2">
                                    <Play className="fill-black size-5 md:size-6" />
                                    Oynat
                                </Button>
                            </Link>

                            <Link href={`/detail/${type}/${activeItem.id || activeItem.externalId}`}>
                                <Button variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20 h-10 md:h-14 px-6 md:px-8 text-base md:text-lg font-medium rounded-none flex items-center gap-2 backdrop-blur-sm">
                                    <Info className="size-5 md:size-6" />
                                    Daha Fazla Bilgi
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side Thumbnail Navigation (Use Grid for cleaner look) */}
            <div className="hidden lg:flex lg:w-[11%] h-full bg-zinc-950 border-l border-zinc-900 flex-col overflow-y-auto scrollbar-hide py-4 px-3 gap-3">
                <h3 className="text-zinc-400 font-bold text-xs uppercase tracking-widest px-2 mb-2">Sıradakiler</h3>
                {items.map((item, index) => (
                    <div
                        key={item.id}
                        onClick={() => setActiveIndex(index)}
                        className={`group flex gap-3 p-2 rounded-lg cursor-pointer transition-all duration-300 ${index === activeIndex ? 'bg-zinc-800 ring-1 ring-zinc-700' : 'hover:bg-zinc-900'}`}
                    >
                        {/* Thumbnail */}
                        <div className="relative w-24 aspect-video rounded-md overflow-hidden bg-zinc-900 flex-shrink-0">
                            <img
                                src={item.backdropUrl || item.backdrop || item.image || item.posterUrl}
                                alt={item.title}
                                className={`w-full h-full object-cover transition-all duration-500 ${index === activeIndex ? 'opacity-100' : 'opacity-60 group-hover:opacity-100'}`}
                            />
                            {index === activeIndex && (
                                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                                    <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

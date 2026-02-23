'use client';

import { useState, useEffect } from 'react';
import { Play, Info, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
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
            handleNext(null, true);
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

    const handleNext = (e, isAuto = false) => {
        if (e) e.stopPropagation();
        if (items.length <= 1) return;
        setIsAnimating(true);
        setTimeout(() => {
            setActiveIndex((prev) => (prev + 1) % items.length);
            setIsAnimating(false);
        }, 500);
    };

    const handlePrev = (e) => {
        if (e) e.stopPropagation();
        if (items.length <= 1) return;
        setIsAnimating(true);
        setTimeout(() => {
            setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
            setIsAnimating(false);
        }, 500);
    };

    const selectItem = (index) => {
        if (index === activeIndex) return;
        setIsAnimating(true);
        setTimeout(() => {
            setActiveIndex(index);
            setIsAnimating(false);
        }, 500);
    };

    if (!activeItem) return null;

    // The next items to show in the "Next" preview (looping around)
    const previewItems = items.length > 3 ? [
        items[(activeIndex + 1) % items.length],
        items[(activeIndex + 2) % items.length],
        items[(activeIndex + 3) % items.length],
    ] : items.filter((_, idx) => idx !== activeIndex);

    return (
        <div className="relative w-full h-[80vh] lg:h-[90vh] mb-12 overflow-hidden bg-black flex font-sans">

            {/* Background Image - Fading Transition */}
            <div className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
                <img
                    src={activeItem.backdropUrl || activeItem.backdrop || activeItem.image}
                    alt={activeItem.title}
                    className="w-full h-full object-cover object-top filter brightness-[0.8]"
                />

                {/* Complex Gradients for deeper integration */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-transparent to-black/80 mix-blend-multiply" />
            </div>

            {/* Content Area */}
            <div className={`absolute inset-0 p-6 md:p-12 lg:px-20 lg:pb-32 z-20 flex flex-col justify-end transition-all duration-1000 ease-out ${isAnimating ? 'translate-y-8 opacity-0' : 'translate-y-0 opacity-100'}`}>

                <div className="flex flex-col lg:flex-row lg:items-end justify-between w-full gap-10">

                    {/* Left Info Group */}
                    <div className="max-w-2xl xl:max-w-3xl">
                        {/* Rating Component */}
                        <div className="flex items-center gap-2 mb-4">
                            <div className="flex text-yellow-500">
                                {[...Array(5)].map((_, i) => (
                                    <svg key={i} className={`w-5 h-5 ${i < Math.round((activeItem.rating || activeItem.tmdbVoteAverage || 0) / 2) ? 'fill-current' : 'fill-white/20'}`} viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                        </div>

                        {/* Logo or Title */}
                        {logoUrl ? (
                            <img
                                src={logoUrl}
                                alt={activeItem.title}
                                className="h-24 md:h-32 lg:h-44 object-contain mb-6 origin-left filter drop-shadow-[0_10px_10px_rgba(0,0,0,0.8)]"
                            />
                        ) : (
                            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-tight drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)] font-serif">
                                {activeItem.title}
                            </h1>
                        )}

                        {/* Metadata */}
                        <div className="flex items-center gap-4 text-white font-medium text-sm md:text-base mb-6 tracking-wide opacity-90">
                            {activeItem.genres && <span className="text-zinc-300 font-bold tracking-widest uppercase">{activeItem.genres.slice(0, 3).join(' \u2022 ')}</span>}
                            {activeItem.genres && <span className="text-white/40">\u2022</span>}
                            <span>{activeItem.year || activeItem.releaseDate?.split('-')[0] || '2025'}</span>
                        </div>

                        {/* Overview */}
                        <p className="text-zinc-300 text-sm md:text-[17px] leading-relaxed line-clamp-3 mb-8 max-w-2xl opacity-90 drop-shadow-md">
                            {activeItem.overview}
                        </p>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-4 mt-8">
                            <Link href={`/detail/${type}/${activeItem.id || activeItem.externalId}`}>
                                <Button variant="outline" className="bg-transparent rounded-[25px] text-white border-white/40 hover:bg-white/10 h-10 md:h-12 px-6 md:px-8 text-base font-medium flex items-center gap-3 backdrop-blur-sm transition-all hover:scale-105">
                                    < Info className="fill-black size-4" />
                                    Detaylar
                                </Button>
                            </Link>
                            <Button variant="outline" className="bg-white rounded-[25px] text-black border-white/40 hover:bg-white/10 h-10 md:h-12 px-6 md:px-8 text-base font-medium flex items-center gap-3 backdrop-blur-sm transition-all hover:scale-105">
                                <Heart className="size-4 text-black" />
                                Favorilere Ekle
                            </Button>
                        </div>
                    </div>

                    {/* Right Side / Bottom "Next" Thumbnails */}
                    <div className="hidden lg:flex flex-col items-start gap-4 mb-2 z-30">

                        <div className="flex items-center gap-6 mb-2">
                            <h3 className="text-white font-semibold text-2xl tracking-wide drop-shadow-md">Önerilenler</h3>

                            <div className="flex gap-2">
                                <button onClick={handlePrev} className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-all backdrop-blur-md">
                                    <ChevronLeft size={18} />
                                </button>
                                <button onClick={(e) => handleNext(e, false)} className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-all backdrop-blur-md">
                                    <ChevronRight size={18} />
                                </button>
                            </div>
                        </div>

                        <div className="flex gap-5">
                            {previewItems.map((item, idx) => (
                                <div
                                    key={`${item.id || item.externalId}-${idx}`}
                                    onClick={() => selectItem(items.findIndex(i => (i.id || i.externalId) === (item.id || item.externalId)))}
                                    className={`group relative ${type === 'books' ? 'w-40 aspect-[2/3]' : 'w-56 aspect-[16/9]'} rounded-[15px] overflow-hidden cursor-pointer shadow-lg border border-white/10 hover:border-white/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-primary/20 transform-gpu [mask-image:-webkit-radial-gradient(white,black)]`}
                                >
                                    <img
                                        src={item.backdropUrl || item.backdrop || item.image || item.posterUrl}
                                        alt={item.title}
                                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 brightness-90 group-hover:brightness-100 transform-gpu"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent transition-opacity" />

                                    <div className="absolute bottom-4 left-4 right-4 text-white">
                                        <h4 className="text-sm font-semibold truncate group-hover:text-primary transition-colors drop-shadow-md">{item.title}</h4>
                                    </div>

                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                                        <div className="w-12 h-12 rounded-full bg-black/40 border border-white/20 backdrop-blur-md flex items-center justify-center transition-transform duration-300 scale-75 group-hover:scale-100">
                                            <Play className="fill-white text-white size-5 ml-1" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Gradient blending into next section */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent z-10" />
        </div>
    );
}

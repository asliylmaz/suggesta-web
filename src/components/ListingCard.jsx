'use client';

import { useState, useEffect } from 'react';
import { Star, Heart, Plus, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { getMovieImages, getSeriesImages } from '../lib/tmdbService';

export default function ListingCard({ item, type }) {
    const [isHovered, setIsHovered] = useState(false);
    const [logoUrl, setLogoUrl] = useState(null);
    const isHorizontal = type === 'movies' || type === 'series' || type === 'places';
    const router = useRouter();

    useEffect(() => {
        const itemId = item.id || item.externalId;
        if (!isHorizontal || !itemId) return;

        const fetchImages = async () => {
            let data = null;

            // Determine type and fetch appropriate images
            if (type === 'movies' || item.type === 'movie') {
                data = await getMovieImages(itemId);
            } else if (type === 'series' || item.type === 'tv') {
                data = await getSeriesImages(itemId);
            }

            if (data && data.logos && data.logos.length > 0) {
                const trLogo = data.logos.find(l => l.lang === 'tr');
                const enLogo = data.logos.find(l => l.lang === 'en');
                const bestLogo = trLogo || enLogo || data.logos[0];
                if (bestLogo) setLogoUrl(bestLogo.filePath);
            }
        };

        fetchImages();
    }, [isHorizontal, item.id, item.externalId, type, item.type]);

    const navigateToDetail = () => {
        const itemId = item.id || item.externalId;
        router.push(`/detail/${type === 'series' ? 'tv' : type === 'movies' ? 'movie' : type}/${itemId}`)
    }

    if (isHorizontal) {
        // Horizontal layout for movies and series - SHARP & GLOW DESIGN
        return (
            <div
                className="group relative cursor-pointer"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={navigateToDetail}
            >
                {/* Main Container - Strict Sharp Corners */}
                <div className="relative overflow-hidden bg-zinc-950 border border-zinc-800 transition-all duration-500 ease-out hover:border-primary/60 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:z-10 hover:scale-[1.02]">

                    {/* Image */}
                    <div className="relative aspect-[16/9] overflow-hidden bg-zinc-900">
                        <img
                            src={item.backdropUrl || item.backdrop || item.posterUrl || item.image || item.poster}
                            alt={item.title}
                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-hover:brightness-110"
                        />

                        {/* Dark Gradient Overlay - Always visible for text readability */}
                        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black via-black/60 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

                        {/* Title/Logo Overlay */}
                        <div className="absolute inset-x-0 bottom-0 p-4 pb-4 flex flex-col justify-end items-start z-20 transition-all duration-500 group-hover:translate-y-[-10px]">
                            {logoUrl ? (
                                <img
                                    src={logoUrl}
                                    alt={item.title}
                                    className="max-h-12 md:max-h-16 max-w-[80%] object-contain drop-shadow-2xl mb-2 transition-transform duration-500 group-hover:scale-105 origin-bottom-left"
                                />
                            ) : (
                                <h3 className="text-white font-black text-lg md:text-xl leading-tight line-clamp-2 drop-shadow-md tracking-tight uppercase">
                                    {item.title}
                                </h3>
                            )}

                            {/* Metadata that slides in on hover */}
                            <div className={`mt-2 flex items-center gap-3 overflow-hidden transition-all duration-500 ease-out ${isHovered ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}>
                                <div className="flex items-center gap-1.5 text-xs text-white/90 font-medium">
                                    <span className="text-green-500 font-bold">{item.match || '98%'} Eşleşme</span>
                                    <span className="w-1 h-1 rounded-full bg-white/40"></span>
                                    <span>{item.year || '2024'}</span>
                                    <span className="w-1 h-1 rounded-full bg-white/40"></span>
                                    <span className="border border-white/30 px-1 text-[10px]">HD</span>
                                </div>
                            </div>
                        </div>

                        {/* Top Right Rating Badge - Sharp */}
                        <div className="absolute top-0 right-0 bg-primary/90 text-black text-xs font-black px-2 py-1 backdrop-blur-sm z-20">
                            {item.rating}
                        </div>
                    </div>

                    {/* Action Buttons Overlay - Appears on Hover */}
                    <div className={`absolute inset-0 bg-black/20 backdrop-blur-[1px] transition-opacity duration-300 flex items-center justify-center gap-3 ${isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                        <button className="w-10 h-10 bg-white text-black flex items-center justify-center hover:scale-110 transition-transform duration-200 shadow-xl">
                            <div className="relative">
                                <div className="absolute inset-0 bg-white blur-md opacity-50"></div>
                                <Star size={20} fill="currentColor" className="relative z-10" />
                            </div>
                        </button>
                        <button className="w-10 h-10 border border-white/50 text-white bg-black/50 flex items-center justify-center hover:bg-white hover:text-black hover:border-white transition-all duration-200">
                            <Plus size={20} />
                        </button>
                        <button className="w-10 h-10 border border-white/50 text-white bg-black/50 flex items-center justify-center hover:bg-white hover:text-black hover:border-white transition-all duration-200">
                            <ArrowRight size={20} />
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Vertical layout for books - Adjusted for Sharp UI
    return (
        <div
            className="group relative cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={navigateToDetail}
        >
            <div className="relative overflow-hidden bg-zinc-950 border border-zinc-800 transition-all duration-500 hover:border-primary/60 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:-translate-y-1">
                {/* Image */}
                <div className="relative aspect-[2/3] overflow-hidden bg-zinc-900">
                    <img
                        src={item.posterUrl || item.image || item.poster || item.backdropUrl}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />

                    {/* Gradient & Title for vertical cards */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />

                    {/* Hover Overlay Actions */}
                    <div
                        className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-all duration-300 flex flex-col items-center justify-center gap-4 ${isHovered ? 'opacity-100' : 'opacity-0'
                            }`}
                    >
                        <h3 className="text-white font-bold text-center px-4 -translate-y-4 group-hover:translate-y-0 transition-transform duration-300 drop-shadow-lg">
                            {item.title}
                        </h3>

                        <div className="flex gap-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                            <button className="p-2 bg-white text-black hover:scale-110 transition-transform duration-200">
                                <Star size={18} fill="currentColor" />
                            </button>
                            <button className="p-2 border border-white text-white hover:bg-white hover:text-black transition-colors duration-200">
                                <ArrowRight size={18} />
                            </button>
                        </div>
                    </div>

                    {/* Rating Badge */}
                    <div className="absolute top-0 left-0 bg-primary text-black text-xs font-bold px-2 py-1 z-20">
                        {item.rating}
                    </div>
                </div>

            </div>
        </div>
    );
}

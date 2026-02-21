'use client';

import { useState, useEffect } from 'react';
import { Star, Heart, ArrowRight } from 'lucide-react';
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
                {/* Main Container - Glassmorphic Rounded Corners */}
                <div className="relative overflow-hidden rounded-[10px] bg-zinc-900/40 backdrop-blur-sm border border-white/10 transition-all duration-500 ease-out hover:border-white/30 hover:shadow-[0_10px_40px_rgba(0,0,0,0.5)] hover:z-10">

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
                        <div className={`absolute inset-x-0 bottom-0 p-4 flex flex-col justify-end items-start z-20 transition-all duration-500 ease-out ${isHovered ? 'translate-y-[-44px]' : 'translate-y-0'}`}>
                            {logoUrl ? (
                                <img
                                    src={logoUrl}
                                    alt={item.title}
                                    className="max-h-12 md:max-h-16 max-w-[80%] object-contain drop-shadow-2xl mb-1 transition-transform duration-500 group-hover:scale-105 origin-bottom-left"
                                />
                            ) : (
                                <h3 className="text-white font-black text-lg md:text-xl leading-tight line-clamp-2 drop-shadow-md tracking-tight uppercase">
                                    {item.title}
                                </h3>
                            )}
                        </div>

                        {/* Metadata that slides in from bottom on hover */}
                        <div className={`absolute inset-x-0 bottom-0 p-4 pt-0 flex items-center justify-between z-20 transition-all duration-500 ease-out ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none'}`}>
                            <div className="flex items-center gap-1.5 text-xs text-white/90 font-medium h-9">
                                <span className="text-green-500 font-bold text-sm tracking-wide">{item.match || '98%'} Eşleşme</span>
                            </div>
                            <button className="w-9 h-9 flex-shrink-0 rounded-full border border-white/40 text-white bg-black/40 flex items-center justify-center hover:bg-primary hover:text-black hover:border-transparent transition-all duration-200 backdrop-blur-sm hover:scale-110">
                                <Heart size={18} />
                            </button>
                        </div>

                        {/* Top Right Rating Badge */}
                        <div className="absolute top-2 right-2 bg-black/60 text-white text-xs font-bold px-2.5 py-1 rounded-full backdrop-blur-md border border-white/20 z-20 flex items-center gap-1">
                            <Star size={10} className="text-yellow-500 fill-yellow-500" />
                            {item.rating || (item.tmdbVoteAverage ? item.tmdbVoteAverage.toFixed(1) : (item.vote_average ? item.vote_average.toFixed(1) : "0.0"))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Vertical layout for books - Adjusted for Rounded Glassmorphism UI
    return (
        <div
            className="group relative cursor-pointer w-full h-full aspect-[2/3] rounded-[20px] overflow-hidden border border-white/10 transition-all duration-500 hover:-translate-y-2 hover:border-white/20 hover:shadow-[0_20px_60px_rgba(0,0,0,0.6)] bg-white/5 backdrop-blur-xl snap-center"
            onClick={navigateToDetail}
        >
            {/* Image */}
            <img
                src={item.posterUrl || item.image || item.poster || item.backdropUrl}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-80 group-hover:opacity-100"
            />

            {/* Inner Shine */}
            <div className="absolute inset-0 top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

            {/* Overlay Gradient */}
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none" />

            {/* Badge */}
            <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-md border border-white/10 text-white text-xs font-bold px-2 py-1 flex items-center gap-1 rounded-[10px]">
                <span className="text-yellow-400">★</span> {item.rating || (item.tmdbVoteAverage ? item.tmdbVoteAverage.toFixed(1) : (item.vote_average ? item.vote_average.toFixed(1) : "0.0"))}
            </div>

            {/* Overlay Info */}
            <div className="absolute inset-x-0 bottom-0 p-4 pointer-events-none flex flex-col justify-end">
                <h3 className="text-sm md:text-base font-bold text-white leading-tight line-clamp-2 uppercase tracking-tight drop-shadow-md">
                    {item.title}
                </h3>

                <div className="mt-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 pointer-events-auto">
                    <button className="w-full py-2 rounded-[12px] bg-white/10 hover:bg-white text-white hover:text-black border border-white/20 text-xs font-bold tracking-wider uppercase backdrop-blur-md transition-all">
                        Detaylar
                    </button>
                </div>
            </div>
        </div>
    );
}

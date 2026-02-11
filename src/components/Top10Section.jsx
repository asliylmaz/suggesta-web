'use client';

import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef } from 'react';

export default function Top10Section({ items = [], category = 'all', contentType = 'series' }) {
    const scrollContainerRef = useRef(null);

    const isBooks = contentType === 'books';

    const types = {
        series: 'diziler',
        movies: 'filmler',
        books: 'kitaplar',
    };

    const scroll = (direction) => {
        if (scrollContainerRef.current) {
            const cardWidth = isBooks ? 220 : 280;
            const scrollAmount = cardWidth + 20; // width + gap
            const newScrollPosition = scrollContainerRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
            scrollContainerRef.current.scrollTo({
                left: newScrollPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section className="mt-24 mb-12 relative">
            {/* Section Header */}
            <div className="text-center mb-12 animate-fade-in-down">
                <div className="inline-flex items-center gap-3 mb-4">
                    <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-3">
                        Top10
                    </h2>
                </div>
                <p className="text-muted-foreground text-lg">
                    {category === 'all' ? 'Tüm kategorilerden' : category} en çok beğenilen {types[contentType]}
                </p>
            </div>

            {/* Top 10 Slider - Horizontal scrollable */}
            <div className="relative flex items-center gap-4 max-w-[1400px] mx-auto">
                {/* Left Arrow */}
                <button
                    onClick={() => scroll('left')}
                    className="flex-shrink-0 z-30 w-16 h-full min-h-[330px] flex items-center justify-center text-foreground/60 hover:text-foreground transition-all duration-300 hover:scale-110"
                    aria-label="Scroll left"
                >
                    <svg width="60" height="200" viewBox="0 0 60 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M50 10 L10 100 L50 190" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>

                <div className="relative flex-1 overflow-hidden">
                    {/* Left fade overlay - fixed position */}
                    <div className="absolute left-0 top-0 bottom-4 w-16 bg-gradient-to-r from-background to-transparent z-20 pointer-events-none" />

                    {/* Right fade overlay - fixed position */}
                    <div className="absolute right-0 top-0 bottom-4 w-16 bg-gradient-to-l from-background to-transparent z-20 pointer-events-none" />

                    <div
                        ref={scrollContainerRef}
                        className="flex gap-5 overflow-x-auto scrollbar-hide py-8 pb-12"
                    >
                        {items.map((item, index) => (
                            <div
                                key={item.id}
                                className={`group relative animate-fade-in-up flex-shrink-0 ${isBooks ? 'w-[220px]' : 'w-[280px]'}`}
                                style={{ animationDelay: `${index * 50}ms` }}
                            >
                                {/* Card Container */}
                                <div className="relative overflow-hidden bg-card border border-border/50 shadow-xl transition-all duration-700 hover:scale-[1.02] hover:border-blue-800/50">

                                    {/* Image Aspect Ratio */}
                                    <div className={`relative ${isBooks ? 'aspect-[2/3]' : 'aspect-[16/9]'} overflow-hidden`}>
                                        {/* Animated Rank Number - Centered on image */}
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none transition-all duration-700 group-hover:z-0 group-hover:opacity-20">
                                            <div className="relative transition-all duration-700 group-hover:scale-[2.5] group-hover:translate-x-12 group-hover:-translate-y-6 group-hover:rotate-12">
                                                {/* Glowing outline effect */}
                                                <div className="absolute inset-0 blur-3xl bg-blue-400/60 scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                                                {/* Main number with darker stroke */}
                                                <span
                                                    className="relative text-[140px] font-black transition-all duration-700 select-none leading-none flex items-center justify-center"
                                                    style={{
                                                        fontFamily: 'system-ui, -apple-system, sans-serif',
                                                        WebkitTextStroke: '3px rgba(37, 99, 235, 0.8)',
                                                        color: 'transparent',
                                                        textShadow: '0 0 40px rgba(59, 130, 246, 0.6), 0 0 80px rgba(37, 99, 235, 0.4)'
                                                    }}
                                                >
                                                    {item.rank}
                                                </span>
                                            </div>
                                        </div>

                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-[0.65]"
                                        />

                                        {/* Info - slides up on hover */}
                                        <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-700 z-30">
                                            <div className="flex items-center gap-3 text-sm">
                                                <div className="flex items-center gap-2 bg-blue-800/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg">
                                                    <Star className="text-white fill-white" size={16} />
                                                    <span className="text-white font-bold text-base">{item.rating}</span>
                                                </div>
                                                <span className="text-white/90 font-medium bg-white/10 backdrop-blur-sm px-3 py-2 rounded-lg">
                                                    {item.year}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Animated border glow on hover */}
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-40">
                                        <div className="absolute inset-0 border-2 border-blue-800/60 animate-pulse-slow" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Arrow */}
                <button
                    onClick={() => scroll('right')}
                    className="flex-shrink-0 z-30 w-16 h-full min-h-[330px] flex items-center justify-center text-foreground/60 hover:text-foreground transition-all duration-300 hover:scale-110"
                    aria-label="Scroll right"
                >
                    <svg width="60" height="200" viewBox="0 0 60 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 10 L50 100 L10 190" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </div>

            {/* Subtle background glow */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
                <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-blue-800/5 rounded-full blur-3xl animate-pulse-slow" />
                <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-blue-900/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
            </div>
        </section>
    );
}

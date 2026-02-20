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
        <section className="mt-24 mb-12 relative border-t border-b border-white/5 py-12 bg-zinc-950/50">
            {/* Section Header */}
            <div className="text-center mb-16 animate-fade-in-down">
                <div className="inline-flex items-center gap-3 mb-4">
                    <h2 className="text-5xl md:text-7xl font-black text-white mb-3 tracking-tighter uppercase italic">
                        Top <span className="text-primary text-glow">10</span>
                    </h2>
                </div>
                <p className="text-zinc-400 text-lg uppercase tracking-widest font-medium">
                    {category === 'all' ? 'Tüm kategorilerden' : category} en iyi {types[contentType]}
                </p>
            </div>

            {/* Top 10 Slider - Horizontal scrollable */}
            <div className="relative flex items-center gap-4 max-w-[1400px] mx-auto px-4">
                {/* Left Arrow */}
                <button
                    onClick={() => scroll('left')}
                    className="hidden md:flex flex-shrink-0 z-30 w-12 h-full min-h-[330px] items-center justify-center text-zinc-600 hover:text-white transition-all duration-300 hover:scale-110 active:scale-95"
                    aria-label="Scroll left"
                >
                    <ChevronLeft size={48} strokeWidth={1} />
                </button>

                <div className="relative flex-1 overflow-hidden">
                    {/* Fade overlays */}
                    <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-20 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-20 pointer-events-none" />

                    <div
                        ref={scrollContainerRef}
                        className="flex gap-8 overflow-x-auto scrollbar-hide py-12 px-8"
                    >
                        {items.map((item, index) => (
                            <div
                                key={item.id}
                                className={`group relative animate-fade-in-up flex-shrink-0 ${isBooks ? 'w-[200px]' : 'w-[260px]'}`}
                                style={{ animationDelay: `${index * 50}ms` }}
                            >
                                {/* Card Container - Sharp Edges */}
                                <div className="relative overflow-visible">

                                    {/* Rank Number - BIG and BEHIND */}
                                    <div className="absolute -left-12 bottom-0 z-20 pointer-events-none font-black text-[180px] leading-none tracking-tighter text-outline-only group-hover:text-primary/20 transition-colors duration-500"
                                        style={{
                                            WebkitTextStroke: '2px rgba(255,255,255,0.2)',
                                            color: 'transparent'
                                        }}>
                                        {item.rank}
                                    </div>

                                    {/* Image Container */}
                                    <div className={`relative ${isBooks ? 'aspect-[2/3]' : 'aspect-[2/3]'} bg-zinc-900 border border-zinc-800 transition-transform duration-500 group-hover:-translate-y-4 group-hover:scale-105 group-hover:shadow-[0_0_40px_rgba(255,255,255,0.1)] group-hover:border-primary/50 z-10`}>
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-full object-cover transition-all duration-500 group-hover:brightness-110"
                                        />

                                        {/* Info Overlay */}
                                        <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black via-black/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                            <div className="flex items-center justify-between text-sm font-bold text-white">
                                                <span>{item.title}</span>
                                                <div className="flex items-center gap-1 text-primary">
                                                    <Star size={12} fill="currentColor" />
                                                    {item.rating}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Reflection Effect */}
                                    <div className={`absolute -bottom-8 left-0 right-0 h-8 bg-gradient-to-t from-transparent to-white/10 opacity-0 group-hover:opacity-50 transition-opacity duration-300 blur-md transform scale-y-[-1] mask-image-gradient`} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Arrow */}
                <button
                    onClick={() => scroll('right')}
                    className="hidden md:flex flex-shrink-0 z-30 w-12 h-full min-h-[330px] items-center justify-center text-zinc-600 hover:text-white transition-all duration-300 hover:scale-110 active:scale-95"
                    aria-label="Scroll right"
                >
                    <ChevronRight size={48} strokeWidth={1} />
                </button>
            </div>
        </section>
    );
}

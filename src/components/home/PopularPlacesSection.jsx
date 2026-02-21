'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function PopularPlacesSection({ title, items }) {
    const scrollRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setIsVisible(true);
            },
            { threshold: 0.1 }
        );

        if (scrollRef.current) observer.observe(scrollRef.current);
        return () => observer.disconnect();
    }, []);

    const handleScroll = (direction) => {
        if (scrollRef.current) {
            const scrollAmount = direction === 'left' ? -350 : 350;
            scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <section className={`mb-24 py-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* ── Header ── */}
            <div className="container mx-auto px-4 mb-8 flex items-end justify-between">
                <div>
                    <h2 className="text-[clamp(24px,3vw,38px)] font-black italic tracking-tighter uppercase leading-tight font-sans">
                        {title.split(' ').map((w, i) => (
                            <span key={i} className={i % 2 !== 0 ? 'text-white/30 ml-2' : 'text-white ml-0'}>
                                {w}
                            </span>
                        ))}
                    </h2>
                    <div className="h-[3px] w-10 bg-white mt-2 rounded-sm" />
                </div>

                {/* Nav buttons */}
                <div className="flex gap-2">
                    <button
                        onClick={() => handleScroll('left')}
                        className="w-10 h-10 rounded-[12px] border border-white/10 bg-white/5 flex items-center justify-center text-white/75 hover:bg-white/10 hover:text-white transition-all backdrop-blur-md"
                    >
                        <ChevronLeft size={18} />
                    </button>
                    <button
                        onClick={() => handleScroll('right')}
                        className="w-10 h-10 rounded-[12px] border border-white/10 bg-white/5 flex items-center justify-center text-white/75 hover:bg-white/10 hover:text-white transition-all backdrop-blur-md"
                    >
                        <ChevronRight size={18} />
                    </button>
                </div>
            </div>

            <div
                ref={scrollRef}
                className="flex gap-6 overflow-x-auto pb-8 px-4 scrollbar-hide snap-x"
                style={{ scrollbarWidth: 'none' }}
            >
                {items.map((item) => (
                    <div
                        key={item.id}
                        className="relative w-64 md:w-80 aspect-[4/5] rounded-[20px] overflow-hidden cursor-pointer border border-white/10 transition-all duration-500 hover:-translate-y-2 hover:border-white/20 hover:shadow-[0_20px_60px_rgba(0,0,0,0.6)] bg-white/5 backdrop-blur-xl group flex-shrink-0 snap-center"
                    >
                        {/* Image */}
                        <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-80 group-hover:opacity-100"
                        />

                        {/* Inner Shine */}
                        <div className="absolute inset-0 top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

                        {/* Overlay Gradient */}
                        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none" />

                        {/* Badge */}
                        <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md border border-white/10 text-white text-xs font-bold px-2 py-1 flex items-center gap-1 rounded-[10px]">
                            <span className="text-yellow-400">★</span> {item.rating}
                        </div>

                        {/* Overlay Info */}
                        <div className="absolute inset-x-0 bottom-0 p-5 pointer-events-none flex flex-col justify-end">
                            <h3 className="text-2xl font-black text-white leading-tight uppercase tracking-tight drop-shadow-md">
                                {item.title}
                            </h3>

                            <div className="mt-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 pointer-events-auto">
                                <Link href={`/detail/place/${item.id}`} className="block">
                                    <button className="w-full py-2.5 rounded-[12px] bg-white/10 hover:bg-white text-white hover:text-black border border-white/20 text-xs font-bold tracking-wider uppercase backdrop-blur-md transition-all flex items-center justify-center gap-2">
                                        <MapPin size={14} />
                                        Keşfet
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

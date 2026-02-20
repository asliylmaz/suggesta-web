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
        <section className={`mb-24 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="container mx-auto px-4 mb-8 flex items-end justify-between">
                <div>
                    <h2 className="text-3xl md:text-5xl font-black text-white italic tracking-tighter uppercase mb-2">
                        {title}
                    </h2>
                    <p className="text-zinc-500 font-medium tracking-widest uppercase text-sm">Keşfedilmeyi Bekleyenler</p>
                </div>

                <div className="flex gap-2">
                    <Button
                        onClick={() => handleScroll('left')}
                        variant="outline"
                        size="icon"
                        className="rounded-none border-zinc-800 hover:bg-white hover:text-black"
                    >
                        <ChevronLeft className="size-5" />
                    </Button>
                    <Button
                        onClick={() => handleScroll('right')}
                        variant="outline"
                        size="icon"
                        className="rounded-none border-zinc-800 hover:bg-white hover:text-black"
                    >
                        <ChevronRight className="size-5" />
                    </Button>
                </div>
            </div>

            <div
                ref={scrollRef}
                className="flex gap-6 overflow-x-auto pb-12 px-4 scrollbar-hide snap-x"
                style={{ scrollbarWidth: 'none' }}
            >
                {items.map((item, index) => (
                    <div
                        key={item.id}
                        className="group relative flex-shrink-0 w-80 md:w-96 snap-center bg-zinc-900 border border-zinc-800 p-4 pb-8 rotate-1 hover:rotate-0 hover:scale-105 transition-all duration-500 hover:z-10 shadow-xl hover:shadow-2xl"
                    >
                        {/* Polaroid Image Area */}
                        <div className="relative aspect-square mb-4 overflow-hidden bg-black/50">
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                            />

                            <div className="absolute top-2 right-2 bg-white text-black text-xs font-bold px-2 py-1 rotate-3">
                                {item.rating}
                            </div>
                        </div>

                        {/* Hidden Link Overlay */}
                        <Link href={`/detail/place/${item.id}`} className="absolute inset-0 z-20" aria-label={`View details for ${item.title}`} />

                        {/* Tape Effect */}
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-8 bg-zinc-800/80 rotate-2 backdrop-blur-sm opacity-50" />
                    </div>
                ))}
            </div>
        </section>
    );
}

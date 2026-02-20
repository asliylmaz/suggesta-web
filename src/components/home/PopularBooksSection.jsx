'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function PopularBooksSection({ title, items }) {
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
            const scrollAmount = direction === 'left' ? -300 : 300;
            scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <section className={`mb-24 py-12 bg-gradient-to-b from-transparent via-zinc-900/20 to-transparent transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="container mx-auto px-4 mb-12 flex items-center justify-between">
                <div>
                    <h2 className="text-3xl md:text-5xl font-black text-white italic tracking-tighter uppercase mb-2">
                        {title} <span className="text-zinc-600">Rafı</span>
                    </h2>
                    <p className="text-zinc-500 font-medium tracking-widest uppercase text-sm">En çok okunanlar</p>
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
                className="flex gap-8 overflow-x-auto pb-16 px-4 scrollbar-hide snap-x perspective-1000"
                style={{ scrollbarWidth: 'none' }}
            >
                {items.map((item, index) => (
                    <div
                        key={item.id}
                        className="group relative flex-shrink-0 w-48 md:w-56 snap-center perspective-1000"
                    >
                        {/* Book Spine/3D Effect */}
                        <div className="relative aspect-[2/3] transition-transform duration-500 group-hover:-translate-y-4 group-hover:rotate-y-[-10deg] transform-style-3d shadow-2xl">
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-cover rounded-sm shadow-[5px_0_10px_rgba(0,0,0,0.5)] border-r border-white/10"
                            />

                            {/* Overlay Info */}
                            <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black via-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="bg-white text-black text-xs font-black px-1.5 py-0.5 rounded-sm">
                                        {item.rating}
                                    </div>
                                </div>
                                <h3 className="text-lg font-bold text-white leading-tight line-clamp-2">
                                    {item.title}
                                </h3>
                            </div>
                        </div>

                        {/* Reflection/Shadow */}
                        <div className="absolute top-full left-0 w-full h-4 bg-black/50 blur-md rounded-[100%] transition-all duration-500 group-hover:w-[90%] group-hover:translate-x-[5%]" />

                        <div className="mt-6 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0 text-center">
                            <Link href={`/detail/book/${item.id}`}>
                                <Button size="sm" variant="outline" className="w-full rounded-none border-zinc-700 hover:bg-white hover:text-black hover:border-white">
                                    <BookOpen className="size-4 mr-2" />
                                    Detaylar
                                </Button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            <style jsx>{`
                .perspective-1000 {
                    perspective: 1000px;
                }
                .transform-style-3d {
                    transform-style: preserve-3d;
                }
                .rotate-y-[-10deg] {
                    transform: rotateY(-10deg);
                }
            `}</style>
        </section>
    );
}

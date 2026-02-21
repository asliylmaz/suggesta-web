'use client';

import { useRef, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import ListingCard from './ListingCard';

export default function ContentSection({ title, items, type, viewAllLink }) {
    const scrollRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const [isVisible, setIsVisible] = useState(false);

    const isHorizontal = type === 'movies' || type === 'series' || type === 'places';

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        const currentRef = scrollRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, []);

    const checkScroll = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
        }
    };

    const scroll = (direction) => {
        if (scrollRef.current) {
            const scrollAmount = 400;
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth',
            });
            setTimeout(checkScroll, 300);
        }
    };

    useEffect(() => {
        checkScroll();
        const currentRef = scrollRef.current;
        if (currentRef) {
            currentRef.addEventListener('scroll', checkScroll);
            return () => currentRef.removeEventListener('scroll', checkScroll);
        }
    }, []);

    return (
        <section
            className={`mb-12 transition-all duration-1000 ${isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-10'
                }`}
        >
            {/* Section Header */}
            <div className="flex items-center justify-between mb-4 md:mb-6 px-4 md:px-8">
                <div className="flex items-center gap-4">
                    {viewAllLink ? (
                        <Link href={viewAllLink} className="group flex items-center gap-3">
                            <h2 className="text-xl md:text-2xl font-bold text-white/90 group-hover:text-white transition-colors tracking-wide drop-shadow-sm font-sans">
                                {title}
                            </h2>
                            <ChevronRight className="text-white/50 group-hover:text-white transition-all duration-300 -translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100" size={24} />
                        </Link>
                    ) : (
                        <h2 className="text-xl md:text-2xl font-bold text-white/90 tracking-wide drop-shadow-sm font-sans">
                            {title}
                        </h2>
                    )}
                </div>

                <div className="flex items-center gap-4">
                    {viewAllLink && (
                        <Link href={viewAllLink} className="hidden md:flex items-center text-sm font-semibold text-white/50 hover:text-white transition-colors gap-1">
                            Tümünü Gör
                        </Link>
                    )}

                    <div className="flex space-x-2">
                        <button
                            onClick={() => scroll('left')}
                            disabled={!canScrollLeft}
                            className="p-2 lg:p-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white hover:text-black transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed hover:scale-105 backdrop-blur-md"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            disabled={!canScrollRight}
                            className="p-2 lg:p-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white hover:text-black transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed hover:scale-105 backdrop-blur-md"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Scrollable Content */}
            <div
                ref={scrollRef}
                className="flex space-x-4 overflow-x-auto scrollbar-hide px-4 pb-4 pt-2 -my-2"
                style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                    overflowY: 'visible',
                }}
            >
                {items.map((item, index) => (
                    <div
                        key={item.id}
                        style={{
                            animationDelay: `${index * 50}ms`,
                        }}
                        className={`${isVisible ? 'animate-fade-in-up' : ''} flex-shrink-0 ${isHorizontal ? 'w-56 md:w-64' : 'w-48 md:w-56'}`}
                    >
                        <ListingCard item={item} type={type} />
                    </div>
                ))}
            </div>
        </section>
    );
}

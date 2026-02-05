'use client';

import { useRef, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ContentCard from './ContentCard';

export default function ContentSection({ title, items, type }) {
    const scrollRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const [isVisible, setIsVisible] = useState(false);

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
            <div className="flex items-center justify-between mb-6 px-4">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-300">
                    {title}
                </h2>
                <div className="flex space-x-2">
                    <button
                        onClick={() => scroll('left')}
                        disabled={!canScrollLeft}
                        className="p-2 rounded-lg bg-card border border-border hover:bg-accent transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed hover:scale-110"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <button
                        onClick={() => scroll('right')}
                        disabled={!canScrollRight}
                        className="p-2 rounded-lg bg-card border border-border hover:bg-accent transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed hover:scale-110"
                    >
                        <ChevronRight size={20} />
                    </button>
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
                        className={isVisible ? 'animate-fade-in-up' : ''}
                    >
                        <ContentCard item={item} type={type} />
                    </div>
                ))}
            </div>
        </section>
    );
}

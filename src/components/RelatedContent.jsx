'use client';

import React from 'react';
import { ChevronRight, ChevronLeft, Star } from 'lucide-react';
import ListingCard from './ListingCard';

export default function RelatedContent({ type = 'movies' }) {
    // Mock related items
    const relatedItems = [
        { id: 1, title: 'Inception', image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=600&h=338&auto=format&fit=crop', year: '2010', rating: '9.0' },
        { id: 2, title: 'The Dark Knight', image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=600&h=338&auto=format&fit=crop', year: '2008', rating: '9.5' },
        { id: 3, title: 'Interstellar', image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=600&h=338&auto=format&fit=crop', year: '2014', rating: '9.2' },
        { id: 4, title: 'Tenet', image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=600&h=338&auto=format&fit=crop', year: '2020', rating: '8.5' },
        { id: 5, title: 'The Prestige', image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=600&h=338&auto=format&fit=crop', year: '2006', rating: '8.8' },
    ];

    const scrollRef = React.useRef(null);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
            scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
        }
    };

    return (
        <section className="container mx-auto px-4 md:px-6 py-12 border-t border-border overflow-hidden">
            <div className="flex items-center justify-between mb-8">
                <div className="flex flex-col items-start">
                    <h2 className="text-2xl md:text-3xl font-black text-white italic tracking-tighter uppercase mb-2 flex items-center gap-2">
                        Benzer <span className="text-zinc-500">İÇERİKLER</span>
                    </h2>
                    <div className="h-1 w-12 bg-zinc-700/50 rounded-full"></div>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => scroll('left')}
                        className="p-2 rounded-none border border-border hover:bg-accent transition-all hover:scale-110 active:scale-95"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <button
                        onClick={() => scroll('right')}
                        className="p-2 rounded-none border border-border hover:bg-accent transition-all hover:scale-110 active:scale-95"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>

            <div
                ref={scrollRef}
                className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 snap-x"
            >
                {relatedItems.map((item) => (
                    <div key={item.id} className="min-w-[280px] md:min-w-[340px] snap-start animate-fade-in-up">
                        <ListingCard item={item} type={type} />
                    </div>
                ))}
            </div>
        </section>
    );
}

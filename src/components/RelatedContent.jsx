'use client';

import React from 'react';
import { ChevronRight, ChevronLeft, Star } from 'lucide-react';
import ContentCard from './ContentCard'; // Assuming this exists from project context or I'll use a simple placeholder

export default function RelatedContent({ type = 'movies' }) {
    // Mock related items
    const relatedItems = [
        { id: 1, title: 'Inception', image: 'https://images.unsplash.com/photo-1542204172-3c35b89a6962?q=80&w=600&h=338&auto=format&fit=crop', year: '2010', rating: '9.0' },
        { id: 2, title: 'The Dark Knight', image: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?q=80&w=600&h=338&auto=format&fit=crop', year: '2008', rating: '9.5' },
        { id: 3, title: 'Interstellar', image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=600&h=338&auto=format&fit=crop', year: '2014', rating: '9.2' },
        { id: 4, title: 'Tenet', image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=600&h=338&auto=format&fit=crop', year: '2020', rating: '8.5' },
        { id: 5, title: 'The Prestige', image: 'https://images.unsplash.com/photo-1485846234645-a62644ef7467?q=80&w=600&h=338&auto=format&fit=crop', year: '2006', rating: '8.8' },
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
                <h2 className="text-2xl font-bold flex items-center gap-2">
                    <div className="h-1 w-4 bg-primary rounded-sm" />
                    <span>Benzer İçerikler</span>
                </h2>
                <div className="flex gap-2">
                    <button
                        onClick={() => scroll('left')}
                        className="p-2 rounded-sm border border-border hover:bg-accent transition-all hover:scale-110 active:scale-95"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <button
                        onClick={() => scroll('right')}
                        className="p-2 rounded-sm border border-border hover:bg-accent transition-all hover:scale-110 active:scale-95"
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
                        {/* Simple Card Placeholder if ContentCard is not perfectly compatible */}
                        <div className="group relative cursor-pointer space-y-3">
                            <div className="aspect-[16/9] rounded-sm overflow-hidden border border-border bg-accent/20 group-hover:scale-[1.02] transition-all duration-500 shadow-lg group-hover:shadow-primary/20">
                                <img src={item.image} alt={item.title} className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700" />
                                <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded-sm border border-white/10 text-[10px] font-bold text-white flex items-center gap-1">
                                    <Star size={10} className="fill-yellow-500 text-yellow-500" />
                                    {item.rating}
                                </div>
                            </div>
                            <div>
                                <h4 className="font-bold text-sm truncate group-hover:text-primary transition-colors">{item.title}</h4>
                                <p className="text-xs text-muted-foreground">{item.year}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

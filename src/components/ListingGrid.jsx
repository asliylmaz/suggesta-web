'use client';

import { useState, useEffect } from 'react';
import ListingCard from './ListingCard';

export default function ListingGrid({ items, type }) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(false);
        const timer = setTimeout(() => setIsVisible(true), 50);
        return () => clearTimeout(timer);
    }, [items]);

    const isHorizontal = type === 'movies' || type === 'series';
    const gridClass = isHorizontal
        ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4'
        : 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6';

    return (
        <div className="mb-16">
            <div className={gridClass}>
                {items.map((item, index) => (
                    <div
                        key={item.id}
                        style={{
                            animationDelay: `${index * 30}ms`,
                        }}
                        className={`transition-all duration-500 ${isVisible
                            ? 'opacity-100 translate-y-0'
                            : 'opacity-0 translate-y-10'
                            }`}
                    >
                        <ListingCard item={item} type={type} />
                    </div>
                ))}
            </div>
        </div>
    );
}

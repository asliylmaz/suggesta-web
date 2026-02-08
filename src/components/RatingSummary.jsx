'use client';

import React from 'react';
import { Star } from 'lucide-react';

export default function RatingSummary({ stats }) {
    // Mock data if stats not provided
    const ratings = stats || [
        { stars: 10, count: 45, percentage: 85 },
        { stars: 9, count: 25, percentage: 70 },
        { stars: 8, count: 12, percentage: 60 },
        { stars: 7, count: 6, percentage: 40 },
        { stars: 6, count: 4, percentage: 30 },
        { stars: 5, count: 2, percentage: 20 },
        { stars: 4, count: 1, percentage: 10 },
        { stars: 3, count: 0, percentage: 0 },
        { stars: 2, count: 0, percentage: 0 },
        { stars: 1, count: 0, percentage: 0 },
    ];

    const totalVotes = ratings.reduce((acc, curr) => acc + curr.count, 0);

    return (
        <section className="container mx-auto px-4 md:px-6 py-12 border-t border-border">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
                <div className="h-1 w-4 bg-primary rounded-sm" />
                <span>Değerlendirmeler</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
                {/* Large Rating Display */}
                <div className="md:col-span-4 flex flex-col items-center justify-center p-8 bg-accent/20 rounded-sm border border-border animate-fade-in-up">
                    <span className="text-7xl font-black text-primary mb-2">9.2</span>
                    <div className="flex gap-1 mb-4">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                            <Star key={i} size={16} className="text-yellow-500 fill-yellow-500" />
                        ))}
                    </div>
                    <span className="text-muted-foreground font-medium">{totalVotes} Toplam Oy</span>
                </div>

                {/* Distribution Bars */}
                <div className="md:col-span-8 space-y-4">
                    {ratings.map((rating) => (
                        <div key={rating.stars} className="flex items-center gap-4">
                            <span className="text-sm font-bold w-6 flex items-center gap-1">
                                {rating.stars} <Star size={10} className="fill-current" />
                            </span>
                            <div className="flex-1 h-3 bg-muted rounded-sm overflow-hidden">
                                <div
                                    className="h-full bg-primary transition-all duration-1000 ease-out animate-pulse-slow"
                                    style={{ width: `${rating.percentage}%`, animationDelay: `${(10 - rating.stars) * 0.1}s` }}
                                />
                            </div>
                            <span className="text-sm text-muted-foreground w-12 text-right">%{rating.percentage}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

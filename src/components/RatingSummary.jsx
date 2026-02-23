// src/components/RatingSummary.jsx
'use client';

import React from 'react';
import { Star } from 'lucide-react';

export default function RatingSummary({ stats, item }) {
    let totalVotes = 0;
    let averageScore = "0.0";

    if (item) {
        totalVotes = item.tmdbVoteCount || item.vote_count || 0;
        averageScore = item.tmdbVoteAverage ? item.tmdbVoteAverage.toFixed(1) : (item.rating || "0.0");
    } else if (stats) {
        totalVotes = stats.reduce((acc, curr) => acc + curr.count, 0);
        // To strictly rely on TMDB, we won't show mock stats if item is missing
    }

    return (
        <div className="w-full h-full flex mt-6 lg:mt-0">
            <div
                className="relative flex-1 overflow-hidden flex flex-col items-center justify-center p-5 md:p-6 transition-all duration-300 gap-4 w-full h-full"
                style={{
                    borderRadius: 22,
                    background: 'rgba(255,255,255,0.03)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255,255,255,0.10)',
                    boxShadow: '0 16px 48px rgba(0,0,0,0.50), inset 0 1px 0 rgba(255,255,255,0.07)'
                }}
            >
                {/* Subtle top gradient */}
                <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: 120,
                    background: 'radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.04) 0%, transparent 70%)',
                    pointerEvents: 'none',
                }} />

                {/* Shine line */}
                <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: 1,
                    background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.12),transparent)',
                    pointerEvents: 'none',
                }} />

                {/* Top: Score Box */}
                <div className="flex flex-col items-center justify-center relative z-10 text-center w-full">
                    <h2 className="text-lg md:text-xl font-black text-white italic tracking-tighter uppercase mb-2">
                        İZLEYİCİLERİN <span className="text-zinc-500">Kararı</span>
                    </h2>

                    <span className="text-5xl md:text-6xl font-black text-white mb-2 tracking-tighter drop-shadow-md leading-none">{averageScore}</span>
                    <div className="flex gap-1 mb-2">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <Star key={i} size={14} className={i <= Math.round(parseFloat(averageScore) / 2) ? "text-yellow-500 fill-yellow-500 drop-shadow-sm" : "text-white/20 fill-white/20"} />
                        ))}
                    </div>
                    <span className="text-white/50 font-semibold text-[10px] tracking-[0.2em] uppercase">{totalVotes} Toplam Oy</span>
                </div>

                {/* Bottom: Distribution Stats as Wrap Pills 
                <div className="relative z-10 w-full flex flex-wrap justify-center gap-2 mt-2">
                    {ratings.filter(r => r.percentage > 0).map((rating) => (
                        <div key={rating.stars} className="flex items-center gap-1.5 bg-black/20 border border-white/5 px-2.5 py-1 rounded-lg">
                            <span className="text-white/80 font-bold text-xs flex items-center gap-0.5">
                                {rating.stars} <Star size={10} className="text-yellow-500 fill-yellow-500 opacity-90" />
                            </span>
                            <span className="text-white/40 text-[10px] font-medium">{rating.count}</span>
                        </div>
                    ))}
                </div>
                */}

            </div>
        </div>
    );
}

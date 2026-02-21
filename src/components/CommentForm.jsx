'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import RatingStars from '@/components/ui/RatingStars';
//import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'; // I'll assume standard avatar exists or create a simple one

export default function CommentForm({ isLoggedIn = true }) {
    const [rating, setRating] = useState(0);

    if (!isLoggedIn) {
        return (
            <div
                className="p-8 relative overflow-hidden flex flex-col items-center justify-center text-center space-y-4 w-full"
                style={{
                    borderRadius: 22,
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px dashed rgba(255,255,255,0.15)',
                }}
            >
                <p className="text-white/60 font-medium">Yorum yapmak için giriş yapmalısınız.</p>
                <Button
                    className="rounded-full px-8 text-black hover:bg-white/90 font-bold transition-all transform hover:scale-105"
                    style={{
                        background: 'linear-gradient(90deg, #fff, #e5e5e5)',
                        boxShadow: '0 4px 14px rgba(255,255,255,0.25)'
                    }}
                >
                    Giriş Yap
                </Button>
            </div>
        );
    }

    return (
        <div
            className="p-6 md:p-8 relative overflow-hidden w-full"
            style={{
                borderRadius: 22,
                background: 'rgba(255,255,255,0.05)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.10)',
                boxShadow: '0 16px 48px rgba(0,0,0,0.50), inset 0 1px 0 rgba(255,255,255,0.07)'
            }}
        >
            {/* Subtle top gradient */}
            <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 80,
                background: 'radial-gradient(ellipse at 20% 0%, rgba(255,255,255,0.05) 0%, transparent 70%)',
                pointerEvents: 'none',
            }} />

            {/* Shine line */}
            <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 1,
                background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.12),transparent)',
                pointerEvents: 'none',
            }} />

            <div className="flex items-start gap-4 md:gap-5 relative z-10">
                <div className="h-12 w-12 flex-shrink-0 rounded-[14px] bg-zinc-800 border border-white/10 flex items-center justify-center text-white/80 font-bold text-lg shadow-inner">
                    U
                </div>
                <div className="flex-1 space-y-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                        <span className="font-bold text-white/90 font-sans tracking-tight text-lg">Siz</span>
                        <div className="flex items-center gap-3 bg-black/20 px-4 py-2 rounded-full border border-white/5">
                            <span className="text-[11px] font-bold text-white/50 uppercase tracking-widest mt-0.5">Puanınız</span>
                            <RatingStars rating={rating} interactive onRatingChange={setRating} size={15} />
                        </div>
                    </div>
                    <textarea
                        placeholder="Düşüncelerini paylaş..."
                        className="w-full min-h-[120px] bg-black/40 border border-white/10 rounded-[14px] p-5 text-white/90 placeholder-white/20 focus:ring-1 focus:ring-white/20 focus:border-white/30 outline-none transition-all resize-none text-[15px] leading-relaxed"
                    />
                    <div className="flex justify-end pt-2">
                        <button
                            className="px-8 py-3 rounded-full text-black font-bold text-[13px] tracking-wide uppercase transition-all duration-300 transform hover:scale-105"
                            style={{
                                background: 'linear-gradient(90deg, #fff, #e5e5e5)',
                                boxShadow: '0 4px 14px rgba(255,255,255,0.25)'
                            }}
                        >
                            Yorumu Gönder
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

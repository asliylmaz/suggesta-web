'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import RatingStars from '@/components/ui/RatingStars';
//import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'; // I'll assume standard avatar exists or create a simple one

export default function CommentForm({ isLoggedIn = true }) {
    const [rating, setRating] = useState(0);

    if (!isLoggedIn) {
        return (
            <div className="p-8 rounded-sm border-2 border-dashed border-border bg-accent/5 text-center space-y-4 animate-fade-in-up">
                <p className="text-muted-foreground font-medium">Yorum yapmak için giriş yapmalısınız.</p>
                <Button variant="default" className="rounded-sm px-8">
                    Giriş Yap
                </Button>
            </div>
        );
    }

    return (
        <div className="p-6 rounded-sm border border-border bg-card/50 space-y-6 animate-fade-in-up">
            <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-sm bg-primary/20 flex items-center justify-center text-primary font-bold">
                    U
                </div>
                <div className="flex-1 space-y-4">
                    <div className="flex items-center justify-between">
                        <span className="font-semibold">Siz</span>
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground uppercase tracking-wider">Puanınız:</span>
                            <RatingStars rating={rating} interactive onRatingChange={setRating} size={20} />
                        </div>
                    </div>
                    <textarea
                        placeholder="Düşüncelerini paylaş..."
                        className="w-full min-h-[120px] bg-background border border-border rounded-sm p-4 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all resize-none"
                    />
                    <div className="flex justify-end">
                        <Button className="rounded-sm px-8 hover:scale-105 transition-transform duration-300">
                            Yorumu Gönder
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

'use client';

import React from 'react';
import { Star, ThumbsUp } from 'lucide-react';
import RatingStars from '@/components/ui/RatingStars';

export default function CommentItem({ comment }) {
    return (
        <div className="py-8 border-b border-border last:border-0 group animate-fade-in-up">
            <div className="flex gap-4">
                <div className="h-12 w-12 rounded-sm bg-accent/50 flex items-center justify-center text-lg font-bold text-primary shrink-0 transition-transform duration-300 group-hover:scale-105">
                    {comment.username?.[0].toUpperCase() || 'U'}
                </div>
                <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                        <div>
                            <h4 className="font-bold text-foreground">{comment.username}</h4>
                            <div className="flex items-center gap-2 mt-1">
                                <RatingStars rating={comment.rating} size={14} />
                                <span className="text-xs text-muted-foreground">•</span>
                                <span className="text-xs text-muted-foreground">{comment.date}</span>
                            </div>
                        </div>
                        <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors bg-accent/5 hover:bg-accent/20 px-3 py-1.5 rounded-sm">
                            <ThumbsUp size={14} />
                            <span>{comment.likes || 0}</span>
                        </button>
                    </div>
                    <p className="text-muted-foreground leading-relaxed mt-4">
                        {comment.text}
                    </p>
                </div>
            </div>
        </div>
    );
}

'use client';

import React from 'react';
import { Star, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Avatar } from './ui/Avatar'; // Added Avatar import

export default function CommentItem({ comment }) {
    return (
        <div className="bg-card border border-border p-5 rounded-sm transition-all duration-300 hover:border-primary/30">
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <Avatar className="size-10 rounded-sm" />
                    <div>
                        <h4 className="font-bold text-sm text-foreground">{comment.username}</h4>
                        <span className="text-xs text-muted-foreground">{comment.date}</span>
                    </div>
                </div>
                <div className="flex items-center gap-1.5 bg-primary/10 px-2 py-1 rounded-sm border border-primary/20">
                    <Star className="text-primary fill-primary" size={12} />
                    <span className="text-primary font-bold text-xs">{comment.rating}</span>
                </div>
            </div>

            <p className="text-muted-foreground text-sm leading-relaxed mb-4 italic">
                "{comment.text}"
            </p>

            <div className="flex items-center justify-between gap-1.5 pt-4 border-t border-border">
                <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors">
                    <ThumbsUp size={14} />
                    <span> ({comment.likes})</span>
                </button>
                <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors">
                    <ThumbsDown size={14} />
                    <span> ({comment.dislikes})</span>
                </button>
                {/*
                <div className="flex gap-2">
                    <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">Yanıtla</button>
                    <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">Şikayet Et</button>
                </div>
                */}
            </div>
        </div>
    );
}

'use client';

import React, { useState } from 'react';
import { Star, ThumbsUp, ThumbsDown } from 'lucide-react';

export default function CommentItem({ comment }) {
    const [h, setH] = useState(false);

    return (
        <div
            className="p-6 relative overflow-hidden transition-all duration-300 transform"
            onMouseEnter={() => setH(true)}
            onMouseLeave={() => setH(false)}
            style={{
                borderRadius: 22,
                background: h ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.04)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid',
                borderColor: h ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.08)',
                boxShadow: h ? '0 16px 40px rgba(0,0,0,0.50)' : '0 8px 24px rgba(0,0,0,0.30)',
                scale: h ? '1.01' : '1'
            }}
        >
            <div className="flex items-start gap-4 md:gap-5">
                <div className="h-12 w-12 flex-shrink-0 rounded-[14px] bg-zinc-800/80 border border-white/10 flex items-center justify-center text-white/70 font-bold text-lg shadow-inner">
                    {comment.username?.charAt(0)?.toUpperCase()}
                </div>

                <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                        <div>
                            <h4 className="font-bold text-white/90 font-sans tracking-tight text-[15px]">{comment.username}</h4>
                            <span className="text-[11px] font-medium text-white/40 uppercase tracking-wider">{comment.date}</span>
                        </div>
                        <div className="flex items-center gap-1.5 bg-black/40 px-3 py-1.5 rounded-full border border-white/10 shadow-inner">
                            <Star className="text-yellow-500 fill-yellow-500" size={11} />
                            <span className="text-white/90 font-bold text-[11px] tracking-wide">{comment.rating}</span>
                        </div>
                    </div>

                    <p className="text-white/70 text-[14px] leading-relaxed mb-5 antialiased font-light">
                        "{comment.text}"
                    </p>

                    <div className="flex items-center gap-6 pt-4 border-t border-white/5">
                        <button className="flex items-center gap-2 text-[12px] font-medium text-white/40 hover:text-white transition-colors group">
                            <ThumbsUp size={15} className="group-hover:-translate-y-0.5 transition-transform" />
                            <span>({comment.likes})</span>
                        </button>
                        <button className="flex items-center gap-2 text-[12px] font-medium text-white/40 hover:text-white transition-colors group">
                            <ThumbsDown size={15} className="group-hover:translate-y-0.5 transition-transform" />
                            <span>({comment.dislikes})</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

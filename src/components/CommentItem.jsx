'use client';

import React, { useState } from 'react';
import { Star, ThumbsUp, ThumbsDown } from 'lucide-react';

export default function CommentItem({ comment }) {
    const [h, setH] = useState(false);

    // Provide fallbacks for tmdb api structure vs old mock structure
    const authorName = comment.author || comment.username || comment.user.username || 'Anonim';
    const content = comment.content || comment.text || '';
    const rating = comment.rating || (comment.author_details && comment.author_details.rating) || null;
    let commentDate = comment.createdAt || comment.created_at || comment.date || '';

    if (commentDate && (comment.createdAt || comment.created_at)) {
        commentDate = new Date(commentDate).toLocaleDateString('tr-TR', {
            year: 'numeric', month: 'long', day: 'numeric'
        });
    }

    const avatarPath = comment.avatarPath || (comment.author_details && comment.author_details.avatar_path)
        ? `https://image.tmdb.org/t/p/w185${comment.avatarPath || comment.author_details.avatar_path}`
        : null;

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
                <div className="h-12 w-12 flex-shrink-0 rounded-[14px] bg-zinc-800/80 border border-white/10 flex items-center justify-center text-white/70 font-bold text-lg shadow-inner overflow-hidden">
                    {avatarPath ? (
                        <img src={avatarPath} alt={authorName} className="w-full h-full object-cover" />
                    ) : (
                        authorName.charAt(0).toUpperCase()
                    )}
                </div>

                <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                        <div>
                            <h4 className="font-bold text-white/90 font-sans tracking-tight text-[15px]">{authorName}</h4>
                            <span className="text-[11px] font-medium text-white/40 uppercase tracking-wider">{commentDate}</span>
                        </div>
                        {rating && (
                            <div className="flex items-center gap-1.5 bg-black/40 px-3 py-1.5 rounded-full border border-white/10 shadow-inner">
                                <Star className="text-yellow-500 fill-yellow-500" size={11} />
                                <span className="text-white/90 font-bold text-[11px] tracking-wide">{rating}</span>
                            </div>
                        )}
                    </div>

                    <div
                        className="text-white/70 text-[14px] leading-relaxed mb-5 antialiased font-light"
                        dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br/>') }}
                    />
                </div>
            </div>
        </div>
    );
}

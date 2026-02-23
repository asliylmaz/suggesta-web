'use client';

import React, { useState } from 'react';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';
import RatingSummary from './RatingSummary';


export default function CommentSection({ comments = [], stats, item, type, isLoggedIn }) {
    const [visibleCount, setVisibleCount] = useState(10);

    const loadMore = () => {
        setVisibleCount(prev => prev + 10);
    };

    return (
        <section className="container mx-auto px-4 md:px-6 py-12 pb-24">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-black text-white italic tracking-tighter uppercase mb-2 flex items-center justify-center gap-3">
                    Kullanıcı <span className="text-zinc-400">Yorumları</span>
                    <span className="text-lg md:text-xl border border-white/20 text-white/70 bg-white/5 px-3 py-1 rounded-full not-italic">{comments.length}</span>
                </h2>
                <p className="text-zinc-500 font-medium tracking-widest uppercase text-sm">Ne Düşünüyorsunuz?</p>
            </div>

            <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-stretch gap-6 mb-12">
                <div className="w-full lg:w-2/3 flex">
                    <CommentForm isLoggedIn={isLoggedIn} item={item} type={type} />
                </div>
                <div className="w-full lg:w-1/3 flex">
                    <RatingSummary stats={stats} item={item} />
                </div>
            </div>

            <div className="max-w-5xl mx-auto space-y-8">


                {/* Comments List */}
                <div className="space-y-4">
                    {comments.length > 0 ? (
                        comments.slice(0, visibleCount).map((comment, idx) => (
                            <CommentItem key={comment.id || idx} comment={comment} />
                        ))
                    ) : (
                        <div
                            className="py-16 text-center text-white/50 relative overflow-hidden flex flex-col items-center justify-center"
                            style={{
                                borderRadius: 22,
                                background: 'rgba(255,255,255,0.02)',
                                border: '1px dashed rgba(255,255,255,0.15)',
                            }}
                        >
                            Henüz yorum yapılmamış. İlk yorumu sen yap!
                        </div>
                    )}
                </div>

                {comments.length > visibleCount && (
                    <div className="flex justify-center pt-8">
                        <button
                            onClick={loadMore}
                            className="text-sm font-bold tracking-widest uppercase text-white/80 hover:text-white transition-all transform hover:scale-105"
                            style={{
                                padding: '14px 32px',
                                borderRadius: 100,
                                background: 'rgba(255,255,255,0.05)',
                                backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(255,255,255,0.1)'
                            }}
                        >
                            Daha Fazla Göster
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}

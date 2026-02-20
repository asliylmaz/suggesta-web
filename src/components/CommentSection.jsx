'use client';

import React from 'react';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

export default function CommentSection({ comments = [] }) {
    return (
        <section className="container mx-auto px-4 md:px-6 py-12 border-t border-border">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                    <div className="h-1 w-4 bg-primary rounded-none" />
                    <span>Yorumlar</span>
                    <span className="text-sm font-normal text-muted-foreground bg-accent/30 px-2 py-0.5 rounded-none">{comments.length}</span>
                </h2>
            </div>

            <div className="max-w-4xl space-y-12">
                {/* Add Comment Area */}
                <CommentForm isLoggedIn={true} />

                {/* Comments List */}
                <div className="divide-y divide-border">
                    {comments.length > 0 ? (
                        comments.map((comment) => (
                            <CommentItem key={comment.id} comment={comment} />
                        ))
                    ) : (
                        <div className="py-12 text-center text-muted-foreground bg-accent/5 rounded-none border border-dashed border-border">
                            Henüz yorum yapılmamış. İlk yorumu sen yap!
                        </div>
                    )}
                </div>

                {comments.length > 0 && (
                    <div className="flex justify-center pt-8">
                        <button className="text-sm font-semibold text-primary hover:underline hover:scale-105 transition-all">
                            Daha Fazla Göster
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}

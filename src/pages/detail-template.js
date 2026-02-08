'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import ContentHeader from '@/components/ContentHeader';
import ContentInfo from '@/components/ContentInfo';
import RatingSummary from '@/components/RatingSummary';
import CommentSection from '@/components/CommentSection';
import RelatedContent from '@/components/RelatedContent';

export default function DetailTemplatePage() {
    const [isLoading, setIsLoading] = useState(true);

    // Mock data
    const mockItem = {
        id: '1',
        title: 'Interstellar',
        type: 'movies',
        image: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?q=80&w=800&h=1200&auto=format&fit=crop',
        coverImage: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=2000&h=1000&auto=format&fit=crop',
        year: '2014',
        rating: 9.2,
        categories: ['Bilim Kurgu', 'Dram', 'Macera'],
        duration: '2sa 49dk',
        language: 'İngilizce (Türkçe Dublaj/Altyazı)',
        description: 'Dünya’daki yaşamın sona erdiği bir gelecekte, bir grup kaşif insanlık tarihinin en önemli görevini üstlenirler. Güneş sistemi dışına yolculuk yaparak, insanlığın galaksinin ötesinde hayatta kalıp kalamayacağını keşfetmek için bir solucan deliğinden geçerler. Christopher Nolan imzalı bu başyapıt, zaman, uzay ve sevginin sınırlarını zorlayan epik bir yolculuğu konu alıyor.',
        hasTrailer: true,
    };

    const mockComments = [
        { id: 1, username: 'Ahmet Yılmaz', rating: 10, date: '2 gün önce', text: 'Hayatımda izlediğim en iyi filmlerden biri. Görseller ve müzikler (Hans Zimmer!) inanılmaz.', likes: 12 },
        { id: 2, username: 'Elif Kaya', rating: 9, date: '1 hafta önce', text: 'Bilimsel temelleri bu kadar sağlam olan bir kurgu daha önce görmemiştim. Tekrar tekrar izlenmeli.', likes: 5 },
        { id: 3, username: 'Can Demir', rating: 10, date: '2 hafta önce', text: 'Cooper ve Murph arasındaki ilişki beni her seferinde ağlatıyor.', likes: 8 },
    ];

    useEffect(() => {
        // Simulate loading
        const timer = setTimeout(() => setIsLoading(false), 1500);
        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background">
                <Header />
                <div className="animate-pulse space-y-8">
                    {/* Hero Skeleton */}
                    <div className="h-[60vh] bg-accent/20 border-b border-border" />

                    {/* Content Skeleton */}
                    <div className="container mx-auto px-4 md:px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
                        <div className="lg:col-span-2 space-y-6">
                            <div className="h-8 w-32 bg-accent/20 rounded-sm" />
                            <div className="space-y-3">
                                <div className="h-4 w-full bg-accent/10 rounded" />
                                <div className="h-4 w-full bg-accent/10 rounded" />
                                <div className="h-4 w-3/4 bg-accent/10 rounded" />
                            </div>
                            <div className="h-48 w-full bg-accent/10 rounded-sm" />
                        </div>
                        <div className="lg:col-span-1 border border-border rounded-sm p-6 h-64 bg-accent/10" />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-background text-foreground selection:bg-primary/30">
            <Header isLoggedIn={true} />

            <div className="animate-fade-in-down">
                {/* Hero Section */}
                <ContentHeader item={mockItem} />

                {/* Info & Description */}
                <ContentInfo item={mockItem} />

                {/* Rating Summary */}
                <RatingSummary />

                {/* Comment Section */}
                <CommentSection comments={mockComments} />

                {/* Related Content */}
                <RelatedContent type="movies" />
            </div>

            {/* Footer Placeholder */}
            <footer className="py-12 border-t border-border text-center text-muted-foreground text-sm">
                &copy; {new Date().getFullYear()} Suggesta. Sanat ve Kültür Platformu.
            </footer>
        </main>
    );
}

'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from '@/components/Header';
import ContentHeader from '@/components/ContentHeader';
import ContentInfo from '@/components/ContentInfo';
import CommentSection from '@/components/CommentSection';
import RelatedContent from '@/components/RelatedContent';
import { getMovieDetails, getTvDetails, getMovieReviews, getTvReviews } from '@/lib/tmdbService';

export default function DetailPage() {
    const router = useRouter();
    const { type, id } = router.query;

    const [item, setItem] = useState(null);
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchDetails() {
            if (!id || !type) return;

            setIsLoading(true);
            try {
                let data;
                let reviewsData;

                if (type === 'movie' || type === 'movies') {
                    [data, reviewsData] = await Promise.all([
                        getMovieDetails(id),
                        getMovieReviews(id)
                    ]);
                } else if (type === 'tv' || type === 'series') {
                    [data, reviewsData] = await Promise.all([
                        getTvDetails(id),
                        getTvReviews(id)
                    ]);
                }

                if (data) {
                    // Map backend data to component expected structure if needed
                    // Current backend response matches component expectations mostly
                    // Duration formatting
                    let durationStr = "";
                    if (data.runtime) {
                        const hours = Math.floor(data.runtime / 60);
                        const minutes = data.runtime % 60;
                        durationStr = hours > 0 ? `${hours}sa ${minutes}dk` : `${minutes}dk`;
                    } else if (data.duration) {
                        durationStr = data.duration;
                    }

                    setItem({
                        ...data,
                        // Ensure compatibility with components
                        image: data.posterUrl,
                        coverImage: data.backdropUrl || data.posterUrl,
                        year: new Date(data.releaseDate).getFullYear(),
                        rating: data.tmdbVoteAverage ? data.tmdbVoteAverage.toFixed(1) : "0.0",
                        description: data.overview,
                        language: "Türkçe / İngilizce", // Placeholder or from API details if available
                        hasTrailer: false, // Placeholder until trailer support added
                        categories: data.genres, // Map genres to categories
                        duration: durationStr
                    });

                    if (reviewsData && reviewsData.results) {
                        setComments(reviewsData.results);
                    }
                }
            } catch (err) {
                console.error("Detail fetch error:", err);
                setError("İçerik yüklenirken bir sorun oluştu.");
            } finally {
                setIsLoading(false);
            }
        }

        fetchDetails();
    }, [id, type]);

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

    if (error || !item) {
        return (
            <div className="min-h-screen bg-background flex flex-col">
                <Header />
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold mb-4">İçerik Bulunamadı</h1>
                        <p className="text-muted-foreground mb-8">{error || "Aradığınız içeriğe ulaşılamadı."}</p>
                        <button
                            onClick={() => router.push('/')}
                            className="px-6 py-2 bg-primary text-primary-foreground rounded-sm hover:bg-primary/90 transition-colors"
                        >
                            Ana Sayfaya Dön
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-background text-foreground selection:bg-primary/30">
            <Head>
                <title>{item.title} | Suggesta</title>
            </Head>
            <Header isLoggedIn={true} />

            <div className="animate-fade-in-down">
                {/* Hero Section */}
                <ContentHeader item={item} />

                {/* Info & Description */}
                <ContentInfo item={item} />

                {/* Comment Section */}
                <CommentSection comments={comments} item={item} />

                {/* Related Content */}
                <RelatedContent type={type === 'tv' || type === 'series' ? 'series' : 'movies'} />
            </div>

            {/* Footer Placeholder */}
            <footer className="py-12 border-t border-border text-center text-muted-foreground text-sm">
                &copy; {new Date().getFullYear()} Suggesta. Sanat ve Kültür Platformu.
            </footer>
        </main>
    );
}

'use client';

import { useState, useEffect } from 'react';
import Header from './Header';
import ListingGrid from './ListingGrid';
import ListingFilters from './ListingFilters';
import Pagination from './Pagination';
import Top10Section from './Top10Section';
import HeroSection from './HeroSection'; // Reuse as Hero
import CategoryVisualSelector from './CategoryVisualSelector';
import {
    getMoviesByGenre, getTvByGenre,
    getPopularMovies, getPopularSeries,
    getNowPlayingMovies
} from '../lib/tmdbService';
import { MOVIE_GENRES, SERIES_GENRES, GENRE_NAMES } from '../lib/constants';

export default function PageListing({ initialType = 'series', initialCategory = 'all' }) {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [contentType, setContentType] = useState(initialType);
    const [selectedCategory, setSelectedCategory] = useState(initialCategory);
    const [sortBy, setSortBy] = useState('date-desc');
    const [currentPage, setCurrentPage] = useState(1);

    const [items, setItems] = useState([]);
    const [heroItems, setHeroItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const pageTitle = {
        series: 'Diziler',
        movies: 'Filmler',
        books: 'Kitaplar',
        places: 'Mekanlar',
    };

    const getCategoryName = (cat) => {
        if (cat === 'all' || cat === 'popular' || cat === 'now-playing') {
            if (cat === 'popular') return 'Popüler';
            if (cat === 'now-playing') return 'Vizyondakiler';
            return 'Tümü';
        }
        return GENRE_NAMES[cat] || cat;
    };

    const getCategoriesList = () => {
        const base = [{ id: 'all', label: 'Tümü' }];
        const popular = [{ id: 'popular', label: 'Popüler' }];
        const nowPlaying = contentType === 'movies' ? [{ id: 'now-playing', label: 'Vizyonda' }] : [];

        let genreList = [];
        if (contentType === 'movies') {
            genreList = Object.values(MOVIE_GENRES).map(id => ({
                id: id.toString(),
                label: GENRE_NAMES[id]
            }));
        } else if (contentType === 'series') {
            genreList = Object.values(SERIES_GENRES).map(id => ({
                id: id.toString(),
                label: GENRE_NAMES[id]
            }));
        }

        return [...base, ...popular, ...nowPlaying, ...genreList].map(c => ({ id: c.id, name: c.label }));
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                let data = { results: [] };
                let heroData = [];

                // Determine effective category ID
                // Check if selectedCategory is a special keyword or a genre ID

                if (contentType === 'movies') {
                    if (selectedCategory === 'popular') {
                        data = await getPopularMovies(currentPage);
                    } else if (selectedCategory === 'now-playing') {
                        data = await getNowPlayingMovies(currentPage);
                    } else if (selectedCategory !== 'all') {
                        // It's a genre ID
                        data = await getMoviesByGenre(selectedCategory, currentPage);
                    } else {
                        // Default 'all' - maybe popular?
                        data = await getPopularMovies(currentPage);
                    }
                } else if (contentType === 'series') {
                    if (selectedCategory === 'popular') {
                        data = await getPopularSeries(currentPage);
                    } else if (selectedCategory !== 'all') {
                        // Use getTvByGenre for genre filtering
                        data = await getTvByGenre(selectedCategory, currentPage);
                    } else {
                        data = await getPopularSeries(currentPage);
                    }
                }

                setItems(data.results || []);

                // For Hero: Use the first 5 items of the current list as the "Hero" carousel
                if (data.results?.length > 0) {
                    setHeroItems(data.results.slice(0, 5));
                }

            } catch (error) {
                console.error("Error fetching page listing:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
        // Reset to page 1 when category/type changes
    }, [contentType, selectedCategory, currentPage]);

    // Reset pagination when filter changes
    useEffect(() => {
        setCurrentPage(1);
    }, [contentType, selectedCategory]);


    return (
        <div className="min-h-screen bg-black text-white">
            <Header isLoggedIn={isLoggedIn} />

            <main className="pb-20">

                <div className="w-full relative z-20 mt-16">
                    {/* Category Visual Selector */}
                    <CategoryVisualSelector
                        genres={getCategoriesList()}
                        selectedCategory={selectedCategory}
                        onCategoryChange={setSelectedCategory}
                    />
                </div>

                <div className="container mx-auto px-4 relative z-10 mt-8">
                    {/* Page Header */}


                    {/* Content Grid */}
                    {loading ? (
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                            {[...Array(10)].map((_, i) => (
                                <div key={i} className="aspect-[2/3] bg-zinc-900 animate-pulse rounded-none" />
                            ))}
                        </div>
                    ) : (
                        <ListingGrid items={items} type={contentType} />
                    )}

                    {/* Pagination */}
                    <Pagination
                        currentPage={currentPage}
                        totalPages={10} // Mock total pages for now content API limits
                        onPageChange={setCurrentPage}
                    />
                </div>
            </main>

            {/* Footer */}
            <footer className="border-t border-zinc-900 mt-20 bg-zinc-950">
                <div className="container mx-auto px-4 py-8 text-center text-zinc-500">
                    <p>© 2026 Suggesta. Tüm hakları saklıdır.</p>
                </div>
            </footer>
        </div>
    );
}

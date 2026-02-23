'use client';

import { useState, useEffect } from 'react';
import CategoryHub from '@/components/CategoryHub';
import { getPopularMovies, getNowPlayingMovies, getMoviesByGenre } from '../../lib/tmdbService';
import { MOVIE_GENRES, GENRE_NAMES } from '../../lib/constants';

export default function MoviesPage() {
    const [pageData, setPageData] = useState({
        featured: [],
        sections: []
    });

    useEffect(() => {
        const fetchContent = async () => {
            try {
                // Fetch key sections
                const [
                    popular,
                    nowPlaying,
                    action,
                    comedy,
                    drama,
                    sciFi,
                    horror
                ] = await Promise.all([
                    getPopularMovies(1),
                    getNowPlayingMovies(1),
                    getMoviesByGenre(MOVIE_GENRES.ACTION, 1),
                    getMoviesByGenre(MOVIE_GENRES.COMEDY, 1),
                    getMoviesByGenre(MOVIE_GENRES.DRAMA, 1),
                    getMoviesByGenre(MOVIE_GENRES.SCIENCE_FICTION, 1),
                    getMoviesByGenre(MOVIE_GENRES.HORROR, 1)
                ]);

                setPageData({
                    featured: popular.results.slice(0, 10), // Use popular for hero
                    sections: [
                        { title: 'Vizyondakiler', items: nowPlaying.results, link: '/movies/now-playing' },
                        { title: 'Popüler Filmler', items: popular.results, link: '/movies/popular' },
                        { title: GENRE_NAMES[MOVIE_GENRES.ACTION], items: action.results, link: `/movies/${MOVIE_GENRES.ACTION}` },
                        { title: GENRE_NAMES[MOVIE_GENRES.COMEDY], items: comedy.results, link: `/movies/${MOVIE_GENRES.COMEDY}` },
                        { title: GENRE_NAMES[MOVIE_GENRES.DRAMA], items: drama.results, link: `/movies/${MOVIE_GENRES.DRAMA}` },
                        { title: GENRE_NAMES[MOVIE_GENRES.SCIENCE_FICTION], items: sciFi.results, link: `/movies/${MOVIE_GENRES.SCIENCE_FICTION}` },
                        { title: GENRE_NAMES[MOVIE_GENRES.HORROR], items: horror.results, link: `/movies/${MOVIE_GENRES.HORROR}` },
                    ]
                });
            } catch (error) {
                console.error("Error fetching movies hub data:", error);
            }
        };

        fetchContent();
    }, []);

    return (
        <CategoryHub
            title="Filmler"
            type="movies"
            featuredItems={pageData.featured}
            sections={pageData.sections}
        />
    );
}

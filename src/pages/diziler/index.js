'use client';

import { useState, useEffect } from 'react';
import CategoryHub from '@/components/CategoryHub';
import { getPopularSeries, getTvByGenre } from '../../lib/tmdbService';
import { SERIES_GENRES, GENRE_NAMES } from '../../lib/constants';

// For "Now Playing" or similar for TV, usually "Airing Today" or "On The Air" is better, 
// using generic "Popular" for hero for now. 
// Can add "getTopRatedSeries" to tmdbService if needed.

export default function SeriesPage() {
    const [pageData, setPageData] = useState({
        featured: [],
        sections: []
    });

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const [
                    popular,
                    actionAdv,
                    animation,
                    comedy,
                    drama,
                    sciFiFantasy
                ] = await Promise.all([
                    getPopularSeries(1),
                    getTvByGenre(SERIES_GENRES.ACTION_ADVENTURE, 1),
                    getTvByGenre(SERIES_GENRES.ANIMATION, 1),
                    getTvByGenre(SERIES_GENRES.COMEDY, 1),
                    getTvByGenre(SERIES_GENRES.DRAMA, 1),
                    getTvByGenre(SERIES_GENRES.SCI_FI_FANTASY, 1)
                ]);

                setPageData({
                    featured: popular.results.slice(0, 10),
                    sections: [
                        { title: 'Popüler Diziler', items: popular.results, link: '/diziler/popular' },
                        { title: GENRE_NAMES[SERIES_GENRES.ACTION_ADVENTURE], items: actionAdv.results, link: `/diziler/${SERIES_GENRES.ACTION_ADVENTURE}` },
                        { title: GENRE_NAMES[SERIES_GENRES.COMEDY], items: comedy.results, link: `/diziler/${SERIES_GENRES.COMEDY}` },
                        { title: GENRE_NAMES[SERIES_GENRES.DRAMA], items: drama.results, link: `/diziler/${SERIES_GENRES.DRAMA}` },
                        { title: GENRE_NAMES[SERIES_GENRES.SCI_FI_FANTASY], items: sciFiFantasy.results, link: `/diziler/${SERIES_GENRES.SCI_FI_FANTASY}` },
                        { title: GENRE_NAMES[SERIES_GENRES.ANIMATION], items: animation.results, link: `/diziler/${SERIES_GENRES.ANIMATION}` },
                    ]
                });
            } catch (error) {
                console.error("Error fetching series hub data:", error);
            }
        };

        fetchContent();
    }, []);

    return (
        <CategoryHub
            title="Diziler"
            type="series"
            featuredItems={pageData.featured}
            sections={pageData.sections}
        />
    );
}

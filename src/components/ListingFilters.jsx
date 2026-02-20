'use client';

import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { MOVIE_GENRES, SERIES_GENRES, GENRE_NAMES } from '../lib/constants';

export default function ListingFilters({ selectedCategory, onCategoryChange, sortBy, onSortChange, type }) {
    const [isSortOpen, setIsSortOpen] = useState(false);

    const getCategories = () => {

        const base = [{ id: 'all', label: 'Tümü' }];
        const popular = [{ id: 'popular', label: 'Popüler' }];
        const nowPlaying = type === 'movies' ? [{ id: 'now-playing', label: 'Vizyondakiler' }] : [];

        let genreList = [];
        if (type === 'movies') {
            genreList = Object.values(MOVIE_GENRES).map(id => ({
                id: id.toString(),
                label: GENRE_NAMES[id]
            }));
        } else if (type === 'series') {
            genreList = Object.values(SERIES_GENRES).map(id => ({
                id: id.toString(),
                label: GENRE_NAMES[id]
            }));
        } else {
            // Fallback for Books/Places (Mock)
            return [
                { id: 'all', label: 'Tümü' },
                { id: 'popular', label: 'Popüler' },
                { id: 'recent', label: 'Son Eklenenler' }
            ];
        }

        return [...base, ...popular, ...nowPlaying, ...genreList];
    };
    const sortOptions = [
        { id: 'popularity.desc', label: 'Popüler' },
        { id: 'release_date.desc', label: 'Yeni Eklenenler' },
        { id: 'vote_average.desc', label: 'Yüksek Puanlılar' },
        { id: 'vote_count.desc', label: 'En Çok Oy Alanlar' },
    ];
    const categories = getCategories();

    return (
        <div className="mb-12 animate-fade-in-up">
            {/* Container */}
            <div className="bg-card border border-border rounded-none p-6 shadow-lg">
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Category Selection */}
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-muted-foreground mb-3">
                            Kategori
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {categories.map((category) => (
                                <button
                                    key={category.id}
                                    onClick={() => onCategoryChange(category.id)}
                                    className={`px-4 py-2 rounded-none text-sm font-medium transition-all duration-300 ${selectedCategory?.toString() === category.id
                                        ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30 scale-105'
                                        : 'bg-secondary text-secondary-foreground hover:bg-background hover:scale-105'
                                        }`}
                                >
                                    {category.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Sorting Selection */}
                    <div className="lg:w-80">
                        <label className="block text-sm font-medium text-muted-foreground mb-3">
                            Sıralama
                        </label>
                        <div className="relative">
                            <button
                                onClick={() => setIsSortOpen(!isSortOpen)}
                                className="w-full px-4 py-3 bg-secondary text-secondary-foreground rounded-none border border-border hover:bg-background transition-all duration-300 flex items-center justify-between group"
                            >
                                <span className="text-sm font-medium">
                                    {sortOptions.find((opt) => opt.id === sortBy)?.label}
                                </span>
                                <ChevronDown
                                    size={18}
                                    className={`transition-transform duration-300 ${isSortOpen ? 'rotate-180' : ''
                                        }`}
                                />
                            </button>

                            {/* Dropdown */}
                            {isSortOpen && (
                                <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-none shadow-2xl overflow-hidden z-50 animate-fade-in-down">
                                    {sortOptions.map((option) => (
                                        <button
                                            key={option.id}
                                            onClick={() => {
                                                onSortChange(option.id);
                                                setIsSortOpen(false);
                                            }}
                                            className={`w-full px-4 py-3 text-left text-sm transition-all duration-200 ${sortBy === option.id
                                                ? 'bg-primary text-primary-foreground font-medium'
                                                : 'text-popover-foreground hover:bg-background'
                                                }`}
                                        >
                                            {option.label}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

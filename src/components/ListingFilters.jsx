'use client';

import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function ListingFilters({ selectedCategory, onCategoryChange, sortBy, onSortChange }) {
    const [isSortOpen, setIsSortOpen] = useState(false);

    const categories = [
        { id: 'all', label: 'Tümü' },
        { id: 'action', label: 'Aksiyon' },
        { id: 'drama', label: 'Dram' },
        { id: 'comedy', label: 'Komedi' },
        { id: 'scifi', label: 'Bilim Kurgu' },
        { id: 'romance', label: 'Romantik' },
    ];

    const sortOptions = [
        { id: 'date-desc', label: 'Eklenme Tarihi (Yeni → Eski)' },
        { id: 'release-desc', label: 'Yayın Tarihi (Yeni → Eski)' },
        { id: 'release-asc', label: 'Yayın Tarihi (Eski → Yeni)' },
        { id: 'rating-desc', label: 'Puan (Yüksek → Düşük)' },
        { id: 'rating-asc', label: 'Puan (Düşük → Yüksek)' },
    ];

    return (
        <div className="mb-12 animate-fade-in-up">
            {/* Container */}
            <div className="bg-card border border-border rounded-l p-6 shadow-lg">
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
                                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${selectedCategory === category.id
                                        ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30 scale-105'
                                        : 'bg-secondary text-secondary-foreground hover:bg-accent hover:scale-105'
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
                                className="w-full px-4 py-3 bg-secondary text-secondary-foreground rounded-xl border border-border hover:bg-accent transition-all duration-300 flex items-center justify-between group"
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
                                <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-xl shadow-2xl overflow-hidden z-50 animate-fade-in-down">
                                    {sortOptions.map((option) => (
                                        <button
                                            key={option.id}
                                            onClick={() => {
                                                onSortChange(option.id);
                                                setIsSortOpen(false);
                                            }}
                                            className={`w-full px-4 py-3 text-left text-sm transition-all duration-200 ${sortBy === option.id
                                                ? 'bg-primary text-primary-foreground font-medium'
                                                : 'text-popover-foreground hover:bg-accent'
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

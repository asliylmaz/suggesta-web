'use client';

import { useState } from 'react';
import Header from '../components/Header';
import ListingGrid from '../components/ListingGrid';
import ListingFilters from '../components/ListingFilters';
import Pagination from '../components/Pagination';
import Top10Section from '../components/Top10Section';

export default function ListingPage() {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [contentType, setContentType] = useState('series'); // 'series', 'movies', 'books'
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [sortBy, setSortBy] = useState('date-desc');
    const [currentPage, setCurrentPage] = useState(1);

    // Mock data - replace with real API calls later
    const mockItems = Array.from({ length: 48 }, (_, i) => ({
        id: `${contentType}-${i}`,
        title: `${contentType === 'series' ? 'Dizi' : contentType === 'movies' ? 'Film' : 'Kitap'} ${i + 1}`,
        image: `https://picsum.photos/seed/${contentType}${i}/300/450`,
        rating: (Math.random() * 2 + 7).toFixed(1),
        year: 2020 + Math.floor(Math.random() * 5),
        category: ['Aksiyon', 'Dram', 'Komedi', 'Bilim Kurgu', 'Romantik'][Math.floor(Math.random() * 5)],
    }));

    const mockTop10 = Array.from({ length: 10 }, (_, i) => ({
        id: `top-${contentType}-${i}`,
        title: `${contentType === 'series' ? 'Dizi' : contentType === 'movies' ? 'Film' : 'Kitap'} ${i + 1}`,
        image: `https://picsum.photos/seed/top${contentType}${i}/800/450`,
        rating: (9.5 - i * 0.3).toFixed(1),
        year: 2023,
        rank: i + 1,
    }));

    const pageTitle = {
        series: 'Tüm Diziler',
        movies: 'Tüm Filmler',
        books: 'Tüm Kitaplar',
    };

    const itemsPerPage = 20;
    const totalPages = Math.ceil(mockItems.length / itemsPerPage);
    const paginatedItems = mockItems.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="min-h-screen bg-background">
            <Header isLoggedIn={isLoggedIn} />

            <main className="container mx-auto py-8 px-2">
                {/* Page Header */}
                <div className="text-center mb-12 animate-fade-in-down">
                    <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3">
                        {pageTitle[contentType]}
                    </h1>
                    <p className="text-muted-foreground text-lg">
                        Keşfet, puanla, favorilerine ekle
                    </p>
                </div>

                {/* Filters & Sorting */}
                <ListingFilters
                    selectedCategory={selectedCategory}
                    onCategoryChange={setSelectedCategory}
                    sortBy={sortBy}
                    onSortChange={setSortBy}
                />

                {/* Content Grid */}
                <ListingGrid items={paginatedItems} type={contentType} />

                {/* Pagination */}
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />

                {/* Top 10 Section */}
                <Top10Section
                    items={mockTop10}
                    category={selectedCategory}
                    contentType={contentType}
                />
            </main>

            {/* Footer */}
            <footer className="border-t border-border mt-20">
                <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">
                    <p>© 2026 Suggesta. Tüm hakları saklıdır.</p>
                </div>
            </footer>
        </div>
    );
}

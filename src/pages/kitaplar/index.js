'use client';

import { useState, useEffect } from 'react';
import CategoryHub from '@/components/CategoryHub';

export default function BooksPage() {
    // Mock Data for Books
    const mockBooks = Array.from({ length: 15 }, (_, i) => ({
        id: i,
        title: `Kitap Başlığı ${i + 1}`,
        image: `https://picsum.photos/seed/book${i}/300/450`,
        rating: (4 + Math.random()).toFixed(1),
        year: 2024
    }));

    const pageData = {
        featured: mockBooks.slice(0, 5),
        sections: [
            { title: 'Çok Okunanlar', items: mockBooks, link: '/kitaplar/popular' },
            { title: 'Yeni Çıkanlar', items: mockBooks.slice(5).concat(mockBooks.slice(0, 5)), link: '/kitaplar/new' },
            { title: 'Edebiyat', items: mockBooks.reverse(), link: '/kitaplar/literature' },
            { title: 'Kişisel Gelişim', items: mockBooks, link: '/kitaplar/self-help' },
        ]
    };

    return (
        <CategoryHub
            title="Kitaplar"
            type="books"
            featuredItems={pageData.featured}
            sections={pageData.sections}
        />
    );
}

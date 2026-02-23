'use client';

import { useState, useEffect } from 'react';
import CategoryHub from '@/components/CategoryHub';

export default function PlacesPage() {
    // Mock Data for Places
    const mockPlaces = Array.from({ length: 15 }, (_, i) => ({
        id: i,
        title: `Mekan İsmi ${i + 1}`,
        image: `https://picsum.photos/seed/place${i}/600/600`,
        rating: (4 + Math.random()).toFixed(1),
        year: 'İstanbul',
        backdrop: `https://picsum.photos/seed/place_bg${i}/800/450`
    }));

    const pageData = {
        featured: mockPlaces.slice(0, 5),
        sections: [
            { title: 'Popüler Mekanlar', items: mockPlaces, link: '/places/popular' },
            { title: 'Yeni Keşifler', items: mockPlaces.slice(5).concat(mockPlaces.slice(0, 5)), link: '/places/new' },
            { title: 'Restoranlar', items: mockPlaces.reverse(), link: '/places/restaurants' },
            { title: 'Kafeler', items: mockPlaces, link: '/places/cafes' },
        ]
    };

    return (
        <CategoryHub
            title="Mekanlar"
            type="places"
            featuredItems={pageData.featured}
            sections={pageData.sections}
        />
    );
}

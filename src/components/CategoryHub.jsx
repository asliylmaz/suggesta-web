import Header from '@/components/Header';
import ContentSection from '@/components/ContentSection';
import ListingCard from '@/components/ListingCard';
import HeroSection from '@/components/HeroSection';
import { useState } from 'react';

/**
 * Shared layout for Category Hubs (Movies, Series, Books, Places)
 * 
 * @param {string} title - Page title (e.g. "Filmler")
 * @param {string} type - Content type for links ('movies', 'series', etc.)
 * @param {Array} featuredItems - Items for the hero carousel top section
 * @param {Array} sections - Array of { title, items, link }
 */
export default function CategoryHub({ title, type, featuredItems = [], sections = [] }) {
    const [isLoggedIn] = useState(true);

    return (
        <div className="min-h-screen bg-black text-white">
            <Header isLoggedIn={isLoggedIn} />

            <main className="pb-20">
                {/* Hero Section (Popular/Featured) */}
                {featuredItems.length > 0 && (
                    <HeroSection
                        items={featuredItems}
                        type={type}
                    />
                )}

                {/* Horizontal Scrolling Sections */}
                <div className="container mx-auto px-4 -mt-10 relative z-10">
                    {sections.map((section, index) => (
                        <ContentSection
                            key={index}
                            title={section.title}
                            items={section.items}
                            type={type}
                            viewAllLink={section.link}
                        />
                    ))}
                </div>
            </main>

            {/* Footer */}
            <footer className="border-t border-zinc-900 mt-20 bg-zinc-950">
                <div className="container mx-auto px-4 py-12 text-center text-zinc-500">
                    <p>© 2026 Suggesta. Tüm hakları saklıdır.</p>
                </div>
            </footer>
        </div>
    );
}

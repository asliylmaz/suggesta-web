'use client';

import { useState } from 'react';
import Header from '../components/Header';
import OnboardingSlider from '../components/OnboardingSlider';
import RandomPick from '../components/RandomPick';
import ContentSection from '../components/ContentSection';

export default function HomePage() {
  // Toggle this to test logged in/out states
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(true);

  // Mock data - replace with real API calls later
  const mockSeries = Array.from({ length: 24 }, (_, i) => ({
    id: `series-${i}`,
    title: `Dizi ${i + 1}`,
    image: `https://picsum.photos/seed/series${i}/300/450`,
    rating: (7.5 + (i % 25) / 10).toFixed(1),
    votes: 1200 + (i * 45),
  }));

  const mockMovies = Array.from({ length: 24 }, (_, i) => ({
    id: `movie-${i}`,
    title: `Film ${i + 1}`,
    image: `https://picsum.photos/seed/movie${i}/300/450`,
    rating: (7.8 + (i % 22) / 10).toFixed(1),
    votes: 2100 + (i * 67),
  }));

  const mockBooks = Array.from({ length: 24 }, (_, i) => ({
    id: `book-${i}`,
    title: `Kitap ${i + 1}`,
    image: `https://picsum.photos/seed/book${i}/300/450`,
    rating: (8.2 + (i % 18) / 10).toFixed(1),
    votes: 800 + (i * 32),
  }));

  const mockPlaces = Array.from({ length: 24 }, (_, i) => ({
    id: `place-${i}`,
    title: `Yer ${i + 1}`,
    image: `https://picsum.photos/seed/place${i}/300/450`,
    rating: (8.5 + (i % 15) / 10).toFixed(1),
    votes: 500 + (i * 15),
  }));

  const allContent = [...mockSeries, ...mockMovies, ...mockBooks, ...mockPlaces];

  return (
    <div className="min-h-screen bg-background">
      <Header isLoggedIn={isLoggedIn} />

      <main className="container mx-auto py-8">
        {/* Onboarding Slider - Only for logged in users */}
        {isLoggedIn && showOnboarding && (
          <OnboardingSlider
            onClose={() => setShowOnboarding(false)}
            onDismiss={() => {
              setShowOnboarding(false);
              // In real app, save to localStorage or user preferences
            }}
          />
        )}

        {/* Random Pick Widgets - 4 separate widgets */}
        <div className="mb-20 mt-20 px-4">
          <h2 className="text-3xl font-bold text-slate-300 mb-6 text-center">Acaba Bugün..</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <RandomPick items={mockSeries} title="Hangi Diziyi İzlesem?" />
            <RandomPick items={mockMovies} title="Hangi Filmi İzlesem?" />
            <RandomPick items={mockBooks} title="Hangi Kitabı Okusam?" />
            <RandomPick items={mockPlaces} title="Nereye Gitsem?" />
          </div>
        </div>

        {/* Content Sections */}
        <ContentSection
          title="Diziler"
          items={mockSeries}
          type="series"
        />

        <ContentSection
          title="Filmler"
          items={mockMovies}
          type="movies"
        />

        <ContentSection
          title="Yerler"
          items={mockPlaces}
          type="places"
        />

        <ContentSection
          title="Kitaplar"
          items={mockBooks}
          type="books"
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

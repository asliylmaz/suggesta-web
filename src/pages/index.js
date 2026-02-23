'use client';

import { useState, useEffect } from 'react';
import Header from '../components/Header';
import OnboardingSlider from '../components/OnboardingSlider';
import RandomPick from '../components/RandomPick';
import PopularMediaSection from '../components/home/PopularMediaSection';
import PopularBooksSection from '../components/home/PopularBooksSection';
import PopularPlacesSection from '../components/home/PopularPlacesSection';
import { getPopularMovies, getPopularSeries } from '../lib/tmdbService';

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  // Real Data State
  const [popularMovies, setPopularMovies] = useState([]);
  const [popularSeries, setPopularSeries] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [popular, popularSeriesData] = await Promise.all([
          getPopularMovies(),
          getPopularSeries()
        ]);

        const mapToCard = (movie) => ({
          id: movie.externalId,
          title: movie.title,
          image: movie.posterUrl,
          backdrop: movie.backdropUrl,
          rating: movie.tmdbVoteAverage ? movie.tmdbVoteAverage.toFixed(1) : "0.0",
          votes: movie.tmdbVoteCount,
          year: movie.releaseDate ? new Date(movie.releaseDate).getFullYear() : '2024'
        });

        setPopularMovies(popular.results.map(mapToCard));
        setPopularSeries(popularSeriesData.results.map(mapToCard));

      } catch (error) {
        console.error("Failed to fetch movies:", error);
      }
    }

    fetchData();
  }, []);

  // Mock data for other categories (kept for layout consistency)
  const mockBooks = Array.from({ length: 12 }, (_, i) => ({
    id: `book-${i}`,
    title: `Kitap ${i + 1}`,
    image: `https://picsum.photos/seed/book${i}/300/450`,
    rating: (8.2 + (i % 18) / 10).toFixed(1),
    votes: 800 + (i * 32),
  }));

  const mockPlaces = Array.from({ length: 12 }, (_, i) => ({
    id: `place-${i}`,
    title: `Yer ${i + 1}`,
    image: `https://picsum.photos/seed/place${i}/300/450`,
    rating: (8.5 + (i % 15) / 10).toFixed(1),
    votes: 500 + (i * 15),
  }));

  return (
    <div className="min-h-screen bg-background">
      <Header isLoggedIn={isLoggedIn} />

      <main className="container mx-auto py-8 pt-24">

        <OnboardingSlider />

        {/* Random Pick Widgets - 4 separate widgets */}
        <div className="mb-24 mt-8 px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-white italic tracking-tighter uppercase mb-2">
              Bugün Ne <span className="text-zinc-600">Yapsam?</span>
            </h2>
            <p className="text-zinc-500 font-medium tracking-widest uppercase text-sm">Sizin için seçtiklerimiz</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <RandomPick type="tv" items={popularSeries} title="Dizi Önerisi" />
            <RandomPick type="movie" items={popularMovies} title="Film Önerisi" />
            <RandomPick type="books" items={mockBooks} title="Kitap Önerisi" />
            <RandomPick type="places" items={mockPlaces} title="Mekan Önerisi" />
          </div>
        </div>

        {/* Content Sections - Specialized Popular Lists Only */}

        <PopularMediaSection
          title="Popüler Filmler"
          items={popularMovies}
          type="movies"
        />

        <PopularMediaSection
          title="Popüler Diziler"
          items={popularSeries}
          type="series"
        />

        <PopularBooksSection
          title="Popüler Kitaplar"
          items={mockBooks}
        />

        <PopularPlacesSection
          title="Popüler Mekanlar"
          items={mockPlaces}
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

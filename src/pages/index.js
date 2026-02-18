'use client';

import { useState, useEffect } from 'react';
import Header from '../components/Header';
import OnboardingSlider from '../components/OnboardingSlider';
import RandomPick from '../components/RandomPick';
import ContentSection from '../components/ContentSection';
import { getPopularMovies, getNowPlayingMovies, getMoviesByGenre, getPopularSeries } from '../lib/tmdbService';

export default function HomePage() {
  // Toggle this to test logged in/out states
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(true);

  // Real Data State
  const [popularMovies, setPopularMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [actionMovies, setActionMovies] = useState([]);
  const [romanceMovies, setRomanceMovies] = useState([]);
  const [popularSeries, setPopularSeries] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [popular, nowPlaying, action, romance, popularSeries] = await Promise.all([
          getPopularMovies(),
          getNowPlayingMovies(),
          getMoviesByGenre(28), // Action
          getMoviesByGenre(10749), // Romance
          getPopularSeries()
        ]);

        const mapToCard = (movie) => ({
          id: movie.externalId,
          title: movie.title,
          image: movie.posterUrl,
          backdrop: movie.backdropUrl,
          rating: movie.tmdbVoteAverage ? movie.tmdbVoteAverage.toFixed(1) : "0.0",
          votes: movie.tmdbVoteCount
        });

        setPopularMovies(popular.results.map(mapToCard));
        setNowPlayingMovies(nowPlaying.results.map(mapToCard));
        setActionMovies(action.results.map(mapToCard));
        setRomanceMovies(romance.results.map(mapToCard));
        setPopularSeries(popularSeries.results.map(mapToCard));

      } catch (error) {
        console.error("Failed to fetch movies:", error);
      }
    }

    fetchData();
  }, []);

  // Mock data for other categories (kept for layout consistency)
  const mockSeries = Array.from({ length: 12 }, (_, i) => ({
    id: `series-${i}`,
    title: `Dizi ${i + 1}`,
    image: `https://picsum.photos/seed/series${i}/300/450`,
    rating: (7.5 + (i % 25) / 10).toFixed(1),
    votes: 1200 + (i * 45),
  }));

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
            <RandomPick items={popularMovies} title="Hangi Filmi İzlesem?" />
            <RandomPick items={mockBooks} title="Hangi Kitabı Okusam?" />
            <RandomPick items={mockPlaces} title="Nereye Gitsem?" />
          </div>
        </div>

        {/* Content Sections */}

        {/* Real TMDB Data */}
        <ContentSection
          title="Vizyondaki Filmler"
          items={nowPlayingMovies}
          type="movies"
        />

        <ContentSection
          title="Popüler Filmler"
          items={popularMovies}
          type="movies"
        />

        <ContentSection
          title="Aksiyon Filmleri"
          items={actionMovies}
          type="movies"
        />

        <ContentSection
          title="Romantik Filmler"
          items={romanceMovies}
          type="movies"
        />

        {/* Mock Data Sections */}
        <ContentSection
          title="Popüler Diziler"
          items={popularSeries}
          type="series"
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

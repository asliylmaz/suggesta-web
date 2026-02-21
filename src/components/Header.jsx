'use client';

import { useState, useEffect } from 'react';
import { Menu, X, User, LogOut, Search, Bell } from 'lucide-react';
import { useAuth } from "@/context/AuthContext";
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Header() {
  const { user, logout } = useAuth();
  const isLoggedIn = !!user;
  const router = useRouter();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'Ana Sayfa', href: '/' },
    { label: 'Diziler', href: '/diziler' },
    { label: 'Filmler', href: '/filmler' },
    { label: 'Kitaplar', href: '/kitaplar' },
    { label: 'Yerler', href: '/yerler' },
  ];

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out border-b ${isScrolled
        ? 'bg-black/90 backdrop-blur-md border-white/5 py-3'
        : 'bg-gradient-to-b from-black/80 to-transparent border-transparent py-5'
        }`}
    >
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">

        {/* Logo Area */}
        <div className="flex items-center gap-8">
          <Link href="/" className="group relative">
            <div className="text-3xl font-black tracking-tighter text-white group-hover:scale-105 transition-transform duration-300">
              SUGGESTA
              <span className="text-primary text-4xl leading-none">.</span>
            </div>
            {/* Glow effect behind logo */}
            <div className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-1">
            {menuItems.map((item) => {
              const isActive = router.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-2 text-sm font-medium transition-colors duration-300 relative group overflow-hidden ${isActive ? 'text-white' : 'text-zinc-400 hover:text-white'
                    }`}
                >
                  <span className="relative z-10">{item.label}</span>
                  {/* Hover underline glow */}
                  <span className={`absolute bottom-0 left-0 w-full h-[1px] bg-primary shadow-[0_0_10px_var(--primary)] transition-transform duration-300 origin-left ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Right Section: Search, Bell, Profile */}
        <div className="flex items-center gap-2 md:gap-4">

          {/* Search Icon */}
          <button className="p-2 text-zinc-400 hover:text-white transition-colors hover:scale-110 active:scale-95">
            <Search size={20} />
          </button>

          {/* Notifications */}
          <button className="p-2 text-zinc-400 hover:text-white transition-colors hover:scale-110 active:scale-95 relative">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full shadow-[0_0_5px_var(--primary)]" />
          </button>

          {/* Auth / Profile */}
          {isLoggedIn ? (
            <div className="relative ml-2">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-3 group"
              >
                <div className="w-9 h-9 bg-zinc-800 border border-zinc-700 flex items-center justify-center group-hover:border-primary/50 group-hover:shadow-[0_0_10px_rgba(255,255,255,0.1)] transition-all duration-300 overflow-hidden">
                  <User size={18} className="text-zinc-300 group-hover:text-white" />
                </div>
              </button>

              {/* Dropdown - Sharp edges */}
              {isProfileOpen && (
                <div className="absolute right-0 top-full mt-4 w-56 bg-zinc-950 border border-zinc-800 shadow-2xl animate-fade-in-down origin-top-right">
                  <div className="p-4 border-b border-zinc-900 mb-2">
                    <p className="text-sm font-medium text-white">{user?.username || 'Kullanıcı'}</p>
                    <p className="text-xs text-zinc-500 truncate">{user?.email || 'user@suggesta.com'}</p>
                  </div>

                  <Link href="/profile" className="flex items-center gap-3 px-4 py-2 text-sm text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors">
                    <User size={16} />
                    Profil
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-500 hover:text-red-400 hover:bg-zinc-900 transition-colors text-left"
                  >
                    <LogOut size={16} />
                    Çıkış Yap
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3 ml-2">
              <button className="text-sm font-medium text-white/80 hover:text-white transition-colors">
                Giriş
              </button>
              <button className="px-5 py-2 rounded-full text-sm font-bold bg-white text-black hover:bg-zinc-200 transition-colors shadow-lg hover:shadow-white/20">
                Kayıt Ol
              </button>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl border-b border-zinc-800 animate-fade-in-down">
          <nav className="flex flex-col p-4">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="py-3 px-4 text-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors border-l-2 border-transparent hover:border-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

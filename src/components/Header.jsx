'use client';

import { useState } from 'react';
import { Menu, X, User, LogOut } from 'lucide-react';

export default function Header({ isLoggedIn = false }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const leftMenuItems = [
    { label: 'Diziler', href: '#diziler' },
    { label: 'Filmler', href: '#filmler' },
  ];

  const rightMenuItems = [
    { label: 'Kitaplar', href: '#kitaplar' },
    { label: 'Yerler', href: '#yerler' },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/80">
      {/* Navbar with circular notch */}
      <div className="relative">
        {/* Main navbar */}
        <nav className="container mx-auto px-4 py-6 relative border-b border-border/40">
          <div className="flex items-center justify-center relative">
            {/* Left Menu Items */}
            <div className="hidden md:flex items-center space-x-6 absolute left-0" style={{ left: 'calc(50% - 350px)' }}>
              {leftMenuItems.map((item, index) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="relative text-foreground/80 hover:text-foreground font-medium transition-all duration-300 group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-blue-400 group-hover:w-full transition-all duration-300"></span>
                </a>
              ))}
            </div>

            {/* Spacer for logo */}
            <div className="w-16 h-16"></div>

            {/* Right Menu Items */}
            <div className="hidden md:flex items-center space-x-6 absolute right-0" style={{ right: 'calc(50% - 350px)' }}>
              {rightMenuItems.map((item, index) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="relative text-foreground/80 hover:text-foreground font-medium transition-all duration-300 group"
                  style={{ animationDelay: `${(index + 2) * 100}ms` }}
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-blue-400 group-hover:w-full transition-all duration-300"></span>
                </a>
              ))}
            </div>

            {/* Auth Section - Fixed on the right */}
            <div className="hidden md:block absolute right-4">
              {isLoggedIn ? (
                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-blue-500 flex items-center justify-center text-white hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 hover:scale-110"
                  >
                    <User size={20} />
                  </button>

                  {/* Profile Dropdown */}
                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-48 rounded-xl bg-card border border-border shadow-xl overflow-hidden animate-fade-in-down">
                      <a
                        href="#profile"
                        className="flex items-center space-x-2 px-4 py-3 hover:bg-accent transition-colors duration-200"
                      >
                        <User size={16} />
                        <span>Profilim</span>
                      </a>
                      <button
                        className="w-full flex items-center space-x-2 px-4 py-3 hover:bg-accent transition-colors duration-200 text-destructive"
                      >
                        <LogOut size={16} />
                        <span>Çıkış Yap</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <button className="px-4 py-2 rounded-lg font-medium text-foreground hover:bg-accent transition-all duration-300">
                    Giriş
                  </button>
                  <button className="px-4 py-2 rounded-lg font-medium bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105">
                    Kayıt Ol
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden absolute right-0 p-2 rounded-lg hover:bg-accent transition-colors duration-200"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-2 animate-fade-in-down">
              {[...leftMenuItems, ...rightMenuItems].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="block px-4 py-2 rounded-lg hover:bg-accent transition-colors duration-200"
                >
                  {item.label}
                </a>
              ))}
              {!isLoggedIn && (
                <div className="flex flex-col space-y-2 pt-2">
                  <button className="px-4 py-2 rounded-lg font-medium text-foreground hover:bg-accent transition-all duration-300">
                    Giriş
                  </button>
                  <button className="px-4 py-2 rounded-lg font-medium bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300">
                    Kayıt Ol
                  </button>
                </div>
              )}
            </div>
          )}
        </nav>

        {/* Circular notch cutout overlay - creates the visual effect */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-32 h-16 overflow-hidden pointer-events-none">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full bg-background/80 backdrop-blur-xl border-2 border-border/40 border-b-transparent"></div>
        </div>

        {/* Floating Logo - positioned to sit in the notch */}
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-20 group">
          {/* Circular border frame around logo */}
          <div className="absolute -inset-3 rounded-full border-2 border-blue-500/30 transition-all duration-700 group-hover:border-blue-400/50 group-hover:rotate-180"></div>

          {/* Logo */}
          <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-700 via-blue-600 to-blue-500 flex items-center justify-center font-bold text-white text-2xl shadow-2xl shadow-blue-500/40 hover:shadow-blue-500/60 transition-all duration-500 hover:scale-110 border-2 border-blue-400/30">
            <span className="relative z-10">S</span>
            {/* Inner glow */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent"></div>
          </div>
        </div>
      </div>
    </header>
  );
}

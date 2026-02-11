'use client';

import { useState } from 'react';
import { Menu, X, User, LogOut } from 'lucide-react';
import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();
  const isLoggedIn = !!user;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const leftMenuItems = [
    { label: 'Diziler', href: '/diziler' },
    { label: 'Filmler', href: '/filmler' },
  ];

  const rightMenuItems = [
    { label: 'Kitaplar', href: '/kitaplar' },
    { label: 'Yerler', href: '/yerler' },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/80">
      <div className="relative">
        <nav className="container mx-auto px-4 py-6 relative border-b border-border/40">
          <div className="flex items-center justify-center relative">
            {/* Left Menu Items */}
            <div className="hidden md:flex items-center space-x-6 gap-20 absolute left-0" style={{ left: 'calc(50% - 350px)' }}>
              {leftMenuItems.map((item, index) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="relative text-foreground/80 hover:text-foreground font-medium transition-all duration-300 group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
                </a>
              ))}
            </div>

            {/* Spacer for logo */}
            <div className="w-16 h-16"></div>

            {/* Right Menu Items */}
            <div className="hidden md:flex items-center space-x-6 gap-20 absolute right-0" style={{ right: 'calc(50% - 350px)' }}>
              {rightMenuItems.map((item, index) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="relative text-foreground/80 hover:text-foreground font-medium transition-all duration-300 group"
                  style={{ animationDelay: `${(index + 2) * 100}ms` }}
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
                </a>
              ))}
            </div>

            {/* Auth Section - Fixed on the right */}
            <div className="hidden md:block absolute right-4">
              {isLoggedIn ? (
                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="w-10 h-10 rounded-none bg-primary flex items-center justify-center text-white hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 hover:scale-110"
                  >
                    <User size={20} />
                  </button>

                  {/* Profile Dropdown */}
                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-48 rounded-none bg-card border border-border shadow-xl overflow-hidden animate-fade-in-down">
                      <a
                        href="#profile"
                        className="flex items-center space-x-2 px-4 py-3 hover:bg-accent transition-colors duration-200"
                      >
                        <User size={16} />
                        <span>Profilim ({user?.username})</span>
                      </a>
                      <button
                        onClick={logout}
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
                  <button className="px-4 py-2 rounded-none font-medium text-foreground hover:bg-accent transition-all duration-300 border border-transparent hover:border-border">
                    Giriş
                  </button>
                  <button className="px-4 py-2 rounded-none font-medium bg-primary text-white hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 hover:scale-105">
                    Kayıt Ol
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden absolute right-0 p-2 rounded-none hover:bg-accent transition-colors duration-200"
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
                  className="block px-4 py-2 rounded-none hover:bg-accent transition-colors duration-200"
                >
                  {item.label}
                </a>
              ))}
              {!isLoggedIn && (
                <div className="flex flex-col space-y-2 pt-2">
                  <button className="px-4 py-2 rounded-none font-medium text-foreground hover:bg-accent transition-all duration-300">
                    Giriş
                  </button>
                  <button className="px-4 py-2 rounded-none font-medium bg-primary text-white hover:shadow-lg hover:shadow-primary/50 transition-all duration-300">
                    Kayıt Ol
                  </button>
                </div>
              )}
            </div>
          )}
        </nav>

        {/* Floating Logo */}
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-20 group">
          <div className="relative w-16 h-16 rounded-none bg-primary flex items-center justify-center font-bold text-white text-2xl shadow-2xl shadow-primary/40 hover:shadow-primary/60 transition-all duration-500 hover:scale-110 border-2 border-white/20">
            <span className="relative z-10">S</span>
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
          </div>
        </div>
      </div>
    </header>
  );
}

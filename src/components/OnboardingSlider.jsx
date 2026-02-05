'use client';

import { useState } from 'react';
import { X, Sparkles, Heart, MapPin, Star } from 'lucide-react';

export default function OnboardingSlider({ onClose, onDismiss }) {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            icon: Sparkles,
            title: 'İçerik Keşfet',
            description: 'Binlerce dizi, film, kitap ve yer arasından favorilerini bul',
            gradient: 'from-blue-600 to-blue-500',
        },
        {
            icon: Star,
            title: 'Puan Ver & Yorum Yap',
            description: 'İzlediklerini değerlendir, düşüncelerini paylaş',
            gradient: 'from-blue-700 to-cyan-600',
        },
        {
            icon: Heart,
            title: 'Favorilerine Ekle',
            description: 'Beğendiğin içerikleri listene ekle, kolayca ulaş',
            gradient: 'from-cyan-600 to-teal-500',
        },
        {
            icon: MapPin,
            title: 'Haritada Yer Keşfet',
            description: 'Çevrende ve dünyada ilginç mekanları keşfet',
            gradient: 'from-teal-500 to-blue-600',
        },
    ];

    const handleNext = () => {
        if (currentSlide < slides.length - 1) {
            setCurrentSlide(currentSlide + 1);
        }
    };

    const handlePrev = () => {
        if (currentSlide > 0) {
            setCurrentSlide(currentSlide - 1);
        }
    };

    return (
        <div className="relative bg-gradient-to-br from-blue-600/10 via-blue-500/10 to-cyan-500/10 rounded-2xl p-6 mb-8 overflow-hidden border border-blue-500/20 max-w-4xl mx-auto">
            {/* Background Animation */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 animate-pulse-slow"></div>

            {/* Close Buttons */}
            <div className="absolute top-4 right-4 flex items-center space-x-2 z-10">
                <button
                    onClick={onDismiss}
                    className="text-xs px-3 py-1.5 rounded-lg bg-background/50 hover:bg-background/80 backdrop-blur-sm transition-all duration-300 hover:scale-105"
                >
                    Bir daha gösterme
                </button>
                <button
                    onClick={onClose}
                    className="p-2 rounded-lg bg-background/50 hover:bg-background/80 backdrop-blur-sm transition-all duration-300 hover:scale-110"
                >
                    <X size={18} />
                </button>
            </div>

            {/* Slider Content */}
            <div className="relative max-w-3xl mx-auto">
                <div className="flex items-center justify-center min-h-[280px]">
                    {slides.map((slide, index) => {
                        const Icon = slide.icon;
                        return (
                            <div
                                key={index}
                                className={`absolute transition-all duration-500 ${index === currentSlide
                                    ? 'opacity-100 translate-x-0 scale-100'
                                    : index < currentSlide
                                        ? 'opacity-0 -translate-x-full scale-95'
                                        : 'opacity-0 translate-x-full scale-95'
                                    }`}
                            >
                                <div className="flex flex-col items-center text-center space-y-4">
                                    <div
                                        className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${slide.gradient} flex items-center justify-center shadow-lg animate-bounce-slow`}
                                    >
                                        <Icon size={40} className="text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold">{slide.title}</h3>
                                    <p className="text-muted-foreground max-w-md">
                                        {slide.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-center space-x-4 mt-8">
                    <button
                        onClick={handlePrev}
                        disabled={currentSlide === 0}
                        className="px-4 py-2 rounded-lg bg-background/50 hover:bg-background/80 backdrop-blur-sm transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed hover:scale-105"
                    >
                        ← Önceki
                    </button>

                    {/* Dots */}
                    <div className="flex space-x-2">
                        {slides.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentSlide
                                    ? 'bg-gradient-to-r from-blue-600 to-blue-500 w-8'
                                    : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                                    }`}
                            />
                        ))}
                    </div>

                    <button
                        onClick={handleNext}
                        disabled={currentSlide === slides.length - 1}
                        className="px-4 py-2 rounded-lg bg-background/50 hover:bg-background/80 backdrop-blur-sm transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed hover:scale-105"
                    >
                        Sonraki →
                    </button>
                </div>
            </div>
        </div>
    );
}

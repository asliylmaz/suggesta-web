'use client';
import { useState, useEffect } from 'react';
import { Shuffle, Star } from 'lucide-react';

export default function RandomPick({ items, title = "Bugün Ne İzlesem?" }) {
    // Start with empty array to avoid undefined errors during initial render
    const [currentItems, setCurrentItems] = useState([]);

    // Set random items after component mounts or items change
    useEffect(() => {
        if (items && items.length > 0) {
            const shuffledItems = [...items].sort(() => Math.random() - 0.5);
            setCurrentItems([shuffledItems[0], shuffledItems[1] || shuffledItems[0]]);
        }
    }, [items]);

    const handleShuffle = () => {
        if (items && items.length > 0) {
            const shuffledItems = [...items].sort(() => Math.random() - 0.5);
            setCurrentItems([shuffledItems[0], shuffledItems[1] || shuffledItems[0]]);
        }
    };

    if (currentItems.length === 0) return null;

    return (
        <div className="bg-gradient-to-br from-blue-600/10 via-blue-500/10 to-cyan-500/10 rounded-2xl p-6 border border-blue-500/20 relative overflow-hidden">
            {/* Background Animation */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 animate-pulse-slow"></div>

            <div className="relative">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold">{title}</h3>
                    <button
                        onClick={handleShuffle}
                        className="p-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 hover:rotate-180"
                    >
                        <Shuffle size={20} />
                    </button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {currentItems.map((item, idx) => (
                        <div key={idx} className="flex items-center space-x-3">
                            <div className="relative w-20 h-28 rounded-lg overflow-hidden flex-shrink-0 shadow-lg">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

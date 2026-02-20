'use client';
import { useState, useEffect } from 'react';
import { Shuffle, Sparkles } from 'lucide-react';

export default function RandomPick({ items, title = 'Bugün Ne İzlesem?' }) {
    const [currentItems, setCurrentItems] = useState([]);
    const [isShuffling, setIsShuffling] = useState(false);
    const [hovered, setHovered] = useState(false);

    useEffect(() => {
        if (items && items.length > 0) {
            const s = [...items].sort(() => Math.random() - 0.5);
            setCurrentItems([s[0], s[1] || s[0]]);
        }
    }, [items]);

    const handleShuffle = () => {
        if (!items || items.length === 0 || isShuffling) return;
        setIsShuffling(true);
        let count = 0;
        const iv = setInterval(() => {
            const s = [...items].sort(() => Math.random() - 0.5);
            setCurrentItems([s[0], s[1] || s[0]]);
            if (++count >= 10) { clearInterval(iv); setIsShuffling(false); }
        }, 90);
    };

    if (currentItems.length === 0) return null;

    return (
        <div
            style={{
                position: 'relative',
                borderRadius: 22,
                overflow: 'hidden',
                background: 'rgba(255,255,255,0.05)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.10)',
                boxShadow: '0 16px 48px rgba(0,0,0,0.50), inset 0 1px 0 rgba(255,255,255,0.07)',
                padding: 24,
                display: 'flex',
                flexDirection: 'column',
                gap: 20,
                transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                ...(hovered && {
                    borderColor: 'rgba(255,255,255,0.18)',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.60), inset 0 1px 0 rgba(255,255,255,0.09)',
                }),
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {/* Subtle top gradient */}
            <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 120,
                background: 'radial-gradient(ellipse at 70% 0%, rgba(255,255,255,0.04) 0%, transparent 70%)',
                pointerEvents: 'none',
            }} />

            {/* Shine line */}
            <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 1,
                background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.12),transparent)',
                pointerEvents: 'none',
            }} />

            {/* Header */}
            <div style={{ position: 'relative' }}>
                <div style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    marginBottom: 4,
                }}>
                    <Sparkles size={11} color="rgba(255,255,255,0.35)" />
                    <h3 style={{
                        margin: 0, fontSize: 20, fontWeight: 800,
                        color: 'rgba(255,255,255,0.88)', fontFamily: 'Inter,sans-serif',
                        letterSpacing: '-0.03em', lineHeight: 1.2,
                    }}>
                        {title}
                    </h3>
                </div>

            </div>

            {/* Cards */}
            <div style={{ display: 'flex', gap: 12, position: 'relative' }}>
                {currentItems.map((item, idx) => (
                    <ItemCard key={idx} item={item} isShuffling={isShuffling} />
                ))}
            </div>

            {/* Shuffle button */}
            <ShuffleButton onClick={handleShuffle} isShuffling={isShuffling} />
        </div>
    );
}

/* ── Item Card ── */
function ItemCard({ item, isShuffling }) {
    const [h, setH] = useState(false);
    return (
        <div
            onMouseEnter={() => setH(true)}
            onMouseLeave={() => setH(false)}
            style={{
                flex: 1,
                aspectRatio: '2/3',
                borderRadius: 14,
                overflow: 'hidden',
                position: 'relative',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.09)',
                transform: isShuffling ? 'scale(0.94)' : h ? 'scale(1.03)' : 'scale(1)',
                filter: isShuffling ? 'blur(3px)' : 'none',
                transition: 'transform 0.35s cubic-bezier(0.34,1.56,0.64,1), filter 0.2s ease',
                cursor: 'pointer',
            }}
        >
            <img
                src={item.image}
                style={{
                    width: '100%', height: '100%', objectFit: 'cover',
                    opacity: h ? 0.85 : 0.60,
                    transition: 'opacity 0.35s ease, transform 0.6s ease',
                    transform: h ? 'scale(1.07)' : 'scale(1)',
                }}
            />
            {/* Bottom fade */}
            <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.80) 0%, transparent 55%)',
            }} />
            <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                padding: '10px 12px',
            }}>
                <span style={{
                    fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.88)',
                    fontFamily: 'Inter,sans-serif',
                    display: '-webkit-box', WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical', overflow: 'hidden',
                    lineHeight: 1.35,
                }}>
                </span>
            </div>
        </div>
    );
}

/* ── Shuffle Button ── */
function ShuffleButton({ onClick, isShuffling }) {
    const [h, setH] = useState(false);
    return (
        <button
            onClick={onClick}
            disabled={isShuffling}
            onMouseEnter={() => setH(true)}
            onMouseLeave={() => setH(false)}
            style={{
                width: '100%', padding: '13px 0',
                borderRadius: 13,
                background: h && !isShuffling
                    ? 'rgba(255,255,255,0.12)'
                    : 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.12)',
                color: 'rgba(255,255,255,0.80)',
                fontSize: 12, fontWeight: 700, letterSpacing: '0.10em',
                textTransform: 'uppercase', fontFamily: 'Inter,sans-serif',
                cursor: isShuffling ? 'default' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                transition: 'background 0.2s ease, border-color 0.2s ease, transform 0.15s ease',
                transform: h && !isShuffling ? 'scale(1.01)' : 'scale(1)',
                backdropFilter: 'blur(10px)',
                position: 'relative', overflow: 'hidden',
            }}
        >
            {isShuffling ? 'Karıştırılıyor...' : 'Karıştır'}
            <Shuffle
                size={14}
                style={{
                    transition: 'transform 0.5s ease',
                    transform: isShuffling ? 'rotate(360deg)' : h ? 'rotate(180deg)' : 'rotate(0deg)',
                }}
            />
        </button>
    );
}

'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

const slides = [
    {
        id: 1,
        emoji: '🎬',
        title: 'Hoş Geldin!',
        subtitle: "Suggesta'ya Adım At",
        description: 'Film, dizi, kitap ve mekan önerilerini tek bir yerde keşfet.',
    },
    {
        id: 2,
        emoji: '⭐',
        title: 'Puan Ver & Listele',
        subtitle: 'İzlediklerini Takip Et',
        description: 'İzlediğin filmleri puanla, favorilerini listele.',
    },
    {
        id: 3,
        emoji: '🔍',
        title: 'Keşfet',
        subtitle: 'Popüler & Trend',
        description: 'Her kategoride en popüler içerikleri keşfet.',
    },
    {
        id: 4,
        emoji: '🤝',
        title: 'Arkadaşlarınla Paylaş',
        subtitle: 'Sosyal Deneyim',
        description: 'Önerilerini arkadaşlarınla paylaş, birlikte keşfet.',
    },
    {
        id: 5,
        emoji: '🎯',
        title: 'Kişisel Öneriler',
        subtitle: 'Sana Özel',
        description: 'Zevkine göre öğrenen sistem, sana en isabetli önerileri sunar.',
    },
];

const N = slides.length;
const CARD_W = 460;
const CARD_H = 270;
const GAP = 22;
const UNIT = CARD_W + GAP;
const SIDE_SC = 0.86;     // side cards slightly smaller → "behind" effect
const SIDE_OP = 0.58;     // side cards slightly dimmer

// Extended: [last, s0, s1, s2, s3, s4, first]
// vIdx 0 = cloned-last, 1..N = real, N+1 = cloned-first
const extended = [slides[N - 1], ...slides, slides[0]];

function mod(n, m) { return ((n % m) + m) % m; }

export default function OnboardingSlider() {
    const [vIdx, setVIdx] = useState(1);
    const [useAnim, setUseAnim] = useState(true);
    const [autoPlay, setAutoPlay] = useState(true);

    const dragging = useRef(false);
    const dragStartX = useRef(0);
    const animating = useRef(false);

    /* ── Infinite-loop: seamless jump after hitting clone ── */
    useEffect(() => {
        let t;
        if (vIdx === 0) {
            t = setTimeout(() => {
                setUseAnim(false);
                setVIdx(N);
                requestAnimationFrame(() => requestAnimationFrame(() => {
                    setUseAnim(true);
                    animating.current = false;
                }));
            }, 560);
        } else if (vIdx === N + 1) {
            t = setTimeout(() => {
                setUseAnim(false);
                setVIdx(1);
                requestAnimationFrame(() => requestAnimationFrame(() => {
                    setUseAnim(true);
                    animating.current = false;
                }));
            }, 560);
        } else {
            // Normal slide settled
            const t2 = setTimeout(() => { animating.current = false; }, 560);
            return () => clearTimeout(t2);
        }
        return () => clearTimeout(t);
    }, [vIdx]);

    const go = useCallback((dir) => {
        if (animating.current) return;
        animating.current = true;
        setAutoPlay(false);
        setUseAnim(true);
        setVIdx(prev => prev + (dir === 'next' ? 1 : -1));
        setTimeout(() => setAutoPlay(true), 1200);
    }, []);

    const goNext = useCallback(() => go('next'), [go]);
    const goPrev = useCallback(() => go('prev'), [go]);

    /* ── Auto-play ── */
    useEffect(() => {
        if (!autoPlay) return;
        const t = setInterval(goNext, 4200);
        return () => clearInterval(t);
    }, [autoPlay, goNext]);

    /* ── Document-level drag ── */
    useEffect(() => {
        const onMouseMove = (e) => {
            if (!dragging.current) return;
            e.preventDefault();
        };
        const onMouseUp = (e) => {
            if (!dragging.current) return;
            const dx = e.clientX - dragStartX.current;
            dragging.current = false;
            document.body.style.cursor = '';
            if (dx < -55) go('next');
            else if (dx > 55) go('prev');
        };
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
        return () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };
    }, [go]);

    const handleMouseDown = (e) => {
        if (animating.current) return;
        e.preventDefault();
        dragging.current = true;
        dragStartX.current = e.clientX;
        document.body.style.cursor = 'grabbing';
        setAutoPlay(false);
    };
    const handleTouchStart = (e) => { dragStartX.current = e.touches[0].clientX; };
    const handleTouchEnd = (e) => {
        const dx = e.changedTouches[0].clientX - dragStartX.current;
        if (dx < -55) go('next');
        else if (dx > 55) go('prev');
    };

    const trackLeft = `calc(50% - ${CARD_W / 2}px + ${-vIdx * UNIT}px)`;
    const easing = 'cubic-bezier(0.32, 0.72, 0, 1)';
    const dur = '0.55s';

    return (
        <div
            style={{
                width: '90%',
                margin: '0 auto 2.5rem auto',
                userSelect: 'none',
            }}
            onMouseEnter={() => setAutoPlay(false)}
            onMouseLeave={() => setAutoPlay(true)}
        >
            {/* ── Viewport ── */}
            <div
                style={{
                    position: 'relative',
                    overflow: 'hidden',
                    width: '100%',
                    height: CARD_H + 40,
                    cursor: 'grab',
                }}
                onMouseDown={handleMouseDown}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >
                {/* ── Track: all 7 extended cards in a flex row ── */}
                <div style={{
                    display: 'flex',
                    gap: GAP,
                    position: 'absolute',
                    top: '50%',
                    left: trackLeft,
                    transform: 'translateY(-50%)',
                    transition: useAnim ? `left ${dur} ${easing}` : 'none',
                    alignItems: 'center',
                    pointerEvents: 'none',
                }}>
                    {extended.map((slide, i) => {
                        const dist = Math.abs(i - vIdx);
                        const isCenter = dist === 0;
                        // Only show ±2 around center, hide the rest (they exist for clone logic)
                        if (dist > 2) return (
                            <div key={i} style={{ flexShrink: 0, width: CARD_W, height: CARD_H, opacity: 0 }} />
                        );

                        const scale = isCenter ? 1 : SIDE_SC;
                        const opacity = isCenter ? 1 : SIDE_OP;

                        return (
                            <div
                                key={i}
                                style={{
                                    flexShrink: 0,
                                    width: CARD_W,
                                    height: CARD_H,
                                    borderRadius: 20,
                                    background: 'rgba(255,255,255,0.07)',
                                    backdropFilter: 'blur(20px)',
                                    WebkitBackdropFilter: 'blur(20px)',
                                    border: '1px solid rgba(255,255,255,0.11)',
                                    boxShadow: '0 12px 40px rgba(0,0,0,0.55)',
                                    transform: `scale(${scale})`,
                                    opacity,
                                    /* All transitions happen simultaneously with the track slide */
                                    transition: useAnim
                                        ? `transform ${dur} ${easing}, opacity ${dur} ${easing}`
                                        : 'none',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'flex-end',
                                    padding: '22px 26px',
                                    pointerEvents: isCenter ? 'none' : 'auto',
                                    cursor: 'pointer',
                                }}
                            >
                                {/* Shine */}
                                <div style={{
                                    position: 'absolute', top: 0, left: 0, right: 0, height: 1,
                                    background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.10),transparent)',
                                    pointerEvents: 'none',
                                }} />

                                {/* Bg emoji */}
                                <div style={{
                                    position: 'absolute', top: 16, right: 18,
                                    fontSize: 64, lineHeight: 1,
                                    filter: 'grayscale(1) brightness(0.55)',
                                    opacity: 0.10,
                                    pointerEvents: 'none',
                                }}>
                                    {slide.emoji}
                                </div>

                                {/* Icon + subtitle (center only) */}
                                {isCenter && (
                                    <div style={{
                                        position: 'absolute', top: 20, left: 24,
                                        display: 'flex', alignItems: 'center', gap: 10,
                                    }}>
                                        <div style={{
                                            width: 36, height: 36, borderRadius: 10,
                                            background: 'rgba(255,255,255,0.08)',
                                            border: '1px solid rgba(255,255,255,0.10)',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            fontSize: 17, filter: 'grayscale(1)',
                                        }}>
                                            {slide.emoji}
                                        </div>
                                        <span style={{
                                            fontSize: 10, fontWeight: 600, letterSpacing: '0.13em',
                                            textTransform: 'uppercase',
                                            color: 'rgba(255,255,255,0.28)',
                                            fontFamily: 'Inter,sans-serif',
                                        }}>
                                            {slide.subtitle}
                                        </span>
                                    </div>
                                )}

                                {/* Bottom text */}
                                <div>
                                    <h3 style={{
                                        margin: 0, marginBottom: 5,
                                        fontSize: 18, fontWeight: 700,
                                        color: isCenter ? 'rgba(255,255,255,0.88)' : 'rgba(255,255,255,0.42)',
                                        fontFamily: 'Inter,sans-serif',
                                        letterSpacing: '-0.02em', lineHeight: 1.25,
                                    }}>
                                        {slide.title}
                                    </h3>
                                    {isCenter && (
                                        <p style={{
                                            margin: 0, fontSize: 13, lineHeight: 1.6,
                                            color: 'rgba(255,255,255,0.40)',
                                            fontFamily: 'Inter,sans-serif',
                                        }}>
                                            {slide.description}
                                        </p>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Fade masks */}
                <div style={{
                    position: 'absolute', top: 0, left: 0, bottom: 0, width: 70,
                    background: 'linear-gradient(to right,#000 0%,transparent 100%)',
                    pointerEvents: 'none', zIndex: 10,
                }} />
                <div style={{
                    position: 'absolute', top: 0, right: 0, bottom: 0, width: 70,
                    background: 'linear-gradient(to left,#000 0%,transparent 100%)',
                    pointerEvents: 'none', zIndex: 10,
                }} />
            </div>
        </div>
    );
}


'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Star, Heart } from 'lucide-react';
import Link from 'next/link';
import { getMovieImages, getSeriesImages } from '../../lib/tmdbService';

/* ─── constants ─────────────────────────────────────── */
const CARD_W = 680;   // px – center card width
const CARD_H = 390;   // px – center card height
const GAP = 18;    // px
const UNIT = CARD_W + GAP;
const SIDE_SC = 0.78;  // side card scale
const SIDE_OP = 0.45;  // side card opacity
const DUR = '0.55s';
const EASE = 'cubic-bezier(0.32, 0.72, 0, 1)';

/* ─── helpers ───────────────────────────────────────── */
function buildExtended(arr) {
    if (arr.length === 0) return [];
    return [arr[arr.length - 1], ...arr, arr[0]];
}

/* ─── Main Component ────────────────────────────────── */
export default function PopularMediaSection({ title, items, type }) {
    const N = items.length;
    const extended = buildExtended(items);

    const [vIdx, setVIdx] = useState(1);  // 1 = first real item
    const [useAnim, setUseAnim] = useState(true);
    const [logos, setLogos] = useState({});
    const animating = useRef(false);
    const sectionRef = useRef(null);

    /* Logo fetch */
    useEffect(() => {
        if (!items.length) return;
        const fetch_ = async () => {
            const map = {};
            await Promise.all(items.map(async (item) => {
                try {
                    const data = type === 'movies'
                        ? await getMovieImages(item.id || item.externalId)
                        : await getSeriesImages(item.id || item.externalId);
                    if (data?.logos?.length > 0) {
                        const logo = data.logos.find(l => l.iso_639_1 === 'tr')
                            || data.logos.find(l => l.iso_639_1 === 'en')
                            || data.logos[0];
                        if (logo) map[item.id || item.externalId] = logo.filePath;
                    }
                } catch (_) { }
            }));
            setLogos(map);
        };
        fetch_();
    }, [items, type]);

    /* Infinite-loop jump after clone settles */
    useEffect(() => {
        if (N === 0) return;
        let t;
        if (vIdx === 0) {
            t = setTimeout(() => {
                setUseAnim(false);
                setVIdx(N);
                requestAnimationFrame(() => requestAnimationFrame(() => {
                    setUseAnim(true);
                    animating.current = false;
                }));
            }, 580);
        } else if (vIdx === N + 1) {
            t = setTimeout(() => {
                setUseAnim(false);
                setVIdx(1);
                requestAnimationFrame(() => requestAnimationFrame(() => {
                    setUseAnim(true);
                    animating.current = false;
                }));
            }, 580);
        } else {
            const t2 = setTimeout(() => { animating.current = false; }, 580);
            return () => clearTimeout(t2);
        }
        return () => clearTimeout(t);
    }, [vIdx, N]);

    const go = useCallback((dir) => {
        if (animating.current || N === 0) return;
        animating.current = true;
        setUseAnim(true);
        setVIdx(p => p + (dir === 'next' ? 1 : -1));
    }, [N]);

    /* Auto-play */
    useEffect(() => {
        const t = setInterval(() => go('next'), 5000);
        return () => clearInterval(t);
    }, [go]);

    /* Real index (0-based) of center card */
    const realIdx = vIdx <= 0 ? N - 1 : vIdx > N ? 0 : vIdx - 1;
    const centerItem = items[realIdx] ?? items[0];

    /* Track left offset: places extended[vIdx] at viewport center */
    const trackLeft = `calc(50% - ${CARD_W / 2}px + ${-vIdx * UNIT}px)`;

    if (!items.length) return null;

    return (
        <section
            ref={sectionRef}
            style={{ marginBottom: 80 }}
        >
            {/* ── Header ── */}
            <div style={{
                display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
                padding: '0 24px', marginBottom: 20,
            }}>
                <div>
                    <h2 style={{
                        margin: 0, fontSize: 'clamp(24px, 3vw, 38px)', fontWeight: 900,
                        color: '#fff', fontFamily: 'Inter,sans-serif',
                        letterSpacing: '-0.04em', lineHeight: 1.1,
                        textTransform: 'uppercase', fontStyle: 'italic',
                    }}>
                        {title.split(' ').map((w, i) => (
                            <span key={i} style={{ color: i % 2 !== 0 ? 'rgba(255,255,255,0.28)' : '#fff', marginLeft: i > 0 ? 8 : 0 }}>
                                {w}
                            </span>
                        ))}
                    </h2>
                    <div style={{ height: 3, width: 40, background: '#fff', marginTop: 8, borderRadius: 2 }} />
                </div>

                {/* Nav buttons */}
                <div style={{ display: 'flex', gap: 8 }}>
                    <Link href={`/${type}`} style={{ textDecoration: 'none' }}>
                        <button className="w-24 h-10 rounded-[12px] border border-white/10 bg-white/5 flex items-center justify-center text-white/75 hover:bg-white/10 hover:text-white transition-all backdrop-blur-md">
                            Tümü
                        </button>
                    </Link>
                    <NavBtn onClick={() => go('prev')} dir="left" />
                    <NavBtn onClick={() => go('next')} dir="right" />
                </div>
            </div>

            {/* ── Carousel viewport ── */}
            <div style={{
                position: 'relative',
                overflow: 'hidden',
                width: '100%',
                height: CARD_H + 60,
            }}>
                {/* Track */}
                <div style={{
                    display: 'flex',
                    gap: GAP,
                    position: 'absolute',
                    top: '50%',
                    left: trackLeft,
                    transform: 'translateY(-50%)',
                    transition: useAnim ? `left ${DUR} ${EASE}` : 'none',
                    alignItems: 'center',
                    pointerEvents: 'none',
                }}>
                    {extended.map((item, i) => {
                        const dist = Math.abs(i - vIdx);
                        const isCenter = dist === 0;
                        if (dist > 3) return (
                            <div key={i} style={{ flexShrink: 0, width: CARD_W, height: CARD_H, opacity: 0 }} />
                        );
                        const scale = isCenter ? 1 : Math.max(SIDE_SC, 1 - dist * 0.08);
                        const opacity = isCenter ? 1 : Math.max(SIDE_OP, 1 - dist * 0.28);

                        return (
                            <MediaCard
                                key={i}
                                item={item}
                                isCenter={isCenter}
                                scale={scale}
                                opacity={opacity}
                                useAnim={useAnim}
                                logo={logos[item.id || item.externalId]}
                                type={type}
                                rank={i === vIdx ? realIdx + 1 : null}
                            />
                        );
                    })}
                </div>

                {/* Fade masks */}
                <div style={{
                    position: 'absolute', top: 0, left: 0, bottom: 0, width: 80,
                    background: 'linear-gradient(to right, #000 0%, transparent 100%)',
                    pointerEvents: 'none', zIndex: 20,
                }} />
                <div style={{
                    position: 'absolute', top: 0, right: 0, bottom: 0, width: 80,
                    background: 'linear-gradient(to left, #000 0%, transparent 100%)',
                    pointerEvents: 'none', zIndex: 20,
                }} />
            </div>

            {/* ── Dots ── */}
            <div style={{
                display: 'flex', justifyContent: 'center', gap: 6, marginTop: 14,
            }}>
                {items.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => {
                            if (animating.current) return;
                            animating.current = true;
                            setUseAnim(true);
                            setVIdx(i + 1);
                        }}
                        style={{
                            width: i === realIdx ? 20 : 6,
                            height: 6, borderRadius: 3, border: 'none',
                            background: i === realIdx ? 'rgba(255,255,255,0.80)' : 'rgba(255,255,255,0.20)',
                            cursor: 'pointer', padding: 0,
                            transition: 'all 0.3s ease',
                        }}
                    />
                ))}
            </div>
        </section>
    );
}

/* ─── Media Card ─────────────────────────────────────── */
function MediaCard({ item, isCenter, scale, opacity, useAnim, logo, type, rank }) {
    const [hovered, setHovered] = useState(false);

    return (
        <div
            style={{
                flexShrink: 0,
                width: CARD_W,
                height: CARD_H,
                borderRadius: 20,
                overflow: 'hidden',
                position: 'relative',
                transform: `scale(${scale})`,
                opacity,
                transition: useAnim
                    ? `transform ${DUR} ${EASE}, opacity ${DUR} ${EASE}`
                    : 'none',
                pointerEvents: isCenter ? 'auto' : 'none',
                cursor: 'pointer',
                boxShadow: isCenter
                    ? '0 24px 64px rgba(0,0,0,0.70)'
                    : '0 8px 24px rgba(0,0,0,0.40)',
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {/* Backdrop image */}
            <img
                src={item.backdrop || item.image}
                alt=""
                style={{
                    width: '100%', height: '100%', objectFit: 'cover',
                    transform: hovered ? 'scale(1.05)' : 'scale(1)',
                    transition: 'transform 0.7s ease',
                    filter: isCenter ? 'none' : 'grayscale(60%) brightness(60%)',
                }}
            />

            {/* Gradient overlay */}
            <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.30) 50%, transparent 100%)',
            }} />
            <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to right, rgba(0,0,0,0.40) 0%, transparent 40%, rgba(0,0,0,0.40) 100%)',
            }} />

            {/* Rating badge */}
            <div style={{
                position: 'absolute', top: 16, right: 16,
                background: 'rgba(0,0,0,0.55)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 10, padding: '5px 10px',
                display: 'flex', alignItems: 'center', gap: 5,
            }}>
                <Star size={12} fill="rgba(255,220,50,0.9)" color="rgba(255,220,50,0.9)" />
                <span style={{
                    fontSize: 12, fontWeight: 700, color: '#fff',
                    fontFamily: 'Inter,sans-serif',
                }}>{item.rating}</span>
            </div>

            {/* Bottom info */}
            <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                padding: '20px 28px',
                opacity: isCenter ? 1 : 0.5,
                transform: isCenter ? 'translateY(0)' : 'translateY(8px)',
                transition: useAnim ? `opacity ${DUR} ease, transform ${DUR} ease` : 'none',
            }}>
                {/* Logo or title */}
                {logo ? (
                    <img
                        src={logo}
                        alt=""
                        style={{
                            height: 56, width: 'auto', objectFit: 'contain',
                            marginBottom: 14,
                            filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.7))',
                        }}
                    />
                ) : (
                    <h3 style={{
                        margin: '0 0 12px 0',
                        fontSize: 28, fontWeight: 900,
                        color: '#fff', fontFamily: 'Inter,sans-serif',
                        letterSpacing: '-0.03em', lineHeight: 1.15,
                        textTransform: 'uppercase',
                        textShadow: '0 2px 12px rgba(0,0,0,0.8)',
                    }}>
                        {item.title}
                    </h3>
                )}

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                        <Chip>{item.year || '2025'}</Chip>
                    </div>

                    {isCenter && (
                        <div style={{ display: 'flex', gap: 10 }}>
                            <Link href={`/detail/${type}/${item.id || item.externalId}`} style={{ textDecoration: 'none' }}>
                                <ActionBtn>İncele</ActionBtn>
                            </Link>
                            <RoundBtn><Heart size={16} /></RoundBtn>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

/* ─── Small sub-components ──────────────────────────── */
function Chip({ children, bright }) {
    return (
        <span style={{
            fontSize: 10, fontWeight: 700, letterSpacing: '0.10em',
            textTransform: 'uppercase', fontFamily: 'Inter,sans-serif',
            padding: '4px 10px', borderRadius: 8,
            background: bright ? 'rgba(255,255,255,0.90)' : 'rgba(255,255,255,0.12)',
            color: bright ? '#000' : 'rgba(255,255,255,0.75)',
            border: bright ? 'none' : '1px solid rgba(255,255,255,0.12)',
            backdropFilter: 'blur(8px)',
        }}>
            {children}
        </span>
    );
}

function ActionBtn({ children }) {
    const [h, setH] = useState(false);
    return (
        <button
            onMouseEnter={() => setH(true)}
            onMouseLeave={() => setH(false)}
            style={{
                padding: '8px 18px', borderRadius: 12,
                background: h ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.15)',
                color: h ? '#000' : '#fff',
                border: '1px solid rgba(255,255,255,0.25)',
                fontSize: 12, fontWeight: 700, letterSpacing: '0.06em',
                textTransform: 'uppercase', fontFamily: 'Inter,sans-serif',
                cursor: 'pointer',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.2s ease',
            }}
        >{children}</button>
    );
}

function RoundBtn({ children }) {
    const [h, setH] = useState(false);
    return (
        <button
            onMouseEnter={() => setH(true)}
            onMouseLeave={() => setH(false)}
            style={{
                width: 36, height: 36, borderRadius: '50%',
                background: h ? 'rgba(255,255,255,0.20)' : 'rgba(255,255,255,0.10)',
                border: '1px solid rgba(255,255,255,0.22)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', cursor: 'pointer',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.2s ease',
            }}
        >{children}</button>
    );
}

function NavBtn({ onClick, dir }) {
    const [h, setH] = useState(false);
    return (
        <button
            onClick={onClick}
            onMouseEnter={() => setH(true)}
            onMouseLeave={() => setH(false)}
            style={{
                width: 38, height: 38, borderRadius: 12,
                background: h ? 'rgba(255,255,255,0.14)' : 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.12)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'rgba(255,255,255,0.75)', cursor: 'pointer',
                transition: 'all 0.2s ease',
            }}
        >
            {dir === 'left'
                ? <ChevronLeft size={18} />
                : <ChevronRight size={18} />}
        </button>
    );
}

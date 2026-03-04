"use client";
import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import type { Banner } from '@/lib/supabaseUtils';

const FALLBACK_BANNERS = [
    "/banners/banner1.png",
    "/banners/banner2.png",
    "/banners/banner3.png",
];

const SLIDE_DURATION = 5000; // 5 seconds per slide

export default function Hero() {
    const [banners, setBanners] = useState<string[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    // Fetch banners from Supabase
    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const { getBanners } = await import('@/lib/supabaseUtils');
                const data: Banner[] = await getBanners();
                if (data.length > 0) {
                    setBanners(data.map(b => b.image_url));
                } else {
                    setBanners(FALLBACK_BANNERS);
                }
            } catch {
                setBanners(FALLBACK_BANNERS);
            }
        };
        fetchBanners();
    }, []);

    // Auto-advance slides
    const nextSlide = useCallback(() => {
        if (banners.length <= 1) return;
        setIsTransitioning(true);
        setTimeout(() => {
            setCurrentIndex(prev => (prev + 1) % banners.length);
            setIsTransitioning(false);
        }, 600); // matches CSS fade duration
    }, [banners.length]);

    useEffect(() => {
        if (banners.length <= 1) return;
        const interval = setInterval(nextSlide, SLIDE_DURATION);
        return () => clearInterval(interval);
    }, [nextSlide, banners.length]);

    const goToSlide = (index: number) => {
        if (index === currentIndex || isTransitioning) return;
        setIsTransitioning(true);
        setTimeout(() => {
            setCurrentIndex(index);
            setIsTransitioning(false);
        }, 600);
    };

    return (
        <section className="relative overflow-hidden px-4 md:px-6 pt-4">
            {/* Banner Slideshow */}
            <div className="relative aspect-[16/9] rounded-2xl md:rounded-3xl overflow-hidden shadow-lg bg-black">
                {/* Slides */}
                {banners.map((url, index) => (
                    <div
                        key={index}
                        className="absolute inset-0 transition-opacity duration-700 ease-in-out"
                        style={{
                            opacity: index === currentIndex && !isTransitioning ? 1 : 0,
                            zIndex: index === currentIndex ? 2 : 1,
                        }}
                    >
                        <img
                            src={url}
                            alt={`Banner ${index + 1}`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                if (target.src !== FALLBACK_BANNERS[0]) {
                                    target.src = FALLBACK_BANNERS[0];
                                }
                            }}
                        />
                    </div>
                ))}

                {/* Bottom gradient for button readability */}
                <div
                    className="absolute bottom-0 left-0 right-0 h-40 z-[5]"
                    style={{
                        background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 100%)'
                    }}
                />

                {/* CTA Buttons — Bottom Right */}
                <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 z-10 flex flex-wrap justify-end gap-2 md:gap-3">
                    <Link
                        href="/categories"
                        className="inline-flex items-center gap-1.5 bg-primary text-white px-4 py-2 md:px-6 md:py-3 rounded-lg font-medium hover:bg-primary-dark transition-all shadow-lg text-sm md:text-base whitespace-nowrap"
                    >
                        View Collection
                    </Link>
                </div>

                {/* Slide Indicator Dots */}
                {banners.length > 1 && (
                    <div className="absolute bottom-2 md:bottom-3 left-1/2 -translate-x-1/2 z-10 flex gap-2">
                        {banners.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full transition-all duration-300 ${index === currentIndex
                                    ? 'bg-white scale-125 shadow-md'
                                    : 'bg-white/50 hover:bg-white/80'
                                    }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* The CMJ Signature Experience Section */}
            <div className="relative px-4 py-12 md:py-20 overflow-hidden" style={{ background: 'linear-gradient(180deg, #F7F0E6 0%, #EDE4D4 30%, #F5EDE0 60%, #EDE4D4 100%)' }}>
                {/* Subtle shimmer overlay */}
                <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 30% 20%, rgba(212,175,55,0.15) 0%, transparent 60%), radial-gradient(ellipse at 70% 80%, rgba(212,175,55,0.1) 0%, transparent 60%)' }} />

                <div className="relative z-10 max-w-3xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-8 md:mb-12">
                        <h2 className="text-lg md:text-xl tracking-[0.2em] text-[#8B7355] font-medium mb-1">The CMJ</h2>
                        <h3 className="text-3xl md:text-5xl font-bold text-[#3E2723] font-display leading-tight">Signature Experience</h3>
                        <p className="text-sm md:text-lg text-[#8B7355] italic mt-2 md:mt-3 tracking-wide">Where Gold Becomes Legacy</p>
                    </div>

                    {/* 2x2 Card Grid */}
                    <div className="grid grid-cols-2 gap-3 md:gap-5">
                        {/* Card 1: Signature Custom Creations */}
                        <Link
                            href="/order/custom"
                            className="group relative bg-[#F5EDE0]/80 backdrop-blur-sm border border-[#D4AF37]/30 rounded-2xl md:rounded-3xl p-5 md:p-8 flex flex-col items-center text-center transition-all duration-500 hover:shadow-xl hover:shadow-[#D4AF37]/10 hover:border-[#D4AF37]/60 hover:-translate-y-1"
                        >
                            {/* Icon - Arch/Gate */}
                            <div className="mb-3 md:mb-5 text-[#A0845C] group-hover:text-[#D4AF37] transition-colors duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" className="w-10 h-10 md:w-14 md:h-14">
                                    <path d="M12 56V28c0-11.046 8.954-20 20-20s20 8.954 20 20v28" strokeLinecap="round" />
                                    <path d="M24 56V40c0-4.418 3.582-8 8-8s8 3.582 8 8v16" strokeLinecap="round" />
                                    <line x1="8" y1="56" x2="56" y2="56" strokeLinecap="round" />
                                </svg>
                            </div>
                            <h4 className="font-display text-sm md:text-xl font-bold text-[#3E2723] mb-1 md:mb-2 leading-snug">Signature Custom<br />Creations</h4>
                            <p className="text-[10px] md:text-sm italic text-[#A0845C] font-medium mb-2 md:mb-3">Designed Around Your Story</p>
                            <p className="text-[10px] md:text-xs text-[#8B7355] leading-relaxed hidden sm:block">Bespoke bridal and divine jewellery crafted exclusively for you.</p>
                        </Link>

                        {/* Card 2: Heritage Bridal Collections */}
                        <Link
                            href="/categories"
                            className="group relative bg-[#F5EDE0]/80 backdrop-blur-sm border border-[#D4AF37]/30 rounded-2xl md:rounded-3xl p-5 md:p-8 flex flex-col items-center text-center transition-all duration-500 hover:shadow-xl hover:shadow-[#D4AF37]/10 hover:border-[#D4AF37]/60 hover:-translate-y-1"
                        >
                            {/* Icon - Crown */}
                            <div className="mb-3 md:mb-5 text-[#A0845C] group-hover:text-[#D4AF37] transition-colors duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" className="w-10 h-10 md:w-14 md:h-14">
                                    <path d="M8 44l8-24 8 12 8-16 8 16 8-12 8 24" strokeLinejoin="round" strokeLinecap="round" />
                                    <rect x="8" y="44" width="48" height="6" rx="2" strokeLinejoin="round" />
                                    <circle cx="32" cy="14" r="3" fill="currentColor" stroke="none" />
                                    <circle cx="16" cy="20" r="2" fill="currentColor" stroke="none" />
                                    <circle cx="48" cy="20" r="2" fill="currentColor" stroke="none" />
                                </svg>
                            </div>
                            <h4 className="font-display text-sm md:text-xl font-bold text-[#3E2723] mb-1 md:mb-2 leading-snug">Heritage Bridal<br />Collections</h4>
                            <p className="text-[10px] md:text-sm italic text-[#A0845C] font-medium mb-2 md:mb-3">Limited Edition Wedding Masterpieces</p>
                            <p className="text-[10px] md:text-xs text-[#8B7355] leading-relaxed hidden sm:block">Grand yet refined temple-inspired bridal sets.</p>
                        </Link>

                        {/* Card 3: Divine Gold Icons */}
                        <Link
                            href="/daily-wear"
                            className="group relative bg-[#F5EDE0]/80 backdrop-blur-sm border border-[#D4AF37]/30 rounded-2xl md:rounded-3xl p-5 md:p-8 flex flex-col items-center text-center transition-all duration-500 hover:shadow-xl hover:shadow-[#D4AF37]/10 hover:border-[#D4AF37]/60 hover:-translate-y-1"
                        >
                            {/* Icon - Trident */}
                            <div className="mb-3 md:mb-5 text-[#A0845C] group-hover:text-[#D4AF37] transition-colors duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" className="w-10 h-10 md:w-14 md:h-14">
                                    <line x1="32" y1="8" x2="32" y2="56" strokeLinecap="round" />
                                    <path d="M32 8l-12 16h24L32 8z" strokeLinejoin="round" fill="none" />
                                    <path d="M20 24c0-8 5-14 12-16" strokeLinecap="round" />
                                    <path d="M44 24c0-8-5-14-12-16" strokeLinecap="round" />
                                    <line x1="24" y1="36" x2="40" y2="36" strokeLinecap="round" />
                                </svg>
                            </div>
                            <h4 className="font-display text-sm md:text-xl font-bold text-[#3E2723] mb-1 md:mb-2 leading-snug">Divine Gold Icons</h4>
                            <p className="text-[10px] md:text-sm italic text-[#A0845C] font-medium mb-2 md:mb-3">Sacred Luxury</p>
                            <p className="text-[10px] md:text-xs text-[#8B7355] leading-relaxed hidden sm:block">Spiritual motifs reimagined in signature gold artistry.</p>
                        </Link>

                        {/* Card 4: Premium Bullion */}
                        <Link
                            href="/bullion"
                            className="group relative bg-[#F5EDE0]/80 backdrop-blur-sm border border-[#D4AF37]/30 rounded-2xl md:rounded-3xl p-5 md:p-8 flex flex-col items-center text-center transition-all duration-500 hover:shadow-xl hover:shadow-[#D4AF37]/10 hover:border-[#D4AF37]/60 hover:-translate-y-1"
                        >
                            {/* Icon - Gold Bars */}
                            <div className="mb-3 md:mb-5 text-[#A0845C] group-hover:text-[#D4AF37] transition-colors duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" className="w-10 h-10 md:w-14 md:h-14">
                                    <path d="M10 44l6-12h32l6 12H10z" strokeLinejoin="round" />
                                    <path d="M18 32l4-8h20l4 8" strokeLinejoin="round" />
                                    <line x1="10" y1="44" x2="54" y2="44" strokeLinecap="round" />
                                    <line x1="16" y1="32" x2="48" y2="32" strokeLinecap="round" />
                                </svg>
                            </div>
                            <h4 className="font-display text-sm md:text-xl font-bold text-[#3E2723] mb-1 md:mb-2 leading-snug">Premium Bullion</h4>
                            <p className="text-[10px] md:text-sm italic text-[#A0845C] font-medium mb-2 md:mb-3">Purity. Power. Security.</p>
                            <p className="text-[10px] md:text-xs text-[#8B7355] leading-relaxed hidden sm:block">Certified 24K gold crafted for investment excellence.</p>
                        </Link>
                    </div>

                    {/* Bottom Points */}
                    <div className="mt-8 md:mt-12 space-y-2 md:space-y-3 text-center">
                        <p className="text-sm md:text-lg text-[#3E2723] font-medium flex items-center justify-center gap-2">
                            <span className="text-[#D4AF37] text-base md:text-xl">✦</span>
                            By Appointment Only for Custom Creations
                        </p>
                        <p className="text-sm md:text-lg text-[#3E2723] font-medium flex items-center justify-center gap-2">
                            <span className="text-[#D4AF37] text-base md:text-xl">✦</span>
                            Limited Pieces Crafted Each Season
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

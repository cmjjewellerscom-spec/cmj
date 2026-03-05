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

                {/* CTA Buttons — Bottom Left */}
                <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 z-10 flex flex-wrap justify-start gap-2 md:gap-3">
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
                        {/* Card 1: Order Your Own */}
                        <Link
                            href="/order/custom"
                            className="group relative bg-[#FAF5F0]/80 backdrop-blur-sm border border-[#D4AF37]/20 rounded-2xl md:rounded-3xl p-5 md:p-8 flex flex-col items-center text-center transition-all duration-500 hover:shadow-2xl hover:shadow-[#D4AF37]/20 hover:border-[#D4AF37]/50 hover:-translate-y-1"
                        >
                            {/* AI Icon */}
                            <div className="mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-500 w-16 h-16 md:w-20 md:h-20 max-w-full">
                                <img src="/images/icon-arch.png" alt="Order Your Own" className="w-full h-full object-contain mix-blend-multiply opacity-90 group-hover:opacity-100 transition-opacity drop-shadow-sm" />
                            </div>
                            <h4 className="font-display text-base md:text-xl font-medium text-[#3E2723] mb-1 md:mb-2 leading-snug">Order Your Own</h4>
                            <p className="text-[11px] md:text-sm italic text-[#8B7355] mb-3 md:mb-4">Custom Made Just For You</p>

                            {/* Divider Line */}
                            <div className="flex items-center justify-center gap-2 w-full mb-3 md:mb-4 opacity-50">
                                <div className="h-[1px] w-8 md:w-12 bg-[#8B7355]"></div>
                                <div className="w-1.5 h-1.5 md:w-2 md:h-2 rotate-45 border border-[#8B7355]"></div>
                                <div className="h-[1px] w-8 md:w-12 bg-[#8B7355]"></div>
                            </div>

                            <p className="text-[11px] md:text-sm text-[#5D4037] leading-relaxed max-w-[200px] md:max-w-[280px]">Design your dream jewellery<br className="hidden sm:block" />with our expert craftsmen.</p>
                        </Link>

                        {/* Card 2: Daily Wear Items */}
                        <Link
                            href="/categories"
                            className="group relative bg-[#FAF5F0]/80 backdrop-blur-sm border border-[#D4AF37]/20 rounded-2xl md:rounded-3xl p-5 md:p-8 flex flex-col items-center text-center transition-all duration-500 hover:shadow-2xl hover:shadow-[#D4AF37]/20 hover:border-[#D4AF37]/50 hover:-translate-y-1"
                        >
                            {/* AI Icon */}
                            <div className="mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-500 w-16 h-16 md:w-20 md:h-20 max-w-full">
                                <img src="/images/icon-crown.png" alt="Daily Wear Items" className="w-full h-full object-contain mix-blend-multiply opacity-90 group-hover:opacity-100 transition-opacity drop-shadow-sm" />
                            </div>
                            <h4 className="font-display text-base md:text-xl font-medium text-[#3E2723] mb-1 md:mb-2 leading-snug">Daily Wear Items</h4>
                            <p className="text-[11px] md:text-sm italic text-[#8B7355] mb-3 md:mb-4">Elegant Everyday Essentials</p>

                            {/* Divider Line */}
                            <div className="flex items-center justify-center gap-2 w-full mb-3 md:mb-4 opacity-50">
                                <div className="h-[1px] w-8 md:w-12 bg-[#8B7355]"></div>
                                <div className="w-1.5 h-1.5 md:w-2 md:h-2 rotate-45 border border-[#8B7355]"></div>
                                <div className="h-[1px] w-8 md:w-12 bg-[#8B7355]"></div>
                            </div>

                            <p className="text-[11px] md:text-sm text-[#5D4037] leading-relaxed max-w-[200px] md:max-w-[280px]">Lightweight gold jewellery<br className="hidden sm:block" />perfect for everyday wear.</p>
                        </Link>

                        {/* Card 3: 0% VAD Items */}
                        <Link
                            href="/categories"
                            className="group relative bg-[#FAF5F0]/80 backdrop-blur-sm border border-[#D4AF37]/20 rounded-2xl md:rounded-3xl p-5 md:p-8 flex flex-col items-center text-center transition-all duration-500 hover:shadow-2xl hover:shadow-[#D4AF37]/20 hover:border-[#D4AF37]/50 hover:-translate-y-1"
                        >
                            {/* AI Icon */}
                            <div className="mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-500 w-16 h-16 md:w-20 md:h-20 max-w-full">
                                <img src="/images/icon-trishul.png" alt="0% VAD Items" className="w-full h-full object-contain mix-blend-multiply opacity-90 group-hover:opacity-100 transition-opacity drop-shadow-sm" />
                            </div>
                            <h4 className="font-display text-base md:text-xl font-medium text-[#3E2723] mb-1 md:mb-2 leading-snug">0% VAD Items</h4>
                            <p className="text-[11px] md:text-sm italic text-[#8B7355] mb-3 md:mb-4">Zero Making Charges</p>

                            {/* Divider Line */}
                            <div className="flex items-center justify-center gap-2 w-full mb-3 md:mb-4 opacity-50">
                                <div className="h-[1px] w-8 md:w-12 bg-[#8B7355]"></div>
                                <div className="w-1.5 h-1.5 md:w-2 md:h-2 rotate-45 border border-[#8B7355]"></div>
                                <div className="h-[1px] w-8 md:w-12 bg-[#8B7355]"></div>
                            </div>

                            <p className="text-[11px] md:text-sm text-[#5D4037] leading-relaxed max-w-[200px] md:max-w-[280px]">Premium gold jewellery<br className="hidden sm:block" />with zero value addition.</p>
                        </Link>

                        {/* Card 4: Silver Bars & Ornaments */}
                        <Link
                            href="/categories"
                            className="group relative bg-[#FAF5F0]/80 backdrop-blur-sm border border-[#D4AF37]/20 rounded-2xl md:rounded-3xl p-5 md:p-8 flex flex-col items-center text-center transition-all duration-500 hover:shadow-2xl hover:shadow-[#D4AF37]/20 hover:border-[#D4AF37]/50 hover:-translate-y-1"
                        >
                            {/* AI Icon */}
                            <div className="mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-500 w-16 h-16 md:w-20 md:h-20 max-w-full">
                                <img src="/images/icon-bullion.png" alt="Silver Bars & Ornaments" className="w-full h-full object-contain mix-blend-multiply opacity-90 group-hover:opacity-100 transition-opacity drop-shadow-sm" />
                            </div>
                            <h4 className="font-display text-base md:text-xl font-medium text-[#3E2723] mb-1 md:mb-2 leading-snug">Silver Bars &<br />Ornaments</h4>
                            <p className="text-[11px] md:text-sm italic text-[#8B7355] mb-3 md:mb-4">Pure Silver Collection</p>

                            {/* Divider Line */}
                            <div className="flex items-center justify-center gap-2 w-full mb-3 md:mb-4 opacity-50">
                                <div className="h-[1px] w-8 md:w-12 bg-[#8B7355]"></div>
                                <div className="w-1.5 h-1.5 md:w-2 md:h-2 rotate-45 border border-[#8B7355]"></div>
                                <div className="h-[1px] w-8 md:w-12 bg-[#8B7355]"></div>
                            </div>

                            <p className="text-[11px] md:text-sm text-[#5D4037] leading-relaxed max-w-[200px] md:max-w-[280px]">Premium silver bars and<br className="hidden sm:block" />beautifully crafted ornaments.</p>
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

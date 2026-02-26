"use client";
import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import type { Banner } from '@/lib/supabaseUtils';

const FALLBACK_BANNERS = [
    "https://images.pexels.com/photos/248077/pexels-photo-248077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/10983780/pexels-photo-10983780.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/13022427/pexels-photo-13022427.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
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
            <div className="relative min-h-[250px] md:min-h-[500px] rounded-2xl md:rounded-3xl overflow-hidden shadow-lg">
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
                <div className="absolute bottom-8 right-2 md:bottom-10 md:right-6 z-10 flex flex-wrap justify-end gap-2 md:gap-3">
                    <Link
                        href="/categories"
                        className="inline-flex items-center gap-1.5 bg-primary text-white px-3 py-1.5 md:px-6 md:py-3 rounded-lg font-medium hover:bg-primary-dark transition-all shadow-lg text-xs md:text-base whitespace-nowrap"
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

            {/* Customer Love Section */}
            <div className="bg-surface-light shimmer-gold px-4 py-10 md:py-16">
                <div className="ornament-divider">
                    <h2 className="text-2xl md:text-4xl text-center text-[#3E2723] font-bold inline-block bg-surface-light px-6">
                        We Know what our CMJ customers love to
                    </h2>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 max-w-7xl mx-auto px-2 md:px-4 mt-8">
                    {/* Order Your Own */}
                    <Link
                        href="/order/custom"
                        className="card-warm rounded-xl md:rounded-2xl p-4 md:p-8 shadow-md hover:shadow-xl transition-all duration-300 group flex flex-col items-center justify-center text-center gap-2 md:gap-4 min-h-[140px] md:min-h-[200px]"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 md:w-12 md:h-12 text-[#3E2723] group-hover:text-[#D4AF37] transition-colors duration-300 transform group-hover:scale-110"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" /><path d="m15 5 4 4" /></svg>
                        <span className="font-display text-sm md:text-xl text-[#3E2723] group-hover:text-[#D4AF37] transition-colors font-medium leading-tight">
                            Order Your Own
                        </span>
                    </Link>

                    {/* Daily Wear Items */}
                    <Link
                        href="/daily-wear"
                        className="card-warm rounded-xl md:rounded-2xl p-4 md:p-8 shadow-md hover:shadow-xl transition-all duration-300 group flex flex-col items-center justify-center text-center gap-2 md:gap-4 min-h-[140px] md:min-h-[200px]"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 md:w-12 md:h-12 text-[#3E2723] group-hover:text-[#D4AF37] transition-colors duration-300 transform group-hover:scale-110"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>
                        <span className="font-display text-sm md:text-xl text-[#3E2723] group-hover:text-[#D4AF37] transition-colors font-medium leading-tight">
                            Daily wear items
                        </span>
                    </Link>

                    {/* 0% VAD Items */}
                    <Link
                        href="/vad-items"
                        className="card-warm rounded-xl md:rounded-2xl p-4 md:p-8 shadow-md hover:shadow-xl transition-all duration-300 group flex flex-col items-center justify-center text-center gap-2 md:gap-4 min-h-[140px] md:min-h-[200px]"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 md:w-12 md:h-12 text-[#3E2723] group-hover:text-[#D4AF37] transition-colors duration-300 transform group-hover:scale-110"><line x1="19" x2="5" y1="5" y2="19" /><circle cx="6.5" cy="6.5" r="2.5" /><circle cx="17.5" cy="17.5" r="2.5" /></svg>
                        <span className="font-display text-sm md:text-xl text-[#3E2723] group-hover:text-[#D4AF37] transition-colors font-medium leading-tight">
                            0% VAD items
                        </span>
                    </Link>

                    {/* Silver Bars */}
                    <Link
                        href="/silver"
                        className="card-warm rounded-xl md:rounded-2xl p-4 md:p-8 shadow-md hover:shadow-xl transition-all duration-300 group flex flex-col items-center justify-center text-center gap-2 md:gap-4 min-h-[140px] md:min-h-[200px]"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 md:w-12 md:h-12 text-[#3E2723] group-hover:text-[#D4AF37] transition-colors duration-300 transform group-hover:scale-110"><circle cx="8" cy="8" r="6" /><path d="M18.09 10.37A6 6 0 1 1 10.34 18" /><path d="M7 6h1v4" /><path d="m16.71 13.88.7.71-2.82 2.82" /></svg>
                        <span className="font-display text-sm md:text-xl text-[#3E2723] group-hover:text-[#D4AF37] transition-colors font-medium leading-tight">
                            Silver Bars and Silver ornaments
                        </span>
                    </Link>
                </div>
            </div>
        </section>
    );
}

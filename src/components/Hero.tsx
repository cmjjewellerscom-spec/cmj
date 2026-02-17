"use client";
import React from 'react';
import { Edit, ShoppingBag, Percent, Coins } from 'lucide-react';
import Link from 'next/link';



export default function Hero() {
    const [bannerUrl, setBannerUrl] = React.useState("/hero-bg.jpg");

    React.useEffect(() => {
        const fetchBanner = async () => {
            const { getSiteConfig } = await import('@/lib/supabaseUtils');
            const url = await getSiteConfig('home_banner');
            if (url) setBannerUrl(url);
        };
        fetchBanner();
    }, []);

    return (
        <section className="relative overflow-hidden">
            {/* ... (rest of the file) */}

            {/* Hero Background with Traditional Temple Jewelry Image */}
            <div className="relative min-h-[400px] md:min-h-[500px]">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <img
                        src={bannerUrl}
                        alt="Traditional Gold Jewelry"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            const fallbackUrl = "https://images.pexels.com/photos/248077/pexels-photo-248077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
                            if (target.src !== fallbackUrl) {
                                target.src = fallbackUrl;
                            }
                        }}
                    />
                </div>

                {/* Left Fade Gradient Overlay - Reduced to show more gold */}
                <div
                    className="absolute inset-0 z-[5]"
                    style={{
                        background: 'linear-gradient(to right, rgba(253, 248, 240, 0.95) 0%, rgba(253, 248, 240, 0.8) 20%, rgba(253, 248, 240, 0.3) 40%, transparent 55%)'
                    }}
                />

                <div className="relative z-10 pl-2 pr-4 md:pl-4 md:pr-6 py-12 md:py-16">
                    <h1 className="leading-tight mb-4 drop-shadow-sm">
                        <span
                            className="font-display text-4xl md:text-5xl lg:text-6xl text-[#3E2723] font-bold inline-block px-4 py-1 mb-2"
                            style={{
                                background: 'linear-gradient(to right, rgba(212, 175, 55, 0.15), rgba(212, 175, 55, 0.05))',
                                borderRadius: '4px'
                            }}
                        >
                            Tradition
                        </span>
                        <br />
                        <span
                            className="font-display text-4xl md:text-5xl lg:text-6xl text-[#3E2723] font-bold inline-block px-4 py-1"
                            style={{
                                background: 'linear-gradient(to right, rgba(212, 175, 55, 0.15), rgba(212, 175, 55, 0.05))',
                                borderRadius: '4px'
                            }}
                        >
                            Crafted in Gold
                        </span>
                    </h1>

                    <p className="text-sm md:text-base text-[#5D4037] mb-8 max-w-sm">
                        Exquisite handcrafted temple jewellery, passed down through generations of master artisans.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-wrap gap-3">
                        <Link
                            href="/categories"
                            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-dark transition-all shadow-lg"
                        >
                            View Collection
                        </Link>
                        <button
                            onClick={() => {
                                // Scroll to bullion section and trigger modal via custom event
                                const bullionSection = document.querySelector('#bullion-section');
                                if (bullionSection) {
                                    bullionSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                    // Trigger after scroll
                                    setTimeout(() => {
                                        const buyButton = bullionSection.querySelector('button[data-bullion-buy]') as HTMLButtonElement;
                                        if (buyButton) buyButton.click();
                                    }, 500);
                                }
                            }}
                            className="inline-flex items-center gap-2 bg-white text-text-main-light px-6 py-3 rounded-lg font-medium border-2 border-primary/30 hover:border-primary transition-all cursor-pointer"
                        >
                            24K Bullion
                        </button>
                    </div>
                </div>
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
                        <Edit strokeWidth={1.5} className="w-8 h-8 md:w-12 md:h-12 text-[#3E2723] group-hover:text-[#D4AF37] transition-colors duration-300 transform group-hover:scale-110" />
                        <span className="font-display text-sm md:text-xl text-[#3E2723] group-hover:text-[#D4AF37] transition-colors font-medium leading-tight">
                            Order Your Own
                        </span>
                    </Link>

                    {/* Daily Wear Items - Links to dedicated page */}
                    <Link
                        href="/daily-wear"
                        className="card-warm rounded-xl md:rounded-2xl p-4 md:p-8 shadow-md hover:shadow-xl transition-all duration-300 group flex flex-col items-center justify-center text-center gap-2 md:gap-4 min-h-[140px] md:min-h-[200px]"
                    >
                        <ShoppingBag strokeWidth={1.5} className="w-8 h-8 md:w-12 md:h-12 text-[#3E2723] group-hover:text-[#D4AF37] transition-colors duration-300 transform group-hover:scale-110" />
                        <span className="font-display text-sm md:text-xl text-[#3E2723] group-hover:text-[#D4AF37] transition-colors font-medium leading-tight">
                            Daily wear items
                        </span>
                    </Link>

                    {/* 0% VAD Items */}
                    <Link
                        href="/vad-items"
                        className="card-warm rounded-xl md:rounded-2xl p-4 md:p-8 shadow-md hover:shadow-xl transition-all duration-300 group flex flex-col items-center justify-center text-center gap-2 md:gap-4 min-h-[140px] md:min-h-[200px]"
                    >
                        <Percent strokeWidth={1.5} className="w-8 h-8 md:w-12 md:h-12 text-[#3E2723] group-hover:text-[#D4AF37] transition-colors duration-300 transform group-hover:scale-110" />
                        <span className="font-display text-sm md:text-xl text-[#3E2723] group-hover:text-[#D4AF37] transition-colors font-medium leading-tight">
                            0% VAD items
                        </span>
                    </Link>

                    {/* Silver Bars */}
                    <Link
                        href="/silver"
                        className="card-warm rounded-xl md:rounded-2xl p-4 md:p-8 shadow-md hover:shadow-xl transition-all duration-300 group flex flex-col items-center justify-center text-center gap-2 md:gap-4 min-h-[140px] md:min-h-[200px]"
                    >
                        <Coins strokeWidth={1.5} className="w-8 h-8 md:w-12 md:h-12 text-[#3E2723] group-hover:text-[#D4AF37] transition-colors duration-300 transform group-hover:scale-110" />
                        <span className="font-display text-sm md:text-xl text-[#3E2723] group-hover:text-[#D4AF37] transition-colors font-medium leading-tight">
                            Silver Bars and Silver ornaments
                        </span>
                    </Link>
                </div>
            </div>


        </section>
    );
}

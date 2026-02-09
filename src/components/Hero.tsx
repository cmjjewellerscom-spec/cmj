"use client";
import React from 'react';
import Link from 'next/link';

export default function Hero() {
    return (
        <section className="relative overflow-hidden">
            {/* Hero Background with Traditional Temple Jewelry Image */}
            <div className="relative min-h-[400px] md:min-h-[500px]">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <img
                        src="/hero-bg.jpg"
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

            {/* Daily Wear Categories */}
            <div className="bg-surface-light px-4 py-8">
                <h2 className="font-display text-xl md:text-2xl text-center text-text-main-light mb-6">
                    Daily Wear
                </h2>

                <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
                    {[
                        { name: 'Plain Bangles', image: '/designs/plain bangles.jpeg' },
                        { name: 'Necklace', image: '/designs/neckles.jpeg' },
                        { name: 'Antique Haram', image: '/designs/antique Haram.jpeg' },
                    ].map((item) => (
                        <Link
                            key={item.name}
                            href="/categories"
                            className="flex flex-col items-center group"
                        >
                            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-primary/20 group-hover:border-primary transition-colors mb-2 shadow-sm bg-white">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).style.display = 'none';
                                    }}
                                />
                            </div>
                            <span className="text-xs md:text-sm text-text-main-light font-medium text-center">{item.name}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}

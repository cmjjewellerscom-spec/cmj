"use client";
import React, { useState } from 'react';

import { ArrowRight, Check, ShieldCheck, TrendingUp } from 'lucide-react';
import Link from 'next/link';


export default function BullionPage() {
    const [selectedWeight, setSelectedWeight] = useState<number | null>(null);
    const [userName, setUserName] = useState('');
    const [userPhone, setUserPhone] = useState('');

    const weights = [1, 2, 5, 10, 20, 50, 100]; // Expanded weights list

    const handleWhatsAppRedirect = () => {
        if (!selectedWeight || !userName || !userPhone) {
            alert('Please select weight and fill in your details');
            return;
        }

        const phone = "919997631117";
        const message = `Hi CMJ, I would like to purchase 24K Gold Coin:\n\nName: ${userName}\nPhone: ${userPhone}\nWeight: ${selectedWeight} Grams\n\nPlease confirm availability and pricing.`;
        const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    return (
        <main className="min-h-screen bg-[#FFF8F0] pt-24 pb-12">
            <div className="container mx-auto px-4">
                {/* Breadcrumbs */}
                <div className="flex items-center gap-2 text-sm text-[#8D6E63] mb-8">
                    <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                    <span>/</span>
                    <span className="text-[#3E2723] font-semibold">Gold Bullion</span>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                    {/* Left Side - Image Gallery Style */}
                    <div className="w-full lg:w-1/2">
                        <div className="sticky top-24">
                            <div className="bg-gradient-to-br from-[#FFF8E7] to-[#F5DEB3] rounded-2xl p-8 md:p-12 relative overflow-hidden shadow-gold border border-primary/10 aspect-square flex items-center justify-center">
                                {/* Background Texture */}
                                <div className="absolute inset-0 opacity-10 bg-[url('/patterns/cream-paper.png')] mix-blend-multiply"></div>
                                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                                <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>

                                <div className="relative z-10 w-full max-w-lg aspect-square flex items-center justify-center">
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl scale-90 animate-pulse"></div>
                                    <img
                                        src="/images/cmj_bar.png"
                                        alt="24K Gold Bar"
                                        className="w-full h-auto max-h-full object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-700"
                                    />
                                </div>

                                {/* Floating badges */}
                                <div className="absolute top-6 left-6 flex flex-col gap-3">
                                    <div className="bg-white/80 backdrop-blur-md px-4 py-2 rounded-lg shadow-sm border border-primary/10 flex items-center gap-2">
                                        <TrendingUp className="w-4 h-4 text-green-600" />
                                        <span className="text-sm font-bold text-green-700">High Demand</span>
                                    </div>
                                    <div className="bg-white/80 backdrop-blur-md px-4 py-2 rounded-lg shadow-sm border border-primary/10 flex items-center gap-2">
                                        <ShieldCheck className="w-4 h-4 text-primary" />
                                        <span className="text-sm font-bold text-primary-dark">BIS Hallmarked</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Product Details */}
                    <div className="w-full lg:w-1/2">
                        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-primary/5">
                            <div className="mb-6 border-b border-primary/10 pb-6">
                                <span className="text-primary font-bold tracking-wider text-sm uppercase mb-2 block">Premium Collection</span>
                                <h1 className="font-display text-4xl md:text-5xl text-[#3E2723] font-bold mb-4">24K Gold Bar (999 Purity)</h1>
                                <p className="text-[#5D4037] text-lg leading-relaxed mb-4">
                                    Invest in timeless value with our certified 24K gold bars. Perfect for investment, gifting, and securing your future wealth. Each bar comes with BIS Hallmark certification ensuring 99.9% purity.
                                </p>
                                <div className="flex items-end gap-3">
                                    <div>
                                        <p className="text-sm text-[#8D6E63] mb-1">Live Market Rate</p>
                                        <p className="text-3xl font-bold text-primary">₹7,250<span className="text-lg text-[#5D4037] font-medium">/gram</span></p>
                                    </div>
                                    <div className="pb-1">
                                        <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded">+ GST applicable</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-8">
                                {/* Weight Selection */}
                                <div>
                                    <label className="block text-sm font-bold text-[#3E2723] mb-4 uppercase tracking-wide flex justify-between">
                                        <span>Select Weight (Grams)</span>
                                        {selectedWeight && <span className="text-primary">{selectedWeight}g Selected</span>}
                                    </label>
                                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                                        {weights.map((weight) => {
                                            const isSelected = selectedWeight === weight;
                                            return (
                                                <button
                                                    key={weight}
                                                    onClick={() => setSelectedWeight(weight)}
                                                    className={`aspect-square sm:aspect-auto sm:h-14 rounded-xl border-2 transition-all relative overflow-hidden group flex items-center justify-center ${isSelected
                                                        ? 'border-primary bg-primary text-white shadow-lg shadow-primary/30'
                                                        : 'border-primary/10 bg-[#FFF8F0] hover:border-primary text-[#5D4037] hover:bg-primary/5'
                                                        }`}
                                                >
                                                    <span className="text-lg font-bold relative z-10">{weight}g</span>
                                                    {isSelected && <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-dark opacity-100"></div>}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Highlights */}
                                <div className="grid grid-cols-2 gap-4">
                                    {[
                                        "99.9% Pure Gold",
                                        "BIS Hallmarked",
                                        "Tamper-proof Pack",
                                        "Buyback Guarantee"
                                    ].map((feature, i) => (
                                        <div key={i} className="flex items-center gap-2 text-sm text-[#5D4037]">
                                            <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                                                <Check className="w-3 h-3 text-green-600" />
                                            </div>
                                            {feature}
                                        </div>
                                    ))}
                                </div>

                                {/* Purchase Form */}
                                <div className="bg-[#FFF8F0] p-6 rounded-xl border border-primary/10">
                                    <h3 className="font-display text-xl text-[#3E2723] font-bold mb-4">Your Details</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <input
                                                type="text"
                                                value={userName}
                                                onChange={(e) => setUserName(e.target.value)}
                                                placeholder="Enter Full Name"
                                                className="w-full px-4 py-3 bg-white border border-primary/10 rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none text-[#3E2723] placeholder-primary/30 transition-all"
                                            />
                                        </div>
                                        <div>
                                            <input
                                                type="tel"
                                                value={userPhone}
                                                onChange={(e) => setUserPhone(e.target.value)}
                                                placeholder="Phone Number"
                                                className="w-full px-4 py-3 bg-white border border-primary/10 rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none text-[#3E2723] placeholder-primary/30 transition-all"
                                            />
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleWhatsAppRedirect}
                                        disabled={!selectedWeight || !userName || !userPhone}
                                        className="w-full mt-6 py-4 bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl font-bold text-lg shadow-xl shadow-primary/20 hover:shadow-primary/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 group"
                                    >
                                        <span>Buy Now via WhatsApp</span>
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                    <p className="text-xs text-center text-[#8D6E63] mt-3">
                                        Secure transaction via WhatsApp +91 99976 31117. Prices are subject to market fluctuations.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

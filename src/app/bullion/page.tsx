"use client";
import React, { useState, useRef } from 'react';
import { ArrowRight, Check, ShieldCheck, TrendingUp, ChevronRight, Award, LineChart, Package, Hexagon } from 'lucide-react';
import Link from 'next/link';
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import Footer from "@/components/Footer";

export default function BullionPage() {
    const [selectedWeight, setSelectedWeight] = useState<number | null>(null);
    const [userName, setUserName] = useState('');
    const [userPhone, setUserPhone] = useState('');

    const purchaseRef = useRef<HTMLDivElement>(null);

    const weights = [1, 2, 5, 10, 20, 50, 100];

    const scrollToPurchase = () => {
        purchaseRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleWhatsAppRedirect = () => {
        if (!selectedWeight || !userName || !userPhone) {
            alert('Please select weight and fill in your details');
            return;
        }

        const phone = "917702592121";
        const message = `Hi CMJ, I would like to purchase 24K Gold Coin:\n\nName: ${userName}\nPhone: ${userPhone}\nWeight: ${selectedWeight} Grams\n\nPlease confirm availability and pricing.`;
        const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    return (
        <main className="min-h-screen bg-[#FDFBF7] font-sans selection:bg-[#D4AF37]/20 flex flex-col">
            <Header />

            {/* Poster Layout Hero Section */}
            <section className="relative w-full min-h-screen pt-24 pb-16 flex flex-col items-center overflow-hidden">
                {/* Background Textures */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/4"></div>
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[100px] -translate-x-1/3 translate-y-1/3"></div>
                </div>

                <div className="relative z-10 w-full max-w-5xl mx-auto px-4 flex flex-col items-center">

                    {/* Top Logo Area */}
                    <div className="flex flex-col items-center mb-8">
                        <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-b from-[#D4AF37] to-[#A0845C] rounded-full p-0.5 mb-3 shadow-[0_0_15px_rgba(212,175,55,0.3)]">
                            <div className="w-full h-full bg-[#FDFBF7] rounded-full flex items-center justify-center border border-[#D4AF37]/20">
                                <span className="font-display text-2xl md:text-3xl text-[#D4AF37] font-bold tracking-tighter">CMJ</span>
                            </div>
                        </div>
                        <h2 className="text-[#3E2723] font-display font-medium tracking-[0.2em] text-sm md:text-base text-center">
                            CMJ <br /> <span className="text-[10px] md:text-xs text-[#8B7355] tracking-[0.3em]">GOLD & DIAMOND</span><br /><span className="text-[8px] md:text-[10px] text-[#A0845C] tracking-[0.4em]">JEWELLER</span>
                        </h2>
                    </div>

                    {/* Main Headings */}
                    <div className="text-center mb-10 w-full relative">
                        <div className="flex items-center justify-center gap-4 mb-3">
                            <div className="w-16 h-px bg-[#D4AF37]/40"></div>
                            <span className="text-[#5D4037] tracking-[0.3em] text-sm md:text-lg uppercase">CMJ</span>
                            <div className="w-16 h-px bg-[#D4AF37]/40"></div>
                        </div>
                        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-[#A0845C] mb-4 tracking-wider font-medium drop-shadow-sm uppercase">
                            Signature<br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#C5A059] to-[#D4AF37] font-bold text-5xl md:text-7xl lg:text-8xl mt-2 block">Bullion</span>
                        </h1>

                        <div className="flex items-center justify-center gap-6 mb-8 mt-6">
                            <div className="w-12 h-px bg-[#D4AF37]/30"></div>
                            <div className="w-2 h-2 rotate-45 bg-[#D4AF37]/50"></div>
                            <div className="w-12 h-px bg-[#D4AF37]/30"></div>
                        </div>

                        <h2 className="text-2xl md:text-4xl text-[#5D4037] font-display tracking-[0.1em] mb-2">
                            24K &bull; 999.9
                        </h2>
                        <h3 className="text-xl md:text-2xl text-[#8B7355] tracking-[0.2em] uppercase font-light mb-8">
                            Fine Gold
                        </h3>

                        <div className="flex justify-center items-center gap-2 mb-6 opacity-30">
                            <div className="w-3 h-3 rotate-45 outline outline-1 outline-[#D4AF37]"></div>
                            <div className="w-3 h-3 rotate-45 bg-[#D4AF37]"></div>
                            <div className="w-3 h-3 rotate-45 outline outline-1 outline-[#D4AF37]"></div>
                        </div>

                        <p className="text-lg md:text-2xl text-[#3E2723] tracking-[0.1em] mt-8 uppercase font-medium">
                            Investment-Grade Gold
                        </p>
                        <p className="text-[#A0845C] tracking-[0.15em] mt-2 font-medium text-sm md:text-lg">
                            FOR WEALTH & LEGACY
                        </p>
                    </div>

                    {/* Gold Bar Image */}
                    <div className="relative w-full max-w-lg mx-auto aspect-[4/3] flex items-center justify-center mb-12 group cursor-pointer" onClick={scrollToPurchase}>
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#D4AF37]/20 via-transparent to-transparent rounded-full blur-[80px] group-hover:from-[#D4AF37]/30 transition-all duration-700"></div>
                        {/* We use the image from poster but cropped/masked if we wanted, however the user requested the poster look.
                            We'll use a mix of our `/images/cmj_bar.png` styled beautifully */}
                        <img
                            src="/images/cmj_bar.png"
                            alt="CMJ 24K Fine Gold Bar"
                            className="w-full h-full object-contain drop-shadow-[0_20px_30px_rgba(212,175,55,0.4)] group-hover:scale-105 transition-transform duration-700"
                        />
                    </div>

                    {/* Fancy Explore Button */}
                    <button
                        onClick={scrollToPurchase}
                        className="group relative overflow-hidden bg-gradient-to-r from-[#A0845C] via-[#C5A059] to-[#A0845C] text-white px-8 md:px-12 py-4 md:py-5 rounded-full font-bold tracking-[0.15em] text-sm md:text-lg shadow-[0_10px_30px_rgba(160,132,92,0.4)] hover:shadow-[0_15px_40px_rgba(212,175,55,0.5)] transition-all duration-300 transform hover:-translate-y-1 mb-16 flex items-center gap-3 w-[90%] md:w-auto justify-center uppercase"
                    >
                        <span className="relative z-10">Explore Bullion Collection</span>
                        <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-2 transition-transform" />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#C5A059] via-[#D4AF37] to-[#C5A059] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </button>

                    {/* Features Grid at bottom */}
                    <div className="w-full max-w-4xl border-t border-b border-[#D4AF37]/20 py-8 px-4 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 divide-x-0 md:divide-x divide-[#D4AF37]/20">
                        <div className="flex flex-col items-center text-center px-4">
                            <div className="w-12 h-12 rounded-full bg-[#FAF5F0] border border-[#D4AF37]/30 flex items-center justify-center mb-3 text-[#A0845C] shadow-inner">
                                <Hexagon className="w-6 h-6" />
                            </div>
                            <h4 className="font-bold text-[#3E2723] tracking-wider">999.9</h4>
                            <p className="text-xs text-[#8B7355] tracking-widest uppercase mt-1">Fine Gold</p>
                        </div>
                        <div className="flex flex-col items-center text-center px-4">
                            <div className="w-12 h-12 rounded-full bg-[#FAF5F0] border border-[#D4AF37]/30 flex items-center justify-center mb-3 text-[#A0845C] shadow-inner">
                                <Award className="w-6 h-6" />
                            </div>
                            <h4 className="font-bold text-[#3E2723] tracking-wider uppercase">BIS</h4>
                            <p className="text-xs text-[#8B7355] tracking-widest uppercase mt-1">Hallmarked</p>
                        </div>
                        <div className="flex flex-col items-center text-center px-4">
                            <div className="w-12 h-12 rounded-full bg-[#FAF5F0] border border-[#D4AF37]/30 flex items-center justify-center mb-3 text-[#A0845C] shadow-inner">
                                <LineChart className="w-6 h-6" />
                            </div>
                            <h4 className="font-bold text-[#3E2723] tracking-wider uppercase">Live</h4>
                            <p className="text-xs text-[#8B7355] tracking-widest uppercase mt-1">Gold Rates</p>
                        </div>
                        <div className="flex flex-col items-center text-center px-4">
                            <div className="w-12 h-12 rounded-full bg-[#FAF5F0] border border-[#D4AF37]/30 flex items-center justify-center mb-3 text-[#A0845C] shadow-inner">
                                <Package className="w-6 h-6" />
                            </div>
                            <h4 className="font-bold text-[#3E2723] tracking-wider uppercase">Secure</h4>
                            <p className="text-xs text-[#8B7355] tracking-widest uppercase mt-1">Packaging</p>
                        </div>
                    </div>

                </div>
            </section>

            {/* Purchase Section */}
            <section ref={purchaseRef} className="w-full bg-white py-20 px-4 border-t border-[#D4AF37]/10">
                <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20">

                    {/* Left Side Info */}
                    <div className="w-full lg:w-1/2">
                        <span className="text-[#A0845C] font-bold tracking-[0.2em] text-sm uppercase mb-3 block">Premium Collection</span>
                        <h2 className="font-display text-4xl md:text-5xl text-[#3E2723] font-bold mb-6">24K Gold Bar (999.9 Purity)</h2>
                        <p className="text-[#5D4037] text-lg leading-relaxed mb-8">
                            Invest in timeless value with our certified 24K gold bars. Perfect for investment, gifting, and securing your future wealth. Each bar comes with BIS Hallmark certification ensuring 99.9% purity.
                        </p>

                        <div className="bg-[#FAF5F0] rounded-2xl p-6 md:p-8 border border-[#D4AF37]/20 shadow-sm relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#D4AF37]/10 to-transparent rounded-bl-full"></div>
                            <p className="text-sm text-[#8B7355] tracking-wide mb-2 uppercase font-medium">Live Market Rate</p>
                            <div className="flex items-baseline gap-2 mb-2">
                                <p className="text-4xl md:text-5xl font-display font-bold text-[#A0845C]">₹7,250</p>
                                <span className="text-lg text-[#5D4037] font-medium">/gram</span>
                            </div>
                            <span className="inline-block bg-[#D4AF37]/10 text-[#A0845C] text-xs font-bold px-3 py-1.5 rounded-full">+ GST applicable</span>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-8">
                            {[
                                "99.9% Pure Gold",
                                "BIS Hallmarked",
                                "Tamper-proof Pack",
                                "Buyback Guarantee"
                            ].map((feature, i) => (
                                <div key={i} className="flex items-center gap-3 text-sm md:text-base text-[#5D4037]">
                                    <div className="w-6 h-6 rounded-full bg-[#D4AF37]/10 flex items-center justify-center flex-shrink-0">
                                        <Check className="w-3.5 h-3.5 text-[#A0845C]" />
                                    </div>
                                    <span className="font-medium">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Side Form */}
                    <div className="w-full lg:w-1/2">
                        <div className="bg-[#FAF5F0] rounded-3xl p-6 md:p-10 shadow-xl border border-[#D4AF37]/20 relative overflow-hidden">
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#D4AF37]/10 rounded-full blur-2xl"></div>

                            {/* Weight Selection */}
                            <div className="mb-10 relative z-10">
                                <label className="block text-sm font-bold text-[#3E2723] mb-4 uppercase tracking-[0.1em] flex justify-between items-end">
                                    <span>Select Weight (Grams)</span>
                                    {selectedWeight && <span className="text-[#A0845C] bg-white px-3 py-1 rounded-full text-xs shadow-sm border border-[#D4AF37]/20">{selectedWeight}g Selected</span>}
                                </label>
                                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 md:gap-4">
                                    {weights.map((weight) => {
                                        const isSelected = selectedWeight === weight;
                                        return (
                                            <button
                                                key={weight}
                                                onClick={() => setSelectedWeight(weight)}
                                                className={`aspect-[4/3] rounded-xl border-2 transition-all relative overflow-hidden group flex flex-col items-center justify-center ${isSelected
                                                    ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-[#3E2723] shadow-[0_5px_15px_rgba(212,175,55,0.2)]'
                                                    : 'border-[#D4AF37]/10 bg-white hover:border-[#D4AF37]/50 text-[#5D4037] hover:bg-[#D4AF37]/5'
                                                    }`}
                                            >
                                                <span className={`text-xl font-bold font-display transition-colors ${isSelected ? 'text-[#A0845C]' : ''}`}>{weight}g</span>
                                                {isSelected && <div className="absolute top-1 right-1"><Check className="w-3 h-3 text-[#D4AF37]" /></div>}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Details Form */}
                            <div className="space-y-5 relative z-10 mb-8">
                                <h3 className="text-sm font-bold text-[#3E2723] uppercase tracking-[0.1em]">Your Details</h3>
                                <input
                                    type="text"
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                    placeholder="Enter Full Name"
                                    className="w-full px-5 py-4 bg-white border border-[#D4AF37]/20 rounded-xl focus:border-[#D4AF37] focus:ring-4 focus:ring-[#D4AF37]/10 outline-none text-[#3E2723] placeholder-[#A0845C]/50 transition-all font-medium"
                                />
                                <input
                                    type="tel"
                                    value={userPhone}
                                    onChange={(e) => setUserPhone(e.target.value)}
                                    placeholder="Phone Number"
                                    className="w-full px-5 py-4 bg-white border border-[#D4AF37]/20 rounded-xl focus:border-[#D4AF37] focus:ring-4 focus:ring-[#D4AF37]/10 outline-none text-[#3E2723] placeholder-[#A0845C]/50 transition-all font-medium"
                                />
                            </div>

                            <button
                                onClick={handleWhatsAppRedirect}
                                disabled={!selectedWeight || !userName || !userPhone}
                                className="w-full py-4 bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white rounded-xl font-bold text-lg shadow-lg shadow-green-600/20 hover:shadow-green-600/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 group relative z-10 border border-green-500/50"
                            >
                                <span>Buy via WhatsApp</span>
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                            <p className="text-xs text-center text-[#8B7355] mt-4 font-medium relative z-10">
                                Secure transaction via Official CMJ WhatsApp (+91 7702592121).
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <BottomNav />
            <Footer />
        </main>
    );
}

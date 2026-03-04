import React from 'react';
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import Footer from "@/components/Footer";
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
    title: "Divine Gold Icons | CMJ Jewellers",
    description: "Spiritual motifs reimagined in signature gold artistry. Sacred Luxury.",
};

export default function DivineIconsPage() {
    return (
        <div className="min-h-screen bg-bg-light dark:bg-bg-dark text-text-main-light dark:text-text-main-dark selection:bg-primary/20 flex flex-col pt-16 md:pt-20">
            <Header />

            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative bg-[#0A0A0A] overflow-hidden">
                    {/* Background glows */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D4AF37]/10 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2 pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#D4AF37]/5 rounded-full blur-[80px] -translate-x-1/3 translate-y-1/3 pointer-events-none" />

                    <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-24">
                        {/* Back Button */}
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-[#A0845C] hover:text-[#D4AF37] mb-8 md:mb-12 transition-colors relative z-20 hover:-translate-x-1 duration-300"
                        >
                            <ArrowLeft className="w-5 h-5" /> Back to Home
                        </Link>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                            {/* Text Content */}
                            <div className="order-2 lg:order-1 text-center lg:text-left z-10">
                                <h1 className="font-display text-4xl md:text-5xl lg:text-7xl font-bold text-[#F5EDE0] mb-6 leading-[1.1]">
                                    Divine Gold <br className="hidden lg:block" />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#FFF3D0] to-[#A0845C]">Icons</span>
                                </h1>
                                <p className="text-[#D4AF37] text-sm md:text-xl tracking-[0.25em] uppercase font-medium mb-6">
                                    Sacred Luxury
                                </p>
                                <p className="text-[#A0845C] text-base md:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed">
                                    Spiritual motifs reimagined in signature gold artistry. Crafted for those who wear their faith with pride.
                                </p>
                            </div>

                            {/* Hero Image */}
                            <div className="order-1 lg:order-2 relative z-10 mx-auto w-full max-w-lg lg:max-w-xl">
                                <div className="absolute -inset-4 bg-gradient-to-r from-[#D4AF37]/20 via-transparent to-[#D4AF37]/20 rounded-3xl blur-xl" />
                                <div className="relative aspect-[3/4] md:aspect-[4/5] rounded-2xl md:rounded-3xl overflow-hidden border border-[#D4AF37]/30 shadow-2xl">
                                    <img
                                        src="/images/divine-icons.jpg"
                                        alt="Divine 22K Gold Temple Pendants"
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                                    <div className="absolute bottom-6 left-6 right-6 text-center">
                                        <p className="text-[#F5EDE0] text-sm md:text-base italic drop-shadow-md">
                                            Hand-carved 22K gold temple architecture
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 💛 The Concept & Details */}
                <section className="py-16 md:py-24 px-4 bg-[#FAF5F0]">
                    <div className="max-w-4xl mx-auto">
                        <div className="space-y-8 md:space-y-12">

                            {/* Section 1: The Concept */}
                            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-md border border-[#D4AF37]/20 hover:shadow-xl transition-all duration-500 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#D4AF37]/10 to-transparent rounded-bl-full pointer-events-none" />
                                <div className="text-center mb-8">
                                    <h2 className="font-display text-2xl md:text-4xl font-bold text-[#3E2723] mb-3 flex items-center justify-center gap-3">
                                        💛 The Concept
                                    </h2>
                                    <div className="w-16 h-1 bg-[#D4AF37]/50 mx-auto rounded-full"></div>
                                </div>
                                <p className="text-[#8B7355] text-center text-lg mb-8 leading-relaxed">
                                    The Divine Gold Icons Collection is inspired by sacred temple art, ancient carvings, and spiritual heritage.
                                </p>
                                <div className="bg-[#FAF5F0] rounded-2xl p-6 md:p-8">
                                    <p className="text-[#3E2723] font-medium mb-4 text-center">Each piece represents:</p>
                                    <div className="flex flex-wrap justify-center gap-3 md:gap-4">
                                        {['Protection', 'Prosperity', 'Harmony', 'Strength', 'Divine energy'].map((item, i) => (
                                            <span key={i} className="px-4 py-2 border border-[#D4AF37]/30 rounded-full text-[#5D4037] text-sm font-medium bg-white">
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <p className="text-center mt-8 text-[#A0845C] italic font-medium text-lg">
                                    Crafted for those who wear their faith with pride.
                                </p>
                            </div>

                            {/* Section 2: Temple-Crafted Masterpieces */}
                            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-md border border-[#D4AF37]/20 hover:shadow-xl transition-all duration-500 relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-[#D4AF37]/10 to-transparent rounded-br-full pointer-events-none" />
                                <div className="text-center mb-8">
                                    <h2 className="font-display text-2xl md:text-3xl font-bold text-[#3E2723] mb-3 flex items-center justify-center gap-3">
                                        🛕 Temple-Crafted Masterpieces
                                    </h2>
                                    <div className="w-16 h-1 bg-[#D4AF37]/50 mx-auto rounded-full"></div>
                                </div>
                                <p className="text-[#8B7355] text-center text-lg mb-8">Every icon is:</p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
                                    {[
                                        'Hand-carved in 22K gold',
                                        'Inspired by traditional temple architecture',
                                        'Finished in antique heritage polish',
                                        'Designed with spiritual symbolism'
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-3 text-[#5D4037] bg-[#FAF5F0] p-4 rounded-xl border border-[#D4AF37]/10">
                                            <span className="w-2 h-2 rounded-full bg-[#D4AF37] flex-shrink-0" />
                                            {item}
                                        </div>
                                    ))}
                                </div>
                                <p className="text-center mt-8 text-[#A0845C] italic font-medium text-lg">
                                    This is sacred art made wearable.
                                </p>
                            </div>

                            {/* Section 3: Featured Divine Motifs */}
                            <div className="bg-gradient-to-b from-[#3E2723] to-[#2D1B13] rounded-3xl p-8 md:p-12 shadow-xl border border-[#D4AF37]/30 relative overflow-hidden">
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#D4AF37]/10 via-transparent to-transparent pointer-events-none"></div>
                                <div className="text-center mb-10 relative z-10">
                                    <h2 className="font-display text-2xl md:text-4xl font-bold text-[#F5EDE0] mb-3 flex items-center justify-center gap-3">
                                        🔱 Featured Divine Motifs
                                    </h2>
                                    <div className="w-16 h-1 bg-[#D4AF37] mx-auto rounded-full"></div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 relative z-10 max-w-3xl mx-auto">
                                    <div className="bg-white/5 backdrop-blur-sm border border-[#D4AF37]/20 p-6 rounded-2xl hover:bg-white/10 transition-colors">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="text-xl">✨</span>
                                            <h3 className="font-display text-xl font-bold text-[#D4AF37]">Ganesha</h3>
                                        </div>
                                        <p className="text-[#D3C4A5] pl-9">Blessings & Wisdom</p>
                                    </div>
                                    <div className="bg-white/5 backdrop-blur-sm border border-[#D4AF37]/20 p-6 rounded-2xl hover:bg-white/10 transition-colors">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="text-xl">✨</span>
                                            <h3 className="font-display text-xl font-bold text-[#D4AF37]">Krishna</h3>
                                        </div>
                                        <p className="text-[#D3C4A5] pl-9">Love & Protection</p>
                                    </div>
                                    <div className="bg-white/5 backdrop-blur-sm border border-[#D4AF37]/20 p-6 rounded-2xl hover:bg-white/10 transition-colors">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="text-xl">✨</span>
                                            <h3 className="font-display text-xl font-bold text-[#D4AF37]">Ram Parivar</h3>
                                        </div>
                                        <p className="text-[#D3C4A5] pl-9">Family & Dharma</p>
                                    </div>
                                    <div className="bg-white/5 backdrop-blur-sm border border-[#D4AF37]/20 p-6 rounded-2xl hover:bg-white/10 transition-colors">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="text-xl">✨</span>
                                            <h3 className="font-display text-xl font-bold text-[#D4AF37]">Nataraja</h3>
                                        </div>
                                        <p className="text-[#D3C4A5] pl-9">Power & Balance</p>
                                    </div>
                                </div>

                                <div className="text-center mt-10 relative z-10">
                                    <p className="text-[#F5EDE0] text-xl font-medium mb-1">Each icon tells a story.</p>
                                    <p className="text-[#D4AF37] text-xl font-bold italic">Each story becomes your legacy.</p>
                                </div>
                            </div>
                        </div>

                        {/* CTA Button */}
                        <div className="mt-16 text-center">
                            <Link
                                href="/daily-wear"
                                className="inline-flex items-center gap-3 bg-[#D4AF37] hover:bg-[#C9A030] text-[#3E2723] px-10 py-5 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 font-bold font-display text-xl"
                            >
                                View Collection
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            <BottomNav />
            <Footer />
        </div>
    );
}

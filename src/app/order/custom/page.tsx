import React from 'react';
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import Footer from "@/components/Footer";
import Link from 'next/link';
import { ArrowLeft, Sparkles, Paintbrush, Ruler, CheckCircle } from 'lucide-react';

export const metadata = {
    title: "Signature Custom Creations | CMJ Jewellers",
    description: "Design your own custom jewellery with CMJ. Bespoke bridal and divine jewellery crafted exclusively for you.",
};

export default function CustomOrderPage() {
    return (
        <div className="min-h-screen bg-bg-light dark:bg-bg-dark text-text-main-light dark:text-text-main-dark selection:bg-primary/20 flex flex-col pt-16 md:pt-20">
            <Header />

            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative bg-[#0F0F0F] overflow-hidden">
                    {/* Background glows */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D4AF37]/15 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2 pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#D4AF37]/10 rounded-full blur-[100px] -translate-x-1/3 translate-y-1/3 pointer-events-none" />

                    <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-28">
                        {/* Back Button */}
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-[#A0845C] hover:text-[#D4AF37] mb-10 md:mb-14 transition-colors relative z-20 hover:-translate-x-1 duration-300"
                        >
                            <ArrowLeft className="w-5 h-5" /> Back to Home
                        </Link>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                            {/* Text Content */}
                            <div className="order-2 lg:order-1 text-center lg:text-left z-10">
                                <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-[#F5EDE0] mb-8 leading-[1.1]">
                                    Signature Custom <br className="hidden lg:block" />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#FFF3D0] to-[#A0845C]">Creations</span>
                                </h1>
                                <p className="text-[#D4AF37] text-sm md:text-xl tracking-[0.3em] uppercase font-bold mb-8">
                                    Designed Around Your Story
                                </p>
                                <p className="text-[#A0845C] text-base md:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed mb-10">
                                    Why wear a design made for everyone when you can wear a story made only for you? At CMJ, we transform your visions into timeless 22K and 24K gold masterpieces.
                                </p>

                                <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                                    <a
                                        href="https://wa.me/917702592121"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-gradient-to-r from-[#D4AF37] to-[#A0845C] text-white font-bold py-4 px-10 rounded-full shadow-xl hover:shadow-[#D4AF37]/40 transition-all transform hover:-translate-y-1"
                                    >
                                        Consult with Designer
                                    </a>
                                </div>
                            </div>

                            {/* Hero Image / Illustration */}
                            <div className="order-1 lg:order-2 relative z-10 mx-auto w-full max-w-lg lg:max-w-xl">
                                <div className="absolute -inset-4 bg-gradient-to-r from-[#D4AF37]/20 via-transparent to-[#D4AF37]/20 rounded-3xl blur-2xl" />
                                <div className="relative aspect-square rounded-2xl md:rounded-3xl overflow-hidden border border-[#D4AF37]/30 shadow-2xl bg-[#1A110B] flex items-center justify-center p-12">
                                    <img
                                        src="/images/icon-arch.png"
                                        alt="Signature Custom Creations"
                                        className="w-full h-full object-contain filter drop-shadow-[0_0_30px_rgba(212,175,55,0.4)]"
                                    />
                                    <div className="absolute bottom-8 left-0 right-0 text-center">
                                        <p className="text-[#D4AF37] text-sm md:text-base font-medium tracking-widest uppercase italic">
                                            Hand-sketched. Heart-crafted.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 🎨 The Custom Process */}
                <section className="py-20 md:py-32 px-4 bg-[#FAF5F0]">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-16 md:mb-24">
                            <h2 className="font-display text-3xl md:text-5xl font-bold text-[#3E2723] mb-4">The Bespoke Journey</h2>
                            <div className="w-24 h-1 bg-[#D4AF37] mx-auto rounded-full"></div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                            {/* Step 1 */}
                            <div className="bg-white p-10 rounded-3xl shadow-sm border border-[#D4AF37]/10 flex flex-col items-center text-center group hover:shadow-2xl hover:border-[#D4AF37]/30 transition-all duration-500">
                                <div className="w-16 h-16 rounded-2xl bg-[#FAF5F0] flex items-center justify-center mb-8 group-hover:bg-[#D4AF37] group-hover:text-white transition-colors duration-500">
                                    <Paintbrush className="w-8 h-8" />
                                </div>
                                <h3 className="font-display text-2xl font-bold text-[#3E2723] mb-4">1. Design Consultation</h3>
                                <p className="text-[#8B7355] leading-relaxed">Share your ideas, sketches, or family heritage stories. Our designers will create a unique blueprint just for you.</p>
                            </div>

                            {/* Step 2 */}
                            <div className="bg-white p-10 rounded-3xl shadow-sm border border-[#D4AF37]/10 flex flex-col items-center text-center group hover:shadow-2xl hover:border-[#D4AF37]/30 transition-all duration-500">
                                <div className="w-16 h-16 rounded-2xl bg-[#FAF5F0] flex items-center justify-center mb-8 group-hover:bg-[#D4AF37] group-hover:text-white transition-colors duration-500">
                                    <Ruler className="w-8 h-8" />
                                </div>
                                <h3 className="font-display text-2xl font-bold text-[#3E2723] mb-4">2. Precision Crafting</h3>
                                <p className="text-[#8B7355] leading-relaxed">Our master artisans work with pure BIS hallmarked gold, hand-setting every stone with mathematical precision.</p>
                            </div>

                            {/* Step 3 */}
                            <div className="bg-white p-10 rounded-3xl shadow-sm border border-[#D4AF37]/10 flex flex-col items-center text-center group hover:shadow-2xl hover:border-[#D4AF37]/30 transition-all duration-500">
                                <div className="w-16 h-16 rounded-2xl bg-[#FAF5F0] flex items-center justify-center mb-8 group-hover:bg-[#D4AF37] group-hover:text-white transition-colors duration-500">
                                    <Sparkles className="w-8 h-8" />
                                </div>
                                <h3 className="font-display text-2xl font-bold text-[#3E2723] mb-4">3. Final Masterpiece</h3>
                                <p className="text-[#8B7355] leading-relaxed">Experience the reveal of a unique creation that will be passed down through generations. Your legacy, in gold.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 💎 Why Choose Custom? */}
                <section className="py-20 md:py-32 px-4 bg-[#3E2723] text-white relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/black-paper.png')]"></div>

                    <div className="max-w-4xl mx-auto relative z-10 text-center">
                        <h2 className="font-display text-3xl md:text-5xl font-bold mb-12 text-[#D4AF37]">The CMJ Custom Promise</h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-left">
                            <div className="flex items-start gap-4 p-6 bg-white/5 rounded-2xl border border-white/10">
                                <CheckCircle className="w-6 h-6 text-[#D4AF37] flex-shrink-0" />
                                <p className="text-lg">One-of-a-kind designs that will never be replicated.</p>
                            </div>
                            <div className="flex items-start gap-4 p-6 bg-white/5 rounded-2xl border border-white/10">
                                <CheckCircle className="w-6 h-6 text-[#D4AF37] flex-shrink-0" />
                                <p className="text-lg">BIS Hallmarked Purity (916 & 999 gold options).</p>
                            </div>
                            <div className="flex items-start gap-4 p-6 bg-white/5 rounded-2xl border border-white/10">
                                <CheckCircle className="w-6 h-6 text-[#D4AF37] flex-shrink-0" />
                                <p className="text-lg">Direct interaction with master jewellers.</p>
                            </div>
                            <div className="flex items-start gap-4 p-6 bg-white/5 rounded-2xl border border-white/10">
                                <CheckCircle className="w-6 h-6 text-[#D4AF37] flex-shrink-0" />
                                <p className="text-lg">Lifetime buy-back and service guarantee.</p>
                            </div>
                        </div>

                        <div className="mt-16 p-10 bg-gradient-to-br from-[#D4AF37]/20 to-transparent rounded-3xl border border-[#D4AF37]/30 italic text-xl md:text-2xl text-[#F5EDE0]">
                            "We don't just sell gold, we craft memories that live forever."
                        </div>
                    </div>
                </section>
            </main>

            <BottomNav />
            <Footer />
        </div>
    );
}

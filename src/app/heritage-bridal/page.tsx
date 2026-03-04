import React from 'react';
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import Footer from "@/components/Footer";
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
    title: "Heritage Bridal Collections | CMJ Jewellers",
    description: "Limited Edition Wedding Masterpieces. Grand yet refined temple-inspired bridal sets.",
};

export default function HeritageBridalPage() {
    return (
        <div className="min-h-screen bg-bg-light dark:bg-bg-dark text-text-main-light dark:text-text-main-dark selection:bg-primary/20 flex flex-col pt-16 md:pt-20">
            <Header />

            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative bg-[#0A0A0A] overflow-hidden">
                    {/* Background glows */}
                    <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#D4AF37]/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none" />
                    <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#D4AF37]/5 rounded-full blur-[80px] translate-x-1/3 translate-y-1/3 rounded-full pointer-events-none" />

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
                                    Heritage Bridal <br className="hidden lg:block" />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#FFF3D0] to-[#A0845C]">Collections</span>
                                </h1>
                                <p className="text-[#D4AF37] text-sm md:text-xl tracking-[0.25em] uppercase font-medium mb-6">
                                    Limited Edition Wedding Masterpieces
                                </p>
                                <p className="text-[#A0845C] text-base md:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed">
                                    Grand yet refined temple-inspired bridal sets perfectly crafted to balance royal heritage with elegant finishing.
                                </p>
                            </div>

                            {/* Hero Image */}
                            <div className="order-1 lg:order-2 relative z-10 mx-auto w-full max-w-lg lg:max-w-xl">
                                <div className="absolute -inset-4 bg-gradient-to-r from-[#D4AF37]/20 via-transparent to-[#D4AF37]/20 rounded-3xl blur-xl" />
                                <div className="relative aspect-[3/4] md:aspect-[4/5] rounded-2xl md:rounded-3xl overflow-hidden border border-[#D4AF37]/30 shadow-2xl">
                                    {/* Using a placeholder for now until we identify the provided image - user uploaded direct image without name */}
                                    <img
                                        src="/images/heritage-bride.jpg"
                                        alt="South Indian Temple Jewellery Bride"
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                                    <div className="absolute bottom-6 left-6 right-6 text-center">
                                        <p className="text-[#F5EDE0] text-sm md:text-base italic drop-shadow-md">
                                            The signature temple jewellery look on pure silk
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ✨ What Makes It Special */}
                <section className="py-16 md:py-24 px-4 bg-[#FAF5F0]">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-12 md:mb-16">
                            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#3E2723] mb-3 flex items-center justify-center gap-3">
                                💛 What Makes It Special?
                            </h2>
                            <div className="w-24 h-1 bg-[#D4AF37] mx-auto rounded-full opacity-50"></div>
                        </div>

                        <div className="space-y-6 md:space-y-8">
                            {/* Feature 1 */}
                            <div className="bg-white rounded-2xl p-6 md:p-10 shadow-sm border border-[#D4AF37]/20 hover:shadow-xl hover:border-[#D4AF37]/40 transition-all duration-300">
                                <div className="flex flex-col md:flex-row gap-6 items-start">
                                    <span className="text-4xl md:text-5xl font-display font-bold text-[#D4AF37]/40 leading-none">01</span>
                                    <div>
                                        <h3 className="font-display text-xl md:text-2xl font-bold text-[#3E2723] mb-4">Temple-Inspired Craftsmanship</h3>
                                        <p className="text-[#8B7355] mb-4">Each necklace, haram, and vaddanam reflects:</p>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            {['Temple pillars', 'Sacred arches', 'Divine carvings', 'Traditional mango & coin motifs'].map((item, i) => (
                                                <div key={i} className="flex items-center gap-3 text-[#5D4037]">
                                                    <span className="w-1.5 h-1.5 rotate-45 bg-[#D4AF37] flex-shrink-0" />
                                                    {item}
                                                </div>
                                            ))}
                                        </div>
                                        <p className="mt-4 text-[#A0845C] italic font-medium">Every detail carries heritage.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Feature 2 */}
                            <div className="bg-white rounded-2xl p-6 md:p-10 shadow-sm border border-[#D4AF37]/20 hover:shadow-xl hover:border-[#D4AF37]/40 transition-all duration-300">
                                <div className="flex flex-col md:flex-row gap-6 items-start">
                                    <span className="text-4xl md:text-5xl font-display font-bold text-[#D4AF37]/40 leading-none">02</span>
                                    <div>
                                        <h3 className="font-display text-xl md:text-2xl font-bold text-[#3E2723] mb-4">Grand Yet Balanced Design</h3>
                                        <p className="text-[#8B7355] mb-4">We maintain:</p>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            {['Royal appearance', 'Structured layering', 'Perfect weight balance', 'Elegant finishing'].map((item, i) => (
                                                <div key={i} className="flex items-center gap-3 text-[#5D4037]">
                                                    <span className="w-1.5 h-1.5 rotate-45 bg-[#D4AF37] flex-shrink-0" />
                                                    {item}
                                                </div>
                                            ))}
                                        </div>
                                        <p className="mt-4 text-[#A0845C] italic font-medium">Grand look without looking clumsy.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Feature 3 */}
                            <div className="bg-white rounded-2xl p-6 md:p-10 shadow-sm border border-[#D4AF37]/20 hover:shadow-xl hover:border-[#D4AF37]/40 transition-all duration-300">
                                <div className="flex flex-col md:flex-row gap-6 items-start">
                                    <span className="text-4xl md:text-5xl font-display font-bold text-[#D4AF37]/40 leading-none">03</span>
                                    <div>
                                        <h3 className="font-display text-xl md:text-2xl font-bold text-[#3E2723] mb-4">Premium 22K Gold Finish</h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            {['Rich antique polish', 'Matte temple texture', 'Hand-set ruby & emerald accents', 'Pearl drop finishing'].map((item, i) => (
                                                <div key={i} className="flex items-center gap-3 text-[#5D4037]">
                                                    <span className="w-1.5 h-1.5 rotate-45 bg-[#D4AF37] flex-shrink-0" />
                                                    {item}
                                                </div>
                                            ))}
                                        </div>
                                        <p className="mt-4 text-[#A0845C] italic font-medium">Made to glow beautifully on bridal silk sarees.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Feature 4 */}
                            <div className="bg-white rounded-2xl p-6 md:p-10 shadow-sm border border-[#D4AF37]/20 hover:shadow-xl hover:border-[#D4AF37]/40 transition-all duration-300">
                                <div className="flex flex-col md:flex-row gap-6 items-start">
                                    <span className="text-4xl md:text-5xl font-display font-bold text-[#D4AF37]/40 leading-none">04</span>
                                    <div>
                                        <h3 className="font-display text-xl md:text-2xl font-bold text-[#3E2723] mb-4">Complete Bridal Set Option</h3>
                                        <p className="text-[#8B7355] mb-4">Available as:</p>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                            {['Choker', 'Long Haram', 'Vaddanam', 'Jumkhas', 'Bangles', 'Head ornaments'].map((item, i) => (
                                                <div key={i} className="flex items-center gap-3 text-[#5D4037]">
                                                    <span className="w-1.5 h-1.5 rotate-45 bg-[#D4AF37] flex-shrink-0" />
                                                    {item}
                                                </div>
                                            ))}
                                        </div>
                                        <p className="mt-4 text-[#A0845C] italic font-medium">Everything designed in harmony.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Feature 5 */}
                            <div className="bg-gradient-to-r from-[#3E2723] to-[#4E342E] rounded-2xl p-6 md:p-10 shadow-xl border border-[#D4AF37]/30">
                                <div className="flex flex-col md:flex-row gap-6 items-start">
                                    <span className="text-4xl md:text-5xl font-display font-bold text-[#D4AF37] opacity-80 leading-none">05</span>
                                    <div>
                                        <h3 className="font-display text-xl md:text-2xl font-bold text-[#F5EDE0] mb-4">Limited Edition Masterpieces</h3>
                                        <p className="text-[#D3C4A5] mb-2 text-lg">We craft only selected pieces each season.</p>
                                        <p className="text-[#D3C4A5] mb-5 text-lg">No mass production.</p>
                                        <p className="text-[#D4AF37] italic font-medium text-lg">Each bride gets a signature identity.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* CTA Button removed as requested */}
                    </div>
                </section>
            </main>

            <BottomNav />
            <Footer />
        </div>
    );
}

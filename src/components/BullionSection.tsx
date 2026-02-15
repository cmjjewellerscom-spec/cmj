"use client";
import React from 'react';
import { Coins, TrendingUp, ArrowRight, Edit, ShoppingBag, Percent } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function BullionSection() {
    return (
        <section id="bullion-section" className="px-4 mb-10 md:mb-16">
            {/* ... (rest of the file) */}

            {/* <div className="mt-16"> Removed Duplicate Section </div> */}            <div className="max-w-md md:max-w-5xl mx-auto">
                <div className="bg-gradient-to-br from-[#FFF8E7] to-[#F5DEB3] rounded-2xl overflow-hidden shadow-gold relative border border-primary/20">
                    {/* Background Pattern/Texture */}
                    <div className="absolute inset-0 opacity-10 bg-[url('/patterns/cream-paper.png')] mix-blend-multiply"></div>

                    {/* Background Effects */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>

                    <div className="grid md:grid-cols-2 gap-8 p-6 md:p-10 relative z-10 items-center">
                        <div className="text-center md:text-left">
                            <div className="inline-flex items-center gap-2 bg-primary/10 px-3 py-1 rounded-full border border-primary/20 mb-4">
                                <TrendingUp className="w-3 h-3 text-primary" />
                                <span className="text-[0.65rem] md:text-xs font-bold uppercase tracking-wider text-primary">Smart Investment</span>
                            </div>

                            <h2 className="font-archivo text-4xl md:text-5xl text-[#3E2723] mb-3 drop-shadow-sm font-bold">
                                24k Gold Bullion
                            </h2>
                            <p className="text-sm md:text-base text-[#5D4037] mb-8 font-medium">
                                Secure your future with pure 999 gold coins and bars. Live market rates, starting from just 1 gram.
                            </p>

                            <Link
                                href="/bullion"
                                className="bg-gradient-to-r from-primary to-primary-dark text-white font-bold py-3 px-8 rounded-full shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all flex items-center justify-center gap-2 mx-auto md:mx-0 group w-full md:w-auto transform hover:-translate-y-0.5 inline-flex"
                            >
                                <Coins className="w-5 h-5" />
                                <span>Buy Gold</span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>

                        <div className="flex justify-center md:justify-end">
                            <div className="relative w-72 h-72 md:w-96 md:h-96 group hover:scale-105 transition-transform duration-500 flex items-center justify-center">
                                {/* Decorative Glow */}
                                <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-75 group-hover:scale-90 transition-transform duration-500"></div>

                                {/* Gold Bar Image */}
                                <Image
                                    src="/images/cmj_bar.png"
                                    alt="24K Gold Bar"
                                    className="relative z-10 object-contain drop-shadow-2xl scale-125 md:scale-150"
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />

                                {/* Floating element */}
                                <div className="absolute -top-4 -right-4 bg-white/90 backdrop-blur-md border border-primary/20 p-2 rounded-lg animate-bounce shadow-lg z-20">
                                    <span className="text-xs font-mono text-primary-dark font-bold">▲ +12% YoY</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Remove Duplicate Section */}
            </div>
        </section>
    );
}

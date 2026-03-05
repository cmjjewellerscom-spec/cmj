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

                    <div className="grid md:grid-cols-2 gap-6 p-4 md:p-6 relative z-10 items-center">
                        <div className="text-center md:text-left flex flex-col justify-center">
                            <div className="inline-flex flex-wrap items-center justify-center md:justify-start gap-2 bg-primary/10 px-3 py-1 rounded-full border border-primary/20 mb-4 self-center md:self-start w-max">
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
                                className="bg-gradient-to-r from-primary to-primary-dark text-white font-bold py-3 px-8 rounded-full shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all flex items-center justify-center gap-2 mx-auto md:mx-0 group w-max transform hover:-translate-y-0.5 inline-flex"
                            >
                                <Coins className="w-5 h-5" />
                                <span>Buy Gold</span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>

                        <div className="flex justify-center md:justify-end">
                            <div className="w-full max-w-[320px] md:max-w-sm group transition-all duration-500 flex items-center justify-center">
                                {/* Gold Bar Image */}
                                <Image
                                    src="/images/cmj-bar.png"
                                    alt="CMJ 24K Gold Bar"
                                    width={500}
                                    height={500}
                                    className="object-contain drop-shadow-[0_10px_30px_rgba(184,143,57,0.3)] transition-all duration-700 w-full h-auto"
                                    priority
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Remove Duplicate Section */}
            </div>
        </section>
    );
}

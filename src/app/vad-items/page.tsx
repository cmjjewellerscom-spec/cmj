"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRates } from '@/context/RatesContext';
import { ShoppingBag, Sparkles, ArrowLeft, Shield, Award, Scale, Percent } from 'lucide-react';

export default function VadItemsPage() {
    const { gold24k, gold22k } = useRates();
    const [selectedGrams, setSelectedGrams] = useState(1);
    const [customGrams, setCustomGrams] = useState('');

    const gramOptions = [1, 2, 5, 8, 10];
    const activeGrams = customGrams ? parseFloat(customGrams) || 0 : selectedGrams;
    const totalPrice = Math.round(gold22k * activeGrams);

    return (
        <div className="min-h-screen">
            {/* Back Navigation */}
            <div className="max-w-7xl mx-auto px-4 pt-6">
                <Link href="/" className="inline-flex items-center gap-2 text-[#3E2723] hover:text-[#D4AF37] transition-colors text-sm font-medium">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Home
                </Link>
            </div>

            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
                    {/* Product Image */}
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-amber-100">
                        <div className="relative w-full aspect-square">
                            <Image
                                src="/images/vad_0_percent.jpeg"
                                alt="0% VAD Gold Jewellery"
                                fill
                                className="object-cover"
                                priority
                            />
                            {/* Badge */}
                            <div className="absolute top-4 left-4 bg-green-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-2">
                                <Percent className="w-4 h-4" />
                                0% VA Charges
                            </div>
                        </div>
                    </div>

                    {/* Product Details */}
                    <div className="flex flex-col gap-6">
                        <div>
                            <p className="text-green-600 font-semibold uppercase tracking-wider text-sm mb-2">CMJ Special Collection</p>
                            <h1 className="text-3xl md:text-4xl font-bold text-[#3E2723] leading-tight">
                                0% VA Charges Jewellery
                            </h1>
                            <p className="text-gray-600 mt-4 text-lg leading-relaxed">
                                Premium gold jewellery with zero value addition charges.
                                Pay only for the gold weight — no extra making or VA charges.
                                The best value for your investment in pure gold.
                            </p>
                        </div>

                        {/* Live Price Card */}
                        <div className="bg-white rounded-2xl p-6 border border-amber-200 shadow-lg">
                            <p className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">Today&apos;s Live 22K Gold Rate</p>
                            <div className="flex items-end gap-2">
                                <p className="text-4xl font-bold text-[#3E2723]">₹{gold22k.toLocaleString('en-IN')}</p>
                                <span className="text-gray-500 text-lg mb-1">/gram</span>
                            </div>
                            <div className="mt-2 inline-flex items-center gap-1.5 bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">
                                <Percent className="w-3 h-3" />
                                No extra VA charges applied
                            </div>
                        </div>

                        {/* Gram Selector */}
                        <div className="bg-white rounded-2xl p-6 border border-amber-200 shadow-lg">
                            <div className="flex items-center gap-2 mb-4">
                                <Scale className="w-5 h-5 text-[#D4AF37]" />
                                <p className="text-sm font-bold text-[#3E2723] uppercase tracking-wider">Select Weight</p>
                            </div>

                            <div className="flex flex-wrap gap-2 mb-4">
                                {gramOptions.map((g) => (
                                    <button
                                        key={g}
                                        onClick={() => { setSelectedGrams(g); setCustomGrams(''); }}
                                        className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 border-2 ${!customGrams && selectedGrams === g
                                            ? 'bg-[#D4AF37] text-white border-[#D4AF37] shadow-md shadow-amber-200/50'
                                            : 'bg-white text-[#3E2723] border-gray-200 hover:border-[#D4AF37] hover:text-[#D4AF37]'
                                            }`}
                                    >
                                        {g}g
                                    </button>
                                ))}
                                <div className="relative">
                                    <input
                                        type="number"
                                        placeholder="Custom"
                                        value={customGrams}
                                        onChange={(e) => setCustomGrams(e.target.value)}
                                        min="0.5"
                                        step="0.5"
                                        className={`w-24 px-3 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 border-2 outline-none ${customGrams
                                            ? 'bg-[#D4AF37] text-white border-[#D4AF37] placeholder-amber-200'
                                            : 'bg-white text-[#3E2723] border-gray-200 hover:border-[#D4AF37] placeholder-gray-400'
                                            }`}
                                    />
                                    {customGrams && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white text-xs font-bold">g</span>}
                                </div>
                            </div>

                            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-xs text-gray-500 font-semibold">
                                            Price for <span className="text-green-600 font-bold">{activeGrams}g</span> of 22K Gold
                                        </p>
                                        <p className="text-3xl font-bold text-[#3E2723] mt-1">
                                            ₹{totalPrice.toLocaleString('en-IN')}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs text-green-600 font-bold">0% VA Charges!</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Trust Badges */}
                        <div className="grid grid-cols-2 gap-3">
                            <div className="flex items-center gap-3 bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                                <Shield className="w-8 h-8 text-green-600 flex-shrink-0" />
                                <div>
                                    <p className="font-bold text-[#3E2723] text-sm">BIS Hallmarked</p>
                                    <p className="text-xs text-gray-500">Govt. Certified Purity</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                                <Award className="w-8 h-8 text-[#D4AF37] flex-shrink-0" />
                                <div>
                                    <p className="font-bold text-[#3E2723] text-sm">Zero VA Charges</p>
                                    <p className="text-xs text-gray-500">Pay only gold weight</p>
                                </div>
                            </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3">
                            <Link
                                href="/order/custom"
                                className="flex-1 flex items-center justify-center gap-2 bg-[#D4AF37] hover:bg-[#B8960F] text-white py-4 rounded-xl font-bold text-lg transition-colors shadow-lg shadow-amber-200/50"
                            >
                                <ShoppingBag className="w-5 h-5" />
                                Order Now
                            </Link>
                            <Link
                                href="/categories"
                                className="flex-1 flex items-center justify-center gap-2 bg-white text-[#3E2723] py-4 rounded-xl font-bold text-lg border-2 border-[#D4AF37]/30 hover:border-[#D4AF37] transition-colors"
                            >
                                View All Collections
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

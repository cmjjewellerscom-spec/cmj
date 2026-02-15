"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRates } from '@/context/RatesContext';
import { ShoppingBag, Sparkles, ArrowLeft, Shield, Award, Scale } from 'lucide-react';

export default function SilverPage() {
    const { silver } = useRates();
    const [selectedGrams, setSelectedGrams] = useState(10);
    const [customGrams, setCustomGrams] = useState('');

    const gramOptions = [10, 50, 100, 250, 500];
    const activeGrams = customGrams ? parseFloat(customGrams) || 0 : selectedGrams;
    const totalPrice = Math.round(silver * activeGrams);

    return (
        <div className="bg-gradient-to-b from-gray-50 via-white to-gray-50">
            {/* Back Navigation */}
            <div className="max-w-7xl mx-auto px-4 pt-6">
                <Link href="/" className="inline-flex items-center gap-2 text-[#3E2723] hover:text-[#8B8B8B] transition-colors text-sm font-medium">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Home
                </Link>
            </div>

            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-4 py-4 md:py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
                    {/* Product Image */}
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
                        <div className="relative w-full aspect-square">
                            <Image
                                src="/images/silver_bars_ornaments.jpeg"
                                alt="Silver Bars and Silver Ornaments"
                                fill
                                className="object-cover"
                                priority
                            />
                            {/* Badge */}
                            <div className="absolute top-4 left-4 bg-gradient-to-r from-gray-600 to-gray-700 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-2">
                                <Sparkles className="w-4 h-4" />
                                Pure Silver
                            </div>
                        </div>
                    </div>

                    {/* Product Details */}
                    <div className="flex flex-col gap-6">
                        <div>
                            <p className="text-gray-500 font-semibold uppercase tracking-wider text-sm mb-2">CMJ Silver Collection</p>
                            <h1 className="text-3xl md:text-4xl font-bold text-[#3E2723] leading-tight">
                                Silver Bars & Silver Ornaments
                            </h1>
                            <p className="text-gray-600 mt-4 text-lg leading-relaxed">
                                Premium quality silver bars and beautifully crafted silver ornaments.
                                Perfect for investment, gifting, or personal collection.
                                Available in various weights starting from 10 grams.
                            </p>
                        </div>

                        {/* Live Price Card */}
                        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg">
                            <p className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">Today&apos;s Live Silver Rate</p>
                            <div className="flex items-end gap-2">
                                <p className="text-4xl font-bold text-[#3E2723]">₹{silver.toLocaleString('en-IN')}</p>
                                <span className="text-gray-500 text-lg mb-1">/gram</span>
                            </div>
                        </div>

                        {/* Gram Selector */}
                        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg">
                            <div className="flex items-center gap-2 mb-4">
                                <Scale className="w-5 h-5 text-gray-500" />
                                <p className="text-sm font-bold text-[#3E2723] uppercase tracking-wider">Select Weight</p>
                            </div>

                            <div className="flex flex-wrap gap-2 mb-4">
                                {gramOptions.map((g) => (
                                    <button
                                        key={g}
                                        onClick={() => { setSelectedGrams(g); setCustomGrams(''); }}
                                        className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 border-2 ${!customGrams && selectedGrams === g
                                            ? 'bg-gray-700 text-white border-gray-700 shadow-md'
                                            : 'bg-white text-[#3E2723] border-gray-200 hover:border-gray-500 hover:text-gray-600'
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
                                        min="1"
                                        step="1"
                                        className={`w-24 px-3 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 border-2 outline-none ${customGrams
                                            ? 'bg-gray-700 text-white border-gray-700 placeholder-gray-300'
                                            : 'bg-white text-[#3E2723] border-gray-200 hover:border-gray-500 placeholder-gray-400'
                                            }`}
                                    />
                                    {customGrams && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white text-xs font-bold">g</span>}
                                </div>
                            </div>

                            <div className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl p-4 border border-gray-200">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-xs text-gray-500 font-semibold">
                                            Price for <span className="text-gray-700 font-bold">{activeGrams}g</span> of Silver
                                        </p>
                                        <p className="text-3xl font-bold text-[#3E2723] mt-1">
                                            ₹{totalPrice.toLocaleString('en-IN')}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs text-gray-400">Making charges extra</p>
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
                                <Award className="w-8 h-8 text-gray-500 flex-shrink-0" />
                                <div>
                                    <p className="font-bold text-[#3E2723] text-sm">Pure 999 Silver</p>
                                    <p className="text-xs text-gray-500">Highest quality guaranteed</p>
                                </div>
                            </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3">
                            <Link
                                href="/order/custom"
                                className="flex-1 flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-800 text-white py-4 rounded-xl font-bold text-lg transition-colors shadow-lg"
                            >
                                <ShoppingBag className="w-5 h-5" />
                                Order Now
                            </Link>
                            <Link
                                href="/bullion"
                                className="flex-1 flex items-center justify-center gap-2 bg-white text-[#3E2723] py-4 rounded-xl font-bold text-lg border-2 border-gray-300 hover:border-gray-500 transition-colors"
                            >
                                View Gold Bullion
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

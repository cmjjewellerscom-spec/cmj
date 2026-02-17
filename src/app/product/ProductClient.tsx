"use client";
import React, { useState, useEffect, Suspense, useMemo } from 'react';
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import { ArrowLeft, CheckCircle, ShieldCheck, Truck, Lock } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useRates } from '@/context/RatesContext';
import { useProducts } from '@/hooks/useProducts';

function ProductContent() {
    const searchParams = useSearchParams();
    const idParam = searchParams.get('id');
    const id = idParam ? parseInt(idParam) : null;

    const { gold24k, gold22k, gold18k, silver, loading: ratesLoading } = useRates();
    const { products, loading: productsLoading } = useProducts();

    const product = useMemo(() =>
        products.find(p => p.id === id),
        [products, id]
    );

    const loading = ratesLoading || productsLoading;

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                <div className="text-center">
                    <p className="text-xl mb-4">Product not found</p>
                    <Link href="/categories" className="text-primary hover:underline">
                        Browse Collections
                    </Link>
                </div>
            </div>
        );
    }

    // Determine Rate based on Purity
    let rate = gold22k; // Default 22k
    let rateLabel = "Gold Rate (22K)";

    const purity = product.purity || '';

    if (purity.includes('24k') || purity.includes('24K') || product.category === 'Coins') {
        rate = gold24k;
        rateLabel = "Gold Rate (24K)";
    } else if (purity.includes('18k') || purity.includes('18K')) {
        rate = gold18k;
        rateLabel = "Gold Rate (18K)";
    } else if (product.category === 'Silver' || purity.toLowerCase().includes('silver')) {
        rate = silver;
        rateLabel = "Silver Rate";
    }

    const weightStr = product.weight || '0g';
    const initialWeight = parseFloat(weightStr.replace(/[^0-9.]/g, '')) || 0;
    const initialPrice = initialWeight * rate;

    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen font-body transition-colors duration-300">
            <Header />

            <main className="max-w-7xl mx-auto pb-24 md:py-10">
                {/* Back Button */}
                <div className="px-4 py-4 md:hidden">
                    <Link href="/categories" className="flex items-center gap-2 text-text-sub-light dark:text-text-sub-dark hover:text-primary">
                        <ArrowLeft className="w-5 h-5" /> Back to Collection
                    </Link>
                </div>

                <div className="grid md:grid-cols-2 gap-8 md:gap-16 px-4">
                    {/* Image Section */}
                    <div className="relative rounded-2xl overflow-hidden shadow-card bg-white dark:bg-black/20 aspect-square md:aspect-[4/3] group">
                        <img
                            src={product.image || "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&q=80&w=400"}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            loading="lazy"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&q=80&w=400";
                            }}
                        />
                        <div className="absolute top-4 right-4 bg-white/90 dark:bg-black/80 backdrop-blur text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                            {product.category}
                        </div>
                    </div>

                    {/* Details Section */}
                    <div className="flex flex-col justify-center">
                        <div className="mb-2 flex items-center gap-2">
                            <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">In Stock</span>
                            <span className="flex items-center gap-1 text-xs text-green-600 font-bold"><ShieldCheck className="w-3 h-3" /> BIS Hallmarked</span>
                        </div>

                        <h1 className="font-display text-3xl md:text-5xl font-bold text-text-main-light dark:text-text-main-dark mb-4 leading-tight">{product.name}</h1>

                        {/* Dynamic Price Section */}
                        <div className="bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-700/30 rounded-xl p-4 mb-6">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-semibold text-yellow-800 dark:text-yellow-200">
                                    LIVE {rateLabel}
                                </span>
                                <span className="flex items-center gap-1 text-green-600 font-bold animate-pulse text-sm">
                                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                    {loading ? "Loading..." : `₹${rate.toLocaleString('en-IN')}/g`}
                                </span>
                            </div>

                            <div className="flex items-end gap-3 mb-3">
                                <div className="flex-1">
                                    <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
                                        Enter Weight (g)
                                    </label>
                                    <input
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        defaultValue={initialWeight || ''}
                                        placeholder="Enter weight"
                                        onChange={(e) => {
                                            const val = parseFloat(e.target.value);
                                            const currentRate = rate;
                                            const priceDisplay = document.getElementById('price-display');
                                            if (priceDisplay) {
                                                priceDisplay.innerText = val ? `₹${(Math.round(val * currentRate)).toLocaleString('en-IN')}` : '₹0';
                                            }
                                        }}
                                        className="w-full bg-white dark:bg-black/20 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 font-bold text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-yellow-500 outline-none transition-all"
                                    />
                                </div>
                                <div className="flex-1 text-right">
                                    <span className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
                                        Est. Value
                                    </span>
                                    <span id="price-display" className="font-display text-2xl md:text-3xl text-primary font-bold block">
                                        {initialPrice > 0 ? `₹${Math.round(initialPrice).toLocaleString('en-IN')}` : '₹0'}
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-1">
                                <p className="text-[0.7rem] md:text-xs text-yellow-800/80 dark:text-yellow-200/60 font-medium flex items-start gap-1">
                                    <span>ⓘ</span>
                                    <span>Approx. Making Charges: 12% - 25% (Premium Handcrafted)</span>
                                </p>
                                <p className="text-[0.65rem] text-gray-400">
                                    *Final price may vary based on live market rates and customization.
                                </p>
                            </div>
                        </div>

                        {product.description && (
                            <p className="text-text-sub-light dark:text-text-sub-dark mb-8 leading-relaxed text-lg">
                                {product.description}
                            </p>
                        )}

                        {purity && (
                            <div className="grid grid-cols-1 gap-4 mb-8">
                                <div className="p-4 bg-white dark:bg-surface-dark rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm">
                                    <span className="block text-xs uppercase tracking-wider text-text-sub-light mb-1">Purity</span>
                                    <span className="font-display font-medium text-lg">{purity}</span>
                                </div>
                            </div>
                        )}

                        <div className="flex flex-col gap-4">
                            <Link
                                href={`/order/${id}`}
                                className="bg-gradient-to-r from-primary-dark to-primary text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-primary/30 transition-all text-lg flex items-center justify-center gap-3 transform active:scale-[0.98]"
                            >
                                <span>Buy Now</span>
                            </Link>

                            <div className="flex items-center justify-center gap-6 text-xs text-text-sub-light dark:text-text-sub-dark mt-4">
                                <span className="flex items-center gap-1"><Truck className="w-4 h-4" /> Free Shipping</span>
                                <span className="flex items-center gap-1"><Lock className="w-4 h-4" /> Secure Payment</span>
                                <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4" /> Lifetime Service</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <BottomNav />
        </div>
    );
}

export default function ProductClient() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div></div>}>
            <ProductContent />
        </Suspense>
    );
}

"use client";
import React, { useEffect, useState } from 'react';
import { Activity, TrendingUp, TrendingDown, RefreshCw } from 'lucide-react';

interface PriceData {
    gold24k: number;
    gold22k: number;
    silver: number;
    goldChange: number;
    silverChange: number;
    lastUpdated: Date | null;
}

export default function MarketStats() {
    const [prices, setPrices] = useState<PriceData>({
        gold24k: 0,
        gold22k: 0,
        silver: 0,
        goldChange: 0,
        silverChange: 0,
        lastUpdated: null,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchPrices = async () => {
        setLoading(true);
        setError(null);

        try {
            const API_KEY = process.env.NEXT_PUBLIC_GOLDAPI_KEY;

            // Fetch Gold prices (XAU)
            const goldRes = await fetch('https://www.goldapi.io/api/XAU/INR', {
                headers: {
                    'x-access-token': API_KEY || '',
                    'Content-Type': 'application/json',
                },
            });

            // Fetch Silver prices (XAG)
            const silverRes = await fetch('https://www.goldapi.io/api/XAG/INR', {
                headers: {
                    'x-access-token': API_KEY || '',
                    'Content-Type': 'application/json',
                },
            });

            if (!goldRes.ok || !silverRes.ok) {
                throw new Error('Failed to fetch prices');
            }

            const goldData = await goldRes.json();
            const silverData = await silverRes.json();

            setPrices({
                gold24k: Math.round(goldData.price_gram_24k),
                gold22k: Math.round(goldData.price_gram_22k),
                silver: Math.round(silverData.price_gram_24k),
                goldChange: goldData.chp || 0,
                silverChange: silverData.chp || 0,
                lastUpdated: new Date(),
            });
        } catch (err) {
            console.error('Price fetch error:', err);
            setError('Unable to fetch live prices');
            // Set fallback prices if API fails
            setPrices({
                gold24k: 7850,
                gold22k: 7195,
                silver: 95,
                goldChange: 0.25,
                silverChange: 0.15,
                lastUpdated: new Date(),
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPrices();
        // Refresh prices every 5 minutes
        const interval = setInterval(fetchPrices, 5 * 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
        }).format(price);
    };

    const formatTime = (date: Date | null) => {
        if (!date) return '--:--';
        return date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <section className="px-4 py-6 md:px-8">
            <div className="bg-white dark:bg-black/40 rounded-2xl shadow-card border border-primary/10 p-6 relative overflow-hidden">
                {/* Background decoration */}
                <div className="absolute top-0 right-0 p-4 opacity-5">
                    <Activity className="w-32 h-32 text-primary" />
                </div>

                {/* Header */}
                <div className="flex items-center justify-between mb-6 relative z-10">
                    <div className="flex items-center gap-2">
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                        </span>
                        <h2 className="font-display text-lg md:text-xl font-bold text-text-main-light dark:text-text-main-dark uppercase tracking-wider">
                            Live Market Rates
                        </h2>
                    </div>
                    <button
                        onClick={fetchPrices}
                        disabled={loading}
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors disabled:opacity-50"
                        title="Refresh prices"
                    >
                        <RefreshCw className={`w-4 h-4 text-text-sub-light ${loading ? 'animate-spin' : ''}`} />
                    </button>
                </div>

                {/* Price Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
                    {/* Gold 24K */}
                    <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/10 rounded-xl p-5 border border-yellow-200/50 dark:border-yellow-700/30">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-xs font-bold uppercase tracking-wider text-yellow-700 dark:text-yellow-400">
                                Gold 24K
                            </span>
                            <div className={`flex items-center gap-1 text-xs font-bold ${prices.goldChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {prices.goldChange >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                                {Math.abs(prices.goldChange).toFixed(2)}%
                            </div>
                        </div>
                        <div className="text-2xl md:text-3xl font-display font-bold text-yellow-800 dark:text-yellow-300">
                            {loading ? '...' : formatPrice(prices.gold24k)}
                        </div>
                        <p className="text-xs text-yellow-600 dark:text-yellow-500/80 mt-1">per gram</p>
                    </div>

                    {/* Gold 22K */}
                    <div className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/10 rounded-xl p-5 border border-amber-200/50 dark:border-amber-700/30">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                                Gold 22K
                            </span>
                            <span className="text-xs font-medium text-amber-600 dark:text-amber-500 bg-amber-200/50 dark:bg-amber-900/30 px-2 py-0.5 rounded-full">
                                Jewelry
                            </span>
                        </div>
                        <div className="text-2xl md:text-3xl font-display font-bold text-amber-800 dark:text-amber-300">
                            {loading ? '...' : formatPrice(prices.gold22k)}
                        </div>
                        <p className="text-xs text-amber-600 dark:text-amber-500/80 mt-1">per gram</p>
                    </div>

                    {/* Silver */}
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/40 dark:to-gray-700/20 rounded-xl p-5 border border-gray-200/50 dark:border-gray-600/30">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300">
                                Silver
                            </span>
                            <div className={`flex items-center gap-1 text-xs font-bold ${prices.silverChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {prices.silverChange >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                                {Math.abs(prices.silverChange).toFixed(2)}%
                            </div>
                        </div>
                        <div className="text-2xl md:text-3xl font-display font-bold text-gray-700 dark:text-gray-200">
                            {loading ? '...' : formatPrice(prices.silver)}
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400/80 mt-1">per gram</p>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-5 flex items-center justify-between text-xs text-text-sub-light/60 relative z-10">
                    <p>
                        Last updated: {formatTime(prices.lastUpdated)}
                    </p>
                    <p className="uppercase tracking-widest">
                        Powered by <a href="https://www.goldapi.io" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">GoldAPI.io</a> • GST Extra
                    </p>
                </div>
            </div>
        </section>
    );
}

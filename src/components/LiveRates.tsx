"use client";
import React from 'react';
import { useRates } from '@/context/RatesContext';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface Rate {
    label: string;
    price: string;
    trend: "up" | "down" | "stable";
    change?: string;
}

export default function LiveRates() {
    const { gold24k, gold22k, silver, diamond, loading } = useRates();

    const rates: Rate[] = [
        { label: "GOLD 24K", price: loading ? "Loading..." : `₹${gold24k.toLocaleString('en-IN')}/g`, trend: "stable" },
        { label: "GOLD 24K (10g)", price: loading ? "Loading..." : `₹${(gold24k * 10).toLocaleString('en-IN')}`, trend: "stable" },
        { label: "GOLD 22K", price: loading ? "Loading..." : `₹${gold22k.toLocaleString('en-IN')}/g`, trend: "stable" },
        { label: "SILVER", price: loading ? "Loading..." : `₹${silver.toLocaleString('en-IN')}/g`, trend: "stable" },
        { label: "DIAMOND", price: loading ? "Loading..." : `₹${diamond.toLocaleString('en-IN')}/ct`, trend: "stable" },
    ];

    const getTrendIcon = (trend: string) => {
        if (trend === "up") return <TrendingUp className="w-3 h-3 text-green-500" />;
        if (trend === "down") return <TrendingDown className="w-3 h-3 text-red-500" />;
        return null;
    };

    const getTrendColor = (trend: string) => {
        if (trend === "up") return "text-green-500";
        if (trend === "down") return "text-red-500";
        return "text-gray-400";
    };

    return (
        <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 dark:from-primary/20 dark:via-primary/10 dark:to-primary/20 border-b border-primary/20 overflow-hidden py-3 relative">
            {/* Live indicator */}
            <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 flex items-center gap-2 bg-white dark:bg-black/60 px-3 py-1 rounded-full shadow-sm">
                <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
                <span className="text-[0.6rem] font-bold uppercase tracking-wider text-text-main-light dark:text-text-main-dark">Live</span>
            </div>

            {/* Scrolling ticker with CSS animation */}
            <div className="flex whitespace-nowrap overflow-hidden ml-20">
                <div className="flex gap-8 md:gap-16 px-4 animate-marquee">
                    {[...rates, ...rates, ...rates, ...rates].map((rate, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm font-medium">
                            <span className="text-primary font-bold uppercase tracking-wider">{rate.label}:</span>
                            <span className="text-text-main-light dark:text-text-main-dark font-semibold">{rate.price}</span>
                            {rate.change && (
                                <span className={`flex items-center gap-1 text-xs ${getTrendColor(rate.trend)}`}>
                                    {getTrendIcon(rate.trend)}
                                    {rate.change}
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

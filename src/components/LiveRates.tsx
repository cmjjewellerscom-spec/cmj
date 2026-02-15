"use client";
import React from 'react';
import { useRates } from '@/context/RatesContext';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function LiveRates() {
    const { gold24k, gold24k10g, gold22k, gold18k, silver, diamond, loading } = useRates();

    const RateItem = ({ label, value }: { label: string, value: string }) => (
        <div className="flex items-center gap-2 mx-8 whitespace-nowrap">
            <span className="text-[#B8860B] font-bold font-sans text-sm uppercase tracking-wide">{label}:</span>
            <span className="text-[#262626] font-archivo text-lg tracking-wide">
                {loading ? "..." : value}
            </span>
        </div>
    );

    // Duplicate content for smoother infinite scroll illusion
    const content = (
        <>
            <RateItem label="GOLD 24K (10G)" value={`₹${(gold24k10g || gold24k * 10).toLocaleString('en-IN')}`} />
            <span className="text-primary/20 text-xs">•</span>
            <RateItem label="GOLD 24K (1G)" value={`₹${gold24k.toLocaleString('en-IN')}`} />
            <span className="text-primary/20 text-xs">•</span>
            <RateItem label="GOLD 22K (1G)" value={`₹${gold22k.toLocaleString('en-IN')}`} />
            <span className="text-primary/20 text-xs">•</span>
            <RateItem label="GOLD 18K (1G)" value={`₹${gold18k.toLocaleString('en-IN')}`} />
            <span className="text-primary/20 text-xs">•</span>
            <RateItem label="SILVER (1G)" value={`₹${silver.toLocaleString('en-IN')}`} />
            <span className="text-primary/20 text-xs">•</span>
            <RateItem label="DIAMOND (1CT)" value={`₹${diamond?.toLocaleString('en-IN') || '65,000'}`} />
            <span className="text-primary/20 text-xs">•</span>
        </>
    );

    return (
        <div className="w-full bg-[#FFF8F0] border-b border-primary/10 overflow-hidden relative z-40 h-10 flex items-center">

            {/* Left Label */}
            <div className="absolute left-0 top-0 bottom-0 bg-[#FFF8F0] z-20 px-4 flex items-center border-r border-primary/10 shadow-[4px_0_12px_-4px_rgba(0,0,0,0.05)]">
                <div className="flex items-center gap-2 bg-red-50 px-2.5 py-1 rounded-full border border-red-100/50 shadow-sm">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                    </span>
                    <span className="text-[0.65rem] font-bold text-red-600 uppercase tracking-widest whitespace-nowrap pt-0.5">
                        LIVE
                    </span>
                </div>
            </div>

            {/* Marquee Container */}
            <div className="flex animate-marquee hover:[animation-play-state:paused] items-center pl-32 md:pl-0">
                <div className="flex items-center">
                    {content}
                </div>
                {/* Duplicate for seamless loop */}
                <div className="flex items-center" aria-hidden="true">
                    {content}
                </div>
                <div className="flex items-center" aria-hidden="true">
                    {content}
                </div>
                <div className="flex items-center" aria-hidden="true">
                    {content}
                </div>
            </div>

            {/* Right Fade (optional) */}
            <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#FFF8F0] to-transparent z-10 pointer-events-none"></div>
        </div>
    );
}

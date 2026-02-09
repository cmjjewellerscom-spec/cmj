"use client";
import React from 'react';
import { ShieldCheck, Award, CheckCircle } from 'lucide-react';

export default function TrustSection() {
    return (
        <section className="px-4 mb-10 md:mb-16">
            <div className="max-w-md md:max-w-4xl mx-auto">
                <div className="text-center mb-6">
                    <h2 className="font-display text-2xl md:text-3xl text-text-main-light dark:text-text-main-dark mb-2">
                        Purity You Can Trust
                    </h2>
                    <p className="text-sm text-text-sub-light dark:text-text-sub-dark">
                        Every piece we sell is certified for authenticity.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-surface-light dark:bg-surface-dark border border-primary/20 rounded-xl p-6 flex flex-col items-center text-center shadow-card hover:shadow-lg transition-shadow">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                            <ShieldCheck className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="font-bold text-text-main-light dark:text-text-main-dark mb-1">BIS Hallmarked</h3>
                        <p className="text-xs text-text-sub-light dark:text-text-sub-dark">
                            Government certified purity for all gold jewellery.
                        </p>
                    </div>

                    <div className="bg-surface-light dark:bg-surface-dark border border-primary/20 rounded-xl p-6 flex flex-col items-center text-center shadow-card hover:shadow-lg transition-shadow">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                            <Award className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="font-bold text-text-main-light dark:text-text-main-dark mb-1">IGI Certified</h3>
                        <p className="text-xs text-text-sub-light dark:text-text-sub-dark">
                            Internationally recognized certification for diamonds.
                        </p>
                    </div>

                    <div className="bg-surface-light dark:bg-surface-dark border border-primary/20 rounded-xl p-6 flex flex-col items-center text-center shadow-card hover:shadow-lg transition-shadow">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                            <CheckCircle className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="font-bold text-text-main-light dark:text-text-main-dark mb-1">Buyback Guarantee</h3>
                        <p className="text-xs text-text-sub-light dark:text-text-sub-dark">
                            Transparent exchange and buyback policies.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

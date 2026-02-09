"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Rates {
    gold24k: number;
    gold22k: number;
    gold18k: number;
    silver: number;
    diamond: number; // per carat
}

interface RatesContextType extends Rates {
    loading: boolean;
    error: string | null;
}

// Default rates (updated to current market rates)
const defaultRates: Rates = {
    gold24k: 7850,
    gold22k: 7195,
    gold18k: 5900,
    silver: 95,
    diamond: 65000,
};

const RatesContext = createContext<RatesContextType>({
    ...defaultRates,
    loading: false,
    error: null,
});

export const useRates = () => useContext(RatesContext);

export const RatesProvider = ({ children }: { children: ReactNode }) => {
    const [rates, setRates] = useState<Rates>(defaultRates);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRates = async () => {
            try {
                // Use AbortController for timeout
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 5000);

                const response = await fetch(
                    'https://api.coingecko.com/api/v3/simple/price?ids=pax-gold,kinesis-silver&vs_currencies=inr',
                    { signal: controller.signal }
                );

                clearTimeout(timeoutId);

                if (!response.ok) {
                    throw new Error('API response not ok');
                }

                const data = await response.json();

                // 1 Troy Ounce = 31.1035 grams
                const TROY_OZ_TO_GRAMS = 31.1035;

                const paxgPrice = data['pax-gold']?.inr;
                const kagPrice = data['kinesis-silver']?.inr;

                if (paxgPrice && kagPrice) {
                    const gold24k = Math.round(paxgPrice / TROY_OZ_TO_GRAMS);
                    const silver = Math.round(kagPrice / TROY_OZ_TO_GRAMS);
                    const gold22k = Math.round(gold24k * 0.916);
                    const gold18k = Math.round(gold24k * 0.750);

                    setRates({
                        gold24k,
                        gold22k,
                        gold18k,
                        silver,
                        diamond: 65000
                    });
                    setError(null);
                }
            } catch (err) {
                // Silently use default rates - no error shown to user
                console.log('Using default rates');
            } finally {
                setLoading(false);
            }
        };

        fetchRates();

        // Update every 5 minutes instead of every minute to reduce API calls
        const interval = setInterval(fetchRates, 300000);
        return () => clearInterval(interval);
    }, []);

    return (
        <RatesContext.Provider value={{ ...rates, loading, error }}>
            {children}
        </RatesContext.Provider>
    );
};

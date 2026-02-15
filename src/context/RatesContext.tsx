"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Rates {
    gold24k: number;
    gold24k10g: number; // Added specific 10g field
    gold22k: number;
    gold18k: number;
    silver: number;
    diamond: number; // per carat
}

interface RatesContextType extends Rates {
    loading: boolean;
    error: string | null;
    isManual: boolean;
    updateManualRates: (newRates: Rates) => void;
}

// Default rates (updated to current market rates)
const defaultRates: Rates = {
    gold24k: 7850,
    gold24k10g: 78500, // Default 10x
    gold22k: 7190,
    gold18k: 5890,
    silver: 94,
    diamond: 65000,
};

const RatesContext = createContext<RatesContextType>({
    ...defaultRates,
    loading: false,
    error: null,
    isManual: false,
    updateManualRates: () => { },
});

export const useRates = () => useContext(RatesContext);

export const RatesProvider = ({ children }: { children: ReactNode }) => {
    const [rates, setRates] = useState<Rates>(defaultRates);
    const loading = false;
    const error = null;

    // Load stored rates on mount and listen for changes
    useEffect(() => {
        const loadRates = () => {
            const storedRates = localStorage.getItem('cmj_rates_manual_values');
            if (storedRates) {
                try {
                    const parsed = JSON.parse(storedRates);
                    // Ensure new fields exist if loading old data
                    setRates({ ...defaultRates, ...parsed });
                } catch (e) {
                    console.error("Failed to parse stored rates", e);
                }
            }
        };

        loadRates();

        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === 'cmj_rates_manual_values') {
                loadRates();
            }
        };

        window.addEventListener('storage', handleStorageChange);

        // Custom event for same-tab updates
        const handleCustomUpdate = () => loadRates();
        window.addEventListener('rates-updated', handleCustomUpdate);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('rates-updated', handleCustomUpdate);
        };
    }, []);

    const updateManualRates = (newRates: Rates) => {
        setRates(newRates);
        localStorage.setItem('cmj_rates_manual_values', JSON.stringify(newRates));
        window.dispatchEvent(new Event('rates-updated'));
    };

    return (
        <RatesContext.Provider value={{ ...rates, loading, error, isManual: true, updateManualRates }}>
            {children}
        </RatesContext.Provider>
    );
};

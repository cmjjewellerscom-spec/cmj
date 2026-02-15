"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

import { RatesService, Rates } from '@/services/ratesService';

interface RatesContextType extends Rates {
    loading: boolean;
    error: string | null;
    isManual: boolean;
    updateManualRates: (newRates: Rates) => Promise<boolean>;
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
    updateManualRates: async () => false,
});

export const useRates = () => useContext(RatesContext);

export const RatesProvider = ({ children }: { children: ReactNode }) => {
    const [rates, setRates] = useState<Rates>(defaultRates);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Load detailed rates from RatesService on mount
    useEffect(() => {
        const loadRates = async () => {
            setLoading(true);
            try {
                const fetchedRates = await RatesService.getRates();
                if (fetchedRates) {
                    setRates(prev => ({ ...prev, ...fetchedRates }));
                    setError(null);
                } else {
                    // If no rates found or error, keep default rates
                    // Maybe we should try to load from localStorage as backup?
                    // For now, let's stick to the service or default
                }
            } catch (e) {
                console.error("Failed to load rates from service", e);
                setError("Failed to load rates");
            } finally {
                setLoading(false);
            }
        };

        loadRates();
    }, []);

    const updateManualRates = async (newRates: Rates): Promise<boolean> => {
        setLoading(true);
        try {
            const success = await RatesService.updateRates(newRates);
            if (success) {
                setRates(newRates);
                setError(null);
                return true;
            } else {
                setError("Failed to update rates");
                return false;
            }
        } catch (e) {
            console.error("Failed to update rates", e);
            setError("Failed to update rates");
            return false;
        } finally {
            setLoading(false);
        }
    };

    return (
        <RatesContext.Provider value={{ ...rates, loading, error, isManual: true, updateManualRates }}>
            {children}
        </RatesContext.Provider>
    );
};

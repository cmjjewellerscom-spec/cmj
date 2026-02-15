"use client";
import React, { useState, useEffect } from 'react';
import { useRates } from '@/context/RatesContext';
import { Save, RefreshCw, DollarSign } from 'lucide-react';

export default function ManualRateControl() {
    const {
        gold24k, gold24k10g, gold22k, gold18k, silver, diamond,
        updateManualRates, loading
    } = useRates();

    const [values, setValues] = useState({
        gold24k: gold24k,
        gold24k10g: gold24k10g || gold24k * 10,
        gold22k: gold22k,
        gold18k: gold18k,
        silver: silver,
        diamond: diamond
    });
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    // Sync local state with context when context changes (e.g. initial load)
    useEffect(() => {
        setValues({
            gold24k,
            gold24k10g: gold24k10g || gold24k * 10,
            gold22k,
            gold18k,
            silver,
            diamond
        });
    }, [gold24k, gold24k10g, gold22k, gold18k, silver, diamond]);

    const handleInputChange = (field: keyof typeof values, value: string) => {
        const numValue = parseInt(value.replace(/,/g, '')) || 0;
        setValues(prev => ({ ...prev, [field]: numValue }));
    };

    const handleSave = () => {
        setIsSaving(true);
        // Simulate a small delay for better UX
        setTimeout(() => {
            updateManualRates(values);
            setIsSaving(false);
            setMessage("Rates updated successfully!");
            setTimeout(() => setMessage(null), 3000);
        }, 500);
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-primary/20 shadow-lg p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <DollarSign className="w-6 h-6 text-primary" />
                        Gold Rate Control
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Manual Mode Active: Setup your daily rates here.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                        Gold 24K (10g)
                    </label>
                    <input
                        type="number"
                        value={values.gold24k10g}
                        onChange={(e) => handleInputChange('gold24k10g', e.target.value)}
                        className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-gray-900 dark:text-white font-mono"
                    />
                </div>
                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                        Gold 24K (1g)
                    </label>
                    <input
                        type="number"
                        value={values.gold24k}
                        onChange={(e) => handleInputChange('gold24k', e.target.value)}
                        className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-gray-900 dark:text-white font-mono"
                    />
                </div>
                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                        Gold 22K (1g)
                    </label>
                    <input
                        type="number"
                        value={values.gold22k}
                        onChange={(e) => handleInputChange('gold22k', e.target.value)}
                        className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-gray-900 dark:text-white font-mono"
                    />
                </div>
                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                        Gold 18K (1g)
                    </label>
                    <input
                        type="number"
                        value={values.gold18k}
                        onChange={(e) => handleInputChange('gold18k', e.target.value)}
                        className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-gray-900 dark:text-white font-mono"
                    />
                </div>
                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                        Silver (1g)
                    </label>
                    <input
                        type="number"
                        value={values.silver}
                        onChange={(e) => handleInputChange('silver', e.target.value)}
                        className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-gray-900 dark:text-white font-mono"
                    />
                </div>
                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                        Diamond (1Ct)
                    </label>
                    <input
                        type="number"
                        value={values.diamond}
                        onChange={(e) => handleInputChange('diamond', e.target.value)}
                        className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-gray-900 dark:text-white font-mono"
                    />
                </div>
            </div>

            <div className="flex items-center justify-end gap-4 mt-6">
                {message && (
                    <span className="text-green-600 dark:text-green-400 text-sm font-medium animate-fade-in">
                        {message}
                    </span>
                )}

                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSaving ? (
                        <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                        <Save className="w-4 h-4" />
                    )}
                    Update Rates
                </button>
            </div>
        </div>
    );
}

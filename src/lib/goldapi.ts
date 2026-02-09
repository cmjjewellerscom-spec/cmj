/**
 * GoldAPI.io Service
 * Fetches live gold and silver prices
 */

export interface MetalPrice {
    symbol: string;
    name: string;
    price: number;          // Price per gram in INR
    pricePerGram: number;
    pricePerTola: number;   // 1 tola = 11.664 grams
    price24k: number;       // Pure gold price
    price22k: number;       // 22k gold price (jewelry standard)
    change: number;         // Price change %
    timestamp: Date;
}

export interface GoldAPIResponse {
    timestamp: number;
    metal: string;
    currency: string;
    exchange: string;
    symbol: string;
    prev_close_price: number;
    open_price: number;
    low_price: number;
    high_price: number;
    open_time: number;
    price: number;
    ch: number;
    chp: number;
    ask: number;
    bid: number;
    price_gram_24k: number;
    price_gram_22k: number;
    price_gram_21k: number;
    price_gram_20k: number;
    price_gram_18k: number;
    price_gram_14k: number;
    price_gram_10k: number;
}

const API_KEY = process.env.NEXT_PUBLIC_GOLDAPI_KEY || '';
const BASE_URL = 'https://www.goldapi.io/api';

async function fetchMetalPrice(metal: 'XAU' | 'XAG', currency: string = 'INR'): Promise<GoldAPIResponse | null> {
    try {
        const response = await fetch(`${BASE_URL}/${metal}/${currency}`, {
            headers: {
                'x-access-token': API_KEY,
                'Content-Type': 'application/json',
            },
            next: { revalidate: 300 }, // Cache for 5 minutes
        });

        if (!response.ok) {
            console.error(`GoldAPI error: ${response.status}`);
            return null;
        }

        return await response.json();
    } catch (error) {
        console.error('Failed to fetch metal price:', error);
        return null;
    }
}

export async function getGoldPrice(): Promise<MetalPrice | null> {
    const data = await fetchMetalPrice('XAU', 'INR');
    if (!data) return null;

    return {
        symbol: 'XAU',
        name: 'Gold',
        price: data.price,
        pricePerGram: data.price_gram_24k,
        pricePerTola: data.price_gram_24k * 11.664,
        price24k: data.price_gram_24k,
        price22k: data.price_gram_22k,
        change: data.chp,
        timestamp: new Date(data.timestamp * 1000),
    };
}

export async function getSilverPrice(): Promise<MetalPrice | null> {
    const data = await fetchMetalPrice('XAG', 'INR');
    if (!data) return null;

    return {
        symbol: 'XAG',
        name: 'Silver',
        price: data.price,
        pricePerGram: data.price_gram_24k,
        pricePerTola: data.price_gram_24k * 11.664,
        price24k: data.price_gram_24k,
        price22k: data.price_gram_24k, // Silver doesn't have karats
        change: data.chp,
        timestamp: new Date(data.timestamp * 1000),
    };
}

export async function getAllPrices(): Promise<{ gold: MetalPrice | null; silver: MetalPrice | null }> {
    const [gold, silver] = await Promise.all([getGoldPrice(), getSilverPrice()]);
    return { gold, silver };
}

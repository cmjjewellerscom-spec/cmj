
const BIN_ID = process.env.NEXT_PUBLIC_JSONBIN_BIN_ID;
const MASTER_KEY = process.env.NEXT_PUBLIC_JSONBIN_MASTER_KEY;
const API_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;

export interface Rates {
    gold24k: number;
    gold24k10g: number;
    gold22k: number;
    gold18k: number;
    silver: number;
    diamond: number;
}

export const RatesService = {
    // Fetch rates from JSONBin
    async getRates(): Promise<Rates | null> {
        try {
            if (!BIN_ID || !MASTER_KEY) {
                console.warn("JSONBin credentials missing");
                return null;
            }

            const response = await fetch(API_URL, {
                method: 'GET',
                headers: {
                    'X-Master-Key': MASTER_KEY,
                    'Content-Type': 'application/json'
                },
                cache: 'no-store' // Ensure fresh data
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch rates: ${response.statusText}`);
            }

            const data = await response.json();
            return data.record as Rates;
        } catch (error) {
            console.error("RatesService.getRates error:", error);
            return null;
        }
    },

    // Update rates in JSONBin
    async updateRates(rates: Rates): Promise<boolean> {
        try {
            if (!BIN_ID || !MASTER_KEY) {
                console.warn("JSONBin credentials missing");
                return false;
            }

            const response = await fetch(API_URL, {
                method: 'PUT',
                headers: {
                    'X-Master-Key': MASTER_KEY,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(rates)
            });

            if (!response.ok) {
                throw new Error(`Failed to update rates: ${response.statusText}`);
            }

            return true;
        } catch (error) {
            console.error("RatesService.updateRates error:", error);
            return false;
        }
    }
};

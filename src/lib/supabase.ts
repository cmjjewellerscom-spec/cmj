import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Helper to check if we're in a browser environment
const isBrowser = typeof window !== 'undefined';

// Helper to validate environment variables
const isValidEnv = (url: string, key: string) => {
    return url && key && url.startsWith('http') && !url.includes('...') && !key.includes('...');
};

// Start with a dummy client if env vars are missing (prevents build crash)
let client = createClient('https://placeholder.supabase.co', 'placeholder-key');

if (isValidEnv(supabaseUrl, supabaseAnonKey)) {
    client = createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
            persistSession: isBrowser, // Only persist session in browser
            autoRefreshToken: isBrowser,
            detectSessionInUrl: isBrowser
        }
    });
} else {
    if (process.env.NODE_ENV === 'production' && !process.env.NEXT_PUBLIC_SUPABASE_URL) {
        console.warn('Supabase env vars missing in production build!');
    }
}

export const supabase = client;

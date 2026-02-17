import { createClient } from '@supabase/supabase-js';

const envUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const envKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Check if URL is valid (basic check)
const isValidUrl = (url: string | undefined) => url && url.startsWith('http') && !url.includes('...');

const supabaseUrl = isValidUrl(envUrl) ? envUrl! : 'https://placeholder.supabase.co';
const supabaseAnonKey = (envKey && !envKey.includes('...')) ? envKey : 'placeholder-key';

if (!isValidUrl(envUrl) || !envKey || envKey.includes('...')) {
    console.warn('Supabase URL or Anon Key is missing or invalid. Using placeholder values for build.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

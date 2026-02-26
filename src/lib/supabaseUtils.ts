import { supabase } from './supabase';
import { Product } from '@/data/products';

// --- Products ---

export async function getProducts() {
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
}

export async function addProduct(product: Omit<Product, 'id'>) {
    const { data, error } = await supabase
        .from('products')
        .insert([product])
        .select();

    if (error) throw error;
    return data[0];
}

export async function updateProduct(id: number, product: Partial<Product>) {
    const { data, error } = await supabase
        .from('products')
        .update(product)
        .eq('id', id)
        .select();

    if (error) throw error;
    return data[0];
}

export async function deleteProduct(id: number) {
    const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

    if (error) throw error;
}

// --- Reviews ---

export interface Review {
    id: number;
    title: string;
    description: string;
    name: string;
    rating: number;
    link?: string;
    approved?: boolean;
    created_at?: string;
}

export async function getReviews(onlyApproved: boolean = true) {
    let query = supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false });

    // If "approve button not needed", maybe we just show all? 
    // But for safety, if the user explicitly asked to "remove approve button", 
    // it likely means they assume reviews are approved by default or they check them differently.
    // However, existing public page filters by approved=true. 
    // I will auto-set approved=true on insert for now so they appear immediately.

    if (onlyApproved) {
        query = query.eq('approved', true);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data;
}

export async function addReview(review: Omit<Review, 'id' | 'created_at'>) {
    // Force approved=true based on user request to remove approval workflow
    const reviewWithApproval = { ...review, approved: true };

    const { data, error } = await supabase
        .from('reviews')
        .insert([reviewWithApproval])
        .select();

    if (error) throw error;
    return data[0];
}

export async function deleteReview(id: number) {
    const { error } = await supabase
        .from('reviews')
        .delete()
        .eq('id', id);

    if (error) throw error;
}

// --- Storage ---

export async function uploadImage(file: File, bucket: string = 'products') {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { data, error } = await supabase.storage
        .from(bucket)
        .upload(filePath, file);

    if (error) throw error;

    const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

    return publicUrl;
}

// --- Site Config (Banner, Title) ---

export async function getSiteConfig(key: string) {
    const { data, error } = await supabase
        .from('site_config')
        .select('value')
        .eq('key', key)
        .single();

    if (error && error.code !== 'PGRST116') { // Ignore not found error
        console.error(`Error fetching config ${key}:`, error);
    }
    return data?.value || null;
}

export async function updateSiteConfig(key: string, value: string) {
    const { data, error } = await supabase
        .from('site_config')
        .upsert({ key, value }, { onConflict: 'key' })
        .select();

    if (error) throw error;
    return data[0];
}

// --- Banners ---

export interface Banner {
    id: number;
    image_url: string;
    display_order: number;
    created_at?: string;
}

export async function getBanners(): Promise<Banner[]> {
    const { data, error } = await supabase
        .from('banners')
        .select('*')
        .order('display_order', { ascending: true });

    if (error) {
        console.error('Error fetching banners:', error);
        return [];
    }
    return data || [];
}

export async function addBanner(imageUrl: string, displayOrder: number): Promise<Banner> {
    const { data, error } = await supabase
        .from('banners')
        .insert([{ image_url: imageUrl, display_order: displayOrder }])
        .select();

    if (error) throw error;
    return data[0];
}

export async function deleteBanner(id: number): Promise<void> {
    const { error } = await supabase
        .from('banners')
        .delete()
        .eq('id', id);

    if (error) throw error;
}

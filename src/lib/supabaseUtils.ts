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
    id: string;
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

    if (onlyApproved) {
        query = query.eq('approved', true);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data;
}

export async function addReview(review: Omit<Review, 'id' | 'created_at'>) {
    const { data, error } = await supabase
        .from('reviews')
        .insert([review])
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

export async function updateReviewApproval(id: number, approved: boolean) {
    const { error } = await supabase
        .from('reviews')
        .update({ approved })
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

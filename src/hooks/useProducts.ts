"use client";
import { useState, useEffect } from 'react';
import { getProducts } from '@/lib/supabaseUtils';
import { Product, products as staticProducts } from '@/data/products';

export function useProducts() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProducts() {
            // Check if we are using placeholder keys (build time), if so, skip fetch or use static data
            const isBuildTime = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY === 'placeholder-key';

            if (isBuildTime) {
                console.log('Build time detected, using static products');
                // You could import static products here if available, or just set empty array
                // For now, let's just set empty to avoid the error
                setProducts([]);
                setLoading(false);
                return;
            }

            try {
                const data = await getProducts();
                if (data && data.length > 0) {
                    setProducts(data);
                } else {
                    // Fallback to static products if DB is empty or connection fails silently
                    console.warn('Supabase returned no products, using static fallback.');
                    setProducts(staticProducts);
                }
            } catch (error) {
                console.error('Error fetching products, using static fallback:', error);
                setProducts(staticProducts);
            } finally {
                setLoading(false);
            }
        }
        fetchProducts();
    }, []);

    return { products, loading };
}

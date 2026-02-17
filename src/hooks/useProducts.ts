"use client";
import { useState, useEffect } from 'react';
import { products as localProducts, Product } from '@/data/products';

export function useProducts() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate async fetch
        setProducts(localProducts);
        setLoading(false);
    }, []);

    return { products, loading };
}

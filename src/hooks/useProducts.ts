"use client";
import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Product } from '@/data/products'; // Import type directly

export function useProducts() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const q = query(collection(db, 'products'), orderBy('id'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const items: Product[] = [];
            snapshot.forEach((doc) => {
                items.push(doc.data() as Product);
            });
            setProducts(items);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    return { products, loading };
}

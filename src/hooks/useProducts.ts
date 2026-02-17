"use client";
import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { getFirebaseDb } from '@/lib/firebase';
import { Product } from '@/data/products'; // Import type directly

export function useProducts() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const db = getFirebaseDb();
        if (!db) {
            setLoading(false);
            return;
        }

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

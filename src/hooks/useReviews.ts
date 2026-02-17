"use client";

import { useEffect, useState } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { getFirebaseDb } from '@/lib/firebase';
import { Review } from '@/lib/firestoreUtils';

export function useReviews() {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const db = getFirebaseDb();
        if (!db) {
            setLoading(false);
            return;
        }

        const q = query(
            collection(db, 'reviews')
            // orderBy('createdAt', 'desc') // Requires index sometimes, let's keep it simple first or handle locally
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Review[];

            // Sort by createdAt desc locally to avoid index requirement immediately
            data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

            setReviews(data);
            setLoading(false);
        }, (error) => {
            console.error("Error fetching reviews:", error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return { reviews, loading };
}

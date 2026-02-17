"use client";
import { useState, useEffect } from 'react';
import { getReviews, Review } from '@/lib/supabaseUtils';

export function useReviews(onlyApproved: boolean = true) {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchReviews() {
            try {
                const data = await getReviews(onlyApproved);
                setReviews(data || []);
            } catch (error) {
                console.error('Error fetching reviews (DB might be empty):', error);
                setReviews([]); // Graceful fallback
            } finally {
                setLoading(false);
            }
        }
        fetchReviews();
    }, [onlyApproved]);

    return { reviews, loading };
}

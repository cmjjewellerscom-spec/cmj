"use client";

import { useEffect, useState } from 'react';

export interface Review {
    id: string;
    title: string;
    description: string;
    name: string;
    rating: number;
    createdAt: string;
    approved?: boolean;
    link?: string;
}

export function useReviews() {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Mock empty reviews or local storage
        setReviews([]);
        setLoading(false);
    }, []);

    return { reviews, loading };
}

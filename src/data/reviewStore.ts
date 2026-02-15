export interface Review {
    id: number;
    title: string;
    description: string;
    link: string;
    name: string;
    rating: number;
    createdAt: string;
}

const REVIEWS_KEY = 'cmj_reviews';

const DEFAULT_REVIEWS: Review[] = [
    {
        id: 1,
        title: "Beautiful Gold Necklace!",
        description: "Ordered a gold necklace for my wife's birthday. The craftsmanship is amazing and the purity is exactly as promised. CMJ never disappoints!",
        link: "",
        name: "Ramesh Kumar",
        rating: 5,
        createdAt: "2025-12-15T10:30:00.000Z"
    },
    {
        id: 2,
        title: "Best Jewellery Shop in Vijayawada",
        description: "I have been a loyal customer of CMJ for over 5 years. Their designs are unique and the gold quality is top notch. Highly recommended!",
        link: "",
        name: "Lakshmi Devi",
        rating: 5,
        createdAt: "2026-01-05T14:20:00.000Z"
    },
    {
        id: 3,
        title: "Great Silver Collection",
        description: "Bought silver bars and some silver ornaments. Very competitive pricing and genuine quality. The staff is very helpful and friendly.",
        link: "",
        name: "Suresh Reddy",
        rating: 4,
        createdAt: "2026-01-20T09:15:00.000Z"
    },
    {
        id: 4,
        title: "Perfect Temple Jewellery",
        description: "The temple jewellery collection at CMJ is outstanding. Got a beautiful set for my daughter's wedding. Everyone loved it!",
        link: "",
        name: "Padma Priya",
        rating: 5,
        createdAt: "2026-02-01T16:45:00.000Z"
    },
    {
        id: 5,
        title: "Trusted for Gold Investment",
        description: "I regularly buy gold coins and bars from CMJ for investment. Their rates are fair and the BIS hallmark certification gives me confidence.",
        link: "",
        name: "Venkat Rao",
        rating: 5,
        createdAt: "2026-02-10T11:00:00.000Z"
    },
];

// Get all reviews
export function getAllReviews(): Review[] {
    if (typeof window === 'undefined') {
        return DEFAULT_REVIEWS;
    }

    const stored = localStorage.getItem(REVIEWS_KEY);
    if (stored) {
        try {
            const reviews = JSON.parse(stored) as Review[];
            if (reviews.length > 0) return reviews;
        } catch {
            // fall through to defaults
        }
    }

    // Seed defaults on first visit
    localStorage.setItem(REVIEWS_KEY, JSON.stringify(DEFAULT_REVIEWS));
    return DEFAULT_REVIEWS;
}

// Add a new review
export function addReview(review: Omit<Review, 'id' | 'createdAt'>): Review {
    const reviews = getAllReviews();

    const maxId = reviews.reduce((max, r) => Math.max(max, r.id), 0);
    const newReview: Review = {
        ...review,
        id: maxId + 1,
        createdAt: new Date().toISOString()
    };

    reviews.push(newReview);
    localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews));

    return newReview;
}

// Delete a review
export function deleteReview(id: number): boolean {
    const reviews = getAllReviews();
    const index = reviews.findIndex(r => r.id === id);

    if (index !== -1) {
        reviews.splice(index, 1);
        localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews));
        return true;
    }

    return false;
}

// Update a review
export function updateReview(id: number, updates: Partial<Review>): boolean {
    const reviews = getAllReviews();
    const index = reviews.findIndex(r => r.id === id);

    if (index !== -1) {
        reviews[index] = { ...reviews[index], ...updates };
        localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews));
        return true;
    }

    return false;
}

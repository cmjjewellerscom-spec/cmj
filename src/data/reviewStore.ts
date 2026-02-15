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

// Get all reviews
export function getAllReviews(): Review[] {
    if (typeof window === 'undefined') {
        return [];
    }

    const stored = localStorage.getItem(REVIEWS_KEY);
    if (stored) {
        try {
            return JSON.parse(stored) as Review[];
        } catch {
            return [];
        }
    }
    return [];
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

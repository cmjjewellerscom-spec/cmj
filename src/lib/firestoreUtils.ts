import { getFirebaseDb } from '@/lib/firebase';
import { collection, doc, getDocs, setDoc, updateDoc, deleteDoc, query } from 'firebase/firestore';
import { Product } from '@/data/products';

export interface Review {
    id: string; // Firestore uses string IDs
    title: string;
    description: string;
    link?: string;
    name: string;
    rating: number;
    createdAt: string;
    approved?: boolean;
}

// --- Product Functions ---

export async function addProduct(product: Omit<Product, 'id'>) {
    const db = getFirebaseDb();
    if (!db) throw new Error("Firebase not initialized");

    // Generate a numeric ID to match existing logic/URLs
    // Find max ID currently in DB
    const q = query(collection(db, 'products'));
    const snapshot = await getDocs(q);
    let maxId = 0;
    snapshot.forEach(d => {
        const data = d.data() as Product;
        if (data.id && typeof data.id === 'number' && data.id > maxId) maxId = data.id;
    });
    const newId = maxId + 1;

    const newProduct = { ...product, id: newId };

    // Use ID as document ID for easier retrieval
    await setDoc(doc(db, 'products', newId.toString()), newProduct);

    return newProduct;
}

export async function updateProductFn(id: number, updates: Partial<Product>) {
    const db = getFirebaseDb();
    if (!db) throw new Error("Firebase not initialized");
    const ref = doc(db, 'products', id.toString());
    await updateDoc(ref, updates);
}

export async function deleteProductFn(id: number) {
    const db = getFirebaseDb();
    if (!db) throw new Error("Firebase not initialized");
    const ref = doc(db, 'products', id.toString());
    await deleteDoc(ref);
}

// --- Review Functions ---

export async function addReviewFn(review: Omit<Review, 'id' | 'createdAt'>) {
    const db = getFirebaseDb();
    if (!db) throw new Error("Firebase not initialized");
    // Create a new doc reference with auto-generated ID
    const newReviewRef = doc(collection(db, 'reviews'));

    const newReview: Review = {
        ...review,
        id: newReviewRef.id,
        createdAt: new Date().toISOString(),
        approved: true // Auto-approve for now
    };

    await setDoc(newReviewRef, newReview);
    return newReview;
}

export async function deleteReviewFn(id: string) {
    const db = getFirebaseDb();
    if (!db) throw new Error("Firebase not initialized");
    const ref = doc(db, 'reviews', id);
    await deleteDoc(ref);
}

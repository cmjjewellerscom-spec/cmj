import { db } from '@/lib/firebase';
import { collection, doc, getDocs, query, setDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { Product } from '@/data/products';

export async function addProduct(product: Omit<Product, 'id'>) {
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
    const ref = doc(db, 'products', id.toString());
    await updateDoc(ref, updates);
}

export async function deleteProductFn(id: number) {
    const ref = doc(db, 'products', id.toString());
    await deleteDoc(ref);
}

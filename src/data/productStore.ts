import { Product, products as defaultProducts } from './products';

// Re-export Product type
export type { Product };

const PRODUCTS_KEY = 'cmj_products';

// Get all products (default + localStorage)
export function getAllProducts(): Product[] {
    if (typeof window === 'undefined') {
        return defaultProducts;
    }

    const stored = localStorage.getItem(PRODUCTS_KEY);
    if (stored) {
        try {
            const customProducts = JSON.parse(stored) as Product[];
            const customIds = new Set(customProducts.map(p => p.id));

            // Filter out default products that are overridden by custom products
            const effectiveDefaults = defaultProducts.filter(p => !customIds.has(p.id));

            // Combine: custom products + remaining default products
            // Sort by ID to maintain stable order
            return [...customProducts, ...effectiveDefaults].sort((a, b) => a.id - b.id);
        } catch {
            return defaultProducts;
        }
    }
    return defaultProducts;
}

// Get only custom products from localStorage
export function getCustomProducts(): Product[] {
    if (typeof window === 'undefined') {
        return [];
    }

    const stored = localStorage.getItem(PRODUCTS_KEY);
    if (stored) {
        try {
            return JSON.parse(stored) as Product[];
        } catch {
            return [];
        }
    }
    return [];
}

// Add a new product
export function addProduct(product: Omit<Product, 'id'>): Product {
    const customProducts = getCustomProducts();
    const allProducts = getAllProducts();

    // Generate new ID (max ID + 1)
    const maxId = allProducts.reduce((max, p) => Math.max(max, p.id), 0);
    const newProduct: Product = {
        ...product,
        id: maxId + 1
    };

    customProducts.push(newProduct);
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(customProducts));

    return newProduct;
}

// Update a product
export function updateProduct(id: number, updates: Partial<Product>): boolean {
    const customProducts = getCustomProducts();
    const index = customProducts.findIndex(p => p.id === id);

    // If it's already a custom product (or shadowed default), update it
    if (index !== -1) {
        customProducts[index] = { ...customProducts[index], ...updates };
        localStorage.setItem(PRODUCTS_KEY, JSON.stringify(customProducts));
        return true;
    }

    // If it's a default product, create a shadow copy in custom products
    const defaultProduct = defaultProducts.find(p => p.id === id);
    if (defaultProduct) {
        const shadowProduct = { ...defaultProduct, ...updates };
        customProducts.push(shadowProduct);
        localStorage.setItem(PRODUCTS_KEY, JSON.stringify(customProducts));
        return true;
    }

    return false;
}

// Delete a product
export function deleteProduct(id: number): boolean {
    const customProducts = getCustomProducts();
    const index = customProducts.findIndex(p => p.id === id);

    if (index !== -1) {
        customProducts.splice(index, 1);
        localStorage.setItem(PRODUCTS_KEY, JSON.stringify(customProducts));
        return true;
    }

    // Can't delete default products
    return false;
}

// Get unique collections from all products
export function getAllCollections(): string[] {
    const allProducts = getAllProducts();
    const collections = [...new Set(allProducts.map(p => p.category))];
    return collections.sort();
}

// Get products by collection
export function getProductsByCollection(collection: string): Product[] {
    const allProducts = getAllProducts();
    return allProducts.filter(p => p.category === collection);
}

// Delete all products in a collection (only custom products)
export function deleteCollection(collection: string): number {
    const customProducts = getCustomProducts();
    const remaining = customProducts.filter(p => p.category !== collection);
    const deletedCount = customProducts.length - remaining.length;
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(remaining));
    return deletedCount;
}

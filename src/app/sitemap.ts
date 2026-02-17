import { MetadataRoute } from 'next';
import { products } from '@/data/products';
import { getAllCollections } from '@/data/productStore';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://cmjjewellers.com';

    // Static routes
    const routes = [
        '',
        '/categories',
        '/bullion',
        '/silver',
        '/daily-wear',
        '/vad-items',
        '/reviews',
        '/contact',
        '/order/custom',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    // Product routes (from static data only)
    const productRoutes = products.map((product) => ({
        url: `${baseUrl}/product/${product.id}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
    }));

    // Category routes
    // We get unique categories from static products
    const uniqueCategories = Array.from(new Set(products.map(p => p.category)));
    const categoryRoutes = uniqueCategories.map((category) => ({
        url: `${baseUrl}/collection/${encodeURIComponent(category)}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }));

    return [...routes, ...categoryRoutes, ...productRoutes];
}

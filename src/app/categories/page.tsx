"use client";
import React, { useMemo, useState, useEffect } from 'react';
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import { getAllProducts, Product } from "@/data/productStore";
import Link from 'next/link';

export default function CategoriesPage() {
    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load products from store (includes localStorage)
    useEffect(() => {
        setAllProducts(getAllProducts());
        setIsLoaded(true);
    }, []);

    // Memoize grouped products to prevent re-computation
    const { groupedByCategory, categories } = useMemo(() => {
        const grouped = allProducts.reduce((acc, product) => {
            const cat = product.category;
            if (!acc[cat]) {
                acc[cat] = [];
            }
            acc[cat].push(product);
            return acc;
        }, {} as Record<string, Product[]>);

        return { groupedByCategory: grouped, categories: Object.keys(grouped) };
    }, [allProducts]);

    return (
        <div className="bg-gray-100 dark:bg-gray-900 min-h-screen font-body">
            <div className="w-full bg-background-light dark:bg-background-dark min-h-screen relative">
                <Header />

                <main className="px-4 py-8 pb-24">
                    <div className="text-center mb-10">
                        <h1 className="font-display text-3xl md:text-4xl text-text-main-light dark:text-text-main-dark mb-2">Our Collections</h1>
                        <p className="text-sm text-text-sub-light dark:text-text-sub-dark">Explore our exclusive range of handcrafted jewellery.</p>
                    </div>

                    {/* Categories Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                        {categories.map((category) => {
                            const productsInCat = groupedByCategory[category];
                            const firstProduct = productsInCat[0]; // Use first product image as cover

                            return (
                                <Link
                                    key={category}
                                    href={`/collection/${encodeURIComponent(category)}`}
                                    className="group block relative aspect-square overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all"
                                >
                                    {/* Image */}
                                    <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800">
                                        <img
                                            src={firstProduct?.image || '/placeholder-jewelry.jpg'}
                                            alt={category}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-70 transition-opacity" />
                                    </div>

                                    {/* Content */}
                                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                                        <h3 className="font-display text-lg md:text-xl font-bold mb-1 group-hover:text-primary-light transition-colors">
                                            {category}
                                        </h3>
                                        <div className="flex items-center justify-between text-xs text-gray-300">
                                            <span>{productsInCat.length} Items</span>
                                            <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                                                View &rarr;
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </main>

                <BottomNav />
            </div>
        </div>
    );
}

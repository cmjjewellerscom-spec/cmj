"use client";
import React, { useMemo, useState, useEffect, Suspense } from 'react';
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import { useProducts } from '@/hooks/useProducts';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

function CollectionContent() {
    const searchParams = useSearchParams();
    const categoryName = searchParams.get('name') || '';
    const { products, loading } = useProducts();

    // Memoize filtered products
    const categoryProducts = useMemo(() => {
        if (!categoryName) return [];
        return products.filter(p => p.category === categoryName);
    }, [categoryName, products]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!categoryName || categoryProducts.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                <div className="text-center">
                    <p className="text-xl mb-4 text-gray-700 dark:text-gray-300">
                        {categoryName ? `No products found in "${categoryName}"` : "Collection not found"}
                    </p>
                    <Link href="/categories" className="text-primary hover:underline">
                        Browse All Collections
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-100 dark:bg-gray-900 min-h-screen font-body">
            <div className="w-full bg-background-light dark:bg-background-dark min-h-screen relative">
                <Header />

                <main className="px-4 py-8 pb-24">
                    <Link href="/categories" className="inline-flex items-center gap-2 text-text-sub-light dark:text-text-sub-dark hover:text-primary mb-6 transition-colors">
                        <ArrowLeft className="w-5 h-5" /> Back to Collections
                    </Link>

                    <div className="text-center mb-10">
                        <h1 className="font-display text-3xl md:text-4xl text-text-main-light dark:text-text-main-dark mb-2">{categoryName}</h1>
                        <p className="text-sm text-text-sub-light dark:text-text-sub-dark">{categoryProducts.length} beautiful pieces in this collection</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                        {categoryProducts.map((product) => (
                            <div
                                key={product.id}
                                className="bg-surface-light dark:bg-surface-dark rounded-xl overflow-hidden shadow-card hover:shadow-xl transition-shadow group border border-primary/10"
                            >
                                <Link href={`/product?id=${product.id}`} className="block h-full">
                                    <div className="aspect-square bg-white dark:bg-black/20 overflow-hidden relative">
                                        <img
                                            src={product.image || "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&q=80&w=400"}
                                            alt={product.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            loading="lazy"
                                            decoding="async"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&q=80&w=400";
                                            }}
                                        />
                                    </div>
                                    <div className="p-3">
                                        <h3 className="font-display font-medium text-text-main-light dark:text-text-main-dark truncate">{product.name}</h3>

                                        <div className="w-full mt-3 bg-primary text-white text-xs font-bold py-2 rounded-lg group-hover:bg-primary-dark transition-colors text-center">
                                            View Details
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>

                </main>

                <BottomNav />
            </div>
        </div>
    );
}

export default function CollectionClient() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div></div>}>
            <CollectionContent />
        </Suspense>
    );
}

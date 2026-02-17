"use client";
import React, { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
    Plus, Search, Edit2, Trash2, ChevronRight, ChevronLeft, FolderOpen, Package
} from 'lucide-react';
import { useProducts } from '@/hooks/useProducts';
// import { deleteProductFn } from '@/lib/firestoreUtils';
import { Product } from '@/data/products';
import AdminSidebar from '@/components/admin/AdminSidebar';

export default function AdminProducts() {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCollection, setSelectedCollection] = useState<string | null>(null);
    const { products: allProducts, loading } = useProducts();

    // Derived collections
    const collections = useMemo(() => {
        if (loading) return [];
        return ['All', ...Array.from(new Set(allProducts.map(p => p.category)))].sort();
    }, [allProducts, loading]);

    useEffect(() => {
        const isAuth = localStorage.getItem('cmj_admin_auth');
        if (!isAuth) {
            router.push('/admin');
        }
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('cmj_admin_auth');
        localStorage.removeItem('cmj_admin_user');
        router.push('/admin');
    };

    const handleDeleteProduct = async (id: number) => {
        if (!confirm('Are you sure you want to delete this product?')) return;
        alert('Product deletion is disabled (Static Mode).');
    };

    const handleDeleteCollection = async (collection: string, e: React.MouseEvent) => {
        e.stopPropagation();
        // Since we are using Firestore, deleting a "collection" means deleting all products in it.
        // This is dangerous and not directly supported by a single function in our utils yet.
        // We will disable this for now or implement batch delete.
        alert("Deleting collections is not supported in this version.");
    };

    // Get products for selected collection
    const collectionProducts = useMemo(() => {
        if (!selectedCollection) return [];
        return allProducts.filter(p => p.category === selectedCollection);
    }, [selectedCollection, allProducts]);

    // Filter collections by search
    const filteredCollections = useMemo(() => {
        if (!searchTerm) return collections;
        return collections.filter(c =>
            c.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [collections, searchTerm]);

    // Get collection stats
    const getCollectionStats = (collection: string) => {
        const products = allProducts.filter(p => p.category === collection);
        return {
            count: products.length,
            firstImage: products[0]?.image || ''
        };
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 flex">
            {/* Sidebar */}
            <AdminSidebar />

            {/* Main Content */}
            <main className="flex-1 lg:ml-64">
                {/* Top Bar */}
                <header className="bg-white/80 backdrop-blur-sm border-b border-primary/10 px-4 md:px-6 py-4 sticky top-0 z-40">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            {/* Mobile Back Button */}
                            <Link
                                href="/admin/dashboard"
                                className="lg:hidden p-2 rounded-lg text-gray-500 hover:bg-primary/10 transition-colors"
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </Link>
                            {selectedCollection && (
                                <button
                                    onClick={() => setSelectedCollection(null)}
                                    className="hidden lg:flex p-2 rounded-lg text-gray-500 hover:bg-primary/10 transition-colors"
                                >
                                    <ChevronLeft className="w-6 h-6" />
                                </button>
                            )}
                            <h2 className="text-lg md:text-xl font-bold text-gray-900">
                                {selectedCollection || 'Collections'}
                            </h2>
                            {selectedCollection && (
                                <span className="text-sm text-gray-500 hidden md:inline">
                                    ({collectionProducts.length} products)
                                </span>
                            )}
                        </div>
                        <Link
                            href="/admin/products/add"
                            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-colors"
                        >
                            <Plus className="w-5 h-5" />
                            Add Product
                        </Link>
                    </div>
                </header>

                <div className="p-6">
                    {/* Search */}
                    {!selectedCollection && (
                        <div className="relative mb-6 max-w-md">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search collections..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-white border border-gray-200 rounded-xl pl-12 pr-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                            />
                        </div>
                    )}

                    {/* Collections View */}
                    {!selectedCollection ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {filteredCollections.map((collection) => {
                                const stats = getCollectionStats(collection);
                                return (
                                    <div
                                        key={collection}
                                        onClick={() => setSelectedCollection(collection)}
                                        className="bg-white rounded-2xl border border-primary/10 overflow-hidden cursor-pointer hover:shadow-lg hover:border-primary/30 transition-all group"
                                    >
                                        <div className="aspect-square bg-gray-100 relative overflow-hidden">
                                            {stats.firstImage ? (
                                                <img
                                                    src={stats.firstImage}
                                                    alt={collection}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                    onError={(e) => {
                                                        (e.target as HTMLImageElement).style.display = 'none';
                                                    }}
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center">
                                                    <FolderOpen className="w-16 h-16 text-gray-300" />
                                                </div>
                                            )}
                                            <div className="absolute top-2 right-2 bg-primary text-white text-xs px-2 py-1 rounded-full font-medium">
                                                {stats.count} items
                                            </div>
                                        </div>
                                        <div className="p-4 flex items-center justify-between">
                                            <h3 className="font-bold text-gray-900">{collection}</h3>
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={(e) => handleDeleteCollection(collection, e)}
                                                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                                                    title="Delete collection"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        /* Products View */
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {collectionProducts.map((product) => (
                                <div
                                    key={product.id}
                                    className="bg-white rounded-2xl border border-primary/10 overflow-hidden shadow-sm hover:shadow-lg transition-shadow group"
                                >
                                    <div className="aspect-square bg-gray-100 relative overflow-hidden">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&q=80&w=400';
                                            }}
                                        />
                                        {/* Action Buttons Overlay */}
                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                            <Link
                                                href={`/admin/products/edit/${product.id}`}
                                                className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
                                            >
                                                <Edit2 className="w-5 h-5" />
                                            </Link>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDeleteProduct(product.id);
                                                }}
                                                className="p-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-bold text-gray-900 truncate">{product.name}</h3>
                                        <div className="flex items-center justify-between mt-2">
                                            <span className="text-primary font-bold">₹{product.price.toLocaleString()}</span>
                                            <span className="text-xs text-gray-500">{product.weight}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {collectionProducts.length === 0 && (
                                <div className="col-span-full py-12 text-center">
                                    <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                    <p className="text-gray-500">No products in this collection</p>
                                    <Link
                                        href="/admin/products/add"
                                        className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-colors"
                                    >
                                        <Plus className="w-4 h-4" />
                                        Add Product
                                    </Link>
                                </div>
                            )}
                        </div>
                    )}

                    {filteredCollections.length === 0 && !selectedCollection && (
                        <div className="py-12 text-center">
                            <FolderOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-500">No collections found</p>
                        </div>
                    )}
                </div>
            </main >
        </div >
    );
}

"use client";
import React, { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
    LayoutDashboard, Package, Plus, LogOut, FolderOpen,
    Eye, Menu, X, Edit, Trash2, ExternalLink, Settings, ChevronLeft
} from 'lucide-react';
import { useProducts } from '@/hooks/useProducts';
import ManualRateControl from '@/components/ManualRateControl';
import AdminAuthCheck from '@/components/admin/AdminAuthCheck';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

function DashboardContent() {
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [adminUser, setAdminUser] = useState('Admin');

    useEffect(() => {
        const fetchUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user?.email) setAdminUser(user.email.split('@')[0]);
        };
        fetchUser();
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/admin');
    };

    const { products, loading } = useProducts();

    // Calculate stats
    const stats = useMemo(() => {
        if (loading) return { totalProducts: 0, totalCollections: 0, collections: [] };
        const collections = [...new Set(products.map(p => p.category))];
        return {
            totalProducts: products.length,
            totalCollections: collections.length,
            collections: collections
        };
    }, [products, loading]);

    // Group products by collection
    const productsByCollection = useMemo(() => {
        if (loading) return {};
        return products.reduce((acc, product) => {
            if (!acc[product.category]) {
                acc[product.category] = [];
            }
            acc[product.category].push(product);
            return acc;
        }, {} as Record<string, typeof products>);
    }, [products, loading]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex">
            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 border-r border-primary/10 dark:border-gray-700 transform transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex items-center gap-3 px-6 py-5 border-b border-primary/10 dark:border-gray-700">
                    <Image
                        src="/logo/ChatGPT Image Feb 6, 2026, 02_59_06 AM.png"
                        alt="CMJ Logo"
                        width={40}
                        height={40}
                        className="rounded-xl"
                    />
                    <div>
                        <h1 className="font-bold text-gray-900 dark:text-white">CMJ Admin</h1>
                        <p className="text-xs text-primary">Dashboard</p>
                    </div>
                </div>

                <nav className="p-4 space-y-2">
                    <Link href="/admin/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/10 text-primary">
                        <LayoutDashboard className="w-5 h-5" />
                        <span className="font-medium">Dashboard</span>
                    </Link>
                    <Link href="/admin/products" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-primary/5 hover:text-primary transition-colors">
                        <Package className="w-5 h-5" />
                        <span className="font-medium">All Products</span>
                    </Link>
                    <Link href="/admin/products/add" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-primary/5 hover:text-primary transition-colors">
                        <Plus className="w-5 h-5" />
                        <span className="font-medium">Add Product</span>
                    </Link>

                    <div className="pt-4 mt-4 border-t border-gray-100 dark:border-gray-700">
                        <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-primary/5 hover:text-primary transition-colors">
                            <Settings className="w-5 h-5" />
                            <span className="font-medium">Settings</span>
                        </Link>
                    </div>
                </nav>

                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-primary/10 dark:border-gray-700">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors w-full"
                    >
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 lg:ml-64">
                {/* Top Bar */}
                <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-primary/10 dark:border-gray-700 px-4 md:px-6 py-4 sticky top-0 z-40">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            {/* Mobile: Back to Website */}
                            <Link
                                href="/"
                                className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-primary/10"
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </Link>
                            <button
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-primary/10"
                            >
                                {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                            <h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">Dashboard</h2>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-sm text-gray-600 dark:text-gray-400 hidden md:block">Welcome, <span className="text-primary font-medium">{adminUser}</span></span>
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white font-bold">
                                {adminUser.charAt(0).toUpperCase()}
                            </div>
                        </div>
                    </div>
                </header>

                <div className="p-6">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                        <div className="bg-white dark:bg-gray-800/50 rounded-2xl p-6 border border-primary/10 dark:border-gray-700 shadow-sm">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Total Products</p>
                                    <p className="text-4xl font-bold text-gray-900 dark:text-white">{stats.totalProducts}</p>
                                </div>
                                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                                    <Package className="w-7 h-7 text-primary" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800/50 rounded-2xl p-6 border border-primary/10 dark:border-gray-700 shadow-sm">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Total Collections</p>
                                    <p className="text-4xl font-bold text-gray-900 dark:text-white">{stats.totalCollections}</p>
                                </div>
                                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-500/10 flex items-center justify-center">
                                    <FolderOpen className="w-7 h-7 text-purple-500" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Manual Gold Rate Control */}
                    <ManualRateControl />

                    {/* Quick Actions */}
                    <div className="bg-white dark:bg-gray-800/50 rounded-2xl p-6 border border-primary/10 dark:border-gray-700 shadow-sm mb-8">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            <Link href="/admin/products/add" className="flex flex-col items-center gap-2 p-4 rounded-xl bg-primary/10 hover:bg-primary/20 transition-colors">
                                <Plus className="w-6 h-6 text-primary" />
                                <span className="text-sm font-medium text-gray-900 dark:text-white">Add Product</span>
                            </Link>
                            <Link href="/admin/products" className="flex flex-col items-center gap-2 p-4 rounded-xl bg-blue-50 dark:bg-blue-500/10 hover:bg-blue-100 dark:hover:bg-blue-500/20 transition-colors">
                                <Package className="w-6 h-6 text-blue-500" />
                                <span className="text-sm font-medium text-gray-900 dark:text-white">All Products</span>
                            </Link>
                            <Link href="/categories" target="_blank" className="flex flex-col items-center gap-2 p-4 rounded-xl bg-green-50 dark:bg-green-500/10 hover:bg-green-100 dark:hover:bg-green-500/20 transition-colors">
                                <Eye className="w-6 h-6 text-green-500" />
                                <span className="text-sm font-medium text-gray-900 dark:text-white">View Site</span>
                            </Link>
                            <Link href="/" target="_blank" className="flex flex-col items-center gap-2 p-4 rounded-xl bg-amber-50 dark:bg-amber-500/10 hover:bg-amber-100 dark:hover:bg-amber-500/20 transition-colors">
                                <ExternalLink className="w-6 h-6 text-amber-500" />
                                <span className="text-sm font-medium text-gray-900 dark:text-white">Homepage</span>
                            </Link>
                        </div>
                    </div>

                    {/* Collections Overview */}
                    <div className="bg-white dark:bg-gray-800/50 rounded-2xl p-6 border border-primary/10 dark:border-gray-700 shadow-sm mb-8">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Collections</h3>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                            {stats.collections.map((collection) => (
                                <div key={collection} className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 text-center">
                                    <p className="font-bold text-2xl text-primary">{productsByCollection[collection]?.length || 0}</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{collection}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* All Products Table */}
                    <div className="bg-white dark:bg-gray-800/50 rounded-2xl border border-primary/10 dark:border-gray-700 shadow-sm overflow-hidden">
                        <div className="flex items-center justify-between p-6 border-b border-primary/10 dark:border-gray-700">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">All Products ({products.length})</h3>
                            <Link href="/admin/products/add" className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors">
                                <Plus className="w-4 h-4" /> Add New
                            </Link>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 dark:bg-gray-700/50">
                                    <tr>
                                        <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Product</th>
                                        <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Collection</th>
                                        <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Price</th>
                                        <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Weight</th>
                                        <th className="text-right px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                                    {products.map((product) => (
                                        <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        src={product.image}
                                                        alt={product.name}
                                                        className="w-12 h-12 rounded-lg object-cover"
                                                    />
                                                    <div>
                                                        <p className="font-medium text-gray-900 dark:text-white">{product.name}</p>
                                                        <p className="text-xs text-gray-500">{product.purity}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                                                    {product.category}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                                                ₹{product.price.toLocaleString()}
                                            </td>
                                            <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                                                {product.weight}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Link
                                                        href={`/admin/products/edit/${product.id}`}
                                                        className="p-2 rounded-lg text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-colors"
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                    </Link>
                                                    <button className="p-2 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors">
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>

            {/* Mobile overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}
        </div>
    );
}

export default function AdminDashboard() {
    return (
        <AdminAuthCheck>
            <DashboardContent />
        </AdminAuthCheck>
    );
}

"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation'; // Added usePathname for active state
import {
    LayoutDashboard, Package, Plus, LogOut, Settings, Image as ImageIcon, Star
} from 'lucide-react';

export default function AdminSidebar() {
    const router = useRouter();
    const pathname = usePathname();

    const handleLogout = async () => {
        try {
            localStorage.removeItem('cmj_admin_auth');
            localStorage.removeItem('cmj_admin_user');
            router.push('/admin');
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    const isActive = (path: string) => pathname === path;

    return (
        <aside className="hidden lg:block fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-primary/10">
            <div className="flex items-center gap-3 px-6 py-5 border-b border-primary/10">
                <Image
                    src="/logo/ChatGPT Image Feb 6, 2026, 02_59_06 AM.png"
                    alt="CMJ Logo"
                    width={40}
                    height={40}
                    className="rounded-xl"
                />
                <div>
                    <h1 className="font-bold text-gray-900">CMJ Admin</h1>
                    <p className="text-xs text-primary">Dashboard</p>
                </div>
            </div>

            <nav className="p-4 space-y-2">
                <Link
                    href="/admin/dashboard"
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${isActive('/admin/dashboard')
                        ? 'bg-primary/10 text-primary font-medium'
                        : 'text-gray-600 hover:bg-primary/5 hover:text-primary'
                        }`}
                >
                    <LayoutDashboard className="w-5 h-5" />
                    <span>Dashboard</span>
                </Link>

                <Link
                    href="/admin/products"
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${isActive('/admin/products')
                        ? 'bg-primary/10 text-primary font-medium'
                        : 'text-gray-600 hover:bg-primary/5 hover:text-primary'
                        }`}
                >
                    <Package className="w-5 h-5" />
                    <span>Products</span>
                </Link>

                <Link
                    href="/admin/products/add"
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${isActive('/admin/products/add')
                        ? 'bg-primary/10 text-primary font-medium'
                        : 'text-gray-600 hover:bg-primary/5 hover:text-primary'
                        }`}
                >
                    <Plus className="w-5 h-5" />
                    <span>Add Product</span>
                </Link>

                <Link
                    href="/admin/reviews"
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${isActive('/admin/reviews')
                        ? 'bg-primary/10 text-primary font-medium'
                        : 'text-gray-600 hover:bg-primary/5 hover:text-primary'
                        }`}
                >
                    <Star className="w-5 h-5" />
                    <span>Reviews</span>
                </Link>

                <div className="pt-4 mt-4 border-t border-gray-100">
                    <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                        Settings
                    </p>
                    <Link
                        href="/admin/settings"
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${isActive('/admin/settings')
                            ? 'bg-primary/10 text-primary font-medium'
                            : 'text-gray-600 hover:bg-primary/5 hover:text-primary'
                            }`}
                    >
                        <Settings className="w-5 h-5" />
                        <span>General Settings</span>
                    </Link>
                </div>
            </nav>

            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-primary/10">
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-colors w-full"
                >
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </aside>
    );
}

"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import {
    LayoutDashboard, Package, Plus, LogOut, Settings, Image as ImageIcon, Star
} from 'lucide-react';
import { supabase } from '@/lib/supabase';

const AdminSidebar = () => {
    const router = useRouter();
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/admin');
    };

    const isActive = (path: string) => pathname === path;

    const menuItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
        { icon: Package, label: 'Products', path: '/admin/products' },
        { icon: Plus, label: 'Add Product', path: '/admin/products/add' },
        { icon: Star, label: 'Reviews', path: '/admin/reviews' },
        { icon: Settings, label: 'Settings', path: '/admin/settings' },
    ];

    return (
        <>
            {/* Mobile Header */}
            <div className="lg:hidden bg-white/80 backdrop-blur-md border-b border-primary/10 px-4 py-3 sticky top-0 z-50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Image
                        src="/logo/ChatGPT Image Feb 6, 2026, 02_59_06 AM.png"
                        alt="CMJ Logo"
                        width={32}
                        height={32}
                        className="rounded-lg"
                    />
                    <span className="font-bold text-gray-900 text-sm">CMJ Admin</span>
                </div>
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="p-2 text-gray-500 hover:text-primary transition-colors"
                >
                    <div className="w-6 h-5 flex flex-col justify-between">
                        <span className={`h-0.5 w-full bg-current transform transition-transform ${isMobileMenuOpen ? 'rotate-45 translate-y-2.5' : ''}`} />
                        <span className={`h-0.5 w-full bg-current transition-opacity ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
                        <span className={`h-0.5 w-full bg-current transform transition-transform ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                    </div>
                </button>
            </div>

            {/* Sidebar Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed top-0 left-0 bottom-0 w-64 bg-white/80 backdrop-blur-xl border-r border-primary/10 z-50
                transform transition-transform duration-300 lg:translate-x-0
                ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div className="p-6">
                    <div className="flex items-center gap-3 mb-8 px-2">
                        <Image
                            src="/logo/ChatGPT Image Feb 6, 2026, 02_59_06 AM.png"
                            alt="CMJ Logo"
                            width={40}
                            height={40}
                            className="rounded-xl shadow-sm"
                        />
                        <div>
                            <h1 className="font-bold text-gray-900 leading-none">CMJ Jewellers</h1>
                            <span className="text-[10px] text-primary font-bold uppercase tracking-wider mt-1 block">Admin Master</span>
                        </div>
                    </div>

                    <nav className="space-y-1">
                        {menuItems.map((item) => (
                            <Link
                                key={item.path}
                                href={item.path}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`
                                    flex items-center gap-3 px-4 py-3 rounded-xl transition-all group
                                    ${isActive(item.path)
                                        ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                        : 'text-gray-600 hover:bg-primary/5 hover:text-primary'
                                    }
                                `}
                            >
                                <item.icon className={`w-5 h-5 ${isActive(item.path) ? 'text-white' : 'text-gray-400 group-hover:text-primary'}`} />
                                <span className="font-medium">{item.label}</span>
                            </Link>
                        ))}
                    </nav>
                </div>

                <div className="absolute bottom-6 left-6 right-6">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-50 text-red-600 rounded-xl font-bold hover:bg-red-100 transition-colors"
                    >
                        <LogOut className="w-5 h-5" />
                        <span>Sign Out</span>
                    </button>
                </div>
            </aside>
        </>
    );
};

export default AdminSidebar;

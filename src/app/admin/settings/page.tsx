"use client";
import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import {
    ChevronLeft, Save, Upload, X, ImageIcon, CheckCircle, AlertCircle, Trash2, Plus
} from 'lucide-react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminAuthCheck from '@/components/admin/AdminAuthCheck';
import { uploadImage, getSiteConfig, updateSiteConfig, addProduct, getBanners, addBanner, deleteBanner } from '@/lib/supabaseUtils';
import type { Banner } from '@/lib/supabaseUtils';

const MAX_BANNERS = 3;

function AdminSettingsContent() {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState<'success' | 'error'>('success');

    // Banners state
    const [banners, setBanners] = useState<Banner[]>([]);
    const [bannersLoading, setBannersLoading] = useState(true);

    // Site Config State
    const [siteTitle, setSiteTitle] = useState('');
    const [titleLoading, setTitleLoading] = useState(false);

    // Seeding State
    const [seeding, setSeeding] = useState(false);

    useEffect(() => {
        loadSettings();
        loadBanners();
    }, []);

    const loadSettings = async () => {
        const title = await getSiteConfig('site_title');
        if (title) setSiteTitle(title);
    };

    const loadBanners = async () => {
        setBannersLoading(true);
        try {
            const data = await getBanners();
            setBanners(data);
        } catch (error) {
            console.error('Failed to load banners:', error);
        } finally {
            setBannersLoading(false);
        }
    };

    // --- Banner Upload ---
    const handleBannerUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (banners.length >= MAX_BANNERS) {
            setMessage(`Maximum ${MAX_BANNERS} banners allowed. Delete one first.`);
            setMessageType('error');
            return;
        }

        setLoading(true);
        setMessage('');
        try {
            const publicUrl = await uploadImage(file, 'products');
            const nextOrder = banners.length > 0 ? Math.max(...banners.map(b => b.display_order)) + 1 : 0;
            await addBanner(publicUrl, nextOrder);
            await loadBanners();
            setMessage('Banner added successfully!');
            setMessageType('success');
        } catch (error) {
            setMessage('Failed to upload banner.');
            setMessageType('error');
            console.error(error);
        } finally {
            setLoading(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    const handleDeleteBanner = async (id: number) => {
        if (!confirm('Delete this banner?')) return;
        try {
            await deleteBanner(id);
            await loadBanners();
            setMessage('Banner deleted.');
            setMessageType('success');
        } catch (error) {
            setMessage('Failed to delete banner.');
            setMessageType('error');
            console.error(error);
        }
    };

    const triggerFileUpload = () => fileInputRef.current?.click();

    // --- Title Logic ---
    const handleSaveTitle = async () => {
        if (!siteTitle.trim()) return;
        setTitleLoading(true);
        try {
            await updateSiteConfig('site_title', siteTitle);
            alert('Website title updated!');
        } catch (error) {
            console.error(error);
            alert('Failed to update title');
        } finally {
            setTitleLoading(false);
        }
    };

    // --- Seed Logic ---
    const handleSeedProducts = async () => {
        if (!confirm('This will upload all hardcoded products to the database. Continue?')) return;
        setSeeding(true);
        try {
            const { products } = await import('@/data/products');
            let count = 0;
            for (const p of products) {
                const { id, ...prodData } = p;
                await addProduct(prodData);
                count++;
            }
            alert(`Successfully migrated ${count} products to Supabase!`);
        } catch (error) {
            console.error(error);
            alert('Migration failed. Check console for details.');
        } finally {
            setSeeding(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 flex">
            <AdminSidebar />
            <main className="flex-1 lg:ml-64">
                <header className="bg-white/80 backdrop-blur-sm border-b border-primary/10 px-6 py-4 sticky top-0 z-40">
                    <div className="flex items-center gap-4">
                        <Link href="/admin/dashboard" className="p-2 rounded-lg text-gray-500 hover:bg-primary/10 transition-colors">
                            <ChevronLeft className="w-6 h-6" />
                        </Link>
                        <h2 className="text-xl font-bold text-gray-900">General Settings</h2>
                    </div>
                </header>

                <div className="p-6 max-w-4xl mx-auto space-y-6">

                    {/* Database Seeding */}
                    <div className="bg-white rounded-2xl border border-primary/10 p-6 shadow-sm">
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Database Migration</h3>
                        <p className="text-sm text-gray-500 mb-4">Upload hardcoded products to Supabase (Run this once).</p>
                        <button
                            onClick={handleSeedProducts}
                            disabled={seeding}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                        >
                            {seeding ? 'Migrating...' : 'Seed Products Database'}
                        </button>
                    </div>

                    {/* Website Title */}
                    <div className="bg-white rounded-2xl border border-primary/10 p-6 shadow-sm">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Website Title</h3>
                        <div className="flex gap-4">
                            <input
                                type="text"
                                value={siteTitle}
                                onChange={(e) => setSiteTitle(e.target.value)}
                                placeholder="Enter Website Title"
                                className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3"
                            />
                            <button
                                onClick={handleSaveTitle}
                                disabled={titleLoading}
                                className="px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary-dark disabled:opacity-50"
                            >
                                {titleLoading ? 'Saving...' : 'Save'}
                            </button>
                        </div>
                    </div>

                    {/* Banner Posters Management */}
                    <div className="bg-white rounded-2xl border border-primary/10 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-primary/10 bg-primary/5">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900">Banner Posters</h3>
                                    <p className="text-sm text-gray-500">Manage up to {MAX_BANNERS} slideshow banners for the homepage.</p>
                                </div>
                                <span className="text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                                    {banners.length}/{MAX_BANNERS}
                                </span>
                            </div>
                        </div>

                        <div className="p-6">
                            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleBannerUpload} className="hidden" />

                            {bannersLoading ? (
                                <div className="text-center py-12 text-gray-400">Loading banners...</div>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {/* Existing Banners */}
                                    {banners.map((banner, index) => (
                                        <div key={banner.id} className="relative group rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                                            <div className="aspect-video bg-gray-100">
                                                <img
                                                    src={banner.image_url}
                                                    alt={`Banner ${index + 1}`}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            {/* Overlay on hover */}
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-200 flex items-center justify-center">
                                                <button
                                                    onClick={() => handleDeleteBanner(banner.id)}
                                                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-red-500 hover:bg-red-600 text-white p-3 rounded-full shadow-lg"
                                                    title="Delete banner"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </div>
                                            {/* Order badge */}
                                            <div className="absolute top-2 left-2 bg-black/60 text-white text-xs font-bold px-2 py-1 rounded-md">
                                                #{index + 1}
                                            </div>
                                        </div>
                                    ))}

                                    {/* Add Banner Card */}
                                    {banners.length < MAX_BANNERS && (
                                        <div
                                            onClick={loading ? undefined : triggerFileUpload}
                                            className={`aspect-video border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center text-gray-400 transition-all ${loading
                                                    ? 'opacity-50 cursor-wait'
                                                    : 'cursor-pointer hover:border-primary hover:bg-primary/5 hover:text-primary'
                                                }`}
                                        >
                                            {loading ? (
                                                <>
                                                    <div className="w-8 h-8 border-3 border-primary/30 border-t-primary rounded-full animate-spin mb-2" />
                                                    <span className="text-sm font-medium">Uploading...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Plus className="w-10 h-10 mb-2" />
                                                    <span className="text-sm font-medium">Add Banner</span>
                                                </>
                                            )}
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Status Message */}
                            {message && (
                                <div className={`mt-4 p-4 rounded-xl flex items-center gap-3 ${messageType === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                                    {messageType === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                                    <p className="text-sm font-medium">{message}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default function AdminSettings() {
    return (
        <AdminAuthCheck>
            <AdminSettingsContent />
        </AdminAuthCheck>
    );
}

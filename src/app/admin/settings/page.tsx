"use client";
import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
    ChevronLeft, Save, Upload, X, ImageIcon, CheckCircle, AlertCircle
} from 'lucide-react';
import Link from 'next/link';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminAuthCheck from '@/components/admin/AdminAuthCheck';
import { uploadImage, getSiteConfig, updateSiteConfig, addProduct } from '@/lib/supabaseUtils';



function AdminSettingsContent() {
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [loading, setLoading] = useState(false);
    const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);

    // Site Config State
    const [siteTitle, setSiteTitle] = useState('');
    const [titleLoading, setTitleLoading] = useState(false);

    // Hero Text State
    const [heroHeadline1, setHeroHeadline1] = useState('');
    const [heroHeadline2, setHeroHeadline2] = useState('');
    const [heroDesc, setHeroDesc] = useState('');
    const [heroTextLoading, setHeroTextLoading] = useState(false);

    // Seeding State
    const [seeding, setSeeding] = useState(false);

    useEffect(() => {
        loadSettings();
    }, []);

    const loadSettings = async () => {
        const title = await getSiteConfig('site_title');
        const banner = await getSiteConfig('home_banner');

        const h1 = await getSiteConfig('hero_headline_1');
        const h2 = await getSiteConfig('hero_headline_2');
        const desc = await getSiteConfig('hero_description');

        if (title) setSiteTitle(title);
        if (banner) setPreviewImage(banner);
        if (h1) setHeroHeadline1(h1);
        if (h2) setHeroHeadline2(h2);
        if (desc) setHeroDesc(desc);
    };

    // --- Banner Logic ---
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onload = (event) => {
                setPreviewImage(event.target?.result as string);
            };
            reader.readAsDataURL(file);
            setUploadStatus('idle');
        }
    };

    const handleUpload = async () => {
        if (!imageFile) return;

        setLoading(true);
        setUploadStatus('idle');
        setMessage('');

        try {
            const publicUrl = await uploadImage(imageFile, 'products'); // Reuse products bucket for now
            await updateSiteConfig('home_banner', publicUrl);
            setUploadStatus('success');
            setMessage('Banner updated successfully!');
        } catch (error) {
            setUploadStatus('error');
            setMessage('Failed to update banner.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const triggerFileUpload = () => fileInputRef.current?.click();
    const clearSelection = () => {
        setImageFile(null);
        setPreviewImage(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
        loadSettings(); // Reload existing banner
    };

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

    const handleSaveHeroText = async () => {
        setHeroTextLoading(true);
        try {
            if (heroHeadline1) await updateSiteConfig('hero_headline_1', heroHeadline1);
            if (heroHeadline2) await updateSiteConfig('hero_headline_2', heroHeadline2);
            if (heroDesc) await updateSiteConfig('hero_description', heroDesc);
            alert('Banner text updated!');
        } catch (error) {
            console.error(error);
            alert('Failed to update banner text');
        } finally {
            setHeroTextLoading(false);
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
                // Remove ID to let DB generate it
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

                    {/* Hero Text Content */}
                    <div className="bg-white rounded-2xl border border-primary/10 p-6 shadow-sm">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Banner Text Content</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Headline Line 1</label>
                                <input
                                    type="text"
                                    value={heroHeadline1}
                                    onChange={(e) => setHeroHeadline1(e.target.value)}
                                    placeholder="e.g. Tradition"
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Headline Line 2</label>
                                <input
                                    type="text"
                                    value={heroHeadline2}
                                    onChange={(e) => setHeroHeadline2(e.target.value)}
                                    placeholder="e.g. Crafted in Gold"
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Description</label>
                                <textarea
                                    value={heroDesc}
                                    onChange={(e) => setHeroDesc(e.target.value)}
                                    placeholder="Banner description..."
                                    rows={3}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3"
                                />
                            </div>
                            <button
                                onClick={handleSaveHeroText}
                                disabled={heroTextLoading}
                                className="w-full py-3 bg-primary text-white rounded-xl hover:bg-primary-dark disabled:opacity-50"
                            >
                                {heroTextLoading ? 'Saving Text...' : 'Update Banner Text'}
                            </button>
                        </div>
                    </div>

                    {/* Banner Image */}
                    <div className="bg-white rounded-2xl border border-primary/10 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-primary/10 bg-primary/5">
                            <h3 className="text-lg font-bold text-gray-900">Banner Image</h3>
                            <p className="text-sm text-gray-500">Update the main home page banner.</p>
                        </div>
                        <div className="p-8 space-y-8">
                            <div>
                                <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                    <ImageIcon className="w-5 h-5 text-primary" />
                                    Main Hero Banner
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {/* Current/Preview */}
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                                            Current Image
                                        </label>
                                        <div className="relative aspect-video rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
                                            {previewImage ? (
                                                <img src={previewImage} alt="Banner" className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                    No Banner Set
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    {/* Upload */}
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                                            Upload New
                                        </label>
                                        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageChange} className="hidden" />

                                        <div className="space-y-4">
                                            <div onClick={triggerFileUpload} className="aspect-video border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center text-gray-400 cursor-pointer hover:border-primary hover:bg-primary/5 hover:text-primary transition-all">
                                                <ImageIcon className="w-12 h-12 mb-3" />
                                                <span className="font-medium">Click to upload</span>
                                            </div>
                                            <button onClick={handleUpload} disabled={loading || !imageFile} className="w-full py-3 bg-primary text-white rounded-xl hover:bg-primary-dark disabled:opacity-50">
                                                {loading ? 'Uploading...' : 'Update Banner'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                {message && (
                                    <div className={`mt-6 p-4 rounded-xl flex items-center gap-3 ${uploadStatus === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                                        {uploadStatus === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                                        <p className="text-sm font-medium">{message}</p>
                                    </div>
                                )}
                            </div>
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

"use client";
import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
    ChevronLeft, Save, Upload, X, ImageIcon, CheckCircle, AlertCircle
} from 'lucide-react';
import Link from 'next/link';
import AdminSidebar from '@/components/admin/AdminSidebar';

export default function AdminSettings() {
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [loading, setLoading] = useState(false);
    const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);

    useEffect(() => {
        const isAuth = localStorage.getItem('cmj_admin_auth');
        if (!isAuth) {
            router.push('/admin');
        }
    }, [router]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            // Create preview
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
            const formData = new FormData();
            formData.append('file', imageFile);

            const response = await fetch('/api/upload/hero', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();

            if (result.success) {
                setUploadStatus('success');
                setMessage('Hero image updated successfully! Please refresh the home page to see changes.');
                setTimeout(() => {
                    setUploadStatus('idle');
                    setMessage('');
                }, 5000);
            } else {
                setUploadStatus('error');
                setMessage(result.message || 'Required file permission to write to public/ folder failed.');
            }
        } catch (error) {
            setUploadStatus('error');
            setMessage('An unexpected error occurred during upload.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const triggerFileUpload = () => {
        fileInputRef.current?.click();
    };

    const clearSelection = () => {
        setImageFile(null);
        setPreviewImage(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 flex">
            {/* Sidebar */}
            <AdminSidebar />

            {/* Main Content */}
            <main className="flex-1 lg:ml-64">
                {/* Top Bar */}
                <header className="bg-white/80 backdrop-blur-sm border-b border-primary/10 px-6 py-4 sticky top-0 z-40">
                    <div className="flex items-center gap-4">
                        <Link href="/admin/dashboard" className="p-2 rounded-lg text-gray-500 hover:bg-primary/10 transition-colors">
                            <ChevronLeft className="w-6 h-6" />
                        </Link>
                        <h2 className="text-xl font-bold text-gray-900">General Settings</h2>
                    </div>
                </header>

                <div className="p-6 max-w-4xl mx-auto">
                    <div className="bg-white rounded-2xl border border-primary/10 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-primary/10 bg-primary/5">
                            <h3 className="text-lg font-bold text-gray-900">Website Customization</h3>
                            <p className="text-sm text-gray-500">Manage your website's appearance and main images.</p>
                        </div>

                        <div className="p-8 space-y-8">
                            {/* Hero Image Section */}
                            <div>
                                <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                    <ImageIcon className="w-5 h-5 text-primary" />
                                    Main Hero Banner Image
                                </h4>
                                <p className="text-sm text-gray-500 mb-6">
                                    Upload a new image to replace the main banner on the home page.
                                    Recommended size: 1920x800px or larger. Format: JPG, PNG.
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {/* Current Image */}
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                                            Current Image
                                        </label>
                                        <div className="relative aspect-video rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
                                            <img
                                                src="/hero-bg.jpg"
                                                alt="Current Hero"
                                                className="w-full h-full object-cover"
                                                onError={(e) => (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1599643478518-17488fbbcd75?q=80&w=1200&auto=format&fit=crop'}
                                            />
                                            <div className="absolute inset-0 bg-black/10"></div>
                                        </div>
                                    </div>

                                    {/* Upload New */}
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                                            Upload New Image
                                        </label>

                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="hidden"
                                        />

                                        <div className="space-y-4">
                                            {previewImage ? (
                                                <div className="relative aspect-video rounded-xl overflow-hidden border-2 border-primary shadow-lg">
                                                    <img
                                                        src={previewImage}
                                                        alt="New Preview"
                                                        className="w-full h-full object-cover"
                                                    />
                                                    <button
                                                        onClick={clearSelection}
                                                        className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-md"
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            ) : (
                                                <div
                                                    onClick={triggerFileUpload}
                                                    className="aspect-video border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center text-gray-400 cursor-pointer hover:border-primary hover:bg-primary/5 hover:text-primary transition-all group"
                                                >
                                                    <ImageIcon className="w-12 h-12 mb-3 group-hover:scale-110 transition-transform" />
                                                    <span className="font-medium">Click to select image</span>
                                                    <span className="text-xs mt-1 opacity-70">JPG, PNG, WEBP (Max 5MB)</span>
                                                </div>
                                            )}

                                            <button
                                                onClick={handleUpload}
                                                disabled={loading || !imageFile}
                                                className="w-full py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg"
                                            >
                                                {loading ? (
                                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                                ) : (
                                                    <>
                                                        <Upload className="w-5 h-5" />
                                                        <span>{imageFile ? 'Upload & Update Image' : 'Select an Image to Upload'}</span>
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Status Messages */}
                                {message && (
                                    <div className={`mt-6 p-4 rounded-xl flex items-center gap-3 ${uploadStatus === 'success' ? 'bg-green-50 text-green-700 border border-green-200' :
                                        'bg-red-50 text-red-700 border border-red-200'
                                        }`}>
                                        {uploadStatus === 'success' ? (
                                            <CheckCircle className="w-5 h-5 flex-shrink-0" />
                                        ) : (
                                            <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                        )}
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

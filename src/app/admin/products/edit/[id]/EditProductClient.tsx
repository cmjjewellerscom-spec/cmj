"use client";
import React, { useEffect, useState, useMemo, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
    Plus, ChevronLeft, Save, X, Upload, Link as LinkIcon, ImageIcon
} from 'lucide-react';
import { useProducts } from '@/hooks/useProducts';
// import { updateProductFn } from '@/lib/firestoreUtils';
// import { uploadImage } from '@/lib/storageUtils';
import { getAllCollections } from '@/data/productStore'; // Keeping for now
import AdminSidebar from '@/components/admin/AdminSidebar';

export default function EditProductClient() {
    const router = useRouter();
    const params = useParams();
    const productId = params.id as string;
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [loading, setLoading] = useState(false);
    const [showNewCollectionInput, setShowNewCollectionInput] = useState(false);
    const [newCollectionName, setNewCollectionName] = useState('');
    const [customCollections, setCustomCollections] = useState<string[]>([]);
    const [imageMode, setImageMode] = useState<'url' | 'upload'>('url');
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        collection: '',
        price: '',
        weight: '',
        purity: '',
        image: '',
        description: ''
    });

    // Get unique collections from existing products
    const existingCollections = useMemo(() => {
        return getAllCollections();
    }, []);

    // Combined collections (custom first, then existing)
    const allCollections = useMemo(() => {
        return [...customCollections, ...existingCollections.filter(c => !customCollections.includes(c))];
    }, [existingCollections, customCollections]);

    const { products: allProducts, loading: productsLoading } = useProducts();

    useEffect(() => {
        const isAuth = localStorage.getItem('cmj_admin_auth');
        if (!isAuth) {
            router.push('/admin');
            return;
        }

        // Find product and populate form
        if (productsLoading) return;

        const product = allProducts.find(p => p.id.toString() === productId);
        if (product) {
            setFormData({
                name: product.name,
                collection: product.category,
                price: product.price.toString(),
                weight: product.weight,
                purity: product.purity || '',
                image: product.image,
                description: product.description || ''
            });
        }
    }, [router, productId, allProducts, productsLoading]);

    const handleLogout = () => {
        localStorage.removeItem('cmj_admin_auth');
        localStorage.removeItem('cmj_admin_user');
        router.push('/admin');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            alert('Edit Product is disabled (Static Mode).');
            router.push('/admin/products');
        } catch (error) {
            console.error("Failed to update", error);
            alert('Failed to update product');
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAddNewCollection = () => {
        const trimmedName = newCollectionName.trim();
        if (trimmedName && !allCollections.includes(trimmedName)) {
            setCustomCollections([trimmedName, ...customCollections]);
            setFormData({ ...formData, collection: trimmedName });
            setNewCollectionName('');
            setShowNewCollectionInput(false);
        } else if (trimmedName) {
            setFormData({ ...formData, collection: trimmedName });
            setNewCollectionName('');
            setShowNewCollectionInput(false);
        }
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onload = (event) => {
                setUploadedImage(event.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const triggerFileUpload = () => {
        fileInputRef.current?.click();
    };

    const clearUploadedImage = () => {
        setUploadedImage(null);
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
                        <Link href="/admin/products" className="p-2 rounded-lg text-gray-500 hover:bg-primary/10 transition-colors">
                            <ChevronLeft className="w-6 h-6" />
                        </Link>
                        <h2 className="text-xl font-bold text-gray-900">Edit Product</h2>
                    </div>
                </header>

                <div className="p-6 max-w-2xl mx-auto">
                    <form
                        onSubmit={handleSubmit}
                        className="bg-white rounded-2xl border border-primary/10 p-6 space-y-5 shadow-sm"
                    >
                        {/* Product Name */}
                        <div>
                            <label className="block text-xs font-medium text-gray-600 uppercase tracking-wider mb-2">
                                Product Name *
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                                placeholder="Enter product name"
                                required
                            />
                        </div>

                        {/* Collection */}
                        <div>
                            <label className="block text-xs font-medium text-gray-600 uppercase tracking-wider mb-2">
                                Collection *
                            </label>

                            {showNewCollectionInput ? (
                                <div className="flex gap-2 mb-3">
                                    <input
                                        type="text"
                                        value={newCollectionName}
                                        onChange={(e) => setNewCollectionName(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                                handleAddNewCollection();
                                            }
                                        }}
                                        className="flex-1 bg-amber-50 border-2 border-primary rounded-xl px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none transition-colors"
                                        placeholder="Type new collection name..."
                                        autoFocus
                                    />
                                    <button
                                        type="button"
                                        onClick={handleAddNewCollection}
                                        className="px-4 py-2.5 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-colors"
                                    >
                                        Add
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowNewCollectionInput(false);
                                            setNewCollectionName('');
                                        }}
                                        className="p-2.5 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-colors"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => setShowNewCollectionInput(true)}
                                    className="flex items-center gap-2 text-sm text-primary font-medium hover:text-primary-dark mb-3 py-2 px-3 bg-primary/5 rounded-lg transition-colors"
                                >
                                    <Plus className="w-4 h-4" />
                                    Add New Collection
                                </button>
                            )}

                            <select
                                name="collection"
                                value={formData.collection}
                                onChange={handleChange}
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                                required
                            >
                                <option value="">Select collection</option>
                                {allCollections.map((col) => (
                                    <option key={col} value={col}>
                                        {customCollections.includes(col) ? `✨ ${col} (New)` : col}
                                    </option>
                                ))}
                            </select>

                            <p className="text-xs text-gray-400 mt-2">
                                {allCollections.length} collections available
                            </p>
                        </div>

                        {/* Price & Weight */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-gray-600 uppercase tracking-wider mb-2">
                                    Price (₹) *
                                </label>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                                    placeholder="45000"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-600 uppercase tracking-wider mb-2">
                                    Weight *
                                </label>
                                <input
                                    type="text"
                                    name="weight"
                                    value={formData.weight}
                                    onChange={handleChange}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                                    placeholder="8.5g"
                                    required
                                />
                            </div>
                        </div>

                        {/* Purity */}
                        <div>
                            <label className="block text-xs font-medium text-gray-600 uppercase tracking-wider mb-2">
                                Purity
                            </label>
                            <input
                                type="text"
                                name="purity"
                                value={formData.purity}
                                onChange={handleChange}
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                                placeholder="22K / 916"
                            />
                        </div>

                        {/* Image Section */}
                        <div>
                            <label className="block text-xs font-medium text-gray-600 uppercase tracking-wider mb-2">
                                Product Image *
                            </label>

                            {/* Toggle Buttons */}
                            <div className="flex gap-2 mb-3">
                                <button
                                    type="button"
                                    onClick={() => setImageMode('upload')}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${imageMode === 'upload'
                                        ? 'bg-primary text-white'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                >
                                    <Upload className="w-4 h-4" />
                                    Upload Image
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setImageMode('url')}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${imageMode === 'url'
                                        ? 'bg-primary text-white'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                >
                                    <LinkIcon className="w-4 h-4" />
                                    Image URL
                                </button>
                            </div>

                            {/* Upload Mode */}
                            {imageMode === 'upload' && (
                                <div>
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                    />

                                    {uploadedImage ? (
                                        <div className="relative">
                                            <img
                                                src={uploadedImage}
                                                alt="Preview"
                                                className="w-full aspect-square object-cover rounded-xl border border-gray-200"
                                            />
                                            <button
                                                type="button"
                                                onClick={clearUploadedImage}
                                                className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ) : (
                                        <div
                                            onClick={triggerFileUpload}
                                            className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-all"
                                        >
                                            <ImageIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                                            <p className="text-gray-600 font-medium">Click to upload image</p>
                                            <p className="text-xs text-gray-400 mt-1">PNG, JPG, WEBP up to 10MB</p>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* URL Mode */}
                            {imageMode === 'url' && (
                                <div>
                                    <input
                                        type="url"
                                        name="image"
                                        value={formData.image}
                                        onChange={handleChange}
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                                        placeholder="https://example.com/image.jpg"
                                    />

                                    {formData.image && (
                                        <div className="mt-3 relative">
                                            <img
                                                src={formData.image}
                                                alt="Preview"
                                                className="w-full h-48 object-cover rounded-xl border border-gray-200"
                                                onError={(e) => (e.target as HTMLImageElement).style.display = 'none'}
                                            />
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-xs font-medium text-gray-600 uppercase tracking-wider mb-2">
                                Description
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows={3}
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                                placeholder="Enter product description..."
                            />
                        </div>

                        {/* Submit */}
                        <div className="flex gap-3 pt-4">
                            <Link
                                href="/admin/products"
                                className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors text-center"
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 px-4 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                ) : (
                                    <>
                                        <Save className="w-5 h-5" />
                                        <span>Update Product</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}

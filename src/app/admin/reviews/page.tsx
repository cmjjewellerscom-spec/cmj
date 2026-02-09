"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Trash2, ExternalLink, Star, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { getAllReviews, addReview, deleteReview, Review } from '@/data/reviewStore';
import AdminSidebar from '@/components/admin/AdminSidebar';

export default function AdminReviews() {
    const router = useRouter();
    const [reviews, setReviews] = useState<Review[]>([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [link, setLink] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const isAuth = localStorage.getItem('cmj_admin_auth');
        if (!isAuth) {
            router.push('/admin');
            return;
        }

        setReviews(getAllReviews());
    }, [router]);

    const handleAddReview = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim() || !description.trim()) {
            alert('Please fill in title and description');
            return;
        }

        setLoading(true);

        addReview({
            title: title.trim(),
            description: description.trim(),
            link: link.trim()
        });

        setReviews(getAllReviews());
        setTitle('');
        setDescription('');
        setLink('');
        setLoading(false);
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this review?')) {
            deleteReview(id);
            setReviews(getAllReviews());
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 flex">
            <AdminSidebar />

            <main className="flex-1 lg:ml-64">
                <header className="bg-white/80 backdrop-blur-sm border-b border-primary/10 px-4 md:px-6 py-4 sticky top-0 z-40">
                    <div className="flex items-center gap-3">
                        <Link
                            href="/admin/dashboard"
                            className="lg:hidden p-2 rounded-lg text-gray-500 hover:bg-primary/10 transition-colors"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </Link>
                        <div>
                            <h2 className="text-lg md:text-xl font-bold text-gray-900">Customer Reviews</h2>
                            <p className="text-sm text-gray-500 hidden md:block">Manage reviews shown on the Reviews page</p>
                        </div>
                    </div>
                </header>

                <div className="p-6">
                    <div className="grid lg:grid-cols-2 gap-6">
                        {/* Add Review Form */}
                        <div className="bg-white rounded-2xl border border-primary/10 p-6 shadow-sm">
                            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Plus className="w-5 h-5 text-primary" />
                                Add New Review
                            </h3>

                            <form onSubmit={handleAddReview} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Title *
                                    </label>
                                    <input
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder="e.g., Great shopping experience!"
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Description *
                                    </label>
                                    <textarea
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder="Customer's review content..."
                                        rows={4}
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Link (Optional)
                                    </label>
                                    <input
                                        type="url"
                                        value={link}
                                        onChange={(e) => setLink(e.target.value)}
                                        placeholder="https://example.com"
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-gradient-to-r from-primary to-primary-dark text-white font-bold py-3 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
                                >
                                    {loading ? 'Adding...' : 'Add Review'}
                                </button>
                            </form>

                            {/* Preview */}
                            {(title || description) && (
                                <div className="mt-6 pt-6 border-t border-gray-100">
                                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Preview</p>
                                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-4 border border-primary/10">
                                        <div className="flex items-start gap-3">
                                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                                <Star className="w-5 h-5 text-primary" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-bold text-gray-900">{title || 'Title'}</h4>
                                                <p className="text-sm text-gray-600 mt-1">{description || 'Description'}</p>
                                                {link && (
                                                    <a href={link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-primary mt-2 hover:underline">
                                                        <ExternalLink className="w-3 h-3" />
                                                        View Link
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Existing Reviews */}
                        <div className="bg-white rounded-2xl border border-primary/10 p-6 shadow-sm">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">
                                Existing Reviews ({reviews.length})
                            </h3>

                            {reviews.length === 0 ? (
                                <div className="text-center py-12">
                                    <Star className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                                    <p className="text-gray-500">No reviews yet</p>
                                    <p className="text-sm text-gray-400">Add your first review using the form</p>
                                </div>
                            ) : (
                                <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                                    {reviews.map((review) => (
                                        <div
                                            key={review.id}
                                            className="bg-gray-50 rounded-xl p-4 border border-gray-100 group"
                                        >
                                            <div className="flex items-start justify-between gap-3">
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="font-bold text-gray-900">{review.title}</h4>
                                                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">{review.description}</p>
                                                    {review.link && (
                                                        <a
                                                            href={review.link}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="inline-flex items-center gap-1 text-xs text-primary mt-2 hover:underline"
                                                        >
                                                            <ExternalLink className="w-3 h-3" />
                                                            {review.link.length > 30 ? review.link.substring(0, 30) + '...' : review.link}
                                                        </a>
                                                    )}
                                                    <p className="text-xs text-gray-400 mt-2">
                                                        Added {new Date(review.createdAt).toLocaleDateString()}
                                                    </p>
                                                </div>
                                                <button
                                                    onClick={() => handleDelete(review.id)}
                                                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

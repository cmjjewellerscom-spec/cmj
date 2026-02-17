"use client";
import React, { useState } from 'react';
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import { Star, Send, User, MessageSquare, X } from 'lucide-react';
import { useReviews } from '@/hooks/useReviews';
import { addReview } from '@/lib/supabaseUtils';

export default function CustomerReviews() {
    const { reviews, loading } = useReviews();
    const [showForm, setShowForm] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);

    // Form state
    const [name, setName] = useState('');
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !title.trim() || !description.trim() || rating === 0) return;

        setSubmitLoading(true);

        try {
            await addReview({
                name: name.trim(),
                title: title.trim(),
                description: description.trim(),
                rating,
                approved: false // Default to false for moderation
            });

            // Reset form
            setName('');
            setRating(0);
            setTitle('');
            setDescription('');
            setShowForm(false);
            setSubmitted(true);

            // Hide success message after 3s
            setTimeout(() => setSubmitted(false), 3000);
        } catch (error) {
            console.error("Error submitting review:", error);
            alert("Failed to submit review. Please try again.");
        } finally {
            setSubmitLoading(false);
        }
    };

    const avgRating = reviews.length > 0
        ? (reviews.reduce((sum, r) => sum + (r.rating || 5), 0) / reviews.length).toFixed(1)
        : '0';

    return (
        <div className="min-h-screen font-body transition-colors duration-300">
            <div className="w-full bg-transparent min-h-screen relative">
                <Header />

                <main className="px-4 py-8 pb-32 max-w-2xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl md:text-4xl font-bold text-text-main-light dark:text-text-main-dark mb-2">Customer Reviews</h1>
                        <p className="text-sm text-text-sub-light dark:text-text-sub-dark">What our customers say about us</p>
                        {reviews.length > 0 && (
                            <div className="flex items-center justify-center gap-2 mt-3">
                                <div className="flex">
                                    {[1, 2, 3, 4, 5].map((s) => (
                                        <Star key={s} className={`w-5 h-5 ${s <= Math.round(Number(avgRating)) ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`} />
                                    ))}
                                </div>
                                <span className="font-bold text-[#3E2723]">{avgRating}</span>
                                <span className="text-sm text-gray-500">({reviews.length} reviews)</span>
                            </div>
                        )}
                    </div>

                    {/* Write Review Button */}
                    {!showForm && (
                        <button
                            onClick={() => setShowForm(true)}
                            className="w-full mb-6 py-4 bg-[#D4AF37] hover:bg-[#B8960F] text-white rounded-2xl font-bold text-lg transition-all shadow-md flex items-center justify-center gap-2"
                        >
                            <MessageSquare className="w-5 h-5" />
                            Write a Review
                        </button>
                    )}

                    {/* Success Message */}
                    {submitted && (
                        <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl text-center font-medium">
                            ✅ Thank you! Your review has been submitted.
                        </div>
                    )}

                    {/* Review Form */}
                    {showForm && (
                        <div className="mb-6 bg-white rounded-2xl p-6 shadow-md border border-amber-100">
                            <div className="flex items-center justify-between mb-5">
                                <h2 className="text-xl font-bold text-[#3E2723]">Write Your Review</h2>
                                <button onClick={() => setShowForm(false)} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                                    <X className="w-5 h-5 text-gray-400" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Name */}
                                <div>
                                    <label className="block text-sm font-bold text-[#3E2723] mb-1.5">Your Name</label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="Enter your name"
                                            className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:border-[#D4AF37] focus:outline-none transition-colors bg-gray-50"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Star Rating */}
                                <div>
                                    <label className="block text-sm font-bold text-[#3E2723] mb-1.5">Rating</label>
                                    <div className="flex items-center gap-1">
                                        {[1, 2, 3, 4, 5].map((s) => (
                                            <button
                                                key={s}
                                                type="button"
                                                onClick={() => setRating(s)}
                                                onMouseEnter={() => setHoverRating(s)}
                                                onMouseLeave={() => setHoverRating(0)}
                                                className="p-1 transition-transform hover:scale-110"
                                            >
                                                <Star
                                                    className={`w-8 h-8 transition-colors ${s <= (hoverRating || rating)
                                                        ? 'text-amber-400 fill-amber-400'
                                                        : 'text-gray-300'
                                                        }`}
                                                />
                                            </button>
                                        ))}
                                        {rating > 0 && (
                                            <span className="ml-2 text-sm font-medium text-gray-500">
                                                {rating === 1 ? 'Poor' : rating === 2 ? 'Fair' : rating === 3 ? 'Good' : rating === 4 ? 'Very Good' : 'Excellent'}
                                            </span>
                                        )}
                                    </div>
                                    {rating === 0 && <p className="text-xs text-gray-400 mt-1">Tap a star to rate</p>}
                                </div>

                                {/* Title */}
                                <div>
                                    <label className="block text-sm font-bold text-[#3E2723] mb-1.5">Review Title</label>
                                    <input
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder="e.g. Beautiful jewellery, great quality!"
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:border-[#D4AF37] focus:outline-none transition-colors bg-gray-50"
                                        required
                                    />
                                </div>

                                {/* Description */}
                                <div>
                                    <label className="block text-sm font-bold text-[#3E2723] mb-1.5">Your Experience</label>
                                    <textarea
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder="Tell us about your experience with CMJ Jewellers..."
                                        rows={4}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:border-[#D4AF37] focus:outline-none transition-colors bg-gray-50 resize-none"
                                        required
                                    />
                                </div>

                                {/* Submit */}
                                <button
                                    type="submit"
                                    disabled={!name.trim() || !title.trim() || !description.trim() || rating === 0 || submitLoading}
                                    className="w-full py-3.5 bg-[#D4AF37] hover:bg-[#B8960F] disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-xl font-bold text-base transition-all flex items-center justify-center gap-2 shadow-md"
                                >
                                    {submitLoading ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    ) : (
                                        <>
                                            <Send className="w-4 h-4" />
                                            Submit Review
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    )}

                    {/* Reviews List */}
                    {loading ? (
                        <div className="text-center py-12">
                            <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin mx-auto"></div>
                        </div>
                    ) : reviews.length === 0 && !showForm ? (
                        <div className="text-center py-12">
                            <Star className="w-16 h-16 text-primary/30 mx-auto mb-4" />
                            <p className="text-text-sub-light dark:text-text-sub-dark">No reviews yet</p>
                            <p className="text-sm text-text-sub-light/60 dark:text-text-sub-dark/60 mt-1">Be the first to share your experience!</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {reviews.map((review) => (
                                <div
                                    key={review.id}
                                    className="bg-white/90 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-5 shadow-sm border border-primary/10 dark:border-white/10 transition-all hover:shadow-md"
                                >
                                    <div className="flex items-start gap-4">
                                        {/* Avatar */}
                                        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#D4AF37]/30 to-[#B8860B]/20 flex items-center justify-center flex-shrink-0">
                                            <span className="text-[#B8860B] font-bold text-lg">
                                                {(review.name || 'C').charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            {/* Name & Rating */}
                                            <div className="flex items-center justify-between mb-1">
                                                <p className="font-bold text-[#3E2723] text-sm">{review.name || 'Customer'}</p>
                                                <div className="flex gap-0.5">
                                                    {[1, 2, 3, 4, 5].map((s) => (
                                                        <Star
                                                            key={s}
                                                            className={`w-3.5 h-3.5 ${s <= (review.rating || 5) ? 'text-amber-400 fill-amber-400' : 'text-gray-200'}`}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                            {/* Title */}
                                            <h3 className="font-bold text-[#3E2723] text-base mb-1">
                                                {review.title}
                                            </h3>
                                            {/* Description */}
                                            <p className="text-sm text-gray-600 leading-relaxed">
                                                {review.description}
                                            </p>
                                            {/* Date */}
                                            {review.created_at && (
                                                <p className="text-xs text-gray-400 mt-2">
                                                    {new Date(review.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </main>

                <BottomNav />
            </div>
        </div>
    );
}

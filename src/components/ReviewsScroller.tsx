"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Star, ChevronLeft, ChevronRight, MessageSquare } from 'lucide-react';
import { useReviews } from '@/hooks/useReviews';


export default function ReviewsScroller() {
    const { reviews, loading } = useReviews();
    const [current, setCurrent] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    // Auto-scroll every 4 seconds
    useEffect(() => {
        if (reviews.length <= 1) return;
        const interval = setInterval(() => {
            goNext();
        }, 4000);
        return () => clearInterval(interval);
    }, [reviews.length, current]);

    const goNext = () => {
        if (reviews.length === 0) return;
        setIsAnimating(true);
        setTimeout(() => {
            setCurrent((prev) => (prev + 1) % reviews.length);
            setIsAnimating(false);
        }, 300);
    };

    const goPrev = () => {
        if (reviews.length === 0) return;
        setIsAnimating(true);
        setTimeout(() => {
            setCurrent((prev) => (prev - 1 + reviews.length) % reviews.length);
            setIsAnimating(false);
        }, 300);
    };

    if (loading) {
        return (
            <section className="px-4 py-12 max-w-4xl mx-auto text-center">
                <div className="w-8 h-8 border-2 border-[#D4AF37]/30 border-t-[#D4AF37] rounded-full animate-spin mx-auto"></div>
            </section>
        );
    }

    if (reviews.length === 0) {
        return (
            <section className="px-4 py-12 max-w-4xl mx-auto text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-[#3E2723] mb-3">Customer Reviews</h2>
                <p className="text-gray-500 mb-6">Be the first to share your experience!</p>
                <Link
                    href="/reviews"
                    className="inline-flex items-center gap-2 bg-[#D4AF37] hover:bg-[#B8960F] text-white px-6 py-3 rounded-xl font-bold transition-colors shadow-md"
                >
                    <MessageSquare className="w-5 h-5" />
                    Write a Review
                </Link>
            </section>
        );
    }

    const review = reviews[current];

    return (
        <section className="px-4 py-12 max-w-4xl mx-auto">
            <div className="text-center mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-[#3E2723] mb-1">What Our Customers Say</h2>
                <p className="text-sm text-gray-500">{reviews.length} happy customers</p>
            </div>

            {/* Review Card */}
            <div className="relative">
                {/* Navigation Arrows */}
                {reviews.length > 1 && (
                    <>
                        <button
                            onClick={goPrev}
                            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-6 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors border border-gray-100"
                        >
                            <ChevronLeft className="w-5 h-5 text-[#3E2723]" />
                        </button>
                        <button
                            onClick={goNext}
                            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-6 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors border border-gray-100"
                        >
                            <ChevronRight className="w-5 h-5 text-[#3E2723]" />
                        </button>
                    </>
                )}

                {/* Card */}
                <div
                    className={`bg-white rounded-2xl p-6 md:p-8 shadow-md border border-amber-100 mx-6 md:mx-12 transition-all duration-300 ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
                        }`}
                >
                    {/* Stars */}
                    <div className="flex justify-center gap-1 mb-4">
                        {[1, 2, 3, 4, 5].map((s) => (
                            <Star
                                key={s}
                                className={`w-5 h-5 ${s <= (review.rating || 5) ? 'text-amber-400 fill-amber-400' : 'text-gray-200'}`}
                            />
                        ))}
                    </div>

                    {/* Title */}
                    <h3 className="text-lg md:text-xl font-bold text-[#3E2723] text-center mb-2">
                        &ldquo;{review.title}&rdquo;
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 text-center text-sm md:text-base leading-relaxed mb-4 max-w-lg mx-auto">
                        {review.description}
                    </p>

                    {/* Reviewer */}
                    <div className="flex items-center justify-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4AF37]/30 to-[#B8860B]/20 flex items-center justify-center">
                            <span className="text-[#B8860B] font-bold text-base">
                                {(review.name || 'C').charAt(0).toUpperCase()}
                            </span>
                        </div>
                        <div>
                            <p className="font-bold text-[#3E2723] text-sm">{review.name || 'Customer'}</p>
                            {review.created_at && (
                                <p className="text-xs text-gray-400">
                                    {new Date(review.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Dots */}
                {reviews.length > 1 && (
                    <div className="flex justify-center gap-2 mt-5">
                        {reviews.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => { setIsAnimating(true); setTimeout(() => { setCurrent(i); setIsAnimating(false); }, 300); }}
                                className={`rounded-full transition-all duration-300 ${i === current
                                    ? 'w-6 h-2.5 bg-[#D4AF37]'
                                    : 'w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400'
                                    }`}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Write Review CTA */}
            <div className="text-center mt-6">
                <Link
                    href="/reviews"
                    className="inline-flex items-center gap-2 text-[#D4AF37] hover:text-[#B8960F] font-bold text-sm transition-colors"
                >
                    <MessageSquare className="w-4 h-4" />
                    Write a Review
                </Link>
            </div>
        </section>
    );
}

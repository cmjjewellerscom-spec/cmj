"use client";
import React, { useState, useEffect } from 'react';
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import { Star, ExternalLink } from 'lucide-react';
import { getAllReviews, Review } from '@/data/reviewStore';

export default function CustomerReviews() {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setReviews(getAllReviews());
        setIsLoaded(true);
    }, []);

    return (
        <div className="bg-gradient-to-b from-[#FDF8F3] to-[#F5EDE4] dark:from-gray-900 dark:to-gray-950 min-h-screen font-body transition-colors duration-300">
            <div className="w-full bg-transparent min-h-screen relative">
                <Header />

                <main className="px-4 py-8 pb-32 max-w-2xl mx-auto">
                    <div className="text-center mb-8">
                        <h1 className="font-display text-3xl md:text-4xl text-text-main-light dark:text-text-main-dark mb-2">Customer Reviews</h1>
                        <p className="text-sm text-text-sub-light dark:text-text-sub-dark">What our customers say about us</p>
                    </div>

                    {!isLoaded ? (
                        <div className="text-center py-12">
                            <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin mx-auto"></div>
                        </div>
                    ) : reviews.length === 0 ? (
                        <div className="text-center py-12">
                            <Star className="w-16 h-16 text-primary/30 mx-auto mb-4" />
                            <p className="text-text-sub-light dark:text-text-sub-dark">No reviews yet</p>
                            <p className="text-sm text-text-sub-light/60 dark:text-text-sub-dark/60 mt-1">Check back soon!</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {reviews.map((review) => (
                                <div
                                    key={review.id}
                                    className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-5 shadow-sm border border-primary/10 dark:border-white/10 transition-all hover:shadow-md"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center flex-shrink-0">
                                            <Star className="w-6 h-6 text-primary" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-display text-lg font-bold text-text-main-light dark:text-text-main-dark">
                                                {review.title}
                                            </h3>
                                            <p className="text-sm text-text-sub-light dark:text-text-sub-dark mt-2 leading-relaxed">
                                                {review.description}
                                            </p>
                                            {review.link && (
                                                <a
                                                    href={review.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-1.5 text-sm text-primary mt-3 hover:underline font-medium"
                                                >
                                                    <ExternalLink className="w-4 h-4" />
                                                    View More
                                                </a>
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

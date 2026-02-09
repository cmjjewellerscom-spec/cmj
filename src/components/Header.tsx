"use client";
import React, { useState } from 'react';
import { Menu, Phone, MessageCircle, X } from 'lucide-react';
import Link from 'next/link';

import Image from 'next/image';

export default function Header() {
    const [showContact, setShowContact] = useState(false);

    return (
        <>
            <header className="relative z-50 px-4 py-2 flex items-center justify-between border-b border-primary/20 dark:border-primary/10 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-sm sticky top-0">
                <div className="flex items-center gap-4">
                    <Link href="/" className="flex items-center">
                        <Image
                            src="/cmj_logo.png"
                            alt="CMJ Gold & Diamond Jewellers"
                            className="h-12 md:h-14 w-auto object-contain"
                            width={160}
                            height={56}
                            priority
                        />
                    </Link>
                </div>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8 font-medium text-sm text-text-sub-light dark:text-text-sub-dark">
                    <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                    <Link href="/categories" className="hover:text-primary transition-colors">Collection</Link>
                    <Link href="/reviews" className="hover:text-primary transition-colors">Customer Reviews</Link>
                </nav>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setShowContact(true)}
                        className="px-4 py-2 bg-primary text-white rounded-full text-xs font-bold uppercase tracking-wider hover:bg-primary-dark transition-colors"
                    >
                        Contact Us
                    </button>
                </div>
            </header>

            {/* Contact Modal */}
            {showContact && (
                <div
                    className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity"
                    onClick={() => setShowContact(false)}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white dark:bg-gray-900 rounded-2xl p-6 w-full max-w-sm shadow-2xl relative border border-gray-100 dark:border-gray-800 transform transition-transform"
                    >
                        <button
                            onClick={() => setShowContact(false)}
                            className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        >
                            <X className="w-5 h-5 text-gray-500" />
                        </button>

                        <h3 className="font-display text-2xl font-bold text-center mb-1 text-gray-900 dark:text-white">Get in Touch</h3>
                        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-6">We'd love to hear from you!</p>

                        <div className="space-y-3">
                            <a
                                href="tel:+919997631117"
                                className="flex items-center gap-4 p-4 rounded-xl bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30 transition-all border border-green-100 dark:border-green-800/50 group"
                            >
                                <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-800/50 flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <Phone className="w-5 h-5" />
                                </div>
                                <div className="flex-1 text-left">
                                    <div className="font-bold text-sm uppercase tracking-wide">Call Us</div>
                                    <div className="text-sm opacity-80">+91 99976 31117</div>
                                </div>
                            </a>

                            <a
                                href="https://wa.me/919997631117"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-4 p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all border border-blue-100 dark:border-blue-800/50 group"
                            >
                                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-800/50 flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <MessageCircle className="w-5 h-5" />
                                </div>
                                <div className="flex-1 text-left">
                                    <div className="font-bold text-sm uppercase tracking-wide">WhatsApp</div>
                                    <div className="text-sm opacity-80">Chat with support</div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

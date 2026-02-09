"use client";
import React from 'react';
import { Home, Grid, ShoppingBag, User } from 'lucide-react';
import Link from 'next/link';

export default function BottomNav() {
    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-background-light dark:bg-background-dark border-t border-primary/20 dark:border-white/10 px-6 py-2 z-40 shadow-[0_-5px_20px_rgba(0,0,0,0.05)] md:hidden">
            <ul className="flex justify-around items-center max-w-md mx-auto">
                <li>
                    <Link href="/" className="flex flex-col items-center text-primary dark:text-primary gap-1">
                        <Home className="w-6 h-6" />
                        <span className="text-[0.65rem] font-medium tracking-wide">Home</span>
                    </Link>
                </li>
                <li>
                    <Link href="/categories" className="flex flex-col items-center text-text-sub-light dark:text-text-sub-dark hover:text-primary dark:hover:text-primary transition-colors gap-1">
                        <Grid className="w-6 h-6" />
                        <span className="text-[0.65rem] font-medium tracking-wide">Collection</span>
                    </Link>
                </li>
                <li>
                    <Link href="/reviews" className="flex flex-col items-center text-text-sub-light dark:text-text-sub-dark hover:text-primary dark:hover:text-primary transition-colors gap-1">
                        <User className="w-6 h-6" />
                        <span className="text-[0.65rem] font-medium tracking-wide">Reviews</span>
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

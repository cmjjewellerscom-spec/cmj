"use client";
import React from 'react';

const categories = [
    {
        title: "Lightweight Bangles",
        weight: "Approx. 2–8 g",
        img: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=400"
    },
    {
        title: "Simple Gold Chains",
        weight: "Approx. 3–10 g",
        img: "https://www.miabytanishq.com/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dw4a752db5/images/Mia/hi-res/2822CJO.jpg?sw=640&sh=640"
    },
    {
        title: "Small Necklaces",
        weight: "Approx. 5–12 g",
        img: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&q=80&w=400"
    },
    {
        title: "Thali Chains",
        weight: "Approx. 5–15 g",
        img: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?auto=format&fit=crop&q=80&w=400"
    },
];

export default function Categories() {
    return (
        <section id="categories" className="px-4 mb-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {categories.map((cat, idx) => (
                    <div
                        key={idx}
                        className="bg-surface-light dark:bg-surface-dark rounded-xl p-3 shadow-card border border-primary/10 dark:border-white/5 flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-300 cursor-pointer group"
                    >
                        <div className="h-24 w-full mb-3 flex items-center justify-center overflow-hidden rounded-lg bg-white dark:bg-black/20">
                            <img
                                src={cat.img}
                                alt={cat.title}
                                className="h-full w-full object-cover opacity-90 group-hover:scale-110 transition-transform duration-500"
                                loading="lazy"
                            />
                        </div>
                        <h3 className="font-display text-lg text-text-main-light dark:text-text-main-dark leading-tight mb-1">{cat.title}</h3>
                        <p className="text-xs text-text-sub-light dark:text-text-sub-dark font-medium">{cat.weight}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

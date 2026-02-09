"use client";
import React, { useState } from 'react';
import { Phone, MessageCircle, X } from 'lucide-react';

export default function OrderForm() {
    const [isOpen, setIsOpen] = useState(false);
    const [details, setDetails] = useState('');

    const handleWhatsAppRedirect = () => {
        const phone = "919997631117";
        const text = details ? `Hi CMJ, I would like to enquire about: ${details}` : "Hi CMJ, I have an enquiry.";
        const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
        window.open(url, '_blank');
    };

    const handleCall = () => {
        window.location.href = 'tel:+919997631117';
    };

    return (
        <section id="order" className="px-4 pb-24 pt-4 text-center max-w-md mx-auto">
            <p className="font-display text-lg text-text-main-light dark:text-text-main-dark mb-4 italic">
                Perfect for Daily Office & Home Wear
            </p>

            {!isOpen ? (
                <button
                    onClick={() => setIsOpen(true)}
                    className="w-full bg-gradient-to-r from-primary-dark via-primary to-primary-dark hover:from-primary hover:to-primary text-white font-display py-3 rounded-lg shadow-md flex items-center justify-center gap-2 transition-all group active:scale-[0.98]"
                >
                    <span className="material-icons-outlined text-sm group-hover:animate-pulse"><Phone className="w-5 h-5" /></span>
                    <span className="tracking-wide">Call / WhatsApp for Details</span>
                </button>
            ) : (
                <div className="bg-surface-light dark:bg-surface-dark rounded-xl p-4 shadow-inner border border-primary/20 text-left relative transition-all">
                    <button onClick={() => setIsOpen(false)} className="absolute top-2 right-2 text-text-sub-light"><X className="w-4 h-4" /></button>

                    <h3 className="font-display text-lg mb-4 text-primary">Enquire Now</h3>

                    <textarea
                        className="w-full bg-white dark:bg-black/20 border border-primary/10 rounded-lg p-3 text-sm focus:ring-1 focus:ring-primary outline-none transition-all mb-4 text-text-main-light dark:text-text-main-dark"
                        rows={3}
                        placeholder="Type your requirements here..."
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                    />

                    <div className="flex gap-2">
                        <button
                            onClick={handleCall}
                            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg bg-green-500 text-white font-medium hover:bg-green-600 transition-colors"
                        >
                            <Phone className="w-4 h-4" />
                            Call
                        </button>
                        <button
                            onClick={handleWhatsAppRedirect}
                            className="flex-[2] bg-primary text-white py-3 rounded-lg flex items-center justify-center gap-2 font-medium hover:bg-primary-dark transition-colors"
                        >
                            <MessageCircle className="w-4 h-4" />
                            WhatsApp
                        </button>
                    </div>
                    <p className="text-[0.6rem] text-center mt-3 text-text-sub-light/60">
                        *Contact: +91 99976 31117
                    </p>
                </div>
            )}
        </section>
    );
}

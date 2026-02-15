"use client";
import React from "react";
import { Phone, MessageCircle, Mail, MapPin, Clock } from "lucide-react";
import { FaInstagram, FaYoutube, FaWhatsapp } from "react-icons/fa";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ContactPage() {
    return (
        <>
            <Header />
            <main className="min-h-screen bg-gradient-to-b from-[#FFF8E7] via-white to-[#FFF8E7] dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
                {/* Hero Banner */}
                <section className="relative py-8 md:py-24 bg-gradient-to-br from-[#3E2723] via-[#4E342E] to-[#3E2723] text-white overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0" style={{
                            backgroundImage: "radial-gradient(circle at 20% 50%, #D4AF37 1px, transparent 1px), radial-gradient(circle at 80% 20%, #D4AF37 1px, transparent 1px)",
                            backgroundSize: "60px 60px",
                        }} />
                    </div>
                    <div className="relative max-w-4xl mx-auto text-center px-4">
                        <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
                            <span className="text-[#D4AF37]">Contact</span> Us
                        </h1>
                        <p className="text-[#D3C4A5] text-lg md:text-xl max-w-2xl mx-auto">
                            We&apos;d love to hear from you! Reach out to us through any of the channels below.
                        </p>
                    </div>
                </section>

                {/* Contact Cards */}
                <section className="max-w-6xl mx-auto px-4 -mt-12 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Call Card */}
                        <a
                            href="tel:+919997631117"
                            className="group bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-800 hover:-translate-y-1 text-center"
                        >
                            <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-green-50 dark:bg-green-900/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <Phone className="w-7 h-7 text-green-600 dark:text-green-400" />
                            </div>
                            <h3 className="font-display text-lg font-bold text-gray-900 dark:text-white mb-2">Call Us</h3>
                            <p className="text-[#D4AF37] font-semibold text-lg font-mono">+91 99976 31117</p>
                            <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">Tap to call directly</p>
                        </a>

                        {/* WhatsApp Card */}
                        <a
                            href="https://wa.me/919997631117"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-800 hover:-translate-y-1 text-center"
                        >
                            <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <FaWhatsapp className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
                            </div>
                            <h3 className="font-display text-lg font-bold text-gray-900 dark:text-white mb-2">WhatsApp</h3>
                            <p className="text-[#D4AF37] font-semibold text-lg">Chat with us</p>
                            <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">Quick replies guaranteed</p>
                        </a>

                        {/* Email Card */}
                        <a
                            href="mailto:cmjjewellers.com@gmail.com"
                            className="group bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-800 hover:-translate-y-1 text-center"
                        >
                            <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <Mail className="w-7 h-7 text-blue-600 dark:text-blue-400" />
                            </div>
                            <h3 className="font-display text-lg font-bold text-gray-900 dark:text-white mb-2">Email Us</h3>
                            <p className="text-[#D4AF37] font-semibold text-base break-all">cmjjewellers.com@gmail.com</p>
                            <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">We reply within 24 hours</p>
                        </a>
                    </div>
                </section>

                {/* Store Info + Map */}
                <section className="max-w-6xl mx-auto px-4 py-8 md:py-24">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                        {/* Store Details */}
                        <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 md:p-10 shadow-lg border border-gray-100 dark:border-gray-800">
                            <h2 className="font-display text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8">
                                Visit Our <span className="text-[#D4AF37]">Store</span>
                            </h2>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-full bg-[#FFF8E7] dark:bg-[#3E2723]/50 flex items-center justify-center flex-shrink-0">
                                        <MapPin className="w-6 h-6 text-[#D4AF37]" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 dark:text-white mb-1">Store Address</h4>
                                        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                                            CMJ Gold &amp; Diamond Jewellers<br />
                                            Andhra Pradesh, India
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-full bg-[#FFF8E7] dark:bg-[#3E2723]/50 flex items-center justify-center flex-shrink-0">
                                        <Clock className="w-6 h-6 text-[#D4AF37]" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 dark:text-white mb-1">Working Hours</h4>
                                        <div className="text-gray-600 dark:text-gray-400 text-sm space-y-1">
                                            <p>Monday – Saturday: 10:00 AM – 9:00 PM</p>
                                            <p>Sunday: 10:00 AM – 2:00 PM</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-full bg-[#FFF8E7] dark:bg-[#3E2723]/50 flex items-center justify-center flex-shrink-0">
                                        <Phone className="w-6 h-6 text-[#D4AF37]" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 dark:text-white mb-1">Phone</h4>
                                        <a href="tel:+919997631117" className="text-[#D4AF37] hover:underline text-sm font-mono">
                                            +91 99976 31117
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Social Media */}
                            <div className="mt-10 pt-8 border-t border-gray-100 dark:border-gray-800">
                                <h4 className="font-bold text-gray-900 dark:text-white mb-4">Follow Us</h4>
                                <div className="flex gap-4">
                                    <a
                                        href="https://www.instagram.com/cmjjewellers/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 flex items-center justify-center text-white hover:scale-110 transition-transform duration-300 shadow-lg"
                                    >
                                        <FaInstagram className="w-5 h-5" />
                                    </a>
                                    <a
                                        href="https://www.youtube.com/@CMJtheinfinityofGoldGallery"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center text-white hover:scale-110 transition-transform duration-300 shadow-lg"
                                    >
                                        <FaYoutube className="w-5 h-5" />
                                    </a>
                                    <a
                                        href="https://wa.me/919997631117"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white hover:scale-110 transition-transform duration-300 shadow-lg"
                                    >
                                        <FaWhatsapp className="w-5 h-5" />
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Send us a message / CTA */}
                        <div className="bg-gradient-to-br from-[#3E2723] to-[#4E342E] rounded-2xl p-8 md:p-10 shadow-lg text-white flex flex-col justify-between">
                            <div>
                                <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
                                    Let&apos;s Create Something <span className="text-[#D4AF37]">Beautiful</span>
                                </h2>
                                <p className="text-[#D3C4A5] leading-relaxed mb-8">
                                    Whether you&apos;re looking for a timeless piece of jewellery, want to place a custom order,
                                    or have questions about our collection — we&apos;re here to help. Reach out to us and
                                    our expert team will guide you every step of the way.
                                </p>

                                <div className="space-y-4 mb-8">
                                    <div className="flex items-center gap-3 text-[#D3C4A5]">
                                        <div className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                                        <span className="text-sm">BIS Hallmarked &amp; Certified Jewellery</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-[#D3C4A5]">
                                        <div className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                                        <span className="text-sm">Custom Orders Welcome</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-[#D3C4A5]">
                                        <div className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                                        <span className="text-sm">Pan Andhra Pradesh Delivery</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-[#D3C4A5]">
                                        <div className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                                        <span className="text-sm">Transparent Pricing – No Hidden Charges</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <a
                                    href="https://wa.me/919997631117"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-[#D4AF37] text-[#3E2723] rounded-xl font-bold text-sm uppercase tracking-wider hover:bg-[#C9A030] transition-colors shadow-lg"
                                >
                                    <FaWhatsapp className="w-5 h-5" />
                                    Chat on WhatsApp
                                </a>
                                <a
                                    href="tel:+919997631117"
                                    className="flex-1 flex items-center justify-center gap-3 px-6 py-4 border-2 border-[#D4AF37] text-[#D4AF37] rounded-xl font-bold text-sm uppercase tracking-wider hover:bg-[#D4AF37] hover:text-[#3E2723] transition-colors"
                                >
                                    <Phone className="w-5 h-5" />
                                    Call Now
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}

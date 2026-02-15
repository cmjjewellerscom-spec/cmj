"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin } from 'lucide-react';
import { FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
    const districts = [
        "Alluri Sitharama Raju", "Anakapalli", "Ananthapuramu (Anantapur)", "Annamayya",
        "Bapatla", "Chittoor", "Dr. B.R. Ambedkar Konaseema", "East Godavari",
        "Eluru", "Guntur", "Kakinada", "Krishna", "Kurnool", "Madanapalle (New)",
        "Markapuram (New)", "Nandyal", "NTR (District)", "Palnadu",
        "Parvathipuram Manyam", "Polavaram (New)", "Prakasam",
        "Sri Potti Sriramulu (SPSR) Nellore", "Sri Sathya Sai", "Srikakulam",
        "Tirupati", "Visakhapatnam", "Vizianagaram", "West Godavari", "YSR Kadapa"
    ];

    const quickLinks = [
        { name: "Home", href: "/" },
        { name: "Collection", href: "/categories" },
        { name: "Bullion", href: "/bullion" },
        { name: "Order Your Own", href: "/order/custom" },
        { name: "Daily Wear Items", href: "/daily-wear" },
        { name: "0% VAD Items", href: "/vad-items" },
        { name: "Silver Bars & Ornaments", href: "/silver" },
        { name: "Customer Reviews", href: "/reviews" },
        { name: "Contact Us", href: "/contact" },
        { name: "Admin", href: "/admin" },
        { name: "Privacy Policy", href: "/privacy-policy" },
        { name: "Terms of Service", href: "/terms-of-service" },
    ];

    return (
        <footer className="bg-[#3E2723] text-[#F5DEB3] pt-10 md:pt-16 pb-8 mt-6 md:mt-16">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand Section - Merged into simplified columns for better space */}
                    <div className="space-y-6">
                        <Link href="/" className="inline-block group">
                            <div className="flex items-center gap-2">
                                <span className="font-display text-2xl font-bold tracking-widest text-[#D4AF37] group-hover:text-white transition-colors">CMJ</span>
                            </div>
                        </Link>
                        <p className="text-[#D3C4A5] text-sm leading-relaxed">
                            Tradition Crafted in Gold. Experience the finest selection of gold and diamond jewellery, certified for purity and crafted with love.
                        </p>
                        <div className="flex gap-4">
                            <a href="https://www.instagram.com/cmjjewellers/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#5D4037] flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#3E2723] transition-all duration-300">
                                <FaInstagram className="w-5 h-5" />
                            </a>
                            <a href="https://www.youtube.com/@CMJtheinfinityofGoldGallery" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#5D4037] flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#3E2723] transition-all duration-300">
                                <FaYoutube className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-display text-xl text-[#D4AF37] mb-6">Quick Links</h3>
                        <ul className="space-y-3">
                            {quickLinks.map((link, index) => (
                                <li key={index}>
                                    <Link href={link.href} className="text-[#D3C4A5] hover:text-[#D4AF37] transition-colors text-sm flex items-center gap-2 group">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#5D4037] group-hover:bg-[#D4AF37] transition-colors"></span>
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Virtual Branches */}
                    <div>
                        <h3 className="font-display text-xl text-[#D4AF37] mb-6">Virtual Branches</h3>
                        <div className="grid grid-cols-1 gap-1">
                            {districts.map((district, index) => (
                                <div key={index} className="flex items-start gap-2 text-xs text-[#D3C4A5] hover:text-[#D4AF37] transition-colors cursor-default">
                                    <MapPin className="w-3 h-3 mt-0.5 flex-shrink-0 text-[#5D4037]" />
                                    <span>{district}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Contact Us */}
                    <div>
                        <h3 className="font-display text-xl text-[#D4AF37] mb-6">Contact Us</h3>
                        <ul className="space-y-6">
                            <li className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-[#5D4037]/50 flex items-center justify-center flex-shrink-0 text-[#D4AF37]">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-xs text-[#8D6E63] font-bold uppercase tracking-wider mb-1">Email Us</p>
                                    <a href="mailto:cmjjewellers.com@gmail.com" className="text-[#D3C4A5] hover:text-[#D4AF37] transition-colors text-sm break-all block">
                                        cmjjewellers.com@gmail.com
                                    </a>
                                </div>
                            </li>
                            <li className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-[#5D4037]/50 flex items-center justify-center flex-shrink-0 text-[#D4AF37]">
                                    <Phone className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs text-[#8D6E63] font-bold uppercase tracking-wider mb-1">Call Us</p>
                                    <a href="tel:+919997631117" className="text-[#D3C4A5] hover:text-[#D4AF37] transition-colors text-sm font-mono">
                                        +91 99976 31117
                                    </a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-[#5D4037]/30 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
                    <p className="text-[#8D6E63] text-sm">
                        &copy; {new Date().getFullYear()} CMJ Gold & Diamond Jewellers. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

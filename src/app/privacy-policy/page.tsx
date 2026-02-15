
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-[#FFF8F0]">
            <Header />
            <main className="pt-32 pb-16 px-4 md:px-8 max-w-4xl mx-auto">
                <h1 className="text-3xl md:text-4xl font-display text-[#3E2723] mb-8 text-center">Privacy Policy</h1>

                <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#D4AF37]/10 space-y-6 text-[#5D4037]">
                    <p className="text-sm text-[#8D6E63]">Last Updated: {new Date().toLocaleDateString()}</p>

                    <section>
                        <h2 className="text-xl font-bold text-[#3E2723] mb-3">1. Introduction</h2>
                        <p>
                            Welcome to CMJ Gold & Diamond Jewellers ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about this privacy notice or our practices with regard to your personal information, please contact us at cmjjewellers.com@gmail.com.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-[#3E2723] mb-3">2. Information We Collect</h2>
                        <p className="mb-2">We collect personal information that you voluntarily provide to us when you:</p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Register on the website.</li>
                            <li>Place an order for products or services.</li>
                            <li>Contact us for customer support.</li>
                            <li>Participate in surveys or promotions.</li>
                        </ul>
                        <p className="mt-2">The personal information we collect may include names, phone numbers, email addresses, mailing addresses, and billing addresses.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-[#3E2723] mb-3">3. How We Use Your Information</h2>
                        <p>We use personal information collected via our website for a variety of business purposes described below:</p>
                        <ul className="list-disc pl-5 space-y-1 mt-2">
                            <li>To facilitate account creation and logon process.</li>
                            <li>To fulfill and manage your orders.</li>
                            <li>To send you administrative information.</li>
                            <li>To protect our Services.</li>
                            <li>To enforce our terms, conditions, and policies.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-[#3E2723] mb-3">4. Sharing Your Information</h2>
                        <p>We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-[#3E2723] mb-3">5. Data Retention</h2>
                        <p>We will only keep your personal information for as long as it is necessary for the purposes set out in this privacy notice, unless a longer retention period is required or permitted by law.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-[#3E2723] mb-3">6. Security of Your Information</h2>
                        <p>We aim to protect your personal information through a system of organizational and technical security measures. However, please also remember that we cannot guarantee that the internet itself is 100% secure.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-[#3E2723] mb-3">7. Contact Us</h2>
                        <p>If you have questions or comments about this policy, you may email us at <a href="mailto:cmjjewellers.com@gmail.com" className="text-[#D4AF37] hover:underline">cmjjewellers.com@gmail.com</a> or by phone at <a href="tel:+919997631117" className="text-[#D4AF37] hover:underline">+91 99976 31117</a>.</p>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
}

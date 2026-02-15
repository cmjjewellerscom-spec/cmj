
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function TermsOfService() {
    return (
        <div className="min-h-screen bg-[#FFF8F0]">
            <Header />
            <main className="pt-32 pb-16 px-4 md:px-8 max-w-4xl mx-auto">
                <h1 className="text-3xl md:text-4xl font-display text-[#3E2723] mb-8 text-center">Terms of Service</h1>

                <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#D4AF37]/10 space-y-6 text-[#5D4037]">
                    <p className="text-sm text-[#8D6E63]">Last Updated: {new Date().toLocaleDateString()}</p>

                    <section>
                        <h2 className="text-xl font-bold text-[#3E2723] mb-3">1. Agreement to Terms</h2>
                        <p>
                            These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and CMJ Gold & Diamond Jewellers ("we," "us," or "our"). By accessing the website at cmjjewellers.com, you agree that you have read, understood, and agreed to be bound by all of these Terms of Service.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-[#3E2723] mb-3">2. Intellectual Property Rights</h2>
                        <p>
                            Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the "Content") and the trademarks, service marks, and logos contained therein (the "Marks") are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-[#3E2723] mb-3">3. User Representations</h2>
                        <p>
                            By using the Site, you represent and warrant that: (1) all registration information you submit will be true, accurate, current, and complete; (2) you will maintain the accuracy of such information and promptly update such registration information as necessary; (3) you have the legal capacity and you agree to comply with these Terms of Service.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-[#3E2723] mb-3">4. Products and Pricing</h2>
                        <p>
                            We make every effort to display as accurately as possible the colors, features, specifications, and details of the products available on the Site. However, we do not guarantee that the colors, features, specifications, and details of the products will be accurate, complete, reliable, current, or free of other errors, and your electronic display may not accurately reflect the actual colors and details of the products. All products are subject to availability, and we cannot guarantee that items will be in stock. We reserve the right to discontinue any products at any time for any reason. Prices for all products are subject to change.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-[#3E2723] mb-3">5. Purchases and Payment</h2>
                        <p>
                            We accept various forms of payment. You agree to provide current, complete, and accurate purchase and account information for all purchases made via the Site. You further agree to promptly update account and payment information, including email address, payment method, and payment card expiration date, so that we can complete your transactions and contact you as needed. Sales tax will be added to the price of purchases as deemed required by us. We may change prices at any time.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-[#3E2723] mb-3">6. Modifications and Interruptions</h2>
                        <p>
                            We reserve the right to change, modify, or remove the contents of the Site at any time or for any reason at our sole discretion without notice. However, we have no obligation to update any information on our Site. We also reserve the right to modify or discontinue all or part of the Services without notice at any time.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-[#3E2723] mb-3">7. Governing Law</h2>
                        <p>
                            These terms shall be governed by and defined following the laws of India. CMJ Gold & Diamond Jewellers and yourself irrevocably consent that the courts of India shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these terms.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-[#3E2723] mb-3">8. Contact Us</h2>
                        <p>In order to resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us at <a href="mailto:cmjjewellers.com@gmail.com" className="text-[#D4AF37] hover:underline">cmjjewellers.com@gmail.com</a>.</p>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
}

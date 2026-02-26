import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import LiveRates from "@/components/LiveRates";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import OrderForm from "@/components/OrderForm";
import TrustSection from "@/components/TrustSection";
import BullionSection from "@/components/BullionSection";
import ReviewsScroller from "@/components/ReviewsScroller";
import IntroWrapper from "@/components/IntroWrapper";

import { ShieldCheck } from 'lucide-react';

export default function Home() {
  return (
    <IntroWrapper>
      <div className="bg-gray-100 dark:bg-gray-900 min-h-screen font-body transition-colors duration-300">
        <div className="w-full bg-background-light dark:bg-background-dark min-h-screen relative">

          {/* Background Texture Overlay */}
          <div className="absolute inset-0 opacity-40 pointer-events-none bg-texture-light dark:bg-texture-dark mix-blend-multiply dark:mix-blend-overlay z-0"></div>

          <Header />

          <main className="relative z-10 pb-24 scroll-smooth">
            <LiveRates />
            <Hero />

            <TrustSection />



            <BullionSection />

            <ReviewsScroller />

            <OrderForm />
          </main>

          <BottomNav />

          {/* Bottom Shade */}
          <div className="h-6 w-full bg-background-light dark:bg-background-dark absolute bottom-0 z-10 pointer-events-none"></div>
        </div>
      </div>
    </IntroWrapper>
  );
}

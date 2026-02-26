"use client";
import React, { useState, useEffect, useRef } from 'react';

export default function IntroSplash({ onComplete }: { onComplete: () => void }) {
    const [isMobile, setIsMobile] = useState(false);
    const [fadeOut, setFadeOut] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        // Detect mobile vs desktop
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // When video ends, fade out then remove
    const handleVideoEnd = () => {
        setFadeOut(true);
        setTimeout(() => {
            onComplete();
        }, 800); // match CSS fade-out duration
    };

    // Skip intro on tap/click
    const handleSkip = () => {
        setFadeOut(true);
        setTimeout(() => {
            onComplete();
        }, 400);
    };

    // Safety timeout: if video doesn't end in 15s, auto-skip
    useEffect(() => {
        const timer = setTimeout(() => {
            handleSkip();
        }, 15000);
        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div
            className={`fixed inset-0 z-[9999] bg-black flex items-center justify-center transition-opacity duration-700 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}
            onClick={handleSkip}
            style={{ cursor: 'pointer' }}
        >
            <video
                ref={videoRef}
                src={isMobile ? '/intro-mobile.mp4' : '/intro-desktop.mp4'}
                autoPlay
                muted
                playsInline
                onEnded={handleVideoEnd}
                className="w-full h-full object-cover"
                style={{ objectFit: 'cover' }}
            />

            {/* Skip hint */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 text-xs md:text-sm animate-pulse select-none pointer-events-none">
                Tap anywhere to skip
            </div>
        </div>
    );
}

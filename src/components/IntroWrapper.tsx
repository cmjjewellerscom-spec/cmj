"use client";
import React, { useState, useEffect } from 'react';
import IntroSplash from './IntroSplash';

export default function IntroWrapper({ children }: { children: React.ReactNode }) {
    const [showIntro, setShowIntro] = useState(false);
    const [introComplete, setIntroComplete] = useState(false);

    useEffect(() => {
        // Only show intro once per session
        const hasSeenIntro = sessionStorage.getItem('cmj_intro_seen');
        if (!hasSeenIntro) {
            setShowIntro(true);
        } else {
            setIntroComplete(true);
        }
    }, []);

    const handleIntroComplete = () => {
        sessionStorage.setItem('cmj_intro_seen', 'true');
        setShowIntro(false);
        setIntroComplete(true);
    };

    return (
        <>
            {showIntro && <IntroSplash onComplete={handleIntroComplete} />}
            <div
                className={`transition-opacity duration-500 ${introComplete ? 'opacity-100' : 'opacity-0'}`}
            >
                {children}
            </div>
        </>
    );
}

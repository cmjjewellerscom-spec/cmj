"use client";
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { getFirebaseAuth } from '@/lib/firebase';

export default function AdminAuthCheck({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        const auth = getFirebaseAuth();
        if (!auth) {
            setLoading(false);
            return;
        }

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthenticated(true);
                if (pathname === '/admin') {
                    router.push('/admin/dashboard');
                }
            } else {
                setAuthenticated(false);
                if (pathname !== '/admin') {
                    router.push('/admin');
                }
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [pathname, router]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
            </div>
        );
    }

    // If not authenticated and on a protected route, don't render children (optimization)
    if (!authenticated && pathname !== '/admin') {
        return null;
    }

    return <>{children}</>;
}

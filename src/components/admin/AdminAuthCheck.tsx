"use client";
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function AdminAuthCheck({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        const isAuth = localStorage.getItem('cmj_admin_auth');

        if (isAuth === 'true') {
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

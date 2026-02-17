"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, User, Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';

const ADMIN_CREDENTIALS = {
    username: "manasag",
    password: "211027@Bujji"
};

export default function AdminLogin() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const { signInWithEmailAndPassword } = await import('firebase/auth');
            const { auth } = await import('@/lib/firebase');
            await signInWithEmailAndPassword(auth, username, password);
            // Router push is handled by AdminAuthCheck
        } catch (err: any) {
            console.error(err);
            setError('Invalid email or password');
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center mb-4">
                        <Image
                            src="/logo/ChatGPT Image Feb 6, 2026, 02_59_06 AM.png"
                            alt="CMJ Logo"
                            width={80}
                            height={80}
                            className="rounded-2xl"
                        />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white font-display">CMJ Admin Panel</h1>
                    <p className="text-primary text-sm mt-1">Gold & Diamond Jewellers</p>
                </div>

                {/* Login Card */}
                <div className="bg-white dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl border border-primary/20 p-8 shadow-xl">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">Sign In</h2>

                    <form onSubmit={handleLogin} className="space-y-5">
                        {/* Username */}
                        <div>
                            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-2">
                                Email
                            </label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/50" />
                                <input
                                    type="email"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl pl-12 pr-4 py-3 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                                    placeholder="Enter email"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/50" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl pl-12 pr-12 py-3 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                                    placeholder="Enter password"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        {/* Error */}
                        {error && (
                            <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-xl px-4 py-3 text-red-600 dark:text-red-400 text-sm text-center">
                                {error}
                            </div>
                        )}

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-primary to-primary-dark text-white font-bold py-3 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    <span>Signing In...</span>
                                </>
                            ) : (
                                <span>Sign In</span>
                            )}
                        </button>
                    </form>
                </div>

                <p className="text-center text-gray-400 text-xs mt-6">
                    © 2026 CMJ Gold & Diamond Jewellers
                </p>
            </div>
        </div>
    );
}

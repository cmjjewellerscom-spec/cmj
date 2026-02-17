import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Use environment variables with hardcoded fallback for Vercel build safety
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyD-rh4UAAQ4ThVMcwPSNibfdn6cWziCeBU",
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "cmj-jewellers.firebaseapp.com",
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "cmj-jewellers",
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "cmj-jewellers.firebasestorage.app",
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "846535450718",
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:846535450718:web:8e9a16fadd8d73edcb54cf"
};

// Initialize Firebase (Singleton pattern)
let app;
let auth;
let db;
let storage;

try {
    // Ensure we are in a browser environment or have config
    // This prevents "invalid-api-key" crashes during static build if vars are missing
    if (typeof window !== 'undefined' || firebaseConfig.apiKey) {
        app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
        auth = getAuth(app);
        db = getFirestore(app);
        storage = getStorage(app);
    }
} catch (error) {
    console.error("Firebase initialization error:", error);
}

export { auth, db, storage };
export default app;

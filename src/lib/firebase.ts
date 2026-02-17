import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

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
    app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);
} catch (error) {
    console.error("Firebase initialization error:", error);
    // Mock for build safety if something critically fails, though hardcoded keys should prevent this
    app = {} as any;
    auth = {} as any;
    db = {} as any;
    storage = {} as any;
}

export { auth, db, storage };
export default app;

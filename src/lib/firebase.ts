import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyD-rh4UAAQ4ThVMcwPSNibfdn6cWziCeBU",
    authDomain: "cmj-jewellers.firebaseapp.com",
    projectId: "cmj-jewellers",
    storageBucket: "cmj-jewellers.firebasestorage.app",
    messagingSenderId: "846535450718",
    appId: "1:846535450718:web:8e9a16fadd8d73edcb54cf"
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

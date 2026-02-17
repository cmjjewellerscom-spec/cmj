import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
};

// Initialize Firebase only on client side
const app = typeof window !== "undefined"
    ? (!getApps().length ? initializeApp(firebaseConfig) : getApp())
    : null;

// Export services safely - they will be null on server/build
export const auth = typeof window !== "undefined" && app ? getAuth(app) : null;
export const db = typeof window !== "undefined" && app ? getFirestore(app) : null;
export const storage = typeof window !== "undefined" && app ? getStorage(app) : null;

// Default export for app if needed (though named exports are preferred)
export default app;

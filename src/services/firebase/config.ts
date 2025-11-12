/**
 * Firebase Configuration
 * Setup para Auth, Firestore, Analytics
 * MODO DEVELOPMENT: Funciona sin Firebase configurado
 */

import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getAnalytics, Analytics } from 'firebase/analytics';

// Check if Firebase is configured
const isFirebaseConfigured = () => {
  const apiKey = process.env.FIREBASE_API_KEY;
  return apiKey && apiKey !== 'your_api_key_here' && apiKey !== 'YOUR_API_KEY';
};

// Firebase config (replace with actual values from Firebase Console)
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY || 'YOUR_API_KEY',
  authDomain: process.env.FIREBASE_AUTH_DOMAIN || 'hopequest.firebaseapp.com',
  projectId: process.env.FIREBASE_PROJECT_ID || 'hopequest',
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET || 'hopequest.appspot.com',
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || 'YOUR_SENDER_ID',
  appId: process.env.FIREBASE_APP_ID || 'YOUR_APP_ID',
  measurementId: process.env.FIREBASE_MEASUREMENT_ID || 'YOUR_MEASUREMENT_ID',
};

// Initialize Firebase (only if configured)
let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;
let analytics: Analytics | null = null;

if (isFirebaseConfigured()) {
  try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    // Analytics only works on web
    if (typeof window !== 'undefined') {
      analytics = getAnalytics(app);
    }
    console.log('✅ Firebase initialized successfully');
  } catch (error) {
    console.warn('⚠️ Firebase initialization failed:', error);
    console.log('💡 App will run in local-only mode');
  }
} else {
  console.warn('⚠️ Firebase not configured');
  console.log('💡 App will run in local-only mode (no auth, no cloud sync)');
  console.log('📖 To configure Firebase, see SETUP_FIREBASE.md');
}

export { app, auth, db, analytics };
export default app;

// Helper to check if Firebase is available
export const isFirebaseAvailable = () => app !== null;

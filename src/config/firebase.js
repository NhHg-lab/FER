import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// ✅ Firebase Config - Đã cập nhật từ Firebase Console
const firebaseConfig = {
    apiKey: "AIzaSyDYtvsxsK8zSzqlb7ejfEx0Eb-vYEfPRZA",
    authDomain: "nhuc-nach.firebaseapp.com",
    projectId: "nhuc-nach",
    storageBucket: "nhuc-nach.firebasestorage.app",
    messagingSenderId: "45363545039",
    appId: "1:45363545039:web:509821a937136fa3f808ba",
    measurementId: "G-YJQK7HHGVY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

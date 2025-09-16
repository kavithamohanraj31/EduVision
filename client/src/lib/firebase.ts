import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCWbBCtQcxL7Zm6Q6Fqqb8iWGiUVc2PYlw",
  authDomain: "edutechadvisor-c5cc7.firebaseapp.com",
  projectId: "edutechadvisor-c5cc7",
  storageBucket: "edutechadvisor-c5cc7.firebasestorage.app",
  messagingSenderId: "1014463785266",
  appId: "1:1014463785266:web:db629ba5338d424e938f2b",
  measurementId: "G-90YE6QMSE3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;


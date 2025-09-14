import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Initialize Firebase Admin with your project
let app;
if (getApps().length === 0) {
  // For development, we'll use the project ID directly
  // In production, you should use a service account key
  app = initializeApp({
    projectId: 'edutechadvisor-c5cc7',
    // For local development, we can use the project ID without credentials
    // The Firebase Admin SDK will use Application Default Credentials
  });
} else {
  app = getApps()[0];
}

export const db = getFirestore(app);
export default db;

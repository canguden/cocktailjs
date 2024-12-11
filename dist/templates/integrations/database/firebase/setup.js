"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.firebaseSetup = void 0;
exports.firebaseSetup = {
    files: {
        'src/lib/firebase/client.ts': `
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
`,
        'src/lib/firebase/admin.ts': `
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
import { getStorage } from 'firebase-admin/storage';

const firebaseAdminConfig = {
  credential: cert({
    projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
    clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\\\n/g, '\\n'),
  }),
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
};

// Initialize Firebase Admin
const app = getApps().length > 0 ? getApps()[0] : initializeApp(firebaseAdminConfig);

// Initialize services
export const adminDb = getFirestore(app);
export const adminAuth = getAuth(app);
export const adminStorage = getStorage(app);

// Example query
export async function getUsers() {
  const usersSnapshot = await adminDb.collection('users').get();
  return usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}
`,
        'src/app/api/firebase-example/route.ts': `
import { adminDb } from '@/lib/firebase/admin';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const usersSnapshot = await adminDb.collection('users').get();
    const users = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return NextResponse.json({ users });
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching users' }, { status: 500 });
  }
}
`
    },
    envVars: {
        'NEXT_PUBLIC_FIREBASE_API_KEY': 'your-firebase-api-key',
        'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN': 'your-firebase-auth-domain',
        'NEXT_PUBLIC_FIREBASE_PROJECT_ID': 'your-firebase-project-id',
        'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET': 'your-firebase-storage-bucket',
        'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID': 'your-firebase-messaging-sender-id',
        'NEXT_PUBLIC_FIREBASE_APP_ID': 'your-firebase-app-id',
        'FIREBASE_ADMIN_PROJECT_ID': 'your-firebase-admin-project-id',
        'FIREBASE_ADMIN_CLIENT_EMAIL': 'your-firebase-admin-client-email',
        'FIREBASE_ADMIN_PRIVATE_KEY': 'your-firebase-admin-private-key'
    },
    dependencies: {
        additional: [
            'firebase',
            'firebase-admin'
        ]
    },
    postInstall: []
};

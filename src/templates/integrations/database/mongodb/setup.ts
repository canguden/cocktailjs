export const mongodbSetup = {
  files: {
    'src/lib/mongodb.ts': `
import { MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export { clientPromise };
`,
    'src/lib/db.ts': `
import { clientPromise } from './mongodb';

export async function getCollection(collectionName: string) {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);
  return db.collection(collectionName);
}

// Example query
export async function getUsers() {
  const collection = await getCollection('users');
  return collection.find({}).toArray();
}
`,
    'src/app/api/mongodb-example/route.ts': `
import { getUsers } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const users = await getUsers();
    return NextResponse.json({ users });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error connecting to database' },
      { status: 500 }
    );
  }
}
`
  },
  envVars: {
    'MONGODB_URI': 'your-mongodb-uri',
    'MONGODB_DB': 'your-database-name'
  },
  dependencies: {
    additional: ['mongodb']
  },
  postInstall: []
}; 
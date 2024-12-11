export const vercelPostgresSetup = {
  files: {
    'src/lib/db.ts': `
import { sql } from '@vercel/postgres';
import { drizzle } from 'drizzle-orm/vercel-postgres';

export const db = drizzle(sql);

// Example query
export async function getUsers() {
  const { rows } = await sql\`SELECT * FROM users\`;
  return rows;
}
`,
    'src/lib/schema.ts': `
import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';
 
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow(),
});
`
  },
  envVars: {
    'POSTGRES_URL': 'your-vercel-postgres-url',
    'POSTGRES_PRISMA_URL': 'your-vercel-postgres-prisma-url',
    'POSTGRES_URL_NON_POOLING': 'your-vercel-postgres-url-non-pooling',
    'POSTGRES_USER': 'default',
    'POSTGRES_HOST': 'your-vercel-postgres-host',
    'POSTGRES_PASSWORD': 'your-vercel-postgres-password',
    'POSTGRES_DATABASE': 'verceldb'
  },
  dependencies: {
    additional: ['@vercel/postgres', 'drizzle-orm'],
    devDependencies: ['drizzle-kit']
  },
  postInstall: [
    'npx drizzle-kit generate:pg'
  ]
}; 
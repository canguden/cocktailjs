export const neondbSetup = {
  files: {
    'src/lib/neon.ts': `
import { neon, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

neonConfig.fetchConnectionCache = true;

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle(sql);

// Example query
export async function getUsers() {
  const users = await sql\`SELECT * FROM users\`;
  return users;
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
    'DATABASE_URL': 'your-neon-database-url'
  },
  dependencies: {
    additional: ['@neondatabase/serverless', 'drizzle-orm'],
    devDependencies: ['drizzle-kit']
  },
  postInstall: [
    'npx drizzle-kit generate:pg'
  ]
}; 
export const nextAuthSetup = {
  files: {
    'src/app/api/auth/[...nextauth]/route.ts': `
import NextAuth from 'next-auth';
import { authOptions } from '@/lib/auth';

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
`,
    'src/lib/auth.ts': `
import { NextAuthOptions } from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/lib/prisma';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  // Add your providers here
  providers: [],
};
`,
    'src/lib/prisma.ts': `
import { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;
`
  },
  envVars: {
    'NEXTAUTH_SECRET': 'your-secret-here',
    'NEXTAUTH_URL': 'http://localhost:3000'
  },
  dependencies: {
    additional: ['@prisma/client'],
    devDependencies: ['prisma']
  },
  postInstall: [
    'npx prisma init',
    'npx prisma generate'
  ]
}; 
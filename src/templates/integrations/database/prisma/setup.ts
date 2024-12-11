export const prismaSetup = {
  files: {
    'prisma/schema.prisma': `
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
`,
    'src/lib/prisma.ts': `
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
`
  },
  envVars: {
    'DATABASE_URL': 'postgresql://user:password@localhost:5432/mydb'
  },
  dependencies: {
    additional: ['@prisma/client'],
    devDependencies: ['prisma']
  },
  postInstall: [
    'npx prisma generate',
    'npx prisma db push'
  ]
}; 
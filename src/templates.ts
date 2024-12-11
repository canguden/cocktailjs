export type FrameworkType = 'next' // Add other framework types as needed
export type IntegrationCategory = 'icons' | 'auth' | 'payments' | 'ai' | 'database' | 'ui' | 'state' | 'forms';

export interface Integration {
  name: string;
  package: string;
  configSetup?: string;
  dependencies?: string[];
}

export interface FrameworkConfig {
  language: 'typescript' | 'javascript';
  buildTool: 'turbopack' | 'webpack';
  linting: {
    eslint: boolean;
    prettier: boolean;
  };
}

export const integrations: Record<IntegrationCategory, Record<string, Integration>> = {
  icons: {
    'lucide-icons': { 
      name: 'Lucide Icons',
      package: 'lucide-react'
    },
    'react-icons': { 
      name: 'React Icons',
      package: 'react-icons'
    },
    'heroicons': { 
      name: 'Heroicons',
      package: '@heroicons/react'
    }
  },
  auth: {
    'next-auth': {
      name: 'NextAuth.js',
      package: 'next-auth',
      dependencies: ['@auth/prisma-adapter']
    }
  },
  payments: {
    stripe: {
      name: 'Stripe',
      package: '@stripe/stripe-js',
      dependencies: ['stripe']
    }
  },
  ai: {
    openai: { 
      name: 'OpenAI',
      package: 'openai'
    },
    anthropic: { 
      name: 'Anthropic',
      package: '@anthropic-ai/sdk'
    },
    gemini: { 
      name: 'Google Gemini',
      package: '@google/generative-ai'
    },
    vercelai: {
      name: 'Vercel AI SDK',
      package: '@vercel/ai'
    }
  },
  database: {
    'prisma': {
      name: 'Prisma',
      package: '@prisma/client',
      dependencies: ['prisma']
    },
    'vercel-postgres': {
      name: 'Vercel Postgres',
      package: '@vercel/postgres',
      dependencies: []
    },
    'supabase': {
      name: 'Supabase',
      package: '@supabase/supabase-js',
      dependencies: []
    },
    'neondb': {
      name: 'NeonDB',
      package: '@neondatabase/serverless',
      dependencies: ['dotenv']
    },
    'firebase': {
      name: 'Firebase',
      package: 'firebase',
      dependencies: ['firebase-admin']
    },
    'mongodb': {
      name: 'MongoDB Native',
      package: 'mongodb',
      dependencies: []
    },
    'mongoose': {
      name: 'Mongoose ODM',
      package: 'mongoose',
      dependencies: []
    }
  },
  ui: {
    'shadcn': {
      name: 'shadcn/ui',
      package: '@radix-ui/react-slot',
      dependencies: [
        'class-variance-authority',
        'clsx',
        'tailwind-merge',
        'tailwindcss-animate'
      ]
    }
  },
  state: {
    'zustand': {
      name: 'Zustand',
      package: 'zustand',
      dependencies: []
    }
  },
  forms: {
    'react-hook-form': {
      name: 'React Hook Form + Zod',
      package: 'react-hook-form',
      dependencies: ['@hookform/resolvers', 'zod']
    }
  }
};

export const frameworks: Record<FrameworkType, {
  baseTemplate: string;
  configOptions: {
    language: string[];
    buildTool: string[];
    linting: {
      eslint: boolean;
      prettier: boolean;
    };
  };
}> = {
  'next': {
    baseTemplate: 'create-next-app',
    configOptions: {
      language: ['typescript', 'javascript'],
      buildTool: ['turbopack', 'webpack'],
      linting: {
        eslint: true,
        prettier: true
      }
    }
  }
  // Add other frameworks here
};

export function getTemplates(framework: FrameworkType): string[] {
  return Object.keys(frameworks[framework]);
}

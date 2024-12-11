interface EnvDoc {
  key: string;
  description: string;
  link: string;
}

const envDocs: Record<string, EnvDoc> = {
  NEXTAUTH_SECRET: {
    key: 'NEXTAUTH_SECRET',
    description: 'Secret key for NextAuth.js authentication',
    link: 'https://next-auth.js.org/configuration/options#secret'
  },
  OPENAI_API_KEY: {
    key: 'OPENAI_API_KEY',
    description: 'API key for OpenAI services',
    link: 'https://platform.openai.com/account/api-keys'
  },
  ANTHROPIC_API_KEY: {
    key: 'ANTHROPIC_API_KEY',
    description: 'API key for Anthropic Claude AI',
    link: 'https://console.anthropic.com/account/keys'
  },
  GOOGLE_AI_API_KEY: {
    key: 'GOOGLE_AI_API_KEY',
    description: 'API key for Google AI services',
    link: 'https://makersuite.google.com/app/apikey'
  },
  STRIPE_SECRET_KEY: {
    key: 'STRIPE_SECRET_KEY',
    description: 'Stripe secret key for payment processing',
    link: 'https://dashboard.stripe.com/apikeys'
  },
  DATABASE_URL: {
    key: 'DATABASE_URL',
    description: 'PostgreSQL connection string for Prisma',
    link: 'https://www.prisma.io/docs/concepts/database-connectors/postgresql'
  }
};

export function generateEnvAndDocs(selectedIntegrations: Record<string, string[]>) {
  let envContent = '# Environment Variables\n\n';
  let docsContent = '# Setup Guide\n\n';

  // Collect all env vars from selected integrations
  const envVars = new Set<string>();
  
  Object.entries(selectedIntegrations).forEach(([category, selected]) => {
    selected.forEach(integration => {
      // Add env vars based on integration
      switch(integration) {
        case 'next-auth':
          envVars.add('NEXTAUTH_SECRET');
          break;
        case 'openai':
          envVars.add('OPENAI_API_KEY');
          break;
        case 'anthropic':
          envVars.add('ANTHROPIC_API_KEY');
          break;
        case 'gemini':
          envVars.add('GOOGLE_AI_API_KEY');
          break;
        case 'stripe':
          envVars.add('STRIPE_SECRET_KEY');
          break;
        case 'prisma':
          envVars.add('DATABASE_URL');
          break;
      }
    });
  });

  // Generate .env.local content
  envVars.forEach(key => {
    envContent += `${key}=\n`;
  });

  // Generate documentation
  docsContent += '## Environment Variables Setup\n\n';
  envVars.forEach(key => {
    const doc = envDocs[key];
    docsContent += `### ${doc.key}\n`;
    docsContent += `${doc.description}\n`;
    docsContent += `Get your key here: ${doc.link}\n\n`;
  });

  return {
    envContent,
    docsContent
  };
} 
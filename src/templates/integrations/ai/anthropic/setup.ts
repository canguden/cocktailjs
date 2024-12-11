export const anthropicSetup = {
  files: {
    'src/lib/anthropic.ts': `
import Anthropic from '@anthropic-ai/sdk';

export const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});
`,
    'src/app/api/ai/anthropic/route.ts': `
import { anthropic } from '@/lib/anthropic';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const response = await anthropic.messages.create({
      model: "claude-3-opus-20240229",
      messages,
    });
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({ error: 'Error processing request' }, { status: 500 });
  }
}
`
  },
  envVars: {
    'ANTHROPIC_API_KEY': 'your-anthropic-api-key-here'
  },
  dependencies: {}
}; 
export const openaiSetup = {
  files: {
    'src/lib/openai.ts': `
import OpenAI from 'openai';

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
`,
    'src/app/api/ai/openai/route.ts': `
import { openai } from '@/lib/openai';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages,
    });
    return NextResponse.json(response.choices[0].message);
  } catch (error) {
    return NextResponse.json({ error: 'Error processing request' }, { status: 500 });
  }
}
`
  },
  envVars: {
    'OPENAI_API_KEY': 'your-openai-api-key-here'
  },
  dependencies: {}
}; 
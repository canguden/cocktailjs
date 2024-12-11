export const vercelAISetup = {
  files: {
    'src/lib/vercel-ai.ts': `
import { OpenAIStream, StreamingTextResponse } from 'ai';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function OpenAIChat(messages: any[]) {
  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    stream: true,
    messages,
  });

  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}
`,
    'src/app/api/ai/vercel/route.ts': `
import { OpenAIChat } from '@/lib/vercel-ai';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    return OpenAIChat(messages);
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
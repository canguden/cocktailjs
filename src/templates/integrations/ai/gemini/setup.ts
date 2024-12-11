export const geminiSetup = {
  files: {
    'src/lib/gemini.ts': `
import { GoogleGenerativeAI } from '@google/generative-ai';

export const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY!);
export const model = genAI.getGenerativeModel({ model: "gemini-pro" });
`,
    'src/app/api/ai/gemini/route.ts': `
import { model } from '@/lib/gemini';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return NextResponse.json({ text: response.text() });
  } catch (error) {
    return NextResponse.json({ error: 'Error processing request' }, { status: 500 });
  }
}
`
  },
  envVars: {
    'GOOGLE_AI_API_KEY': 'your-google-ai-api-key-here'
  },
  dependencies: {}
}; 
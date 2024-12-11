export const supabaseSetup = {
  files: {
    'src/lib/supabase.ts': `
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Example query
export async function getUsers() {
  const { data, error } = await supabase
    .from('users')
    .select('*');
  
  if (error) throw error;
  return data;
}
`,
    'src/app/api/supabase-route/route.ts': `
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const supabase = createRouteHandlerClient({ cookies });

  try {
    const { data, error } = await supabase
      .from('your_table')
      .select('*');

    if (error) throw error;

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching data' }, { status: 500 });
  }
}
`
  },
  envVars: {
    'NEXT_PUBLIC_SUPABASE_URL': 'your-supabase-url',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY': 'your-supabase-anon-key'
  },
  dependencies: {
    additional: [
      '@supabase/supabase-js',
      '@supabase/auth-helpers-nextjs',
      '@supabase/auth-ui-react',
      '@supabase/auth-ui-shared'
    ]
  },
  postInstall: []
}; 
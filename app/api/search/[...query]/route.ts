import { auth } from '@/auth'
import { createClient } from '@supabase/supabase-js'
import { type Database } from '@/types/Supabase'
import { NextResponse } from 'next/server'

export async function GET() {
  const session: Session | null = await auth()
  const { supabaseAccessToken } = session

  const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      global: {
        headers: {
          Authorization: `Bearer ${supabaseAccessToken}`,
        },
      },
    }
  )
  // Now we can query with RLS enabled.
  const { data, error } = await supabase.from('software').select('*')

  // This is the default route for the search API and should return a json object with the search results
  return new NextResponse(JSON.stringify({}), {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

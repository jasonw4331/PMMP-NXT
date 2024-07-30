import { auth } from '@/auth'
import { createClient } from '@supabase/supabase-js'
import { type Database } from '@/types/Supabase'

export const GET = auth(async function GET(req) {
  const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      global: {
        headers: {
          Authorization: `Bearer ${req.auth?.supabaseAccessToken}`,
        },
      },
    }
  )
  // Now we can query with RLS enabled.
  const { data, error } = await supabase.from('releases').select('*')

  // This is the default route for the search API and should return a json object with the search results
  return new Response(JSON.stringify({}), {
    headers: {
      'Content-Type': 'application/json',
    },
  })
})

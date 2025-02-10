import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export const GET = async function GET(req, { params }) {
  const supabase = createClient(
    process.env.AUTH_SUPABASE_URL!,
    process.env.AUTH_SUPABASE_KEY!,
    {
      global: {
        headers: {
          Authorization: `Bearer ${req.auth?.supabaseAccessToken}`,
        },
      },
    }
  )
  // Now we can query with RLS enabled.
  // query all the most recent releases of each software
  const { data, error } = await supabase.from('releases').select()

  if (error)
    return NextResponse.json(
      {},
      { status: 500, statusText: 'Internal Server Error' }
    )

  // This is the default route for the search API and should return a json object with the search results
  return NextResponse.json({}, { status: 200 })
}

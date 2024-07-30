import { auth } from '@/auth'
import { createClient } from '@supabase/supabase-js'
import { type Database } from '@/types/Supabase'
import { NextResponse } from 'next/server'

export const GET = auth(async function GET(req, { params }) {
  const supabase = createClient<Database>(
    process.env.AUTH_SUPABASE_URL as string,
    process.env.AUTH_SUPABASE_KEY as string,
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
})

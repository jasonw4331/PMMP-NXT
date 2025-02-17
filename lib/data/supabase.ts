import { createServerClient } from "@supabase/ssr"
import { cookies as nextCookies } from "next/headers"
import { type Database } from "@/types/supabase"
import type { SupabaseClientOptions } from "@supabase/supabase-js/dist/module/lib/types"
import type {
  CookieMethodsServerDeprecated,
  CookieOptionsWithName,
} from "@supabase/ssr/src/types"

export async function createClient(
  url: string | null = null,
  key: string | null = null,
  clientOptions: object = {}
) {
  const cookieStore = await nextCookies()

  var saveCookiesOption = {}
  if (url == null) {
    saveCookiesOption = {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  }

  // noinspection JSDeprecatedSymbols
  return createServerClient<Database>(
    url ?? process.env.NEXT_PUBLIC_SUPABASE_URL!,
    key ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      ...saveCookiesOption,
      ...clientOptions,
    } as SupabaseClientOptions<"public"> & {
      cookieOptions?: CookieOptionsWithName
      cookies: CookieMethodsServerDeprecated
      cookieEncoding?: "raw" | "base64url"
    }
  )
}

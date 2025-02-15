"use server"

//import 'server-only'
import { redirect } from "next/navigation"
import { useCorbado } from "@corbado/react"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseRoleKey = process.env.SUPABASE_API_KEY_SERVICE_ROLE

const supabase = createClient(supabaseUrl, supabaseRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

export async function authenticate(): Promise<object> {
  const { user: CorbadoUser } = useCorbado()

  const { data, error } = await supabase.rpc("get_user_id_by_email", {
    email: CorbadoUser?.email,
  })
  if (error || data.length == 0) {
    redirect("/error")
  }
  const id = data[0].id

  const { data: user, error: userError } =
    await supabase.auth.admin.getUserById(id)
  if (userError || !user) {
    const { data: newUser, error: newUserError } =
      await supabase.auth.admin.createUser({
        email: CorbadoUser?.email,
        user_metadata: {
          name: CorbadoUser?.name,
          isCorbadoUser: true,
        },
        email_confirm: true,
      })
    if (newUserError) {
      redirect("/error")
    }
    return newUser
  }
  return user
}

"use server"

import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { Config, SDK } from "@corbado/node-sdk"

const config = new Config(
  process.env.NEXT_PUBLIC_CORBADO_PROJECT_ID!,
  process.env.CORBADO_API_SECRET!,
  process.env.CORBADO_FRONTEND_API!,
  process.env.CORBADO_BACKEND_API!
)
const sdk = new SDK(config)

export async function getUser() {
  const reqCookies = await cookies()
  const sessionToken = reqCookies.get("cbo_session_token")?.value
  if (!sessionToken) {
    redirect("/login") //TODO: Do not ALWAYS redirect when not logged in.
  }

  try {
    const user = await sdk.sessions().validateToken(sessionToken)
    return { user: { name: user.fullName, userID: user.userId } }
  } catch (e) {
    // session cookie was invalid
    redirect("/error")
  }
}

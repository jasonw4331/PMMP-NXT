"use client"

import { CorbadoAuth } from "@corbado/react"
import { useRouter } from "next/navigation"
import { authenticate } from "@/app/login/actions"

export default function Page() {
  const router = useRouter()

  const onLoggedIn = () => {
    authenticate().then(user => {
      //post login actions can be performed here.
      router.push("/")
    })
  }

  return <CorbadoAuth onLoggedIn={onLoggedIn} />
}

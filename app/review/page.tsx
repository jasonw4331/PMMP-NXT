import ReleaseCard from "@/components/cards/ReleaseCard"
import { useCorbado } from "@corbado/react"
import { redirect } from "next/navigation"

export default async function ReviewPage() {
  const releases = await getData()
  return (
    <ul className={"pt-2 flex flex-wrap gap-x-5 gap-y-10 justify-center"}>
      {releases.map(doc => (
        <ReleaseCard key={doc.id} name={doc.id} {...doc} />
      ))}
    </ul>
  )
}

async function getData(count = 100) {
  const { isAuthenticated } = useCorbado()

  if (!isAuthenticated) {
    redirect("/login")
  }

  return [
    {
      id: "TestPlugin_v1.0.0",
      author: "jasonwynn10",
      tagline: "This is a test plugin",
    },
  ]
}

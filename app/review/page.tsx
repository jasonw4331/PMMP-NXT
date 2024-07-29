import ReleaseCard from '@/components/cards/ReleaseCard'
import { Session } from 'next-auth'
import { auth } from '@/auth'
import { createClient } from '@supabase/supabase-js'
import { type Database } from '@/types/Supabase'

async function getData(count = 100) {
  const session: Session | null = await auth()
  const { supabaseAccessToken } = session

export default async function ReviewPage() {
  const submitted = [
    {
      id: 'TestPlugin_v1.0.0',
      author: 'jasonwynn10',
      tagline: 'This is a test plugin',
    },
  ] //await getSubmitted()
  return (
    <ul className={'pt-2 flex flex-wrap gap-x-5 gap-y-10 justify-center'}>
      {submitted.map(doc => (
        <ReleaseCard key={doc.id} name={doc.id} {...doc} />
      ))}
    </ul>
  )
}

import ReleaseCard from '@/components/cards/ReleaseCard'

export default async function ReviewPage() {
  const submitted = [
    {
      id: 'TestPlugin_v1.0.0',
      author: 'jasonwynn10',
      tagline: 'This is a test plugin',
      download_url: '/404',
      icon_url: 'https://via.placeholder.com/205',
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

import Image from 'next/image'

const PluginCard = ({ name, author, tagline, iconUrl = '/missing.png' }) => {
  return (
    <div>
      <h1>{name}</h1>
      <h2>{author}</h2>
      <Image src={iconUrl} alt='Plugin Icon' width={128} height={128} />
      <p>{tagline}</p>
    </div>
  )
}

export default PluginCard
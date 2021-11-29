export const getStaticPaths = async () => {
  const res = await fetch('') // TODO: server-side firestore data lookup (all records)
  const data = res.json()

  // map data to an array of path objects with params (id)
  const paths = data.map(plugin => {
    return {
      params: { username: plugin.author, plugin: plugin.name }
    }
  })

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps = async (context) => {
  const { username, plugin } = context.params
  const res = await fetch('') // TODO: server-side firestore data lookup (single plugin)
  const pluginDetails = await res.json()

  return {
    props: { pluginDetails }
  }
}

const Releases = ({ pluginDetails }) => {
  return (
    <div>
      <h1>{ pluginDetails.name }</h1>
      <p>{ pluginDetails.author }</p>
      <p>{ pluginDetails.version }</p>
      <p>{ pluginDetails.tagline }</p>
      <p>{ pluginDetails.description }</p>
      <p>{ pluginDetails.api }</p>
      <p>{ pluginDetails.downloadUrl }</p>
    </div>
  );
}

export default Releases;
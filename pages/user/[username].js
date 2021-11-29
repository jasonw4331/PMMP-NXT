export const getStaticPaths = async () => {
  const res = await fetch('') // TODO: server-side firestore data lookup (all username records)
  const data = res.json()

  // map data to an array of path objects with params (id)
  const paths = data.map(user => {
    return {
      params: { username: user.username }
    }
  })

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps = async (context) => {
  const { username } = context.params
  const res = await fetch('') // TODO: server-side firestore data lookup (single user)
  const userDetails = await res.json()

  const res2 = await fetch('') // TODO: server-side firestore data lookup (all user plugins)
  const pluginDetails = await res2.json()

  return {
    props: { userDetails, pluginDetails }
  }
}

const Releases = ({ userDetails }) => {
  return (
    <div>
      <h1>{ userDetails.username }</h1>
      <p>{ userDetails.github }</p>
      <p>{ userDetails.email }</p>
      <p>{ userDetails.authLevel }</p>

      <p>{ pluginDetails }</p>
    </div>
  );
}

export default Releases;
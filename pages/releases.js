import Metatags from '../components/Metatags'

const Review = () => {
  return (
    <main>
      <Metatags title='Releases' />
    </main>
  )
}

export const getServerSideProps = async () => {
  return {
    redirect: {
      destination: '/',
      permanent: true,
    },
  }
}

export default Review

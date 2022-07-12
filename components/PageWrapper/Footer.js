import Link from 'next/link'

const Footer = () => {
  return (
    <footer className={'font-normal text-sm text-base-content'}>
      <center>
        <h2>&copy; {new Date().getFullYear()} PMMP-NXT</h2>
        <h5>
          Some Icons by{' '}
          <Link href='https://freepik.com'>
            <a>freepik.com</a>
          </Link>{' '}
          and{' '}
          <Link href='https://icons8.com'>
            <a>icons8.com</a>
          </Link>
        </h5>
      </center>
    </footer>
  )
}

export default Footer

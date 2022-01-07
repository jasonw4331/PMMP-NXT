import {withAuthUser} from 'next-firebase-auth'
import Metatags from '../components/Metatags'
import {serialize} from 'next-mdx-remote/serialize'
import {MDXRemote} from 'next-mdx-remote'

const Rules = ({source}) => {
  return (
    <>
      <Metatags title={"Rules"}/>
      <article className="prose prose-zinc lg:prose-xl">
        <MDXRemote {...source} />
      </article>
    </>
  )
}

export async function getStaticProps() {
  const source = '# TODO get markdown data from file'
  const mdxSource = await serialize(source)
  return {props: {source: mdxSource}}
}

export default withAuthUser()(Rules)

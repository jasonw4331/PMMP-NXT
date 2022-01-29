import { withAuthUser } from 'next-firebase-auth'
import Metatags from '../components/Metatags'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import path from 'path'
import fs from 'fs'
import matter from 'gray-matter'

const Rules = ({ source }) => {
  return (
    <>
      <Metatags title={'Rules'} />
      <center>
        <article
          className={
            'max-w-none prose prose-zinc dark:prose-invert lg:prose-xl'
          }>
          <MDXRemote {...source} lazy />
        </article>
      </center>
    </>
  )
}

export async function getStaticProps() {
  const postFilePath = path.join(process.cwd(), `public`, `rules.md`)
  const source = fs.readFileSync(postFilePath)

  const { content, data } = matter(source)

  const mdxSource = await serialize(content, {
    // Optionally pass remark/rehype plugins
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [],
    },
    scope: data,
  })

  return {
    props: {
      source: mdxSource,
      frontMatter: data,
    },
  }
}

export default withAuthUser()(Rules)

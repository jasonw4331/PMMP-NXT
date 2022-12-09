import path from 'path'
import fs from 'fs'
import MarkdownComponent from '../../components/MarkdownComponent'
import matter from 'gray-matter'

export default function RulesPage() {
  const postFilePath = path.join(process.cwd(), `public`, `rules.md`) // TODO: change to fetch from github md file
  const source = fs.readFileSync(postFilePath)

  const { content, data } = matter(source)

  return (
    <article
      className={
        'mx-6 pt-6 lg:mx-24 lg:pt-24 prose prose-p:font-semibold prose-sm sm:prose-base md:prose-lg lg:prose-xl max-w-none'
      }>
      <MarkdownComponent content={content} data={data} />
    </article>
  )
}

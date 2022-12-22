import path from 'path'
import fs from 'fs'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function RulesPage() {
  const postFilePath = path.join(process.cwd(), `public`, `rules.md`) // TODO: change to fetch from github md file
  const source: string = fs.readFileSync(postFilePath, { encoding: 'utf8' })

  return (
    <article
      className={
        'mx-6 pt-6 lg:mx-24 lg:pt-24 prose prose-p:font-semibold prose-sm sm:prose-base md:prose-lg lg:prose-xl max-w-none'
      }>
      <ReactMarkdown children={source} remarkPlugins={[remarkGfm]} />
    </article>
  )
}

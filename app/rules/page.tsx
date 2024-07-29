import path from 'path'
import fs from 'fs'
import { evaluate } from '@mdx-js/mdx'
import * as runtime from 'react/jsx-runtime'

export default async function RulesPage() {
  const postFilePath = path.join(process.cwd(), 'public', 'rules.md') // TODO: change to fetch from github md file
  const mdxSource: string = fs.readFileSync(postFilePath, { encoding: 'utf8' })

  // Run the compiled code
  const {
    default: MDXContent,
    MDXDefinedComponent,
    ...rest
  } = await evaluate(mdxSource, runtime)

  console.log(rest)

  // Render the MDX content, supplying the ClientComponent as a component, and
  // the exported MDXDefinedComponent.
  return (
    <article
      className={
        'mx-6 pt-6 lg:mx-24 lg:pt-24 prose prose-p:font-semibold prose-sm sm:prose-base md:prose-lg lg:prose-xl max-w-none'
      }>
      <MDXContent />
      <MDXDefinedComponent />
    </article>
  )
}

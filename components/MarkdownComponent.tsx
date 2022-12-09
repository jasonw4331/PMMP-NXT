'use client'
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { use } from 'react'

export default function MarkdownComponent({
  content,
  data,
}: {
  content: string
  data: { [key: string]: any }
}) {
  const serialized = use(
    serialize(content, {
      scope: data,
    })
  )

  return (
    <MDXRemote
      {...serialized}
      components={{ hr: props => <div className={'divider'} {...props} /> }}
      lazy
    />
  )
}

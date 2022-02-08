import { createNodeMiddleware } from '@octokit/app'
import GITHUB_APP from '../../../lib/initGitHubApp'
import { NextResponse } from 'next/server'

const gitMiddleware = createNodeMiddleware(GITHUB_APP, {
  pathPrefix: '/',
  onUnhandledRequest: (req, res) => {
    return NextResponse.next()
  },
  log: {
    debug: console.log,
    info: console.info,
    warn: console.warn,
    error: console.error,
  },
})

export default async function middleware(request) {
  // Handles API routes listed at https://github.com/octokit/app.js#middlewares
  const response = await gitMiddleware(request, null, () =>
    NextResponse.redirect('/settings/projects')
  )
  //console.log(response)
  return response
}

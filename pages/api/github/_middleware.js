import { createNodeMiddleware } from '@octokit/app'
import GITHUB_APP from '../../../lib/initGitHubApp'
// eslint-disable-next-line @next/next/no-server-import-in-page
import { NextResponse } from 'next/server'

const gitMiddleware = createNodeMiddleware(GITHUB_APP, {
  pathPrefix: '/',
  onUnhandledRequest: (req, res) => {
    console.log(req.body)
    return NextResponse.redirect('/')
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
  return await gitMiddleware(request, null, () =>
    NextResponse.redirect('/settings/projects')
  )
}

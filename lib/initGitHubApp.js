import { App } from '@octokit/app'

const GITHUB_APP = new App({
  appId: process.env.GITHUB_APP_ID,
  privateKey: process.env.GITHUB_APP_PRIVATE_KEY,
  oauth: {
    clientId: process.env.GITHUB_APP_CLIENT_ID,
    clientSecret: process.env.GITHUB_APP_CLIENT_SECRET,
  },
  webhooks: {
    secret: process.env.GITHUB_APP_WEBHOOK_SECRET,
  },
})

const Oauth = GITHUB_APP.oauth

Oauth.on('token.created', async context => {
  const { data } = await context.octokit.request('GET /user')
  GITHUB_APP.log.info(`New token created for ${data.login}`)
})

Oauth.on('token.reset', async context => {
  const { data } = await context.octokit.request('GET /user')
  GITHUB_APP.log.info(`New token reset for ${data.login}`)
})

Oauth.on('token.refreshed', async context => {
  const { data } = await context.octokit.request('GET /user')
  GITHUB_APP.log.info(`New token refreshed for ${data.login}`)
})

Oauth.on('token.scoped', async context => {
  const { data } = await context.octokit.request('GET /user')
  GITHUB_APP.log.info(`New token scoped for ${data.login}`)
})

Oauth.on('token.deleted', async context => {
  const { data } = await context.octokit.request('GET /user')
  GITHUB_APP.log.info(`New token deleted for ${data.login}`)
})

Oauth.on('authorization.deleted', async context => {
  const { data } = await context.octokit.request('GET /user')
  GITHUB_APP.log.info(`New authorization deleted for ${data.login}`)
})

export default GITHUB_APP

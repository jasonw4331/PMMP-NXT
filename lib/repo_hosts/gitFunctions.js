const { Octokit } = require('@octokit/rest')
module.exports = {
  getRepoFileUrl: async function ({
    domain,
    namespace,
    repo,
    commit,
    auth,
    path,
    file,
  }) {
    try {
      const octokit = new Octokit({
        auth,
        userAgent: 'PMMP-NXT/v1.0.0',
        baseUrl: domain,
      })
      const {
        data: { download_url: ret },
      } = await octokit.rest.repos.getContent({
        owner: namespace,
        repo: repo,
        ref: commit,
        path: path + file,
      })
      return ret
    } catch (e) {}
    return null
  },
  getRepoFileContent: async function ({
    domain,
    namespace,
    repo,
    commit,
    auth,
    path,
    file,
  }) {
    try {
      const octokit = new Octokit({
        auth,
        userAgent: 'PMMP-NXT/v1.0.0',
        baseUrl: domain,
      })
      const {
        data: { content: ret },
      } = await octokit.rest.repos.getContent({
        owner: namespace,
        repo: repo,
        ref: commit,
        path: path + file,
      })
      return ret
    } catch (e) {
      console.log(e)
    }
    return null
  },
  getTags: async function ({ domain, namespace, repo, auth }) {
    try {
      const octokit = new Octokit({
        auth,
        userAgent: 'PMMP-NXT v1.0',
        baseUrl: domain,
      })
      const { data = [] } = await octokit.rest.repos.listTags({
        owner: namespace,
        repo: repo,
      })
      return data
    } catch (e) {
      console.log(e)
    }
    return []
  },
  putFile: async function ({
    domain,
    namespace,
    repo,
    auth,
    path,
    file,
    content,
    message,
  }) {
    try {
      const octokit = new Octokit({
        auth,
        userAgent: 'PMMP-NXT v1.0',
        baseUrl: domain,
      })
      const {
        data: { content: ret },
      } = await octokit.rest.repos.createOrUpdateFileContents({
        owner: namespace,
        repo: repo,
        path: path + file,
        message: message,
        content: content,
        branch: 'master',
      })
      return ret
    } catch (e) {
      console.log(e)
    }
    return null
  },
}

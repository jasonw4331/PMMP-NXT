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
    const octokit = new Octokit({
      auth,
      userAgent: 'PMMP-NXT v1.0',
      baseUrl: domain,
    })
    const { data = [] } = await octokit.rest.repos.getContent({
      owner: namespace,
      repo: repo,
      ref: commit,
      path: path + file,
    })
    let ret = null
    data.every(({ name, download_url }) => {
      if (name === file) {
        ret = download_url
        return false
      }
    })
    return ret
  },
}

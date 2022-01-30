const { Octokit } = require('@octokit/rest')
module.exports = {
  getRepoFileUrl: async function ({
    domain,
    namespace,
    repo,
    commit,
    auth,
    path = '',
    file,
  }) {
    // TODO: talk to bitbucket REST api
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
    // TODO: talk to bitbucket REST api
  },
  getTags: async function ({
    domain,
    namespace,
    repo,
    commit,
    auth,
    path,
    file,
  }) {
    // TODO: talk to bitbucket REST api
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
    // TODO: talk to bitbucket REST api
  },
}

// https://bitbucketjs.netlify.app/
// https://docs.atlassian.com/bitbucket-server/rest/7.19.3/bitbucket-rest.html

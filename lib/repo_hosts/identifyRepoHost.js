import { Octokit } from '@octokit/rest'
import gitFunctions from './gitFunctions'
import bitbucketFunctions from './bitbucketFunctions'

const IdentifyRepoHost = async (host, url, auth = null) => {
  if ((await testGithub(url, auth)) || host.toLowerCase() === 'github') {
    return getGithubData(url)
  } else if ((await testGitlab(url, auth)) || host.toLowerCase() === 'gitlab') {
    return getGitlabData(url)
  } else if (
    (await testBitbucket(url, auth)) ||
    host.toLowerCase() === 'bitbucket'
  ) {
    return getBitbucketData(url)
  }
  return {
    domain: null,
    namespace: null,
    repo: null,
    host: null,
  }
}

async function testGithub(url, auth) {
  // https://regex101.com/r/db8oag/1
  const regExp =
    /^(?:http[s]?:\/\/)?((?:[a-zA-Z0-9][-a-zA-Z0-9]{0,61}[a-zA-Z0-9]?\.)?[a-zA-Z0-9]{1,2}(?:[-a-zA-Z0-9]{0,252}[a-zA-Z0-9])?\.[a-zA-Z]{2,63})?(?:\/|^)([a-zA-Z0-9]+)\/?([a-zA-Z0-9]+)\/?(?:[a-zA-Z0-9]+\/?)?(?:([a-zA-Z0-9]+)\/?)?/im

  if (!regExp.test(url)) return false

  try {
    const results = regExp.exec(url)

    if (results[1] === 'github.com') return true

    const octokit = new Octokit({
      auth,
      userAgent: 'PMMP-NXT v1.0',
      baseUrl: results.length > 2 ? results[1] : null,
    })
    await octokit.rest.repos.getContent({
      owner: results.length > 2 ? results[2] : results[1],
      repo: results.length > 2 ? results[3] : results[2],
    })
    return true
  } catch (e) {}
  return false
}

function getGithubData(url) {
  // https://regex101.com/r/db8oag/1
  const regExp =
    /^(?:http[s]?:\/\/)?((?:[a-zA-Z0-9][-a-zA-Z0-9]{0,61}[a-zA-Z0-9]?\.)?[a-zA-Z0-9]{1,2}(?:[-a-zA-Z0-9]{0,252}[a-zA-Z0-9])?\.[a-zA-Z]{2,63})?(?:\/|^)([a-zA-Z0-9]+)\/?([a-zA-Z0-9]+)\/?(?:[a-zA-Z0-9]+\/?)?(?:([a-zA-Z0-9]+)\/?)?/im

  const results = regExp.exec(url)

  let preURI = ''
  if (results[1] === 'github.com') preURI = 'api.'

  return {
    domain: results.length > 2 ? 'https://' + preURI + results[1] : null,
    namespace: results.length > 2 ? results[2] : results[1],
    repo: results.length > 2 ? results[3] : results[2],
    host: gitFunctions,
  }
}

async function testGitlab(url, auth) {
  // https://regex101.com/r/lR21gq/1
  const regExp =
    /^(?:http[s]?:\/\/)?((?:[a-zA-Z0-9][-a-zA-Z0-9]{0,61}[a-zA-Z0-9]?\.)?[a-zA-Z0-9]{1,2}(?:[-a-zA-Z0-9]{0,252}[a-zA-Z0-9])?\.[a-zA-Z]{2,63})?\/([a-zA-Z0-9-_]+)\/?([a-zA-Z0-9-_]+)\/?(?:[a-zA-Z0-9-_]+\/?)?(?:[a-zA-Z0-9-_]+\/?)?(?:([a-zA-Z0-9-_]+)\/?)?.*/im

  if (!regExp.test(url)) return false

  try {
    const results = regExp.exec(url)

    if (results[1] === 'gitlab.com') return true

    try {
      const octokit = new Octokit({
        auth,
        userAgent: 'PMMP-NXT v1.0',
        baseUrl:
          results.length > 2
            ? 'https://' + results[1]
            : 'https://gitlab.com/api',
      })
      await octokit.rest.repos.getContent({
        owner: results.length > 2 ? results[2] : results[1],
        repo: results.length > 2 ? results[3] : results[2],
      })
    } catch (e) {}

    return true
  } catch (e) {}
  return false
}

function getGitlabData(url) {
  // https://regex101.com/r/lR21gq/1
  const regExp =
    /^(?:http[s]?:\/\/)?((?:[a-zA-Z0-9][-a-zA-Z0-9]{0,61}[a-zA-Z0-9]?\.)?[a-zA-Z0-9]{1,2}(?:[-a-zA-Z0-9]{0,252}[a-zA-Z0-9])?\.[a-zA-Z]{2,63})?\/([a-zA-Z0-9-_]+)\/?([a-zA-Z0-9-_]+)\/?(?:[a-zA-Z0-9-_]+\/?)?(?:[a-zA-Z0-9-_]+\/?)?(?:([a-zA-Z0-9-_]+)\/?)?.*/im

  const results = regExp.exec(url)

  let postURI = ''
  if (results[1] === 'gitlab.com') postURI = '/api'

  return {
    domain:
      results.length > 2
        ? 'https://' + results[1] + postURI
        : 'https://gitlab.com/api',
    namespace: results.length > 2 ? results[2] : results[1],
    repo: results.length > 2 ? results[3] : results[2],
    host: gitFunctions,
  }
}

async function testBitbucket(url, auth) {
  // https://regex101.com/r/lR21gq/1
  const regExp =
    /^(?:http[s]?:\/\/)?((?:[a-zA-Z0-9][-a-zA-Z0-9]{0,61}[a-zA-Z0-9]?\.)?[a-zA-Z0-9]{1,2}(?:[-a-zA-Z0-9]{0,252}[a-zA-Z0-9])?\.[a-zA-Z]{2,63})?\/([a-zA-Z0-9-_]+)\/?([a-zA-Z0-9-_]+)\/?(?:[a-zA-Z0-9-_]+\/?)?(?:[a-zA-Z0-9-_]+\/?)?(?:([a-zA-Z0-9-_]+)\/?)?.*/im

  if (regExp.test(url)) return false

  try {
    const results = regExp.exec(url)

    if (results[1] === 'bitbucket.org') return true

    return true
  } catch (e) {}
  return false
}

function getBitbucketData(url) {
  // https://regex101.com/r/lR21gq/1
  const regExp =
    /^(?:http[s]?:\/\/)?((?:[a-zA-Z0-9][-a-zA-Z0-9]{0,61}[a-zA-Z0-9]?\.)?[a-zA-Z0-9]{1,2}(?:[-a-zA-Z0-9]{0,252}[a-zA-Z0-9])?\.[a-zA-Z]{2,63})?\/([a-zA-Z0-9-_]+)\/?([a-zA-Z0-9-_]+)\/?(?:[a-zA-Z0-9-_]+\/?)?(?:[a-zA-Z0-9-_]+\/?)?(?:([a-zA-Z0-9-_]+)\/?)?.*/im

  const results = regExp.exec(url)

  return {
    domain: results.length > 2 ? results[1] : null,
    namespace: results.length > 2 ? results[2] : results[1],
    repo: results.length > 2 ? results[3] : results[2],
    host: bitbucketFunctions,
  }
}

export default IdentifyRepoHost

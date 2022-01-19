import { AuthAction, withAuthUser } from 'next-firebase-auth'
import Metatags from '../components/Metatags'
import { useCallback, useEffect, useState } from 'react'
import debounce from 'lodash.debounce'
import { Octokit } from '@octokit/rest'
import semantic from 'semver'
import IdentifyRepoHost from '../lib/repo_hosts/identifyRepoHost'

const Publish = () => {
  const [url, setUrl] = useState('')
  const [tag, setTag] = useState('')
  const [options, setOptions] = useState([])
  const [needsPath, setNeedsPath] = useState(false)
  const [path, setPath] = useState('')
  const [validPath, setValidPath] = useState(false)

  const onSubmit = async e => {
    e.preventDefault()

    const form = new FormData(e.target)
    const formData = Object.fromEntries(form.entries())
    console.log(formData)
    // TODO: validate formData.path

    const { domain, namespace, repo, commit, host } = {
      ...(await IdentifyRepoHost(url)),
      commit: formData.commit,
    }

    const manifestUrl = await host.getRepoFileUrl({
      domain,
      namespace,
      repo,
      commit,
      auth: null,
      path,
      file: 'plugin.yml',
    })
    if (formData.enableDescription) {
      const descriptionUrl = await host.getRepoFileUrl({
        domain,
        namespace,
        repo,
        commit,
        auth: null,
        path,
        file: 'readme.md',
      })
    } else {
      const descriptionUrl = null
    }
    if (formData.enableChangelog) {
      const changelogUrl = await host.getRepoFileUrl({
        domain,
        namespace,
        repo,
        commit,
        auth: null,
        path: path,
        file: 'changelog.md',
      })
    } else {
      const changelogUrl = null
    }

    // TODO: display draft with imported info
  }

  // prevent new debounce being created every page render
  const checkRepository = useCallback(
    debounce(
      async (
        url,
        tag,
        needsPath,
        path,
        setTag,
        setOptions,
        setNeedsPath,
        setValidPath
      ) => {
        const octokit = new Octokit({
          //auth: 'secret123', // TODO: get git auth token from firebase auth
          userAgent: 'PMMP-NXT v1.0',
          baseUrl: 'git.ad5001.eu',
        })

        const regex =
          /^(?:http[s]?:\/\/)?github\.com\/(.+?)\/(.+?)(?:$|\.git|\/.+?\/(.+?)\/).*$/im

        if (url.length > 10 && regex.test(url) && tag === '') {
          const results = regex.exec(url)
          try {
            let { data = [] } = await octokit.rest.repos.listTags({
              owner: results[1],
              repo: results[2],
            })
            const tags = data.filter(({ name }) =>
              semantic.valid(name, { includePrerelease: true })
            )
            setTag(tags[0].commit.sha)
            setOptions(
              tags.map(({ name, commit: { sha } }) => {
                return (
                  <option
                    key={sha}
                    value={sha}
                    className={
                      'bg-zinc-100 appearance-none border-2 border-zinc-200 rounded w-full py-2 px-4 text-zinc-700 leading-tight focus:outline-none focus:bg-white focus:border-slate-500'
                    }>
                    {name}
                  </option>
                )
              })
            )
          } catch (e) {
            setTag('')
            setOptions([])
            return
          }
        }

        if (tag !== '' && url.length > 10 && regex.test(url) && path === '') {
          const results = regex.exec(url)
          try {
            await octokit.rest.repos.getContent({
              owner: results[1],
              repo: results[2],
              ref: tag,
              path: 'plugin.yml',
            })
            setNeedsPath(false)
          } catch (e) {
            // TODO: set false if 404
            setNeedsPath(true)
            return
          }
        }

        if (
          needsPath &&
          url.length > 10 &&
          tag !== '' &&
          path !== '' &&
          regex.test(url)
        ) {
          const results = regex.exec(url)
          try {
            await octokit.rest.repos.getContent({
              owner: results[1],
              repo: results[2],
              ref: tag,
              path: path + 'plugin.yml',
            })
            setValidPath(true)
          } catch (e) {
            setValidPath(false)
          }
        }
        if (!needsPath) {
          setValidPath(true)
        }
      },
      1000
    ),
    []
  )

  // trigger repository check on any field update
  useEffect(
    () =>
      checkRepository(
        url,
        tag,
        needsPath,
        path,
        setTag,
        setOptions,
        setNeedsPath,
        setValidPath
      ),
    [path, tag, url]
  )

  return (
    <>
      <Metatags
        title='Publish'
        tagline='Release your first plugin today!'
        image='TODO: upload arrow image'
      />
      <form
        onSubmit={onSubmit}
        className='w-full max-w-lg bg-zinc-800 rounded-lg p-3'>
        <div className='mb-6'>
          <h1 className={'font-bold text-3xl text-zinc-300'}>
            Choose a Repository
          </h1>
        </div>
        <div className='mb-6'>
          <label
            className='block text-zinc-400 font-bold mb-1 pr-4'
            htmlFor='inline-full-name'>
            Github URL
          </label>
          <input
            className='bg-zinc-100 appearance-none border-2 border-zinc-200 rounded w-full py-2 px-4 text-zinc-700 leading-tight focus:outline-none focus:bg-white focus:border-slate-500'
            id='inline-full-name'
            name={'url'}
            type={'url'}
            value={url}
            onChange={async e => setUrl(e.target.value)}
            placeholder={'https://github.com/pmmp/PocketMine-MP.git'}
            required={true}
            autoFocus={true}
          />
        </div>
        <div className='mb-6'>
          <label
            className='block text-zinc-400 font-bold mb-1 pr-4'
            htmlFor='inline-password'>
            Tag / Release
          </label>
          <select
            className='bg-zinc-100 appearance-none border-2 border-zinc-200 rounded w-full py-2 px-4 text-zinc-700 leading-tight focus:outline-none focus:bg-white focus:border-slate-500'
            id='inline-password'
            name={'commit'}
            defaultValue={tag}
            onChange={async e => setTag(e.target.value)}
            required={true}>
            {options}
          </select>
        </div>
        <div className={'mb-6 ' + (needsPath ? '' : 'hidden')}>
          <label
            className='block text-zinc-400 font-bold mb-1 pr-4'
            htmlFor='inline-full-name'>
            Path / To / Plugin
          </label>
          <input
            className='bg-zinc-100 appearance-none border-2 border-zinc-200 rounded w-full py-2 px-4 text-zinc-700 leading-tight focus:outline-none focus:bg-white focus:border-slate-500'
            id='inline-full-name'
            name={'path'}
            type={'text'}
            placeholder={'Path/To/Plugin'}
            value={path}
            onChange={async e => setPath(e.target.value)}
            required={false}
          />
        </div>
        <div className='mb-6 flex flex-row justify-between'>
          <label className='block text-zinc-500 font-bold'>
            <input
              className='mr-2 leading-tight'
              type='checkbox'
              name={'enableManifest'}
              defaultChecked={true}
              required={true}
              disabled={true}
            />
            <span className='text-sm'>Import plugin.yml</span>
          </label>
          <label className='block text-zinc-500 font-bold'>
            <input
              className='mr-2 leading-tight'
              type='checkbox'
              name={'enableDescription'}
              defaultChecked={true}
              required={false}
            />
            <span className='text-sm'>Import readme.md</span>
          </label>
          <label className='block text-zinc-500 font-bold'>
            <input
              className='mr-2 leading-tight'
              type='checkbox'
              name={'enableChangelog'}
              defaultChecked={true}
              required={false}
            />
            <span className='text-sm'>Import changelog.md</span>
          </label>
        </div>
        <button
          className='shadow bg-slate-500 hover:bg-slate-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'
          type='submit'
          disabled={!validPath}>
          Publish
        </button>
      </form>
    </>
  )
}

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  //authPageURL: '', // TODO: only allow github auth
})(Publish)

import { AuthAction, withAuthUser } from 'next-firebase-auth'
import Metatags from '../components/Metatags'
import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import debounce from 'lodash.debounce'
import { Octokit } from '@octokit/rest'
import semantic from 'semver'

const Publish = () => {
  const router = useRouter()
  const [url, setUrl] = useState('')
  const [tag, setTag] = useState('')
  const [options, setOptions] = useState([])
  const [needsPath, setNeedsPath] = useState(false)
  const [path, setPath] = useState('')
  const [validPath, setValidPath] = useState(false)
  const octokit = new Octokit({
    //auth: 'secret123', // TODO: get git auth token from firebase auth
    userAgent: 'PMMP-NXT v1.0',
  })

  const onSubmit = async e => {
    e.preventDefault()

    const form = new FormData(e.target)
    const formData = Object.fromEntries(form.entries())
    console.log(formData)

    const regex =
      /^(?:http[s]?:\/\/)?github\.com\/(.+?)\/(.+?)(?:$|\.git|\/.+?\/(.+?)\/).*$/im

    if (
      formData.url.length > 10 &&
      formData.commit !== '' &&
      regex.test(formData.url)
    ) {
      const results = regex.exec(formData.url)
      try {
        const { data = [] } = await octokit.rest.repos.getContent({
          owner: results[1],
          repo: results[2],
          ref: formData.commit,
          path: formData.path,
        })
        console.log(data)
        let manifest_url = ''
        let readme_url = ''
        let changelog_url = ''
        data.forEach(({ name, download_url }) => {
          if (name.toLowerCase() === 'plugin.yml') manifest_url = download_url
          if (name.toLowerCase() === 'readme.md') readme_url = download_url
          if (name.toLowerCase() === 'changelog.md')
            changelog_url = download_url
        })
        await router.push(
          `/draft?manifest=${encodeURI(manifest_url)}&description=${
            formData.enableReadme ? encodeURI(readme_url) : 'null'
          }&changelog=${
            formData.enableChangelog ? encodeURI(changelog_url) : 'null'
          }`
        )
      } catch (e) {
        console.log(e)
      }
    }
  }

  useEffect(() => {
    checkRepository(url, octokit, setTag, setOptions)
  }, [url])

  useEffect(() => {
    checkFiles(url, tag, octokit, setNeedsPath)
  }, [tag, url])

  useEffect(() => {
    checkPathFiles(url, tag, needsPath, path, octokit, setValidPath)
  }, [path, tag, url])

  const checkRepository = useCallback(
    debounce(async (url, octokit, setTag, setOptions) => {
      const regex =
        /^(?:http[s]?:\/\/)?github\.com\/(.+?)\/(.+?)(?:$|\.git|\/.+?\/(.+?)\/).*$/im

      if (url.length > 10 && regex.test(url)) {
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
        }
      }
    }, 500),
    []
  )

  const checkFiles = useCallback(
    debounce(async (url, tag, octokit, setNeedsPath) => {
      const regex =
        /^(?:http[s]?:\/\/)?github\.com\/(.+?)\/(.+?)(?:$|\.git|\/.+?\/(.+?)\/).*$/im

      if (tag !== '' && url.length > 10 && regex.test(url)) {
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
        }
      }
    }, 500),
    []
  )

  const checkPathFiles = useCallback(
    debounce(async (url, tag, needsPath, path, octokit, setValidPath) => {
      const regex =
        /^(?:http[s]?:\/\/)?github\.com\/(.+?)\/(.+?)(?:$|\.git|\/.+?\/(.+?)\/).*$/im

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
    }, 500),
    []
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
              name={'enableReadme'}
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

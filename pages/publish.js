import { AuthAction, withAuthUser } from 'next-firebase-auth'
import Metatags from '../components/Metatags'
import { useCallback, useEffect, useState } from 'react'
import debounce from 'lodash.debounce'
import semantic from 'semver'
import IdentifyRepoHost from '../lib/repo_hosts/identifyRepoHost'
import Image from 'next/image'
import githubMark from '../public/icons/GitHub-Mark.svg'
import gitlabIcon from '../public/icons/GitLab-Icon.svg'
import bitbucketMark from '../public/icons/Bitbucket-Mark.svg'

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
      ...(await IdentifyRepoHost(formData.host, url)),
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
        if (url.length < 10) return

        const { domain, namespace, repo, host } = {
          ...(await IdentifyRepoHost(url)),
        }

        let tags = await host.getTags({ domain, namespace, repo })
        tags = tags.filter(({ name }) =>
          semantic.valid(name, { includePrerelease: true })
        )
        if (tags.length < 1) {
          setTag('')
          setOptions([])
          return
        }
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

        const file = await host.getRepoFileUrl({
          domain,
          namespace,
          repo,
          tag,
          path,
          file: 'plugin.yml',
        })
        if (path === null && file === null) {
          setNeedsPath(true)
          return
        } else if (file === null) {
          setValidPath(false)
          return
        }
        setValidPath(true)
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
        <div className='w-full mb-6'>
          <h1 className={'font-bold text-3xl text-zinc-300'}>
            Choose a Repository
          </h1>
        </div>
        <div className={'w-full max-w-lg flex flex-row'}>
          <div className={'w-full max-w-sm'}>
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
            <fieldset className='mb-6 flex flex-row justify-between'>
              <legend className='sr-only'>Optional Imports</legend>
              <div className='flex items-center mb-4'>
                <input
                  id='checkbox-1'
                  aria-describedby='checkbox-1'
                  type='checkbox'
                  name={'enableManifest'}
                  defaultChecked={true}
                  required={true}
                  disabled={true}
                  className='w-4 h-4 text-green-600 bg-white dark:bg-gray-900 rounded border-gray-300 focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                />
                <label
                  htmlFor='checkbox-1'
                  className='ml-3 text-sm font-medium text-gray-900 dark:text-gray-300'>
                  Import plugin.yml
                </label>
              </div>

              <div className='flex items-center mb-4'>
                <input
                  id='checkbox-2'
                  aria-describedby='checkbox-2'
                  type='checkbox'
                  name={'enableReadme'}
                  defaultChecked={true}
                  required={true}
                  className='w-4 h-4 text-green-600 bg-white dark:bg-gray-900 rounded border-gray-300 focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                />
                <label
                  htmlFor='checkbox-2'
                  className='ml-3 text-sm font-medium text-gray-900 dark:text-gray-300'>
                  Import README.md
                </label>
              </div>

              <div className='flex items-center mb-4'>
                <input
                  id='checkbox-3'
                  aria-describedby='checkbox-3'
                  type='checkbox'
                  name={'enableChangelog'}
                  defaultChecked={true}
                  required={true}
                  className='w-4 h-4 text-green-600 bg-white dark:bg-gray-900 rounded border-gray-300 focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                />
                <label
                  htmlFor='checkbox-3'
                  className='ml-3 text-sm font-medium text-gray-900 dark:text-gray-300'>
                  Import CHANGELOG.md
                </label>
              </div>
            </fieldset>
            <button
              className='shadow bg-slate-500 hover:bg-slate-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'
              type='submit'
              disabled={!validPath}>
              Publish
            </button>
          </div>
          <fieldset className={'max-w-sm flex flex-col pl-3'}>
            <legend className='sr-only'>Git Host Sites</legend>

            <div className='relative inline-flex items-center justify-center p-0.5 mb-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:ring-green-200 dark:focus:ring-green-800'>
              <input
                id='host-option-1'
                type='radio'
                name='hosts'
                value='GitHub'
                role={'radio'}
                defaultChecked
                className={'peer hidden invisible'}
              />
              <label
                htmlFor={'host-option-1'}
                className='relative px-5 py-2.5 justify-between transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 peer-checked:bg-opacity-0'>
                <Image
                  src={githubMark}
                  width={24}
                  height={24}
                  alt={'GitHub Logo'}
                />
                Github
              </label>
            </div>
            <div className='relative inline-flex items-center justify-center p-0.5 mb-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:ring-green-200 dark:focus:ring-green-800'>
              <input
                id='host-option-2'
                type='radio'
                name='hosts'
                value='GitLab'
                role={'radio'}
                className={'peer hidden invisible'}
              />
              <label
                htmlFor={'host-option-2'}
                className='relative px-5 py-2.5 justify-between transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 peer-checked:bg-opacity-0'>
                <Image
                  src={gitlabIcon}
                  width={24}
                  height={24}
                  alt={'GitLab Logo'}
                />
                GitLab
              </label>
            </div>
            <div className='relative inline-flex items-center justify-center p-0.5 mb-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:ring-green-200 dark:focus:ring-green-800'>
              <input
                id='host-option-3'
                type='radio'
                name='hosts'
                value='Bitbucket'
                role={'radio'}
                className={'peer hidden invisible'}
              />
              <label
                htmlFor={'host-option-3'}
                className='relative px-5 py-2.5 justify-between transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 peer-checked:bg-opacity-0'>
                <Image
                  src={bitbucketMark}
                  width={23}
                  height={23}
                  alt={'Bitbucket Logo'}
                />
                Bitbucket
              </label>
            </div>
          </fieldset>
        </div>
      </form>
    </>
  )
}

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  //authPageURL: '', // TODO: only allow github auth
})(Publish)

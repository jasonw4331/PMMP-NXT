import { useAuthUser, withAuthUser } from 'next-firebase-auth'
import Metatags from '../components/Metatags'
import { useCallback, useEffect, useState } from 'react'
import debounce from 'lodash.debounce'
import semantic from 'semver'
import IdentifyRepoHost from '../lib/repo_hosts/identifyRepoHost'
import Image from 'next/image'
import githubMark from '../public/icons/GitHub-Mark.svg'
import gitlabIcon from '../public/icons/GitLab-Icon.svg'
import bitbucketMark from '../public/icons/Bitbucket-Mark.svg'
import { useRouter } from 'next/router'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import StepContent from '@mui/material/StepContent'
import Button from '@mui/material/Button'
import {
  getAuth,
  GithubAuthProvider,
  linkWithPopup,
  OAuthProvider,
  signInWithPopup,
  unlink,
} from 'firebase/auth'
import {
  doc,
  getDoc,
  getFirestore,
  setDoc,
  updateDoc,
} from 'firebase/firestore'
import { getApp } from 'firebase/app'

const Publish = () => {
  const router = useRouter()
  const authUser = useAuthUser()

  return (
    <>
      <Metatags
        title='Publish'
        tagline='Release your first plugin today!'
        //TODO: upload arrow image
      />
      <div className={'w-full h-full flex justify-center'}>
        <StepperForm authUser={authUser} />
      </div>
    </>
  )
}

const StepperForm = ({ authUser }) => {
  // USE THE STORED TOKEN SO WE DONT REQUEST TOO MUCH
  let auth = null
  const getAuthToken = async () => {
    const db = getFirestore(getApp())
    const snapshot = await getDoc(doc(db, `/user/${authUser.id}`))
    auth = snapshot.get('gitToken') ?? null
  }

  useEffect(() => getAuthToken(), [])

  // FORM VALIDATION STUFF
  const [url, setUrl] = useState('')
  const [tag, setTag] = useState('')
  const [options, setOptions] = useState([])
  const [needsPath, setNeedsPath] = useState(false)
  const [path, setPath] = useState('')
  const [validPath, setValidPath] = useState(false)

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

        const regExp =
          /^(?:http[s]?:\/\/)?((?:[a-zA-Z0-9][-a-zA-Z0-9]{0,61}[a-zA-Z0-9]?\.)?[a-zA-Z0-9]{1,2}(?:[-a-zA-Z0-9]{0,252}[a-zA-Z0-9])?)\.[a-zA-Z]{2,63}(?:\/|^).*/im
        const results = regExp.exec(url)
        if (results[1] === null) return

        const { domain, namespace, repo, host } = await IdentifyRepoHost(
          results[1],
          url,
          auth
        )

        let tags = await host.getTags({ domain, namespace, repo, auth })
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
          auth,
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
    [checkRepository, path, needsPath, tag, url]
  )

  // STEPPER
  const [activeStep, setActiveStep] = useState(authUser.id === null ? 0 : 1)

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  const handleReset = () => {
    setActiveStep(0)
  }

  const steps = [
    {
      label: 'Sign in to your Repo host',
      content: (
        <div className={'min-w-fit flex flex-wrap'}>
          <button
            key={0}
            onClick={signInWithGitHub}
            className='max-w-sm text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 inline-flex items-center justify-center dark:focus:ring-gray-500 dark:hover:bg-[#414a55] mr-2 mb-2'>
            <div className={'mr-2 -ml-1 w-4 h-4'}>
              <Image src={githubMark} alt={'Github Mark'} />
            </div>
            Sign in with GitHub
          </button>
          <button
            key={1}
            onClick={signInWithGitLab}
            className='max-w-sm text-white bg-[#c6592a] hover:bg-[#ec6a32]/90 focus:ring-4 focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 inline-flex items-center justify-center dark:focus:ring-gray-500 dark:hover:bg-[#ec6a32] mr-2 mb-2'>
            <div className={'mr-2 -ml-1 w-4 h-4'}>
              <Image src={gitlabIcon} alt={'GitLab Icon'} />
            </div>
            Sign in with GitLab
          </button>
          <button
            key={2}
            onClick={signInWithBitbucket}
            className='max-w-sm text-white bg-[#0747a6] hover:bg-[#0a67f2]/90 focus:ring-4 focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 inline-flex items-center justify-center dark:focus:ring-gray-500 dark:hover:bg-[#0a67f2] mr-2 mb-2'>
            <div className={'mr-2 -ml-1 w-4 h-4'}>
              <Image src={bitbucketMark} alt={'Bitbucket Mark'} />
            </div>
            Sign in with Bitbucket
          </button>
        </div>
      ),
    },
    {
      label: 'Choose a repository',
      content: (
        <fieldset
          form={'publishForm'}
          className={'w-full max-w-lg flex flex-col'}>
          <label
            className='block text-zinc-400 font-bold mb-1 pr-4'
            htmlFor='inline-full-name'>
            Repository URL
          </label>
          <input
            form={'publishForm'}
            className='bg-zinc-100 appearance-none mb-6 border-2 border-zinc-200 rounded w-full py-2 px-4 text-zinc-700 leading-tight focus:outline-none focus:bg-white focus:border-slate-500'
            id='inline-full-name'
            name={'url'}
            type={'url'}
            value={url}
            onChange={e => setUrl(e.target.value)}
            placeholder={'https://github.com/pmmp/PocketMine-MP.git'}
            required={true}
            autoFocus={true}
          />
        </fieldset>
      ),
    },
    {
      label: `Choose a Release ${needsPath ? 'and Path' : ''}`,
      content: (
        <fieldset
          form={'publishForm'}
          className={'w-full max-w-lg flex flex-col'}>
          <label
            className='block text-zinc-400 font-bold mb-1 pr-4'
            htmlFor='inline-password'>
            Tag / Release
          </label>
          <select
            form={'publishForm'}
            className='bg-zinc-100 appearance-none mb-6 border-2 border-zinc-200 rounded w-full py-2 px-4 text-zinc-700 leading-tight focus:outline-none focus:bg-white focus:border-slate-500'
            id='inline-password'
            name={'commit'}
            defaultValue={tag}
            onChange={async e => setTag(e.target.value)}
            required={true}>
            {options}
          </select>
          <div className={needsPath ? 'mb-6' : 'hidden'}>
            <label
              className='block text-zinc-400 font-bold mb-1 pr-4'
              htmlFor='inline-full-name'>
              Path / To / Plugin
            </label>
            <input
              form={'publishForm'}
              className='bg-zinc-100 appearance-none border-2 border-zinc-200 rounded w-full py-2 px-4 text-zinc-700 leading-tight focus:outline-none focus:bg-white focus:border-slate-500'
              id='inline-full-name'
              name={'path'}
              type={'text'}
              placeholder={'Path/To/Plugin'}
              value={path}
              onChange={e => setPath(e.target.value)}
              required={false}
            />
          </div>
        </fieldset>
      ),
    },
    {
      label: `Choose your imports`,
      content: (
        <fieldset
          form={'publishForm'}
          className='w-full max-w-lg flex flex-col'>
          <legend className='sr-only'>Optional Imports</legend>
          <div className='flex items-center mb-4'>
            <input
              form={'publishForm'}
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
              form={'publishForm'}
              id='checkbox-2'
              aria-describedby='checkbox-2'
              type='checkbox'
              name={'enableReadme'}
              defaultChecked={true}
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
              form={'publishForm'}
              id='checkbox-3'
              aria-describedby='checkbox-3'
              type='checkbox'
              name={'enableChangelog'}
              defaultChecked={true}
              className='w-4 h-4 text-green-600 bg-white dark:bg-gray-900 rounded border-gray-300 focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
            />
            <label
              htmlFor='checkbox-3'
              className='ml-3 text-sm font-medium text-gray-900 dark:text-gray-300'>
              Import CHANGELOG.md
            </label>
          </div>
        </fieldset>
      ),
    },
  ]

  async function signInWithGitHub() {
    const auth = getAuth()
    const prevUser = auth.currentUser
    try {
      await unlink(prevUser, 'github.com') // TODO: remove after testing
    } catch (e) {
      // NOOP
    }
    const provider = new GithubAuthProvider()
    ;['user:email', 'public_repo', 'workflow'].forEach(scope =>
      provider.addScope(scope)
    )
    let result
    if (prevUser) result = await linkWithPopup(prevUser, provider)
    else result = await signInWithPopup(getAuth(), provider)

    // This gives you a GitHub Access Token. You can use it to access the GitHub API.
    const credential = GithubAuthProvider.credentialFromResult(result)
    const token = credential.accessToken

    const db = getFirestore(getApp())
    const docRef = doc(db, `users/${result.user.uid}`)
    try {
      await updateDoc(docRef, {
        accessLevel: 1,
        followers: [],
        plugins: [],
        gitToken: token,
      })
    } catch (e) {
      await setDoc(docRef, {
        accessLevel: 1,
        displayName: result.user.displayName,
        photoURL: result.user.photoURL,
        followers: [],
        plugins: [],
        gitToken: token,
      })
    }
    handleNext()
  }

  async function signInWithGitLab() {
    const auth = getAuth()
    const prevUser = auth.currentUser
    const provider = new OAuthProvider('gitlab.com')
    ;['user:email', 'public_repo', 'workflow'].forEach(scope =>
      provider.addScope(scope)
    )
    let result = null
    if (prevUser) result = await linkWithPopup(prevUser, provider)
    else result = await signInWithPopup(getAuth(), provider)

    // This gives you a GitHub Access Token. You can use it to access the GitHub API.
    const credential = GithubAuthProvider.credentialFromResult(result)
    const token = credential.accessToken

    const db = getFirestore(getApp())
    const snapshot = await getDoc(doc(db, `users/${result.user.uid}`))
    if (snapshot.data() === undefined) {
      setDoc(doc(db, `users/${result.user.uid}`), {
        accessLevel: 1,
        displayName: result.user.displayName,
        photoURL: result.user.photoURL,
        followers: [],
        plugins: [],
        token,
      })
    }
    handleNext()
  }

  async function signInWithBitbucket() {
    const auth = getAuth()
    const prevUser = auth.currentUser
    const provider = new OAuthProvider('bitbucket.org')
    ;['user:email', 'public_repo', 'workflow'].forEach(scope =>
      provider.addScope(scope)
    )
    let result = null
    if (prevUser) result = await linkWithPopup(prevUser, provider)
    else result = await signInWithPopup(getAuth(), provider)

    // This gives you a GitHub Access Token. You can use it to access the GitHub API.
    const credential = GithubAuthProvider.credentialFromResult(result)
    const token = credential.accessToken

    const db = getFirestore(getApp())
    const snapshot = await getDoc(doc(db, `users/${result.user.uid}`))
    if (snapshot.data() === undefined) {
      setDoc(doc(db, `users/${result.user.uid}`), {
        accessLevel: 1,
        displayName: result.user.displayName,
        photoURL: result.user.photoURL,
        followers: [],
        plugins: [],
        token,
      })
    }
    handleNext()
  }

  const onSubmit = async e => {
    e.preventDefault()

    const form = new FormData(e.target)
    const formData = {
      ...Object.fromEntries(form.entries()),
      url,
      commit: tag,
      path,
    }
    // TODO: validate formData.path

    const regExp =
      /^(?:http[s]?:\/\/)?((?:[a-zA-Z0-9][-a-zA-Z0-9]{0,61}[a-zA-Z0-9]?\.)?[a-zA-Z0-9]{1,2}(?:[-a-zA-Z0-9]{0,252}[a-zA-Z0-9])?)\.[a-zA-Z]{2,63}(?:\/|^).*/im
    const results = regExp.exec(formData.url)
    if (results[1] === null) return

    const { domain, namespace, repo, commit, host } = {
      ...(await IdentifyRepoHost(results[1], url, auth)),
      commit: formData.commit,
    }

    const manifestUrl = await host.getRepoFileUrl({
      domain,
      namespace,
      repo,
      commit,
      auth,
      path,
      file: 'plugin.yml',
    })
    if (formData.enableDescription) {
      const descriptionUrl = await host.getRepoFileUrl({
        domain,
        namespace,
        repo,
        commit,
        auth,
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
        auth,
        path: path,
        file: 'changelog.md',
      })
    } else {
      const changelogUrl = null
    }

    // TODO: display draft with imported info
  }

  return (
    <form
      id={'publishForm'}
      onSubmit={onSubmit}
      className={'bg-zinc-900 w-full max-w-4xl rounded-2xl px-3 py-1'}>
      <Stepper activeStep={activeStep} orientation='vertical'>
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              optional={
                index === steps.length - 1 ? (
                  <p className={'font-thin text-sm'}>Last step</p>
                ) : null
              }>
              <h3 className={'font-semibold text-lg'}>{step.label}</h3>
            </StepLabel>
            <StepContent>
              <div className={''}>{step.content}</div>
              <div className={'mb-1'}>
                <Button
                  className={'bg-blue-700 dark:bg-zinc-700'}
                  variant='contained'
                  disabled={index === steps.length - 1 && !validPath}
                  onClick={() => {
                    if (index !== steps.length - 1) handleNext()
                  }}
                  type={index === steps.length - 1 ? 'submit' : 'button'}
                  sx={{ mt: 1, mr: 1 }}>
                  {index === steps.length - 1 ? 'Preview' : 'Continue'}
                </Button>
                <Button
                  className={''}
                  disabled={index === 0}
                  onClick={handleBack}
                  sx={{ mt: 1, mr: 1 }}>
                  Back
                </Button>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </form>
  )
}

export default withAuthUser()(Publish)

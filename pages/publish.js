import { useAuthUser, withAuthUser } from 'next-firebase-auth'
import Metatags from '../components/Metatags'
import { useEffect, useState } from 'react'
import semantic from 'semver'
import IdentifyRepoHost from '../lib/repo_hosts/identifyRepoHost'
import Image from 'next/image'
import githubMark from '../public/icons/GitHub-Mark.svg'
import gitlabIcon from '../public/icons/GitLab-Icon.svg'
import bitbucketMark from '../public/icons/Bitbucket-Mark.svg'
import { Button, Step, StepContent, StepLabel, Stepper } from '@mui/material'
import {
  getAuth,
  GithubAuthProvider,
  linkWithPopup,
  OAuthProvider,
  signInWithPopup,
} from 'firebase/auth'
import {
  collection,
  doc,
  getFirestore,
  setDoc,
  updateDoc,
} from 'firebase/firestore'
import { getApp } from 'firebase/app'

const Publish = () => {
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
    const tokensRef = await collection(db, 'tokens')
      .where('uid', '==', authUser.uid)
      .limit(1)
      .get()
    if (tokensRef.docs.length > 0) auth = tokensRef.docs[0].id
  }

  // FORM VALIDATION STUFF
  const [url, setUrl] = useState('')
  const [tag, setTag] = useState('')
  const [options, setOptions] = useState([])
  const [needsPath, setNeedsPath] = useState(false)
  const [path, setPath] = useState('')
  const [manifestUrl, setManifestUrl] = useState('')
  const [enableDescription, setEnableDescription] = useState(true)
  const [descriptionUrl, setDescriptionUrl] = useState('')
  const [enableChangelog, setEnableChangelog] = useState(true)
  const [changelogUrl, setChangelogUrl] = useState('')

  // STEPPER
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    getAuthToken()
    if (
      authUser.firebaseUser?.providerData.some(({ providerId }) => {
        return providerId === 'github.com'
      })
    )
      handleNext()
  }, [authUser])

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  const regExp =
    /^(?:http[s]?:\/\/)?((?:[a-zA-Z0-9][-a-zA-Z0-9]{0,61}[a-zA-Z0-9]?\.)?[a-zA-Z0-9]{1,2}(?:[-a-zA-Z0-9]{0,252}[a-zA-Z0-9])?)\.[a-zA-Z]{2,63}(?:\/|^).*/im

  const steps = [
    {
      label: 'Sign in to your Repo host',
      content: (
        <div className={'min-w-fit flex flex-wrap'}>
          <button
            onClick={signInWithGitHub}
            className='max-w-sm text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 inline-flex items-center justify-center dark:focus:ring-zinc-500 dark:hover:bg-[#414a55] mr-2 mb-2'>
            <div className={'mr-2 -ml-1 w-4 h-4'}>
              <Image src={githubMark} alt={'Github Mark'} />
            </div>
            Sign in with GitHub
          </button>
          <button
            onClick={signInWithGitLab}
            disabled={true}
            className='max-w-sm text-white bg-[#c6592a] hover:bg-[#ec6a32]/90 focus:ring-4 focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 inline-flex items-center justify-center dark:focus:ring-zinc-500 dark:hover:bg-[#ec6a32] mr-2 mb-2'>
            <div className={'mr-2 -ml-1 w-4 h-4'}>
              <Image src={gitlabIcon} alt={'GitLab Icon'} />
            </div>
            Sign in with GitLab
          </button>
          <button
            onClick={signInWithBitbucket}
            disabled={true}
            className='max-w-sm text-white bg-[#0747a6] hover:bg-[#0a67f2]/90 focus:ring-4 focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 inline-flex items-center justify-center dark:focus:ring-zinc-500 dark:hover:bg-[#0a67f2] mr-2 mb-2'>
            <div className={'mr-2 -ml-1 w-4 h-4'}>
              <Image src={bitbucketMark} alt={'Bitbucket Mark'} />
            </div>
            Sign in with Bitbucket
          </button>
        </div>
      ),
      validate: () => true,
      onContinue: null,
    },
    {
      label: 'Choose a repository',
      content: (
        <fieldset className={'w-full max-w-lg flex flex-col'}>
          <label
            className='block text-zinc-400 font-bold mb-1 pr-4'
            htmlFor='inline-full-name'>
            Repository URL
          </label>
          <input
            className='block p-2 pl-4 w-full text-zinc-900 bg-zinc-50 rounded-lg border border-zinc-200 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-zinc-700 dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
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
      validate: () =>
        url.length >= 10 ||
        /^(?:http[s]?:\/\/)?((?:[a-zA-Z0-9][-a-zA-Z0-9]{0,61}[a-zA-Z0-9]?\.)?[a-zA-Z0-9]{1,2}(?:[-a-zA-Z0-9]{0,252}[a-zA-Z0-9])?)\.[a-zA-Z]{2,63}(?:\/|^).*/im.test(
          url
        ),
      onContinue: async () => {
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
      },
    },
    {
      label: `Choose a Release ${needsPath ? 'and Path' : ''}`,
      content: (
        <fieldset className={'max-w-lg flex flex-col'}>
          <label
            className='block text-zinc-400 font-bold mb-1 pr-4'
            htmlFor='inline-password'>
            Tag / Release
          </label>
          <select
            className='block p-2 pl-4 text-zinc-900 bg-zinc-50 rounded-lg border border-zinc-200 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-zinc-700 dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            id='inline-password'
            defaultValue={tag}
            onChange={async e => setTag(e.target.value)}
            required={true}
            autoFocus={true}>
            {options}
          </select>
          <div className={needsPath ? 'mb-6' : 'hidden'}>
            <label
              className='block text-zinc-400 font-bold mb-1 pr-4'
              htmlFor='inline-full-name'>
              Path / To / Plugin
            </label>
            <input
              className='block p-2 pl-4 w-full text-zinc-900 bg-zinc-50 rounded-lg border border-zinc-200 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-zinc-700 dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              id='inline-full-name'
              type={'text'}
              placeholder={'Path/To/Plugin'}
              value={path}
              onChange={e => setPath(e.target.value)}
              required={false}
            />
          </div>
        </fieldset>
      ),
      validate: () => tag !== '' && (!needsPath || manifestUrl !== ''),
      onContinue: async () => {
        const results = regExp.exec(url)
        if (results[1] === null) return

        const { domain, namespace, repo, host } = await IdentifyRepoHost(
          results[1],
          url,
          auth
        )

        const manifestUrl = await host.getRepoFileUrl({
          domain,
          namespace,
          repo,
          tag,
          path,
          file: 'plugin.yml',
          auth,
        })
        if (path === '' && manifestUrl === null) {
          setNeedsPath(true)
          return
        } else if (manifestUrl === null) {
          setManifestUrl('')
          return
        }
        setManifestUrl(manifestUrl)
        setDescriptionUrl(
          (await host.getRepoFileUrl({
            domain,
            namespace,
            repo,
            tag,
            path,
            file: 'readme.md',
            auth,
          })) ?? ''
        )
        setEnableDescription(descriptionUrl !== '')
        setChangelogUrl(
          (await host.getRepoFileUrl({
            domain,
            namespace,
            repo,
            tag,
            path,
            file: 'changelog.md',
            auth,
          })) ?? ''
        )
        setEnableChangelog(changelogUrl !== '')
      },
    },
    {
      label: `Choose your imports`,
      content: (
        <fieldset className='w-full max-w-lg flex flex-col'>
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
              className='w-4 h-4 text-blue-600 bg-white dark:bg-zinc-900 rounded border-zinc-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-zinc-800 focus:ring-2 dark:bg-zinc-700 dark:border-zinc-600'
            />
            <label
              htmlFor='checkbox-1'
              className='ml-3 text-sm font-medium text-zinc-900 dark:text-zinc-300'>
              Import plugin.yml
            </label>
          </div>

          <div className='flex items-center mb-4'>
            <input
              id='checkbox-2'
              aria-describedby='checkbox-2'
              type='checkbox'
              name={'enableReadme'}
              checked={enableDescription}
              readOnly
              onClick={() => setEnableDescription(!enableDescription)}
              className='w-4 h-4 text-blue-600 bg-white dark:bg-zinc-900 rounded border-zinc-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-zinc-800 focus:ring-2 dark:bg-zinc-700 dark:border-zinc-600'
            />
            <label
              htmlFor='checkbox-2'
              className='ml-3 text-sm font-medium text-zinc-900 dark:text-zinc-300'>
              Import README.md
            </label>
          </div>

          <div className='flex items-center mb-4'>
            <input
              id='checkbox-3'
              aria-describedby='checkbox-3'
              type='checkbox'
              name={'enableChangelog'}
              checked={enableChangelog}
              readOnly
              onClick={() => setEnableChangelog(!enableChangelog)}
              className='w-4 h-4 text-blue-600 bg-white dark:bg-zinc-900 rounded border-zinc-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-zinc-800 focus:ring-2 dark:bg-zinc-700 dark:border-zinc-600'
            />
            <label
              htmlFor='checkbox-3'
              className='ml-3 text-sm font-medium text-zinc-900 dark:text-zinc-300'>
              Import CHANGELOG.md
            </label>
          </div>
        </fieldset>
      ),
      validate: () =>
        manifestUrl !== '' &&
        (!enableDescription || descriptionUrl !== '') &&
        (!enableChangelog || changelogUrl !== ''),
      onContinue: async () => {
        // TODO: display preview
      },
    },
  ]

  async function signInWithGitHub() {
    const auth = getAuth()
    const prevUser = auth.currentUser
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
    ;['read_user', 'read_repository'].forEach(scope => provider.addScope(scope))
    let result
    if (prevUser) result = await linkWithPopup(prevUser, provider)
    else result = await signInWithPopup(getAuth(), provider)

    console.log(result)
    return

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

  async function signInWithBitbucket() {
    const auth = getAuth()
    const prevUser = auth.currentUser
    const provider = new OAuthProvider('bitbucket.org')
    ;['account', 'repository'].forEach(scope => provider.addScope(scope))
    let result
    if (prevUser) result = await linkWithPopup(prevUser, provider)
    else result = await signInWithPopup(getAuth(), provider)

    console.log(result)
    return

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

  return (
    <form
      className={
        'w-full max-w-4xl my-4 px-3 py-1 text-base bg-white rounded-2xl drop-shadow-lg dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700'
      }>
      <Stepper activeStep={activeStep} orientation='vertical'>
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              optional={
                index === steps.length - 1 ? (
                  <p className={'font-thin text-sm dark:text-white'}>
                    Last step
                  </p>
                ) : null
              }>
              <h3 className={'font-semibold text-lg dark:text-white'}>
                {step.label}
              </h3>
            </StepLabel>
            <StepContent>
              <div className={''}>{step.content}</div>
              <div className={'mb-1'}>
                <Button
                  className={'bg-blue-700 dark:bg-zinc-700'}
                  variant='contained'
                  disabled={!step.validate()}
                  onClick={() => {
                    if (step.onContinue !== null) step.onContinue()
                    if (index !== steps.length - 1) handleNext()
                  }}
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

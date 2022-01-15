import { withAuthUser, withAuthUserTokenSSR } from 'next-firebase-auth'
import Metatags from '../../../components/Metatags'
import getAbsoluteURL from '../../../lib/getAbsoluteURL'
import toast from 'react-hot-toast'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import { msToDate } from '../../../lib/timeConverter'
import Image from 'next/image'
import missingImage from '../../../public/icons/missing.png'

const PluginData = ({ data, description, changelog = null }) => {
  data = data ?? { id: null, tagline: '', imageUrl: null }
  return (
    <>
      <Metatags
        title={data.id.split('_v')[0]}
        tagline={data.tagline}
        image={data.imageUrl}
      />
      <div>
        <div>
          <h1>{data.id.split('_v')[0]}</h1>
          <p>{data.author}</p>
          <p>{msToDate(data.lastUpdated)}</p>
          <div>
            <button>Like</button>
            <button>Dislike</button>
            <div>Ratio bar</div>
            <button>Share</button>
            <button>Download</button>
            <button>Report</button>
          </div>
        </div>
        <div>separator</div>
        <div>
          <div>
            <Image src={missingImage} alt={'Author Image'} />
            <h6>Author</h6>
            <p>Followers</p>
            <button>Follow</button>
          </div>

          <article className='prose prose-zinc lg:prose-xl'>
            <MDXRemote {...description} />
          </article>
        </div>
        <div>separator</div>
        {changelog && (
          <>
            <article>
              <MDXRemote {...changelog} />
            </article>
            <div>separator</div>
          </>
        )}
        <div>
          <div>
            <h6>Comments</h6>
            <button>Sort By</button>
          </div>
          <div>
            <Image src={missingImage} alt='There was an error' />
            <textarea />
          </div>
        </div>
      </div>
    </>
  )
}

export const getServerSideProps = withAuthUserTokenSSR()(
    async ({ AuthUser, req, query }) => {
        // Optionally, get other props.
        // You can return anything you'd normally return from
        // `getServerSideProps`, including redirects.
        // https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering
        const token = await AuthUser.getIdToken()
        const endpoint = getAbsoluteURL(
            '/api/pluginData?name=' +
            encodeURI(query.plugin) +
            '&author=' +
            encodeURI(query.username),
            req
        )
        const response = await fetch(endpoint, {
            method: 'GET',
            headers: {
                Authorization: token || 'unauthenticated',
            },
        })
        const data = await response.json()
        if (!response.ok) {
            toast.error(JSON.stringify(data))
            return {
                notFound: true,
            }
    }
    return {
      props: {
          data,
          description: await serialize(data.description),
          changelog: data.changel,og ? await serialize(data.changelog) : null,
      },
    }
  }
)

export default withAuthUser()(PluginData)

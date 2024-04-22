import { request } from 'graphql-request'

import { queryClient } from '@/providers/client'
import { GET_CMS_PAGE } from '@/graphql/getCmsPage'
import type { CmsPageQuery } from '@/interfaces'
import type { NextStore } from '@/store'

import HomePage from '@/components/HomePage'

const fetchCmsPageQuery = async (identifier: string) =>
  await request<
    CmsPageQuery,
    {
      identifier: string
    }
  >(process.env.NEXT_PUBLIC_GRAPHQL_URL, GET_CMS_PAGE, {
    identifier
  })

const Home = ({ cmsPage }: CmsPageQuery) => {
  return (
    <main className={`flex min-h-screen flex-col items-center justify-between p-24`}>
      <HomePage {...cmsPage} />
    </main>
  )
}

Home.getInitialProps = async ({ ...ctx }: any) => {
  const store: NextStore = ctx.zustandStore.getState()
  const storeConfig = store.app.storeConfig
  const identifier: string = storeConfig?.cms_home ?? ''

  const result = await queryClient.fetchQuery({
    queryKey: ['cmsPage', identifier],
    queryFn: () => fetchCmsPageQuery(identifier)
  })

  return {
    cmsPage: result?.cmsPage ?? {}
  }
}

export default Home

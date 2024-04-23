import type { NextPageContext } from 'next/types'
import type { StoreApi } from 'zustand'

import { queryClient } from '@/providers/client'
import { GET_CMS_PAGE } from '@/graphql/getCmsPage'
import { createClient } from '@/api'
import type { CmsPageQuery } from '@/interfaces'
import type { NextStore } from '@/store'

import HomePage from '@/components/HomePage'

type PageContext = NextPageContext & {
  zustandStore: StoreApi<NextStore>
}

const fetchCmsPageQuery = async (identifier: string, locale: string) => {
  const client = createClient(locale)
  return await client.request<
    CmsPageQuery,
    {
      identifier: string
    }
  >(GET_CMS_PAGE, {
    identifier
  })
}

const Home = ({ cmsPage }: CmsPageQuery) => {
  return (
    <main className={`flex min-h-screen flex-col items-center justify-between p-24`}>
      <HomePage {...cmsPage} />
    </main>
  )
}

Home.getInitialProps = async ({ zustandStore, locale, defaultLocale }: PageContext) => {
  const store: NextStore = zustandStore.getState()
  const storeConfig = store.app.storeConfig
  const identifier: string = storeConfig?.cms_home ?? ''
  const i18n: string = locale === defaultLocale ? '' : `${locale}/`

  const result = await queryClient.fetchQuery({
    queryKey: ['cmsPage', identifier],
    queryFn: () => fetchCmsPageQuery(identifier, i18n)
  })

  return {
    cmsPage: result?.cmsPage ?? {}
  }
}

export default Home

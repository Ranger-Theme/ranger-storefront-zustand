import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'

import { createClient } from '@/api'
import { GET_CMS_BLOCK } from '@/graphql/getCmsBlock'
import type { CmsBlocksQuery } from '@/interfaces'

const useCmsBlock = async (identifiers: string[], locale: string) => {
  const client = createClient(locale)
  await client.request<
    CmsBlocksQuery,
    {
      identifiers: string[]
    }
  >(GET_CMS_BLOCK, {
    identifiers
  })
}

const CmsBlock = () => {
  const router = useRouter()
  const identifier: string[] = ['test-block']
  const locale: string = router.locale === router.defaultLocale ? '' : `${router.locale}/`

  const cmsBlockQuery = useQuery({
    queryKey: ['cmsBlock', identifier],
    enabled: false,
    queryFn: () => useCmsBlock(identifier, locale)
  })

  useEffect(() => {
    cmsBlockQuery.refetch()
  }, [])

  return (
    <div>
      <div>CmsBlock</div>
    </div>
  )
}

export default CmsBlock

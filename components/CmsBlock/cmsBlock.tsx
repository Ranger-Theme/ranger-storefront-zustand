import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'

import { createClient } from '@/api'
import { GET_CMS_BLOCK } from '@/graphql/getCmsBlock'
import type { CmsBlocksQuery } from '@/interfaces'

const useCmsBlock = async (identifiers: string[]) => {
  const client = createClient()
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
  const identifier: string[] = ['test-block']

  const cmsBlockQuery = useQuery({
    queryKey: ['cmsBlock', identifier],
    enabled: false,
    queryFn: () => useCmsBlock(identifier)
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

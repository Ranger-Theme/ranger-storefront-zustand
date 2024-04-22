import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'

import { createClient } from '@/api'
import { GET_CMS_BLOCK } from '@/graphql/getCmsBlock'
import type { CmsBlocksQuery } from '@/interfaces'

const useCmsBlock = async (identifiers: string[]) => {
  try {
    const client = createClient()

    await client.request<
      CmsBlocksQuery,
      {
        identifiers: string[]
      }
    >(GET_CMS_BLOCK, {
      identifiers
    })
  } catch (error) {
    console.info(error)
    return {}
  }
}

const CmsBlock = () => {
  const cmsBlockQuery = useQuery({
    queryKey: ['cmsBlock'],
    enabled: false,
    queryFn: () => useCmsBlock(['test-block'])
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

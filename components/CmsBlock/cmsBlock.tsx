import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { request } from 'graphql-request'

import { GET_CMS_BLOCK } from '@/graphql/getCmsBlock'
import type { CmsBlocksQuery } from '@/interfaces'

const useCmsBlock = async (identifiers: string[]) => {
  try {
    await request<
      CmsBlocksQuery,
      {
        identifiers: string[]
      }
    >('http://127.0.0.1:3000/api/graphql', GET_CMS_BLOCK, {
      identifiers
    })
  } catch (error) {
    console.info(error)
  }
}

const CmsBlock = () => {
  const cmsBlockQuery = useQuery({
    queryKey: ['cmsBlock'],
    queryFn: () => useCmsBlock(['test-block']),
    enabled: false
  })
  console.info(cmsBlockQuery.isLoading)

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

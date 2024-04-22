export interface CmsBlock {
  content: string
  identifier: string
  title: string
}

export interface CmsBlocksQuery {
  cmsBlocks: CmsBlock
}

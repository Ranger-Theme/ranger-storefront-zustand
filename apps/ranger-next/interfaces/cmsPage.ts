export interface CmsPage {
  content: string
  identifier: string
  meta_description: string
  meta_keywords: string
  meta_title: string
  page_layout: string
  title: string
  url_key: string
}

export interface CmsPageQuery {
  cmsPage: CmsPage
}

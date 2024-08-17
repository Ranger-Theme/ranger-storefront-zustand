import { gql } from 'graphql-request'

export const GET_CMS_PAGE = gql`
  query getCmsPage($id: Int, $identifier: String) {
    cmsPage(id: $id, identifier: $identifier) {
      content
      identifier
      meta_description
      meta_keywords
      meta_title
      page_layout
      title
      url_key
    }
  }
`

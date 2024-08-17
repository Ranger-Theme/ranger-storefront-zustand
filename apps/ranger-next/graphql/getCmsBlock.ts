import { gql } from 'graphql-request'

export const GET_CMS_BLOCK = gql`
  query getCmsBlock($identifiers: [String]!) {
    cmsBlocks(identifiers: $identifiers) {
      items {
        content
        identifier
        title
      }
    }
  }
`

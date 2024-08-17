import { gql } from 'graphql-request'

export const POST_NEWSLETTER = gql`
  mutation postNewsletter($email: String!) {
    subscribe: subscribeEmailToNewsletter(email: $email) {
      status
    }
  }
`

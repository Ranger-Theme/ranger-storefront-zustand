import { GraphQLClient } from 'graphql-request'

export const createClient = () => {
  const url: string = 'http://127.0.0.1:3000/api/graphql'
  const authorization: any = null

  const client = new GraphQLClient(url, {
    headers: {
      authorization,
      'x-another-header': 'header_value'
    }
  })

  return client
}

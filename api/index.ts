import { GraphQLClient } from 'graphql-request'

export const createClient = (locale?: string) => {
  const isBrowser: boolean = typeof window !== 'undefined'
  const url: string = isBrowser
    ? `http://127.0.0.1:3000/${locale}api/graphql`
    : 'http://127.0.0.1:3000/api/graphql'
  const authorization: any = null

  const client = new GraphQLClient(url, {
    headers: {
      authorization,
      'x-another-header': 'header_value'
    }
  })

  return client
}

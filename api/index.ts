import { GraphQLClient } from 'graphql-request'

export const createClient = (locale?: string) => {
  const isBrowser: boolean = typeof window !== 'undefined'
  const prefix: string = process.env.NEXT_PUBLIC_LOCAL_URL as string
  const url: string = isBrowser
    ? `${window.location.origin}/${locale}api/graphql`
    : `${prefix}/${locale}/api/graphql`
  const authorization: any = null

  const client = new GraphQLClient(url, {
    headers: {
      authorization,
      'x-another-header': 'header_value'
    }
  })

  return client
}

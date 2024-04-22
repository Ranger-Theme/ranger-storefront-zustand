import { createProxyMiddleware } from 'http-proxy-middleware'
import type { NextApiRequest, NextApiResponse } from 'next/types'

const TIMEOUT: number = 60 * 1000
const apiProxy: any = createProxyMiddleware({
  changeOrigin: true,
  secure: true,
  pathRewrite: {
    '^/api/graphql': '/graphql'
  },
  proxyTimeout: TIMEOUT,
  timeout: TIMEOUT,
  router: async (req: any) => {
    return process.env.NEXT_PUBLIC_GRAPHQL_URL
  }
})

const handler = (request: NextApiRequest, response: NextApiResponse) => {
  // if (request.headers['x-platform']) {
  apiProxy(request, response, (result: any) => {
    if (result instanceof Error) {
      throw result
    }

    throw new Error(`Request '${request.url}' is not proxied! We should never reach here!`)
  })
  // } else {
  //   response.redirect(307, '/')
  // }
}

export const config = {
  api: {
    externalResolver: true,
    bodyParser: false
  }
}

export default handler

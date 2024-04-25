import { NextResponse, userAgent } from 'next/server'
import type { NextRequest, NextMiddleware } from 'next/server'

export const middleware: NextMiddleware = (request: NextRequest) => {
  const { headers, nextUrl } = request
  const { isBot, device, ua } = userAgent(request)
  const { type, model } = device
  const isGoogleBolt: boolean = ua.indexOf('Googlebot') > -1

  const requestHeaders = new Headers(headers)
  let deviceType: string = device.type === 'mobile' ? 'H5' : 'PC'

  switch (type) {
    case 'mobile':
      deviceType = 'H5'
      break
    case 'tablet':
      deviceType = model === 'iPad' ? 'iPad' : 'PC'
      break
    default:
      deviceType = device.type === 'mobile' ? 'H5' : 'PC'
      break
  }

  if (isGoogleBolt) deviceType = 'PC'
  requestHeaders.set('x-is-bot', isBot ? 'BOT' : '')
  requestHeaders.set('x-device-type', deviceType)

  const response = NextResponse.next({
    request: {
      headers: requestHeaders
    }
  })

  let ip: string = request.ip || (headers.get('x-real-ip') as string)
  const forwardedFor: string = headers.get('x-forwarded-for') as string

  if (!ip && forwardedFor) {
    ip = forwardedFor.split(',').at(0) ?? 'Unknown'
  }

  if (ip) {
    const result: string[] = ip.split('.')
    const key: number = Number(result[result.length - 1])
    const version: string = key % 2 === 0 ? 'always' : 'never'
    const cacheIp: boolean = request.cookies.has('x-real-ip')

    if (!cacheIp) {
      response.cookies.set('x-real-ip', ip, {
        maxAge: 60 * 60 * 24 * 30,
        path: '/',
        httpOnly: true,
        sameSite: 'lax'
      })
      response.cookies.set('x-canary-version', version, {
        maxAge: 60 * 60 * 24 * 30,
        path: '/',
        httpOnly: true,
        sameSite: 'lax'
      })
    }
  }

  return response
}

export const config = {
  matcher: '/((?!api).*)'
}

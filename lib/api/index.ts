import { getCookie } from 'lib/util/cookie'
import { GetServerSidePropsContext } from 'next'
import { ACCESS_TOKEN } from 'providers/auth'
import { ParsedUrlQuery } from 'querystring'

export function getApiUrl(url: string): string {
  return `${process.env.API_URL}${url}`
}

type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

interface Protocol {
  url: string
  payload?: any
  options?: RequestInit
  method?: Method
}

async function fetcher({
  url,
  payload,
  options,
  method = 'GET',
  token,
}: Protocol & {
  token?: string
}) {
  const headers: any = options?.headers || {}

  const init: RequestInit = {}

  if (method !== 'GET') {
    init.method = method
  }

  if (payload) {
    init.body = JSON.stringify(payload)
    headers['Content-Type'] = 'application/json'
  } else if (options?.body) {
    init.body = options?.body
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  if (Object.keys(headers).length !== 0) {
    init.headers = headers
  }

  const requestInit = {
    ...options,
    ...init,
  }

  if (Object.keys(requestInit).length === 0) {
    return fetch(getApiUrl(url))
  }

  return fetch(getApiUrl(url), requestInit)
}

export default async function communicate(props: Protocol): Promise<Response> {
  const token = getCookie(ACCESS_TOKEN)
  return fetcher({
    ...props,
    token,
  })
}

export async function communicateWithContext({
  context,
  ...props
}: Protocol & {
  context: GetServerSidePropsContext<ParsedUrlQuery>
}) {
  const token = context.req.cookies[ACCESS_TOKEN]
  return fetcher({
    ...props,
    token,
  })
}

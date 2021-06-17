import { communicateWithContext } from 'lib/api'
import { GetServerSidePropsContext } from 'next'
import { ParsedUrlQuery } from 'querystring'

export default async function getServerSideAuth(
  context: GetServerSidePropsContext<ParsedUrlQuery>,
) : Promise<{
  authenticated: boolean,
}> {
  const res = await communicateWithContext({
    url: '/auth/test',
    context,
  })
  if (!res.ok) {
    return {
      authenticated: false,
    }
  }
  return {
    authenticated: true,
  }
}

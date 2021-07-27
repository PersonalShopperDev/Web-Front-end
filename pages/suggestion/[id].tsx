import React from 'react'
import Layout from 'layouts/default'
import CompleteSuggestion, { CompleteSuggestionData } from 'templates/cody-suggestion/complete-suggestion'
import CompleteSuggestionAppBar from 'components/app-bar/complete-suggestion'
import Navigation from 'components/navigation'
import { GetServerSideProps } from 'next'
import { ACCESS_TOKEN } from 'providers/auth'
import { communicateWithContext } from 'lib/api'
import parseJwt from 'lib/util/jwt'

export default function Page({ data } : { data : CompleteSuggestionData }) {
  return (
    <Layout
      header={<CompleteSuggestionAppBar />}
      bottom={<Navigation />}
    >
      <CompleteSuggestion data={data} />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context.req.cookies[ACCESS_TOKEN]

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  const { userType } = parseJwt(token)

  if (userType === 'N') {
    return {
      redirect: {
        destination: '/onboard',
        permanent: false,
      },
    }
  }

  const { id } = context.params

  const res = await communicateWithContext({ url: `/coord?coordId=${id}`, context })

  if (res.status !== 200) {
    throw new Error()
  }

  const data = await res.json()

  return {
    props: {
      data,
    },
  }
}

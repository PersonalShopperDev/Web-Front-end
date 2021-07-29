import React from 'react'
import Layout from 'layouts/default'
import DrawerAppBar from 'components/app-bar/drawer'
import { GetServerSideProps } from 'next'
import { ACCESS_TOKEN } from 'providers/auth'
import History from 'templates/history'
import InfinityScrollProvider from 'providers/infinity-scroll'
import HistoryProvider from 'providers/history'
import parseJwt from 'lib/util/jwt'

export default function Page({ userType }: { userType: string }) {
  const title = userType === 'D' ? '결제내역' : '코디내역'
  return (
    <Layout
      header={(
        <DrawerAppBar title={title} isLogined />
      )}
    >
      <InfinityScrollProvider>
        <HistoryProvider>
          <History />
        </HistoryProvider>
      </InfinityScrollProvider>
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

  return {
    props: {
      userType,
    },
  }
}

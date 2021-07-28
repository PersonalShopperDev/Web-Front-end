import React from 'react'
import Layout from 'layouts/default'
import DrawerAppBar from 'components/app-bar/drawer'
import { GetServerSideProps } from 'next'
import { ACCESS_TOKEN } from 'providers/auth'
import History from 'templates/history'
import InfinityScrollProvider from 'providers/infinity-scroll'
import HistoryProvider from 'providers/history'
import parseJwt from 'lib/util/jwt'

export default function Page({ isLogined, userType }: { isLogined: boolean, userType: string }) {
  const title = userType === 'D' ? '결제내역' : '코디내역'
  return (
    <Layout
      header={(
        <DrawerAppBar title={title} isLogined={isLogined} />
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
  const { userType } = parseJwt(token)
  const isLogined = token !== undefined

  return {
    props: {
      isLogined,
      userType,
    },
  }
}

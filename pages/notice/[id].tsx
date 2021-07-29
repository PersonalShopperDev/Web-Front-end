import React from 'react'
import Layout from 'layouts/default'
import { GetServerSideProps } from 'next'
import { ACCESS_TOKEN } from 'providers/auth'
import DrawaerAppBar from 'components/app-bar/drawer'
import Notice from 'components/notice'
import { communicateWithContext } from 'lib/api'
import parseJwt from 'lib/util/jwt'

export interface NoticeData {
    id: number
    title: string
    content: string
    date: string
}

interface Props {
    data: NoticeData
}

export default function Page({ data }: Props) {
  const title = '공지사항'

  return (
    <Layout
      header={(
        <DrawaerAppBar title={title} isLogined />
      )}
    >
      <Notice data={data} />
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
  const res = await communicateWithContext({ url: `/notice/${id}`, context })

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

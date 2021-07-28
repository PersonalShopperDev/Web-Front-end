import React from 'react'
import Layout from 'layouts/default'
import { GetServerSideProps } from 'next'
import { ACCESS_TOKEN } from 'providers/auth'
import DrawaerAppBar from 'components/app-bar/drawer'
import Notice from 'components/notice'
import { communicateWithContext } from 'lib/api'

export interface NoticeData {
    id: number
    title: string
    content: string
    date: string
}
interface Props {
    isLogined: boolean,
    data: NoticeData
}
export default function Page({ isLogined, data }: Props) {
  const title = '공지사항'
  return (
    <Layout
      header={(
        <DrawaerAppBar title={title} isLogined={isLogined} />
        )}
    >
      <Notice data={data} />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context.req.cookies[ACCESS_TOKEN]
  const isLogined = token !== undefined

  const { id } = context.params
  const res = await communicateWithContext({ url: `/notice/${id}`, context })

  if (res.status !== 200) {
    throw new Error()
  }

  const data = await res.json()
  return {
    props: {
      isLogined,
      data,
    },
  }
}

import Layout from 'layouts/default'
import { GetServerSideProps } from 'next'
import * as fs from 'fs'
import * as path from 'path'
import Term from 'templates/term'
import { ACCESS_TOKEN } from 'providers/auth'
import TermAppBar from 'components/app-bar/term'

interface Props {
  title: string,
  data: string
}

export default function Page({ title, data } : Props) {
  return (
    <Layout
      header={(
        <TermAppBar title={title} />
      )}
    >
      <Term>
        {data}
      </Term>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context.req.cookies[ACCESS_TOKEN]

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const { pid } = context.params
  const enables = [{
    title: '서비스 이용약관',
    id: 'service',
  },
  {
    title: '개인정보처리방침',
    id: 'privacy',
  }]

  const target = enables.find((value) => value.id === pid as string)

  if (!target) {
    return {
      notFound: true,
    }
  }

  const data = fs.readFileSync(path.join(__dirname, `../../../../public/terms/${target.id}.txt`), {
    encoding: 'utf-8',
  })

  return {
    props: {
      title: target.title,
      data,
    },
  }
}

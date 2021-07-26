import Layout from 'layouts/default'
import { GetServerSideProps } from 'next'
import parseJwt from 'lib/util/jwt'
import { ACCESS_TOKEN } from 'providers/auth'
import { communicateWithContext } from 'lib/api'
import { Other, RecieveMessageProps } from 'lib/model/room'
import RoomProvider from 'providers/chat/room'
import ProgressAppBar from 'components/app-bar/progress'
import Progress from 'templates/progress'

interface Props {
  id: string
  data: {
    targetUser: Other
    chatList: RecieveMessageProps[]
  }
}

export default function Page({ id, data } : Props) {
  return (
    <Layout
      header={<ProgressAppBar />}
    >
      <RoomProvider id={id} data={data}>
        <Progress />
      </RoomProvider>
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

  const res = await communicateWithContext({
    url: `/chat/history?roomId=${id}`,
    context,
  })

  if (res.status !== 200) {
    if (res.status === 403) {
      return {
        notFound: true,
      }
    }
    throw new Error()
  }

  const data = await res.json()

  return {
    props: {
      id,
      data,
    },
  }
}

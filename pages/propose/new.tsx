import Layout from 'layouts/default'
import { GetServerSideProps } from 'next'
import parseJwt from 'lib/util/jwt'
import { ACCESS_TOKEN } from 'providers/auth'
import ProposeForm from 'templates/propose/form'
import AppBar from 'components/app-bar'
import { communicateWithContext } from 'lib/api'
import { Other, RecieveMessageProps } from 'lib/model/room'
import RoomProvider from 'providers/chat/room'

interface Props {
  id: string
  data: {
    targetUser: Other
    chatList: RecieveMessageProps[]
  }
}

export default function Page({ id, data }: Props) {
  return (
    <Layout header={<AppBar title="견적서" back />}>
      <RoomProvider id={id} data={data}>
        <ProposeForm />
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

  const { userId, userType } = parseJwt(token)

  if (userType === 'N') {
    return {
      redirect: {
        destination: '/onboard',
        permanent: false,
      },
    }
  }

  if (userType === 'D') {
    return {
      notFound: true,
    }
  }

  const { uid } = context.query

  if (!uid) {
    return {
      notFound: true,
    }
  }

  if (userId === uid) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const chatResponse = await communicateWithContext({
    url: '/chat',
    context,
    payload: {
      targetId: uid,
    },
    method: 'POST',
  })

  if (chatResponse.status !== 200) {
    throw new Error()
  }

  const { roomId } = await chatResponse.json()

  const historyResponse = await communicateWithContext({
    url: `/chat/history?roomId=${roomId}`,
    context,
  })

  if (historyResponse.status !== 200) {
    throw new Error()
  }

  const data = await historyResponse.json()

  return {
    props: {
      id: roomId,
      data,
    },
  }
}

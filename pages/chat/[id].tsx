import Layout from 'layouts/default'
import { GetServerSideProps } from 'next'
import parseJwt from 'lib/util/jwt'
import { ACCESS_TOKEN } from 'providers/auth'
import RoomAppBar from 'components/app-bar/room'
import ChatRoom from 'components/chat/room'
import { useChat } from 'providers/chat'

interface Props {
  id: string
}

export default function Page({ id } : Props) {
  const { rooms } = useChat()

  if (!rooms) {
    return <></>
  }

  const roomId = parseInt(id, 10)

  const room = rooms.find((element) => element.id === roomId)

  if (!room) {
    return <></>
  }

  return (
    <Layout
      header={<RoomAppBar title="아무이름" />}
    >
      <ChatRoom room={room} />
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
        destination: '/onboarding',
        permanent: false,
      },
    }
  }

  const { id } = context.params

  return {
    props: {
      id,
    },
  }
}

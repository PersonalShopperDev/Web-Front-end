import Layout from 'layouts/default'
import { GetServerSideProps } from 'next'
import parseJwt from 'lib/util/jwt'
import { ACCESS_TOKEN } from 'providers/auth'
import RoomAppBar from 'components/app-bar/room'
import ChatRoom from 'components/chat/room'
import { useChat } from 'providers/chat'
import { communicateWithContext } from 'lib/api'
import Room, { Other, RecieveMessageProps } from 'lib/model/room'
import { useEffect, useState } from 'react'

interface Props {
  id: string
  data: {
    targetUser: Other
    chatList: RecieveMessageProps[]
  }
}

export default function Page({ id, data } : Props) {
  const { rooms, open } = useChat()

  const [room, setRoom] = useState<Room>()

  useEffect(() => {
    if (!rooms) {
      return
    }

    const roomId = parseInt(id, 10)

    const assigned = rooms.find((element) => element.id === roomId)

    if (assigned) {
      setRoom(assigned)
      return
    }

    const created = open({ id, other: data.targetUser })
    setRoom(created)
  }, [rooms])

  if (!room) {
    return <></>
  }

  const { targetUser } = data

  const { name } = targetUser

  return (
    <Layout
      header={<RoomAppBar title={name} />}
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

  const res = await communicateWithContext({
    url: `/chat/history?roomId=${id}`,
    context,
  })

  if (res.status !== 200) {
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

import Layout from 'layouts/default'
import { GetServerSideProps } from 'next'
import { ACCESS_TOKEN } from 'providers/auth'
import parseJwt from 'lib/util/jwt'
import Pay from 'templates/pay'
import AppBar from 'components/app-bar'
import { communicateWithContext } from 'lib/api'

export default function Page({ roomId, price } : { roomId: number, price : number}) {
  return (
    <Layout header={<AppBar title="결제" back />}>
      <Pay roomId={roomId} price={price} />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context.req.cookies[ACCESS_TOKEN]
  if (!token) {
    return {
      notFound: true,
    }
  }

  const { userType } = parseJwt(token)

  if (userType !== 'D') {
    return {
      notFound: true,
    }
  }

  const { id } = context.params

  const chatRoomResponse = await communicateWithContext({
    url: `/chat/${id}`,
    context,
  })

  if (chatRoomResponse.status !== 200) {
    if (chatRoomResponse.status === 403) {
      return {
        notFound: true,
      }
    }
    throw new Error()
  }

  const { targetUser } = await chatRoomResponse.json()

  const targetUserResponse = await communicateWithContext({
    context,
    url: `/profile/${targetUser.id}`,
  })

  if (targetUserResponse.status !== 200) {
    throw Error()
  }

  const { price } = await targetUserResponse.json()

  return {
    props: {
      roomId: id,
      price,
    },
  }
}

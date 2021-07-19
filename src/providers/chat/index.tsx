import communicate from 'lib/api'
import useForceUpdate from 'lib/hooks/force-update'
import Room from 'lib/model/room'
import { getCookie } from 'lib/util/cookie'
import { ACCESS_TOKEN } from 'providers/auth'
import { useAlert } from 'providers/dialog/alert/inner'
import {
  ReactNode, useContext, createContext, useRef, useEffect,
} from 'react'
import io, { Socket } from 'socket.io-client'

interface OnPayment {
  roomId: number
  value: boolean
}

interface OnResponseEstimate {
  roomId: number
  value: boolean
}

interface OnReceive {
  roomId: number
  chatType: number
  msg: string
  chatTime: Date
  price: number
  coordTitle: string
  coordImg: ArrayBuffer
}

interface ChatContextProps {
  rooms: Room[]
}

const ChatContext = createContext<ChatContextProps>(null)

export const useChat = () => useContext(ChatContext)

export default function ChatProvider({ children }: { children: ReactNode }) {
  const { createAlert } = useAlert()

  const socketRef = useRef<Socket>()

  const roomsRef = useRef<Room[]>([])

  const update = useForceUpdate()

  const connect = () => {
    socketRef.current = io(process.env.SOCKET_URL, {
      path: '/v1/socket/',
      auth: {
        Authorization: `Bearer ${getCookie(ACCESS_TOKEN)}`,
      },
    })
  }

  const onPayment = async ({ roomId, ...props } : OnPayment) => {
    const room = await getReceivedRoom(roomId)

    if (!room) {
      return
    }

    room.onPayment(props)

    update()
  }

  const onResponseEstimate = async ({ roomId, ...props } : OnResponseEstimate) => {
    const room = await getReceivedRoom(roomId)

    if (!room) {
      return
    }

    room.onResponseEstimate(props)

    update()
  }

  const onReceive = async ({ roomId, ...props } : OnReceive) => {
    const room = await getReceivedRoom(roomId)

    if (!room) {
      return
    }

    room.onReceive(props)

    update()
  }

  const disconnect = () => {
    socketRef.current.disconnect()
  }

  const attachListener = () => {
    socketRef.current.on('payment', onPayment)
    socketRef.current.on('responseEstimate', onResponseEstimate)
    socketRef.current.on('receiveMsg', onReceive)
  }

  const getReceivedRoom = async (id: number, fail : number = 0) : Promise<Room> => {
    if (fail === 5) {
      await createAlert({ text: '오류가 발생했습니다' })
      return null
    }

    const result = roomsRef.current.find((room) => room.id === id)

    if (!result) {
      await initializeRoom()
      return getReceivedRoom(id, fail + 1)
    }

    return result
  }

  const initializeRoom = async () => {
    const res = await communicate({
      url: '/chat',
    })

    if (res.status !== 200) {
      return
    }

    const data = await res.json()

    roomsRef.current = data.map(({
      roomId, targetUser, lastChat, lastChatTime,
    }) => new Room({
      id: roomId, other: targetUser, lastChat, lastChatTime, socketRef, update,
    }))

    update()
  }

  useEffect(() => {
    connect()

    attachListener()
    initializeRoom()

    return disconnect
  }, [])

  const value = {
    rooms: roomsRef.current,
  }

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
}
